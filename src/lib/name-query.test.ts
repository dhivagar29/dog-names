import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  activeFilters,
  clearFilter,
  drawName,
  nameQuerySearch,
  parseNameQuery,
  pickDailyName,
} from "./name-query.ts";
import { EMPTY_QUERY, NAMES, type DogName, type NameQuery } from "./names.ts";

const catalog: readonly DogName[] = NAMES;

function query(overrides: Partial<NameQuery> = {}): NameQuery {
  return { ...EMPTY_QUERY, ...overrides };
}

describe("parseNameQuery", () => {
  it("returns the default query for missing params", () => {
    assert.deepEqual(parseNameQuery({}), EMPTY_QUERY);
  });

  it("trims the search text", () => {
    assert.equal(parseNameQuery({ q: "  moon " }).text, "moon");
  });

  it("keeps known values and drops unknown ones", () => {
    assert.deepEqual(
      parseNameQuery({
        gender: "female",
        origin: "martian",
        vibe: "mythic",
        length: "enormous",
        sort: "shortest",
      }),
      {
        text: "",
        gender: "female",
        origin: "all",
        vibe: "mythic",
        length: "all",
        sort: "shortest",
      },
    );
  });

  it("falls back to the default sort", () => {
    assert.equal(parseNameQuery({ sort: "random" }).sort, EMPTY_QUERY.sort);
  });
});

describe("nameQuerySearch", () => {
  it("omits everything that is at its default", () => {
    assert.equal(nameQuerySearch(EMPTY_QUERY), "");
  });

  it("omits the default sort but keeps the others", () => {
    assert.equal(nameQuerySearch(query({ sort: "az" })), "");
    assert.equal(nameQuerySearch(query({ sort: "longest" })), "sort=longest");
  });

  it("serializes every active filter", () => {
    assert.equal(
      nameQuerySearch(
        query({
          text: "snow",
          gender: "unisex",
          origin: "norse",
          vibe: "nature",
          length: "short",
          sort: "shortest",
        }),
      ),
      "q=snow&gender=unisex&origin=norse&vibe=nature&length=short&sort=shortest",
    );
  });

  it("round-trips through parseNameQuery", () => {
    const original = query({
      text: "wolf",
      gender: "male",
      origin: "japanese",
      vibe: "bold",
      length: "medium",
      sort: "za",
    });
    const params = new URLSearchParams(nameQuerySearch(original));
    assert.deepEqual(
      parseNameQuery({
        q: params.get("q") ?? undefined,
        gender: params.get("gender") ?? undefined,
        origin: params.get("origin") ?? undefined,
        vibe: params.get("vibe") ?? undefined,
        length: params.get("length") ?? undefined,
        sort: params.get("sort") ?? undefined,
      }),
      original,
    );
  });
});

describe("clearFilter", () => {
  it("clears the search text without touching the rest", () => {
    const next = clearFilter(query({ text: "moon", vibe: "cosmic" }), "text");
    assert.equal(next.text, "");
    assert.equal(next.vibe, "cosmic");
  });

  it("resets a chip filter to all", () => {
    assert.equal(clearFilter(query({ origin: "irish" }), "origin").origin, "all");
    assert.equal(clearFilter(query({ length: "long" }), "length").length, "all");
  });

  it("leaves sort alone", () => {
    assert.equal(clearFilter(query({ sort: "longest" }), "text").sort, "longest");
  });
});

describe("activeFilters", () => {
  it("is empty for the default query", () => {
    assert.deepEqual(activeFilters(EMPTY_QUERY), []);
  });

  it("ignores sort", () => {
    assert.deepEqual(activeFilters(query({ sort: "za" })), []);
  });

  it("lists one removable chip per active filter", () => {
    const chips = activeFilters(
      query({ text: "moon", gender: "female", origin: "latin", vibe: "cosmic", length: "short" }),
    );
    assert.deepEqual(
      chips.map((chip) => chip.key),
      ["text", "gender", "origin", "vibe", "length"],
    );
    assert.ok(chips[0]!.label.includes("moon"));
  });
});

describe("pickDailyName", () => {
  it("is stable for a UTC date", () => {
    assert.equal(
      pickDailyName(catalog, "2026-08-25").slug,
      pickDailyName(catalog, "2026-08-25").slug,
    );
  });

  it("walks the whole catalog across consecutive days", () => {
    const seen = new Set(
      catalog.map((_, index) =>
        pickDailyName(
          catalog,
          new Date(Date.UTC(2026, 0, 1 + index)).toISOString().slice(0, 10),
        ).slug,
      ),
    );
    assert.equal(seen.size, catalog.length);
  });

  it("falls back to the first name for an unreadable date", () => {
    assert.equal(pickDailyName(catalog, "not-a-date").slug, catalog[0]!.slug);
  });

  it("throws only when there is nothing to pick", () => {
    assert.throws(() => pickDailyName([], "2026-08-25"));
  });
});

describe("drawName", () => {
  const pool = catalog.slice(0, 4);

  it("returns nothing from an empty pool", () => {
    assert.equal(drawName([], 0.5), null);
  });

  it("maps the roll onto the pool", () => {
    assert.equal(drawName(pool, 0)!.slug, pool[0]!.slug);
    assert.equal(drawName(pool, 0.99)!.slug, pool[3]!.slug);
  });

  it("clamps rolls that fall outside the range", () => {
    assert.equal(drawName(pool, -5)!.slug, pool[0]!.slug);
    assert.equal(drawName(pool, 12)!.slug, pool[3]!.slug);
    assert.equal(drawName(pool, Number.NaN)!.slug, pool[0]!.slug);
  });

  it("never repeats the previous pick when there is an alternative", () => {
    for (const previous of pool) {
      for (const roll of [0, 0.25, 0.5, 0.75, 0.99]) {
        assert.notEqual(drawName(pool, roll, previous.slug)!.slug, previous.slug);
      }
    }
  });

  it("still returns the only name in a pool of one", () => {
    const only = pool.slice(0, 1);
    assert.equal(drawName(only, 0.5, only[0]!.slug)!.slug, only[0]!.slug);
  });

  it("only ever draws from the pool it was given", () => {
    const norse = catalog.filter((item) => item.origin === "norse");
    for (const roll of [0, 0.1, 0.4, 0.6, 0.95]) {
      assert.equal(drawName(norse, roll)!.origin, "norse");
    }
  });
});

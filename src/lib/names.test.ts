import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  countBy,
  EMPTY_QUERY,
  filterNames,
  GENDERS,
  genderLabel,
  isFiltered,
  LENGTHS,
  lengthLabel,
  NAMES,
  nameLength,
  ORIGINS,
  originLabel,
  queryNames,
  sortNames,
  VIBES,
  vibeLabel,
  type DogName,
  type NameQuery,
} from "./names.ts";

const catalog: readonly DogName[] = NAMES;

function query(overrides: Partial<NameQuery> = {}): NameQuery {
  return { ...EMPTY_QUERY, ...overrides };
}

describe("catalog integrity", () => {
  it("has unique slugs", () => {
    const slugs = catalog.map((item) => item.slug);
    assert.equal(new Set(slugs).size, slugs.length);
  });

  it("has unique display names", () => {
    const names = catalog.map((item) => item.name);
    assert.equal(new Set(names).size, names.length);
  });

  it("derives every slug from its display name", () => {
    for (const item of catalog) {
      assert.equal(item.slug, item.name.toLowerCase(), item.name);
    }
  });

  it("uses capitalised, single-word names", () => {
    for (const item of catalog) {
      assert.match(item.name, /^[A-Z][a-z]+$/, item.name);
    }
  });

  it("only uses known genders, origins and vibes", () => {
    for (const item of catalog) {
      assert.ok(GENDERS.includes(item.gender), item.name);
      assert.ok(ORIGINS.includes(item.origin), item.name);
      assert.ok(VIBES.includes(item.vibe), item.name);
    }
  });

  it("gives every name a written meaning", () => {
    for (const item of catalog) {
      assert.ok(item.meaning.length >= 12, item.name);
      assert.match(item.meaning, /^[A-Z]/, item.name);
      assert.match(item.meaning, /[.!?]$/, item.name);
    }
  });

  it("gives every name at least one lowercase tag", () => {
    for (const item of catalog) {
      assert.ok(item.tags.length > 0, item.name);
      for (const tag of item.tags) {
        assert.equal(tag, tag.toLowerCase(), `${item.name}: ${tag}`);
      }
    }
  });

  // The product promise: descriptions, never invented popularity data.
  it("claims no rankings, ratings or popularity figures", () => {
    const banned =
      /(most popular|#\s?\d|top \d|\d+%|\branked?\b|\brating\b|\bvotes?\b|\btrending\b|\bbest-selling\b)/i;
    for (const item of catalog) {
      assert.doesNotMatch(item.meaning, banned, item.name);
      for (const tag of item.tags) {
        assert.doesNotMatch(tag, banned, `${item.name}: ${tag}`);
      }
    }
  });

  it("leaves no filter option empty", () => {
    for (const gender of GENDERS) {
      assert.ok(filterNames(catalog, query({ gender })).length > 0, gender);
    }
    for (const origin of ORIGINS) {
      assert.ok(filterNames(catalog, query({ origin })).length > 0, origin);
    }
    for (const vibe of VIBES) {
      assert.ok(filterNames(catalog, query({ vibe })).length > 0, vibe);
    }
    for (const length of LENGTHS) {
      assert.ok(filterNames(catalog, query({ length })).length > 0, length);
    }
  });

  it("keeps every origin usefully stocked", () => {
    for (const origin of ORIGINS) {
      assert.ok(
        filterNames(catalog, query({ origin })).length >= 10,
        `${origin} is too thin to browse`,
      );
    }
  });
});

describe("nameLength", () => {
  it("treats four letters or fewer as short", () => {
    assert.equal(nameLength("Rio"), "short");
    assert.equal(nameLength("Luna"), "short");
  });

  it("treats five to seven letters as medium", () => {
    assert.equal(nameLength("Bramble"), "medium");
    assert.equal(nameLength("Juniper"), "medium");
  });

  it("treats eight letters or more as long", () => {
    assert.equal(nameLength("Estrella"), "long");
    assert.equal(nameLength("Clementine"), "long");
  });
});

describe("filterNames", () => {
  it("returns the full catalog for an empty query", () => {
    assert.equal(filterNames(catalog, query({ text: "  " })).length, catalog.length);
  });

  it("filters by gender", () => {
    const result = filterNames(catalog, query({ gender: "female" }));
    assert.ok(result.length > 0);
    assert.ok(result.every((item) => item.gender === "female"));
  });

  it("filters by origin", () => {
    const result = filterNames(catalog, query({ origin: "norse" }));
    assert.ok(result.length > 0);
    assert.ok(result.every((item) => item.origin === "norse"));
    assert.ok(result.some((item) => item.name === "Freya"));
  });

  it("filters by vibe", () => {
    const result = filterNames(catalog, query({ vibe: "foodie" }));
    assert.ok(result.length > 0);
    assert.ok(result.every((item) => item.vibe === "foodie"));
  });

  it("filters by length", () => {
    const result = filterNames(catalog, query({ length: "long" }));
    assert.ok(result.length > 0);
    assert.ok(result.every((item) => item.name.length >= 8));
  });

  it("matches meaning text", () => {
    const result = filterNames(catalog, query({ text: "moon" }));
    assert.ok(result.some((item) => item.name === "Luna"));
    assert.ok(result.every((item) => JSON.stringify(item).toLowerCase().includes("moon")));
  });

  it("matches tags", () => {
    const result = filterNames(catalog, query({ text: "wolf" }));
    assert.ok(result.some((item) => item.name === "Ulf"));
    assert.ok(result.some((item) => item.name === "Zev"));
  });

  it("matches origin and vibe names", () => {
    assert.ok(
      filterNames(catalog, query({ text: "japanese" })).every(
        (item) => item.origin === "japanese",
      ),
    );
    assert.ok(filterNames(catalog, query({ text: "cosmic" })).length > 0);
  });

  it("ignores case and surrounding space", () => {
    const loose = filterNames(catalog, query({ text: "  SNOW " }));
    const tight = filterNames(catalog, query({ text: "snow" }));
    assert.deepEqual(
      loose.map((item) => item.slug),
      tight.map((item) => item.slug),
    );
  });

  it("combines every filter at once", () => {
    const result = filterNames(
      catalog,
      query({ text: "star", gender: "female", vibe: "cosmic", length: "long" }),
    );
    assert.ok(result.every((item) => item.gender === "female"));
    assert.ok(result.every((item) => item.vibe === "cosmic"));
    assert.ok(result.every((item) => item.name.length >= 8));
  });

  it("returns nothing for an impossible mix, without throwing", () => {
    const result = filterNames(
      catalog,
      query({ text: "zzzzz-not-a-name", origin: "welsh" }),
    );
    assert.deepEqual(result, []);
  });
});

describe("sortNames", () => {
  const sample = filterNames(catalog, query({ origin: "norse" }));

  it("sorts A to Z by default", () => {
    const names = sortNames(sample, "az").map((item) => item.name);
    assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b)));
  });

  it("sorts Z to A", () => {
    const az = sortNames(sample, "az").map((item) => item.name);
    const za = sortNames(sample, "za").map((item) => item.name);
    assert.deepEqual(za, [...az].reverse());
  });

  it("sorts shortest and longest first", () => {
    const shortest = sortNames(sample, "shortest");
    const longest = sortNames(sample, "longest");
    for (let i = 1; i < shortest.length; i += 1) {
      assert.ok(shortest[i - 1]!.name.length <= shortest[i]!.name.length);
      assert.ok(longest[i - 1]!.name.length >= longest[i]!.name.length);
    }
  });

  it("does not mutate the input", () => {
    const before = sample.map((item) => item.slug);
    sortNames(sample, "za");
    assert.deepEqual(
      sample.map((item) => item.slug),
      before,
    );
  });
});

describe("queryNames", () => {
  it("filters and sorts together", () => {
    const result = queryNames(
      catalog,
      query({ origin: "japanese", sort: "shortest" }),
    );
    assert.ok(result.every((item) => item.origin === "japanese"));
    assert.ok(result[0]!.name.length <= result[result.length - 1]!.name.length);
  });
});

describe("isFiltered", () => {
  it("is false for the default query", () => {
    assert.equal(isFiltered(EMPTY_QUERY), false);
  });

  it("ignores sort, which is not a filter", () => {
    assert.equal(isFiltered(query({ sort: "longest" })), false);
  });

  it("is true once any filter is set", () => {
    assert.equal(isFiltered(query({ text: "moon" })), true);
    assert.equal(isFiltered(query({ gender: "male" })), true);
    assert.equal(isFiltered(query({ origin: "irish" })), true);
    assert.equal(isFiltered(query({ vibe: "mythic" })), true);
    assert.equal(isFiltered(query({ length: "short" })), true);
  });
});

describe("countBy", () => {
  it("counts every name exactly once", () => {
    const counts = countBy(catalog, (item) => item.origin);
    const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
    assert.equal(total, catalog.length);
  });

  it("agrees with the filtered result for each key", () => {
    const counts = countBy(catalog, (item) => item.vibe);
    for (const vibe of VIBES) {
      assert.equal(counts[vibe], filterNames(catalog, query({ vibe })).length);
    }
  });
});

describe("labels", () => {
  it("names the neutral option for every filter", () => {
    assert.equal(genderLabel("all"), "Any");
    assert.equal(originLabel("all"), "All origins");
    assert.equal(vibeLabel("all"), "Any vibe");
    assert.equal(lengthLabel("all"), "Any length");
  });

  it("title-cases real values", () => {
    assert.equal(genderLabel("female"), "Female");
    assert.equal(originLabel("norse"), "Norse");
    assert.equal(vibeLabel("mythic"), "Mythic");
  });
});

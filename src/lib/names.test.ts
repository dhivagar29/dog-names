import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getBreed } from "./breeds.ts";
import {
  filterNames,
  NAMES,
  nameLength,
  pickRandomNames,
  type DogName,
} from "./names.ts";
import {
  nameQuerySearch,
  parseNameQuery,
  pickDailyName,
} from "./name-query.ts";

const catalog: readonly DogName[] = NAMES;

describe("NAMES", () => {
  it("has unique slugs", () => {
    const slugs = catalog.map((item) => item.slug);
    assert.equal(new Set(slugs).size, slugs.length);
  });

  it("has unique display names", () => {
    const names = catalog.map((item) => item.name);
    assert.equal(new Set(names).size, names.length);
  });
});

describe("nameLength", () => {
  it("treats four letters as short", () => {
    assert.equal(nameLength("Luna"), "short");
  });

  it("treats seven letters as medium", () => {
    assert.equal(nameLength("Bramble"), "medium");
  });

  it("treats longer names as long", () => {
    assert.equal(nameLength("Juniper"), "medium");
    assert.equal(nameLength("Cosette"), "medium");
    assert.equal(nameLength("SomethingLong"), "long");
  });
});

describe("parseNameQuery", () => {
  it("returns an empty query for missing params", () => {
    assert.deepEqual(parseNameQuery({}), {
      text: "",
      gender: "all",
      origin: "all",
      vibe: "all",
      breed: "all",
    });
  });

  it("keeps known filters and drops unknown ones", () => {
    assert.deepEqual(
      parseNameQuery({ q: "  moon ", gender: "female", origin: "martian" }),
      { text: "moon", gender: "female", origin: "all", vibe: "all", breed: "all" },
    );
  });
});

describe("nameQuerySearch", () => {
  it("omits default filters", () => {
    assert.equal(
      nameQuerySearch({ text: "", gender: "all", origin: "all", vibe: "all", breed: "all" }),
      "",
    );
  });

  it("serializes active filters", () => {
    assert.equal(
      nameQuerySearch({
        text: "snow",
        gender: "unisex",
        origin: "norse",
        vibe: "all",
        breed: "all",
      }),
      "q=snow&gender=unisex&origin=norse",
    );
  });
});

describe("pickDailyName", () => {
  it("is stable for a UTC date", () => {
    const a = pickDailyName(catalog, "2026-08-25");
    const b = pickDailyName(catalog, "2026-08-25");
    assert.equal(a.slug, b.slug);
  });

  it("walks the catalog across consecutive days", () => {
    const seen = new Set(
      catalog.map((_, index) => {
        const iso = new Date(Date.UTC(2026, 0, 1 + index))
          .toISOString()
          .slice(0, 10);
        return pickDailyName(catalog, iso).slug;
      }),
    );
    assert.equal(seen.size, catalog.length);
  });
});

describe("filterNames", () => {
  it("returns the full catalog for an empty query", () => {
    const result = filterNames(catalog, {
      text: "  ",
      gender: "all",
      origin: "all",
      vibe: "all",
      breed: "all",
    });
    assert.equal(result.length, catalog.length);
  });

  it("filters by gender", () => {
    const result = filterNames(catalog, {
      text: "",
      gender: "female",
      origin: "all",
      vibe: "all",
      breed: "all",
    });
    assert.ok(result.length > 0);
    assert.ok(result.every((item) => item.gender === "female"));
  });

  it("filters by origin", () => {
    const result = filterNames(catalog, {
      text: "",
      gender: "all",
      origin: "norse",
      vibe: "all",
      breed: "all",
    });
    const names = result.map((item) => item.name).sort();
    assert.deepEqual(names, ["Freya", "Odin"]);
  });

  it("matches meaning text", () => {
    const result = filterNames(catalog, {
      text: "moon",
      gender: "all",
      origin: "all",
      vibe: "all",
      breed: "all",
    });
    assert.equal(result.length, 1);
    assert.equal(result[0]?.name, "Luna");
  });

  it("matches tags", () => {
    const result = filterNames(catalog, {
      text: "celestial",
      gender: "all",
      origin: "all",
      vibe: "all",
      breed: "all",
    });
    const names = result.map((item) => item.name).sort();
    assert.deepEqual(names, ["Luna", "Nova"]);
  });

  it("combines text and gender", () => {
    const result = filterNames(catalog, {
      text: "short",
      gender: "male",
      origin: "all",
      vibe: "all",
      breed: "all",
    });
    assert.ok(result.length > 0);
    assert.ok(result.every((item) => item.gender === "male"));
    assert.ok(
      result.every(
        (item) =>
          item.tags.includes("short") ||
          item.meaning.toLowerCase().includes("short") ||
          item.name.toLowerCase().includes("short"),
      ),
    );
  });

  it("filters by vibe tag", () => {
    const result = filterNames(catalog, {
      text: "",
      gender: "all",
      origin: "all",
      vibe: "playful",
      breed: "all",
    });
    assert.ok(result.length > 0);
    assert.ok(result.every((item) => item.tags.includes("playful")));
  });

  it("filters by breed via vibe overlap", () => {
    const husky = getBreed("husky");
    assert.ok(husky);
    const result = filterNames(catalog, {
      text: "",
      gender: "all",
      origin: "all",
      vibe: "all",
      breed: "husky",
    });
    assert.ok(result.length > 0);
    assert.ok(
      result.every((item) => item.tags.some((tag) => husky.vibes.includes(tag))),
    );
  });
});

describe("pickRandomNames", () => {
  it("returns up to count unique names", () => {
    const pool = catalog.slice(0, 10);
    const picks = pickRandomNames(pool, 3);
    assert.equal(picks.length, 3);
    assert.equal(new Set(picks.map((item) => item.slug)).size, 3);
  });
});

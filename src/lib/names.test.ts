import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  filterNames,
  NAMES,
  nameLength,
  type DogName,
} from "./names.ts";

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

describe("filterNames", () => {
  it("returns the full catalog for an empty query", () => {
    const result = filterNames(catalog, {
      text: "  ",
      gender: "all",
      origin: "all",
    });
    assert.equal(result.length, catalog.length);
  });

  it("filters by gender", () => {
    const result = filterNames(catalog, {
      text: "",
      gender: "female",
      origin: "all",
    });
    assert.ok(result.length > 0);
    assert.ok(result.every((item) => item.gender === "female"));
  });

  it("filters by origin", () => {
    const result = filterNames(catalog, {
      text: "",
      gender: "all",
      origin: "norse",
    });
    const names = result.map((item) => item.name).sort();
    assert.deepEqual(names, ["Freya", "Odin"]);
  });

  it("matches meaning text", () => {
    const result = filterNames(catalog, {
      text: "moon",
      gender: "all",
      origin: "all",
    });
    assert.equal(result.length, 1);
    assert.equal(result[0]?.name, "Luna");
  });

  it("matches tags", () => {
    const result = filterNames(catalog, {
      text: "celestial",
      gender: "all",
      origin: "all",
    });
    const names = result.map((item) => item.name).sort();
    assert.deepEqual(names, ["Luna", "Nova"]);
  });

  it("combines text and gender", () => {
    const result = filterNames(catalog, {
      text: "short",
      gender: "male",
      origin: "all",
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
});

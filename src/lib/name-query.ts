import {
  EMPTY_QUERY,
  GENDERS,
  genderLabel,
  LENGTHS,
  lengthLabel,
  ORIGINS,
  originLabel,
  SORTS,
  VIBES,
  vibeLabel,
  type DogName,
  type NameQuery,
} from "./names.ts";

export type QueryParamInput = {
  q?: string;
  gender?: string;
  origin?: string;
  vibe?: string;
  length?: string;
  sort?: string;
};

/** Keys that can be cleared one at a time from the active-filter chips. */
export type FilterKey = "text" | "gender" | "origin" | "vibe" | "length";

export type ActiveFilter = {
  key: FilterKey;
  label: string;
};

export function parseNameQuery(input: QueryParamInput): NameQuery {
  return {
    text: (input.q ?? "").trim(),
    gender: GENDERS.find((item) => item === input.gender) ?? "all",
    origin: ORIGINS.find((item) => item === input.origin) ?? "all",
    vibe: VIBES.find((item) => item === input.vibe) ?? "all",
    length: LENGTHS.find((item) => item === input.length) ?? "all",
    sort: SORTS.find((item) => item === input.sort) ?? EMPTY_QUERY.sort,
  };
}

/** Serializes only the non-default parts, so a plain browse stays at a clean URL. */
export function nameQuerySearch(query: NameQuery): string {
  const params = new URLSearchParams();
  const text = query.text.trim();
  if (text) {
    params.set("q", text);
  }
  if (query.gender !== "all") {
    params.set("gender", query.gender);
  }
  if (query.origin !== "all") {
    params.set("origin", query.origin);
  }
  if (query.vibe !== "all") {
    params.set("vibe", query.vibe);
  }
  if (query.length !== "all") {
    params.set("length", query.length);
  }
  if (query.sort !== EMPTY_QUERY.sort) {
    params.set("sort", query.sort);
  }
  return params.toString();
}

export function clearFilter(query: NameQuery, key: FilterKey): NameQuery {
  if (key === "text") {
    return { ...query, text: "" };
  }
  return { ...query, [key]: "all" };
}

export function activeFilters(query: NameQuery): ActiveFilter[] {
  const active: ActiveFilter[] = [];
  const text = query.text.trim();
  if (text) {
    active.push({ key: "text", label: `“${text}”` });
  }
  if (query.gender !== "all") {
    active.push({ key: "gender", label: genderLabel(query.gender) });
  }
  if (query.origin !== "all") {
    active.push({ key: "origin", label: originLabel(query.origin) });
  }
  if (query.vibe !== "all") {
    active.push({ key: "vibe", label: vibeLabel(query.vibe) });
  }
  if (query.length !== "all") {
    active.push({ key: "length", label: lengthLabel(query.length) });
  }
  return active;
}

/** One name per UTC day, walking the catalog in order so it never repeats early. */
export function pickDailyName(
  names: readonly DogName[],
  isoDate: string,
): DogName {
  const first = names[0];
  if (!first) {
    throw new Error("The catalog is empty.");
  }
  const day = Date.parse(`${isoDate}T00:00:00.000Z`);
  if (Number.isNaN(day)) {
    return first;
  }
  const index = Math.floor(day / 86_400_000);
  const offset = ((index % names.length) + names.length) % names.length;
  return names[offset] ?? first;
}

/**
 * Draws one name from the already-filtered pool. `roll` is a value in [0, 1),
 * passed in so the caller owns the randomness and this stays testable.
 * When there is more than one candidate, the previous pick is skipped so
 * pressing the button again always visibly changes something.
 */
export function drawName(
  names: readonly DogName[],
  roll: number,
  previousSlug?: string | null,
): DogName | null {
  if (names.length === 0) {
    return null;
  }
  const pool =
    names.length > 1 && previousSlug
      ? names.filter((item) => item.slug !== previousSlug)
      : names;
  const candidates = pool.length > 0 ? pool : names;
  const safeRoll = Number.isFinite(roll) ? Math.min(Math.max(roll, 0), 0.999999) : 0;
  const index = Math.floor(safeRoll * candidates.length);
  return candidates[index] ?? candidates[0] ?? null;
}

import {
  GENDERS,
  ORIGINS,
  type DogName,
  type NameQuery,
} from "./names.ts";

export function parseNameQuery(input: {
  q?: string;
  gender?: string;
  origin?: string;
}): NameQuery {
  return {
    text: (input.q ?? "").trim(),
    gender: GENDERS.find((item) => item === input.gender) ?? "all",
    origin: ORIGINS.find((item) => item === input.origin) ?? "all",
  };
}

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
  return params.toString();
}

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

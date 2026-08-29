const SHORTLIST_KEY = "dog-names:shortlist";
const SHORTLIST_EVENT = "dog-names-shortlist";
const EMPTY_SHORTLIST: string[] = [];

let cachedRaw: string | null = null;
let cachedList: string[] = EMPTY_SHORTLIST;

function parseShortlist(raw: string | null): string[] {
  if (!raw) {
    return EMPTY_SHORTLIST;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      Array.isArray(parsed) &&
      parsed.every((item) => typeof item === "string")
    ) {
      return parsed;
    }
  } catch {
    return EMPTY_SHORTLIST;
  }
  return EMPTY_SHORTLIST;
}

export function readShortlist(): string[] {
  const raw = window.localStorage.getItem(SHORTLIST_KEY);
  if (raw === cachedRaw) {
    return cachedList;
  }
  cachedRaw = raw;
  cachedList = parseShortlist(raw);
  return cachedList;
}

export function writeShortlist(slugs: string[]): void {
  const raw = JSON.stringify(slugs);
  window.localStorage.setItem(SHORTLIST_KEY, raw);
  cachedRaw = raw;
  cachedList = slugs;
  window.dispatchEvent(new Event(SHORTLIST_EVENT));
}

export function subscribeShortlist(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(SHORTLIST_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(SHORTLIST_EVENT, onStoreChange);
  };
}

export function emptyShortlist(): string[] {
  return EMPTY_SHORTLIST;
}

/** Newest saves go to the front, so the shortlist reads like a recent-picks list. */
export function toggleShortlist(slugs: readonly string[], slug: string): string[] {
  return slugs.includes(slug)
    ? slugs.filter((item) => item !== slug)
    : [slug, ...slugs];
}

export function clearShortlist(): void {
  writeShortlist([]);
}

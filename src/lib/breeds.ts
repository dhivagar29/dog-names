export type Breed = {
  slug: string;
  name: string;
  vibes: readonly string[];
  hint: string;
};

export const BREEDS = [
  {
    slug: "golden-retriever",
    name: "Golden Retriever",
    vibes: ["friendly", "gentle", "nature", "popular"],
    hint: "Warm, easy recall, family-park energy.",
  },
  {
    slug: "labrador",
    name: "Labrador",
    vibes: ["friendly", "popular", "short", "adventure"],
    hint: "Bouncy, classic, hard to mis-hear.",
  },
  {
    slug: "husky",
    name: "Husky",
    vibes: ["adventure", "weather", "bold", "fluffy"],
    hint: "Dramatic coat, dramatic name optional.",
  },
  {
    slug: "french-bulldog",
    name: "French Bulldog",
    vibes: ["playful", "short", "food", "friendly"],
    hint: "Compact dog, compact syllables.",
  },
  {
    slug: "german-shepherd",
    name: "German Shepherd",
    vibes: ["bold", "classic", "myth", "short"],
    hint: "Serious face, serious-sounding names land well.",
  },
  {
    slug: "poodle",
    name: "Poodle",
    vibes: ["elegant", "classic", "gentle", "bright"],
    hint: "Polished dog, polished vowels.",
  },
  {
    slug: "beagle",
    name: "Beagle",
    vibes: ["playful", "friendly", "short", "food"],
    hint: "Snack-motivated, two-syllable sweet spot.",
  },
  {
    slug: "corgi",
    name: "Corgi",
    vibes: ["playful", "short", "food", "popular"],
    hint: "Small dog, big personality names work.",
  },
  {
    slug: "shiba-inu",
    name: "Shiba Inu",
    vibes: ["bold", "uncommon", "short", "myth"],
    hint: "Independent vibe, names with snap.",
  },
  {
    slug: "dachshund",
    name: "Dachshund",
    vibes: ["playful", "short", "spicy", "scruffy"],
    hint: "Long body, short name is kinder.",
  },
  {
    slug: "border-collie",
    name: "Border Collie",
    vibes: ["bright", "adventure", "nature", "short"],
    hint: "Fast brain, crisp consonants help.",
  },
  {
    slug: "mixed",
    name: "Mixed breed",
    vibes: ["unisex", "nature", "playful", "uncommon"],
    hint: "No breed script. Pick the vibe you see.",
  },
] as const satisfies readonly Breed[];

export type BreedSlug = (typeof BREEDS)[number]["slug"];

export const BREED_SLUGS = BREEDS.map((item) => item.slug);

export function getBreed(slug: string): Breed | undefined {
  return BREEDS.find((item) => item.slug === slug);
}

export function breedLabel(slug: BreedSlug | "all"): string {
  if (slug === "all") {
    return "Any breed";
  }
  return getBreed(slug)?.name ?? slug;
}

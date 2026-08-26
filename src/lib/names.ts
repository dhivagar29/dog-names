export const GENDERS = ["female", "male", "unisex"] as const;
export type Gender = (typeof GENDERS)[number];

export const ORIGINS = [
  "english",
  "irish",
  "sanskrit",
  "japanese",
  "hebrew",
  "greek",
  "latin",
  "french",
  "norse",
] as const;
export type Origin = (typeof ORIGINS)[number];

export type NameLength = "short" | "medium" | "long";

export type DogName = {
  slug: string;
  name: string;
  gender: Gender;
  origin: Origin;
  meaning: string;
  tags: readonly string[];
};

export type NameQuery = {
  text: string;
  gender: Gender | "all";
  origin: Origin | "all";
  vibe: string | "all";
  breed: string | "all";
};

export const VIBE_FILTERS = [
  "gentle",
  "playful",
  "nature",
  "bold",
  "short",
  "myth",
  "classic",
  "uncommon",
] as const;

export type VibeFilter = (typeof VIBE_FILTERS)[number];

export const NAMES = [
  {
    slug: "luna",
    name: "Luna",
    gender: "female",
    origin: "latin",
    meaning: "Moon. Soft, easy to call across a park.",
    tags: ["popular", "celestial", "short"],
  },
  {
    slug: "milo",
    name: "Milo",
    gender: "male",
    origin: "latin",
    meaning: "Soldier or merciful. A compact name with bounce.",
    tags: ["popular", "friendly", "short"],
  },
  {
    slug: "coco",
    name: "Coco",
    gender: "unisex",
    origin: "french",
    meaning: "A chocolate-box nickname that still works on a grown dog.",
    tags: ["playful", "food", "short"],
  },
  {
    slug: "maple",
    name: "Maple",
    gender: "unisex",
    origin: "english",
    meaning: "A tree name with warmth. Suits a red or golden coat.",
    tags: ["nature", "gentle"],
  },
  {
    slug: "nimbus",
    name: "Nimbus",
    gender: "unisex",
    origin: "latin",
    meaning: "Rain cloud. Good for a fluffy or grey dog.",
    tags: ["weather", "fluffy"],
  },
  {
    slug: "suki",
    name: "Suki",
    gender: "female",
    origin: "japanese",
    meaning: "Beloved. Two syllables, easy recall.",
    tags: ["affection", "short"],
  },
  {
    slug: "koda",
    name: "Koda",
    gender: "unisex",
    origin: "english",
    meaning: "A modern short form with a sturdy sound.",
    tags: ["adventure", "short"],
  },
  {
    slug: "bramble",
    name: "Bramble",
    gender: "unisex",
    origin: "english",
    meaning: "Wild blackberry thicket. For a scruffy explorer.",
    tags: ["nature", "scruffy"],
  },
  {
    slug: "indigo",
    name: "Indigo",
    gender: "unisex",
    origin: "greek",
    meaning: "The deep blue dye. Rare without being hard to shout.",
    tags: ["color", "uncommon"],
  },
  {
    slug: "rio",
    name: "Rio",
    gender: "unisex",
    origin: "latin",
    meaning: "River. Three letters, high energy.",
    tags: ["water", "short"],
  },
  {
    slug: "freya",
    name: "Freya",
    gender: "female",
    origin: "norse",
    meaning: "Norse goddess of love. Soft start, bright ending.",
    tags: ["myth", "elegant"],
  },
  {
    slug: "odin",
    name: "Odin",
    gender: "male",
    origin: "norse",
    meaning: "All-father of Norse myth. Best on a serious-faced dog.",
    tags: ["myth", "bold", "short"],
  },
  {
    slug: "nala",
    name: "Nala",
    gender: "female",
    origin: "sanskrit",
    meaning: "Stem or gift. Familiar without being everywhere.",
    tags: ["popular", "short"],
  },
  {
    slug: "ravi",
    name: "Ravi",
    gender: "male",
    origin: "sanskrit",
    meaning: "Sun. Warm, short, and easy for kids to say.",
    tags: ["sun", "short"],
  },
  {
    slug: "pippin",
    name: "Pippin",
    gender: "unisex",
    origin: "english",
    meaning: "A small apple and a hobbit. Suits a compact, busy dog.",
    tags: ["literary", "playful"],
  },
  {
    slug: "hazel",
    name: "Hazel",
    gender: "female",
    origin: "english",
    meaning: "The nut tree. Calm, cottage-core, still practical.",
    tags: ["nature", "gentle"],
  },
  {
    slug: "otter",
    name: "Otter",
    gender: "unisex",
    origin: "english",
    meaning: "Water mammal. For a dog that cannot leave puddles alone.",
    tags: ["animal", "playful"],
  },
  {
    slug: "yuki",
    name: "Yuki",
    gender: "unisex",
    origin: "japanese",
    meaning: "Snow. A natural fit for a white coat.",
    tags: ["weather", "short"],
  },
  {
    slug: "akira",
    name: "Akira",
    gender: "unisex",
    origin: "japanese",
    meaning: "Bright or clear. Crisp consonants for outdoor recall.",
    tags: ["bright"],
  },
  {
    slug: "cleo",
    name: "Cleo",
    gender: "female",
    origin: "greek",
    meaning: "Glory. Four letters with a little drama.",
    tags: ["classic", "short"],
  },
  {
    slug: "atlas",
    name: "Atlas",
    gender: "male",
    origin: "greek",
    meaning: "The titan who held the sky. For a big, steady dog.",
    tags: ["myth", "large"],
  },
  {
    slug: "olive",
    name: "Olive",
    gender: "female",
    origin: "latin",
    meaning: "The olive tree. Quiet, green, easy to love.",
    tags: ["nature", "gentle"],
  },
  {
    slug: "felix",
    name: "Felix",
    gender: "male",
    origin: "latin",
    meaning: "Lucky. A happy mouth-feel when you call it.",
    tags: ["classic", "lucky"],
  },
  {
    slug: "remy",
    name: "Remy",
    gender: "unisex",
    origin: "french",
    meaning: "Oarsman. Light, kitchen-adjacent, still grown-up.",
    tags: ["food", "short"],
  },
  {
    slug: "cosette",
    name: "Cosette",
    gender: "female",
    origin: "french",
    meaning: "Little thing. Literary, better on a small companion.",
    tags: ["literary", "elegant"],
  },
  {
    slug: "finn",
    name: "Finn",
    gender: "male",
    origin: "irish",
    meaning: "Fair. One syllable that carries on the wind.",
    tags: ["popular", "short"],
  },
  {
    slug: "niamh",
    name: "Niamh",
    gender: "female",
    origin: "irish",
    meaning: "Bright. Pronounced neeve. A name people remember.",
    tags: ["myth", "uncommon"],
  },
  {
    slug: "rowan",
    name: "Rowan",
    gender: "unisex",
    origin: "irish",
    meaning: "The mountain ash. Works for almost any coat.",
    tags: ["nature", "unisex"],
  },
  {
    slug: "aria",
    name: "Aria",
    gender: "female",
    origin: "hebrew",
    meaning: "Lioness, or a melody. Short and musical.",
    tags: ["music", "short"],
  },
  {
    slug: "levi",
    name: "Levi",
    gender: "male",
    origin: "hebrew",
    meaning: "Joined. Soft consonants, easy for daily use.",
    tags: ["classic", "short"],
  },
  {
    slug: "sage",
    name: "Sage",
    gender: "unisex",
    origin: "english",
    meaning: "The herb, and wisdom. Four letters, calm energy.",
    tags: ["nature", "short"],
  },
  {
    slug: "pepper",
    name: "Pepper",
    gender: "unisex",
    origin: "english",
    meaning: "Spice. For a dog with opinions.",
    tags: ["food", "spicy"],
  },
  {
    slug: "moss",
    name: "Moss",
    gender: "unisex",
    origin: "english",
    meaning: "The plant. Quiet, green, unexpectedly handsome.",
    tags: ["nature", "short", "uncommon"],
  },
  {
    slug: "juniper",
    name: "Juniper",
    gender: "female",
    origin: "latin",
    meaning: "The evergreen shrub. Longer, still easy to chant.",
    tags: ["nature"],
  },
  {
    slug: "theo",
    name: "Theo",
    gender: "male",
    origin: "greek",
    meaning: "Gift of god, in short form. Friendly and current.",
    tags: ["popular", "short"],
  },
  {
    slug: "nova",
    name: "Nova",
    gender: "unisex",
    origin: "latin",
    meaning: "New star. Bright, modern, four letters.",
    tags: ["celestial", "short"],
  },
] as const satisfies readonly DogName[];

export function nameLength(name: string): NameLength {
  if (name.length <= 4) {
    return "short";
  }
  if (name.length <= 7) {
    return "medium";
  }
  return "long";
}

import { getBreed } from "./breeds.ts";

export function filterNames(
  names: readonly DogName[],
  query: NameQuery,
): readonly DogName[] {
  const needle = query.text.trim().toLowerCase();
  const breed = query.breed !== "all" ? getBreed(query.breed) : undefined;

  return names.filter((item) => {
    if (query.gender !== "all" && item.gender !== query.gender) {
      return false;
    }
    if (query.origin !== "all" && item.origin !== query.origin) {
      return false;
    }
    if (query.vibe !== "all" && !item.tags.includes(query.vibe)) {
      return false;
    }
    if (breed && !item.tags.some((tag) => breed.vibes.includes(tag))) {
      return false;
    }
    if (needle.length === 0) {
      return true;
    }

    return (
      item.name.toLowerCase().includes(needle) ||
      item.meaning.toLowerCase().includes(needle) ||
      item.tags.some((tag) => tag.toLowerCase().includes(needle))
    );
  });
}

export function pickRandomNames(
  names: readonly DogName[],
  count: number,
): readonly DogName[] {
  if (count <= 0 || names.length === 0) {
    return [];
  }
  const pool = [...names];
  const picks: DogName[] = [];
  const limit = Math.min(count, pool.length);
  while (picks.length < limit) {
    const index = Math.floor(Math.random() * pool.length);
    const [item] = pool.splice(index, 1);
    if (item) {
      picks.push(item);
    }
  }
  return picks;
}

export function originLabel(origin: Origin): string {
  return origin.charAt(0).toUpperCase() + origin.slice(1);
}

export function genderLabel(gender: Gender | "all"): string {
  if (gender === "all") {
    return "All";
  }
  return gender.charAt(0).toUpperCase() + gender.slice(1);
}

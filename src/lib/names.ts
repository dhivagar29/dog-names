export const GENDERS = ["female", "male", "unisex"] as const;
export type Gender = (typeof GENDERS)[number];

export const ORIGINS = [
  "english",
  "irish",
  "scottish",
  "welsh",
  "french",
  "spanish",
  "italian",
  "german",
  "norse",
  "greek",
  "latin",
  "hebrew",
  "arabic",
  "sanskrit",
  "japanese",
  "hawaiian",
  "swahili",
  "russian",
] as const;
export type Origin = (typeof ORIGINS)[number];

/** A single controlled vibe per name, so the vibe filter is never a grab bag. */
export const VIBES = [
  "classic",
  "playful",
  "bold",
  "gentle",
  "nature",
  "mythic",
  "foodie",
  "cosmic",
] as const;
export type Vibe = (typeof VIBES)[number];

export const LENGTHS = ["short", "medium", "long"] as const;
export type NameLength = (typeof LENGTHS)[number];

export const SORTS = ["az", "za", "shortest", "longest"] as const;
export type Sort = (typeof SORTS)[number];

export type DogName = {
  slug: string;
  name: string;
  gender: Gender;
  origin: Origin;
  vibe: Vibe;
  meaning: string;
  tags: readonly string[];
};

export type NameQuery = {
  text: string;
  gender: Gender | "all";
  origin: Origin | "all";
  vibe: Vibe | "all";
  length: NameLength | "all";
  sort: Sort;
};

export const EMPTY_QUERY: NameQuery = {
  text: "",
  gender: "all",
  origin: "all",
  vibe: "all",
  length: "all",
  sort: "az",
};

export const NAMES = [
  // English
  { slug: "maple", name: "Maple", gender: "unisex", origin: "english", vibe: "nature", meaning: "The maple tree. Warm on a red or golden coat.", tags: ["tree", "autumn"] },
  { slug: "bramble", name: "Bramble", gender: "unisex", origin: "english", vibe: "nature", meaning: "A wild blackberry thicket. For a scruffy explorer.", tags: ["thorny", "scruffy"] },
  { slug: "pippin", name: "Pippin", gender: "unisex", origin: "english", vibe: "playful", meaning: "A small dessert apple, and a Tolkien hobbit. Suits a compact, busy dog.", tags: ["apple", "literary"] },
  { slug: "hazel", name: "Hazel", gender: "female", origin: "english", vibe: "nature", meaning: "The nut tree, and the greenish-brown colour named after it.", tags: ["tree", "brown"] },
  { slug: "otter", name: "Otter", gender: "unisex", origin: "english", vibe: "playful", meaning: "The river-loving mammal. For a dog that cannot walk past a puddle.", tags: ["water", "animal"] },
  { slug: "sage", name: "Sage", gender: "unisex", origin: "english", vibe: "nature", meaning: "The kitchen herb, and an old word for a wise person. Calm energy.", tags: ["herb", "wise"] },
  { slug: "pepper", name: "Pepper", gender: "unisex", origin: "english", vibe: "foodie", meaning: "The spice. For a dog with opinions.", tags: ["spice", "speckled"] },
  { slug: "moss", name: "Moss", gender: "unisex", origin: "english", vibe: "nature", meaning: "The soft green plant of damp woods. Quiet and unexpectedly handsome.", tags: ["green", "quiet"] },
  { slug: "koda", name: "Koda", gender: "unisex", origin: "english", vibe: "bold", meaning: "A modern short name, usually clipped from Dakota. Sturdy sound.", tags: ["modern", "sturdy"] },
  { slug: "willow", name: "Willow", gender: "female", origin: "english", vibe: "nature", meaning: "The riverside tree with trailing branches. Gentle and flowing.", tags: ["tree", "water"] },
  { slug: "clover", name: "Clover", gender: "female", origin: "english", vibe: "nature", meaning: "The three-leaf meadow plant, long tied to luck.", tags: ["meadow", "luck"] },
  { slug: "fern", name: "Fern", gender: "female", origin: "english", vibe: "nature", meaning: "The shade-loving woodland plant. One syllable, soft landing.", tags: ["green", "plant"] },
  { slug: "ember", name: "Ember", gender: "unisex", origin: "english", vibe: "bold", meaning: "A coal still glowing after the fire dies down. Good on a ginger coat.", tags: ["fire", "ginger"] },
  { slug: "scout", name: "Scout", gender: "unisex", origin: "english", vibe: "bold", meaning: "One who goes ahead and looks around. Describes most dogs already.", tags: ["explorer", "working"] },
  { slug: "ranger", name: "Ranger", gender: "male", origin: "english", vibe: "bold", meaning: "A keeper of parkland and forest. Big-dog energy.", tags: ["forest", "working"] },
  { slug: "buddy", name: "Buddy", gender: "male", origin: "english", vibe: "classic", meaning: "A plain word for a friend. Nobody has ever mispronounced it.", tags: ["friend", "easy"] },
  { slug: "bear", name: "Bear", gender: "male", origin: "english", vibe: "bold", meaning: "The animal. Honest on a big shaggy dog, funnier on a tiny one.", tags: ["animal", "big"] },
  { slug: "duke", name: "Duke", gender: "male", origin: "english", vibe: "classic", meaning: "A noble title, from the Latin for leader. Carries across a field.", tags: ["title", "loud"] },
  { slug: "piper", name: "Piper", gender: "female", origin: "english", vibe: "playful", meaning: "Someone who plays the pipes. For a dog with a lot to say.", tags: ["music", "vocal"] },
  { slug: "winston", name: "Winston", gender: "male", origin: "english", vibe: "classic", meaning: "An English place name, roughly the settlement of a man called Wine.", tags: ["stately", "place"] },
  { slug: "poppy", name: "Poppy", gender: "female", origin: "english", vibe: "nature", meaning: "The bright red field flower. Two quick syllables that cut through wind.", tags: ["flower", "red"] },
  { slug: "daisy", name: "Daisy", gender: "female", origin: "english", vibe: "nature", meaning: "The flower, from day's eye, because it opens at dawn.", tags: ["flower", "white"] },
  { slug: "rusty", name: "Rusty", gender: "male", origin: "english", vibe: "playful", meaning: "Reddish-brown, the colour of old iron. For a copper coat.", tags: ["red", "coat"] },
  { slug: "shadow", name: "Shadow", gender: "unisex", origin: "english", vibe: "bold", meaning: "The dark shape that follows you everywhere. Often quite literal.", tags: ["black", "loyal"] },
  { slug: "wren", name: "Wren", gender: "female", origin: "english", vibe: "nature", meaning: "The tiny brown bird with an enormous voice.", tags: ["bird", "small"] },
  { slug: "birch", name: "Birch", gender: "unisex", origin: "english", vibe: "nature", meaning: "The pale-barked tree. Good on a white or silver coat.", tags: ["tree", "white"] },
  { slug: "cricket", name: "Cricket", gender: "female", origin: "english", vibe: "playful", meaning: "The chirping insect. For a small dog that never quite settles.", tags: ["insect", "small"] },
  { slug: "barley", name: "Barley", gender: "unisex", origin: "english", vibe: "nature", meaning: "The field grain. Warm, golden and farm-adjacent.", tags: ["grain", "golden"] },
  { slug: "digby", name: "Digby", gender: "male", origin: "english", vibe: "classic", meaning: "An English place name meaning the settlement by the ditch.", tags: ["place", "tweedy"] },
  { slug: "tucker", name: "Tucker", gender: "male", origin: "english", vibe: "playful", meaning: "An old job name for someone who finished woollen cloth.", tags: ["surname", "busy"] },
  { slug: "bailey", name: "Bailey", gender: "unisex", origin: "english", vibe: "classic", meaning: "The outer wall of a castle. Soft ending, easy recall.", tags: ["castle", "gentle"] },
  { slug: "harley", name: "Harley", gender: "unisex", origin: "english", vibe: "nature", meaning: "An English place name meaning hare meadow.", tags: ["meadow", "place"] },
  { slug: "skipper", name: "Skipper", gender: "male", origin: "english", vibe: "playful", meaning: "A boat's captain, and someone who skips. Relentlessly cheerful.", tags: ["sea", "cheerful"] },
  { slug: "ginger", name: "Ginger", gender: "female", origin: "english", vibe: "foodie", meaning: "The warm root spice, and the colour it lent to hair. Honest on a red coat.", tags: ["spice", "red"] },
  { slug: "honey", name: "Honey", gender: "female", origin: "english", vibe: "foodie", meaning: "What the bees make. Sweet without being cloying.", tags: ["sweet", "golden"] },
  { slug: "storm", name: "Storm", gender: "unisex", origin: "english", vibe: "nature", meaning: "Heavy weather. Suits a grey coat or a very fast dog.", tags: ["weather", "grey"] },
  { slug: "meadow", name: "Meadow", gender: "female", origin: "english", vibe: "nature", meaning: "Open grassland kept for hay. Wide, calm and green.", tags: ["field", "calm"] },
  { slug: "thistle", name: "Thistle", gender: "unisex", origin: "english", vibe: "nature", meaning: "The spiky purple flower. Prickly and pretty at the same time.", tags: ["flower", "prickly"] },
  { slug: "cedar", name: "Cedar", gender: "unisex", origin: "english", vibe: "nature", meaning: "The tall evergreen with fragrant wood.", tags: ["tree", "evergreen"] },
  { slug: "blue", name: "Blue", gender: "unisex", origin: "english", vibe: "classic", meaning: "The colour. A long-standing name for grey-coated hounds.", tags: ["colour", "hound"] },
  { slug: "sunny", name: "Sunny", gender: "unisex", origin: "english", vibe: "playful", meaning: "Full of sunshine. Sets expectations for the dog and the owner.", tags: ["sun", "cheerful"] },
  { slug: "peanut", name: "Peanut", gender: "unisex", origin: "english", vibe: "foodie", meaning: "The small legume. Best on a dog that stayed small.", tags: ["small", "snack"] },
  { slug: "biscuit", name: "Biscuit", gender: "unisex", origin: "english", vibe: "foodie", meaning: "The baked treat. Calling it doubles as a promise.", tags: ["treat", "golden"] },
  { slug: "chase", name: "Chase", gender: "male", origin: "english", vibe: "playful", meaning: "To run after something. From an old word for a hunting ground.", tags: ["fast", "run"] },
  { slug: "boomer", name: "Boomer", gender: "male", origin: "english", vibe: "bold", meaning: "One that booms. For a deep bark you hear two streets away.", tags: ["loud", "big"] },
  { slug: "pip", name: "Pip", gender: "unisex", origin: "english", vibe: "playful", meaning: "A small fruit seed. Three letters, instant recall.", tags: ["small", "seed"] },
  { slug: "teddy", name: "Teddy", gender: "male", origin: "english", vibe: "gentle", meaning: "Short for Theodore or Edward, and the stuffed bear. Very soft.", tags: ["soft", "bear"] },
  { slug: "nutmeg", name: "Nutmeg", gender: "female", origin: "english", vibe: "foodie", meaning: "The warm baking spice. Suits a brown coat.", tags: ["spice", "brown"] },

  // Irish
  { slug: "finn", name: "Finn", gender: "male", origin: "irish", vibe: "mythic", meaning: "Fair or bright, and the hero Fionn mac Cumhaill. One syllable that carries.", tags: ["hero", "bright"] },
  { slug: "niamh", name: "Niamh", gender: "female", origin: "irish", vibe: "mythic", meaning: "Radiance. Said neev, and people remember it once you tell them.", tags: ["bright", "legend"] },
  { slug: "rowan", name: "Rowan", gender: "unisex", origin: "irish", vibe: "nature", meaning: "The mountain ash, a tree planted for protection. Works on almost any coat.", tags: ["tree", "red"] },
  { slug: "bran", name: "Bran", gender: "male", origin: "irish", vibe: "mythic", meaning: "Raven. Also the name of Fionn's great hound in Irish legend.", tags: ["raven", "hound"] },
  { slug: "saoirse", name: "Saoirse", gender: "female", origin: "irish", vibe: "bold", meaning: "Freedom. Said seer-sha, which is worth the one-time explanation.", tags: ["freedom", "modern"] },
  { slug: "cara", name: "Cara", gender: "female", origin: "irish", vibe: "gentle", meaning: "Friend. Two open syllables, very easy to shout.", tags: ["friend", "soft"] },
  { slug: "murphy", name: "Murphy", gender: "male", origin: "irish", vibe: "playful", meaning: "A surname from Ó Murchadha, sea warrior. Cheerful on a big goof.", tags: ["surname", "sea"] },
  { slug: "shea", name: "Shea", gender: "unisex", origin: "irish", vibe: "gentle", meaning: "From Ó Séaghdha, usually read as stately or hawk-like.", tags: ["surname", "calm"] },
  { slug: "casey", name: "Casey", gender: "unisex", origin: "irish", vibe: "playful", meaning: "From cathasaigh, watchful. A friendly two-beat name.", tags: ["watchful", "friendly"] },
  { slug: "riley", name: "Riley", gender: "unisex", origin: "irish", vibe: "playful", meaning: "From Ó Raghallaigh, often read as valiant. Bouncy and easy.", tags: ["surname", "bouncy"] },
  { slug: "maeve", name: "Maeve", gender: "female", origin: "irish", vibe: "mythic", meaning: "The warrior queen of Connacht, from a root meaning intoxicating.", tags: ["queen", "legend"] },
  { slug: "quinn", name: "Quinn", gender: "unisex", origin: "irish", vibe: "bold", meaning: "From Ó Cuinn, descendant of the chief. Crisp and short.", tags: ["surname", "crisp"] },
  { slug: "darcy", name: "Darcy", gender: "unisex", origin: "irish", vibe: "classic", meaning: "The dark one, from an Irish and Norman surname.", tags: ["dark", "literary"] },
  { slug: "sully", name: "Sully", gender: "male", origin: "irish", vibe: "playful", meaning: "From Ó Súilleabháin, dark-eyed. Warm and a bit daft.", tags: ["surname", "warm"] },

  // Scottish
  { slug: "angus", name: "Angus", gender: "male", origin: "scottish", vibe: "classic", meaning: "From Aonghas, one strength. Steady and unhurried.", tags: ["sturdy", "highland"] },
  { slug: "bonnie", name: "Bonnie", gender: "female", origin: "scottish", vibe: "gentle", meaning: "Scots for pretty and cheerful. Rounded and kind to say.", tags: ["pretty", "warm"] },
  { slug: "skye", name: "Skye", gender: "female", origin: "scottish", vibe: "nature", meaning: "The Hebridean island. One clean syllable.", tags: ["island", "sky"] },
  { slug: "fergus", name: "Fergus", gender: "male", origin: "scottish", vibe: "classic", meaning: "Man of vigour. Old, solid and slightly comic in the best way.", tags: ["old", "sturdy"] },
  { slug: "isla", name: "Isla", gender: "female", origin: "scottish", vibe: "gentle", meaning: "The river Isla, and the isle of Islay. Said eye-la.", tags: ["river", "island"] },
  { slug: "callum", name: "Callum", gender: "male", origin: "scottish", vibe: "gentle", meaning: "Dove, from the Latin columba. Peaceful without being wet.", tags: ["dove", "calm"] },
  { slug: "lachlan", name: "Lachlan", gender: "male", origin: "scottish", vibe: "bold", meaning: "From the land of lochs, originally a name for Norse settlers.", tags: ["loch", "norse"] },
  { slug: "duncan", name: "Duncan", gender: "male", origin: "scottish", vibe: "classic", meaning: "Brown warrior, from Donnchadh. Suits a chocolate coat.", tags: ["brown", "warrior"] },
  { slug: "elsie", name: "Elsie", gender: "female", origin: "scottish", vibe: "classic", meaning: "A Scots pet form of Elizabeth. Old-fashioned in a good way.", tags: ["vintage", "sweet"] },
  { slug: "hamish", name: "Hamish", gender: "male", origin: "scottish", vibe: "classic", meaning: "The Scottish form of James. Sounds like a dog in a jumper.", tags: ["vintage", "cosy"] },
  { slug: "blair", name: "Blair", gender: "unisex", origin: "scottish", vibe: "nature", meaning: "A plain or field, from the Gaelic blàr.", tags: ["field", "place"] },
  { slug: "lassie", name: "Lassie", gender: "female", origin: "scottish", vibe: "classic", meaning: "Scots for a girl. Forever attached to one very famous collie.", tags: ["collie", "vintage"] },

  // Welsh
  { slug: "gwen", name: "Gwen", gender: "female", origin: "welsh", vibe: "gentle", meaning: "White, fair or blessed. Short and clean.", tags: ["white", "blessed"] },
  { slug: "dylan", name: "Dylan", gender: "male", origin: "welsh", vibe: "mythic", meaning: "Great tide, and a sea god of Welsh legend.", tags: ["sea", "legend"] },
  { slug: "bryn", name: "Bryn", gender: "unisex", origin: "welsh", vibe: "nature", meaning: "Hill. One syllable, no ambiguity, no nicknames needed.", tags: ["hill", "crisp"] },
  { slug: "rhys", name: "Rhys", gender: "male", origin: "welsh", vibe: "bold", meaning: "Ardour or enthusiasm. Said reece.", tags: ["keen", "crisp"] },
  { slug: "morgan", name: "Morgan", gender: "unisex", origin: "welsh", vibe: "mythic", meaning: "Sea-born. Also carries a lot of Arthurian baggage, pleasantly.", tags: ["sea", "legend"] },
  { slug: "idris", name: "Idris", gender: "male", origin: "welsh", vibe: "bold", meaning: "Ardent lord, and a giant of Welsh legend who watched the stars.", tags: ["giant", "legend"] },
  { slug: "nia", name: "Nia", gender: "female", origin: "welsh", vibe: "gentle", meaning: "The Welsh form of Niamh, brightness. Three letters, two syllables.", tags: ["bright", "short"] },
  { slug: "arthur", name: "Arthur", gender: "male", origin: "welsh", vibe: "mythic", meaning: "The legendary king, from a root often linked to the word for bear.", tags: ["king", "bear"] },
  { slug: "winnie", name: "Winnie", gender: "female", origin: "welsh", vibe: "playful", meaning: "From Gwenhwyfar and Winifred, blessed peacemaking. Cheerful.", tags: ["cheerful", "vintage"] },
  { slug: "eira", name: "Eira", gender: "female", origin: "welsh", vibe: "nature", meaning: "Snow. A quiet fit for a white coat.", tags: ["snow", "white"] },
  { slug: "tegan", name: "Tegan", gender: "female", origin: "welsh", vibe: "gentle", meaning: "Fair and lovely, from teg.", tags: ["fair", "soft"] },

  // French
  { slug: "coco", name: "Coco", gender: "unisex", origin: "french", vibe: "playful", meaning: "A French pet name, and a nod to cocoa. Still works on a grown dog.", tags: ["sweet", "chic"] },
  { slug: "remy", name: "Remy", gender: "unisex", origin: "french", vibe: "classic", meaning: "From Rémi, an oarsman. Light, kitchen-adjacent, still grown-up.", tags: ["chic", "short"] },
  { slug: "cosette", name: "Cosette", gender: "female", origin: "french", vibe: "gentle", meaning: "Little thing, from Les Misérables. Better on a small companion.", tags: ["literary", "small"] },
  { slug: "beau", name: "Beau", gender: "male", origin: "french", vibe: "classic", meaning: "Handsome. One syllable, and the dog will live up to it.", tags: ["handsome", "short"] },
  { slug: "belle", name: "Belle", gender: "female", origin: "french", vibe: "gentle", meaning: "Beautiful. Rings like a bell across a field.", tags: ["beautiful", "soft"] },
  { slug: "bijou", name: "Bijou", gender: "female", origin: "french", vibe: "playful", meaning: "Jewel. Traditionally used for something small and precious.", tags: ["jewel", "small"] },
  { slug: "fleur", name: "Fleur", gender: "female", origin: "french", vibe: "nature", meaning: "Flower. Short, breathy and a little grand.", tags: ["flower", "chic"] },
  { slug: "marcel", name: "Marcel", gender: "male", origin: "french", vibe: "classic", meaning: "Little warrior, the French form of the Roman Marcellus.", tags: ["warrior", "chic"] },
  { slug: "jolie", name: "Jolie", gender: "female", origin: "french", vibe: "playful", meaning: "Pretty. Said zho-lee, and it lifts at the end.", tags: ["pretty", "bright"] },
  { slug: "brie", name: "Brie", gender: "female", origin: "french", vibe: "foodie", meaning: "The soft cheese, named after the region east of Paris.", tags: ["cheese", "short"] },
  { slug: "sable", name: "Sable", gender: "unisex", origin: "french", vibe: "bold", meaning: "Black in heraldry, from the fur of the marten. Made for a dark coat.", tags: ["black", "coat"] },
  { slug: "gigi", name: "Gigi", gender: "female", origin: "french", vibe: "playful", meaning: "A French pet form of names like Georgine. Bouncy and repeatable.", tags: ["bouncy", "short"] },
  { slug: "rue", name: "Rue", gender: "female", origin: "french", vibe: "nature", meaning: "The bitter garden herb, and the French word for street.", tags: ["herb", "short"] },
  { slug: "chance", name: "Chance", gender: "male", origin: "french", vibe: "bold", meaning: "Luck, from the old French for a falling of the dice.", tags: ["luck", "rescue"] },
  { slug: "noir", name: "Noir", gender: "male", origin: "french", vibe: "bold", meaning: "Black. Blunt, stylish, and honest about the coat.", tags: ["black", "short"] },

  // Spanish
  { slug: "rio", name: "Rio", gender: "unisex", origin: "spanish", vibe: "nature", meaning: "River. Three letters and a lot of energy.", tags: ["water", "short"] },
  { slug: "paloma", name: "Paloma", gender: "female", origin: "spanish", vibe: "gentle", meaning: "Dove. Soft in the middle, easy to land on.", tags: ["dove", "white"] },
  { slug: "bonita", name: "Bonita", gender: "female", origin: "spanish", vibe: "gentle", meaning: "Pretty. Three syllables that stay bright at the end.", tags: ["pretty", "warm"] },
  { slug: "chico", name: "Chico", gender: "male", origin: "spanish", vibe: "playful", meaning: "Small boy, or lad. Traditional for a little dog with a big attitude.", tags: ["small", "cheeky"] },
  { slug: "sierra", name: "Sierra", gender: "female", origin: "spanish", vibe: "nature", meaning: "A saw-toothed mountain range.", tags: ["mountain", "outdoors"] },
  { slug: "mesa", name: "Mesa", gender: "female", origin: "spanish", vibe: "nature", meaning: "Table, and the flat-topped hills named for the shape.", tags: ["desert", "short"] },
  { slug: "diego", name: "Diego", gender: "male", origin: "spanish", vibe: "classic", meaning: "The Spanish form of James. Warm and rhythmic.", tags: ["classic", "warm"] },
  { slug: "lola", name: "Lola", gender: "female", origin: "spanish", vibe: "playful", meaning: "A pet form of Dolores. Two beats, impossible to mumble.", tags: ["bouncy", "short"] },
  { slug: "vida", name: "Vida", gender: "female", origin: "spanish", vibe: "gentle", meaning: "Life. Short, warm and a little bit of a statement.", tags: ["life", "short"] },
  { slug: "sol", name: "Sol", gender: "unisex", origin: "spanish", vibe: "cosmic", meaning: "Sun. Three letters, and it cuts through noise.", tags: ["sun", "short"] },
  { slug: "oso", name: "Oso", gender: "male", origin: "spanish", vibe: "bold", meaning: "Bear. Best used with full commitment on a very large dog.", tags: ["bear", "big"] },
  { slug: "canela", name: "Canela", gender: "female", origin: "spanish", vibe: "foodie", meaning: "Cinnamon. A common coat description turned into a name.", tags: ["spice", "brown"] },
  { slug: "estrella", name: "Estrella", gender: "female", origin: "spanish", vibe: "cosmic", meaning: "Star. Long, but it shortens neatly to Estre or Stella.", tags: ["star", "long"] },
  { slug: "nieve", name: "Nieve", gender: "female", origin: "spanish", vibe: "nature", meaning: "Snow. Said nyeh-veh, and it suits a white coat.", tags: ["snow", "white"] },

  // Italian
  { slug: "bella", name: "Bella", gender: "female", origin: "italian", vibe: "classic", meaning: "Beautiful. Common for a reason: it is impossible to say badly.", tags: ["beautiful", "easy"] },
  { slug: "gia", name: "Gia", gender: "female", origin: "italian", vibe: "playful", meaning: "Short for Giovanna. Two quick syllables, said jee-ah.", tags: ["short", "bright"] },
  { slug: "enzo", name: "Enzo", gender: "male", origin: "italian", vibe: "bold", meaning: "Short for Lorenzo or Vincenzo. Ends on a buzz you can hold.", tags: ["short", "sharp"] },
  { slug: "nero", name: "Nero", gender: "male", origin: "italian", vibe: "bold", meaning: "Black. A traditional Italian name for a dark working dog.", tags: ["black", "working"] },
  { slug: "dante", name: "Dante", gender: "male", origin: "italian", vibe: "classic", meaning: "From Durante, enduring. Carries the poet with it.", tags: ["literary", "steady"] },
  { slug: "luca", name: "Luca", gender: "male", origin: "italian", vibe: "classic", meaning: "From Lucania, and tied to the Latin for light.", tags: ["light", "easy"] },
  { slug: "rocco", name: "Rocco", gender: "male", origin: "italian", vibe: "bold", meaning: "An Italian saint's name with a Germanic root meaning rest.", tags: ["sturdy", "short"] },
  { slug: "gemma", name: "Gemma", gender: "female", origin: "italian", vibe: "gentle", meaning: "Gem. Soft double m, easy on the ear.", tags: ["jewel", "soft"] },
  { slug: "vito", name: "Vito", gender: "male", origin: "italian", vibe: "classic", meaning: "From the Latin vita, life.", tags: ["life", "short"] },
  { slug: "bandit", name: "Bandit", gender: "male", origin: "italian", vibe: "playful", meaning: "From bandito, an outlaw. For a dog that steals socks.", tags: ["mischief", "mask"] },
  { slug: "marco", name: "Marco", gender: "male", origin: "italian", vibe: "classic", meaning: "Of Mars, the Italian form of Marcus.", tags: ["classic", "warm"] },
  { slug: "piccolo", name: "Piccolo", gender: "male", origin: "italian", vibe: "playful", meaning: "Small, and the little flute. Funniest on a huge dog.", tags: ["small", "music"] },

  // German
  { slug: "bruno", name: "Bruno", gender: "male", origin: "german", vibe: "classic", meaning: "Brown. An old Germanic name that suits a brown dog exactly.", tags: ["brown", "sturdy"] },
  { slug: "fritz", name: "Fritz", gender: "male", origin: "german", vibe: "playful", meaning: "A pet form of Friedrich, peaceful ruler. Snappy to call.", tags: ["short", "sharp"] },
  { slug: "heidi", name: "Heidi", gender: "female", origin: "german", vibe: "classic", meaning: "From Adelheid, noble kind. Alpine and cheerful.", tags: ["alpine", "vintage"] },
  { slug: "otto", name: "Otto", gender: "male", origin: "german", vibe: "classic", meaning: "Wealth or fortune. A palindrome, which is quietly satisfying.", tags: ["short", "sturdy"] },
  { slug: "greta", name: "Greta", gender: "female", origin: "german", vibe: "classic", meaning: "From Margareta, pearl. Crisp start, soft finish.", tags: ["pearl", "vintage"] },
  { slug: "kaiser", name: "Kaiser", gender: "male", origin: "german", vibe: "bold", meaning: "Emperor, from Caesar. For a dog that already thinks so.", tags: ["ruler", "big"] },
  { slug: "matilda", name: "Matilda", gender: "female", origin: "german", vibe: "classic", meaning: "Mighty in battle. Shortens to Tilly on lazy days.", tags: ["strong", "vintage"] },
  { slug: "frida", name: "Frida", gender: "female", origin: "german", vibe: "gentle", meaning: "Peace, from the root frid.", tags: ["peace", "short"] },
  { slug: "hans", name: "Hans", gender: "male", origin: "german", vibe: "classic", meaning: "A short form of Johannes. Blunt and friendly.", tags: ["short", "plain"] },
  { slug: "elsa", name: "Elsa", gender: "female", origin: "german", vibe: "gentle", meaning: "A short form of Elisabeth. Clean vowels, carries well.", tags: ["short", "clear"] },
  { slug: "adler", name: "Adler", gender: "male", origin: "german", vibe: "bold", meaning: "Eagle. Sharp and a bit severe, in a good way.", tags: ["bird", "sharp"] },
  { slug: "ludwig", name: "Ludwig", gender: "male", origin: "german", vibe: "classic", meaning: "Famous warrior. Grand enough to be funny on a small dog.", tags: ["grand", "warrior"] },

  // Norse
  { slug: "freya", name: "Freya", gender: "female", origin: "norse", vibe: "mythic", meaning: "The Norse goddess of love and war. Soft start, bright ending.", tags: ["goddess", "legend"] },
  { slug: "odin", name: "Odin", gender: "male", origin: "norse", vibe: "mythic", meaning: "The all-father of Norse myth. Best on a serious-faced dog.", tags: ["god", "legend"] },
  { slug: "thor", name: "Thor", gender: "male", origin: "norse", vibe: "mythic", meaning: "The thunder god. One syllable, and it lands like one.", tags: ["thunder", "god"] },
  { slug: "loki", name: "Loki", gender: "male", origin: "norse", vibe: "mythic", meaning: "The Norse trickster. Set expectations accordingly.", tags: ["trickster", "mischief"] },
  { slug: "saga", name: "Saga", gender: "female", origin: "norse", vibe: "mythic", meaning: "A Norse goddess of stories, and the word for a long tale.", tags: ["story", "short"] },
  { slug: "bjorn", name: "Bjorn", gender: "male", origin: "norse", vibe: "bold", meaning: "Bear. Said byorn, and it fits a broad chest.", tags: ["bear", "big"] },
  { slug: "runa", name: "Runa", gender: "female", origin: "norse", vibe: "mythic", meaning: "Secret lore, from the same root as rune.", tags: ["rune", "quiet"] },
  { slug: "sif", name: "Sif", gender: "female", origin: "norse", vibe: "mythic", meaning: "Thor's golden-haired wife. Three letters for a golden coat.", tags: ["golden", "goddess"] },
  { slug: "fenrir", name: "Fenrir", gender: "male", origin: "norse", vibe: "mythic", meaning: "The great wolf of Norse myth. A lot of name for a lot of dog.", tags: ["wolf", "legend"] },
  { slug: "astrid", name: "Astrid", gender: "female", origin: "norse", vibe: "classic", meaning: "Divinely beautiful, from áss and fríðr.", tags: ["divine", "nordic"] },
  { slug: "ragnar", name: "Ragnar", gender: "male", origin: "norse", vibe: "bold", meaning: "Warrior of judgement. Rolls out with real weight.", tags: ["warrior", "nordic"] },
  { slug: "ulf", name: "Ulf", gender: "male", origin: "norse", vibe: "bold", meaning: "Wolf. Three letters, no decoration.", tags: ["wolf", "short"] },
  { slug: "eir", name: "Eir", gender: "female", origin: "norse", vibe: "gentle", meaning: "The Norse goddess of healing and mercy. Said air.", tags: ["healing", "short"] },
  { slug: "embla", name: "Embla", gender: "female", origin: "norse", vibe: "mythic", meaning: "The first woman in Norse myth, shaped from a tree.", tags: ["tree", "legend"] },

  // Greek
  { slug: "indigo", name: "Indigo", gender: "unisex", origin: "greek", vibe: "bold", meaning: "The deep blue dye, from indikon, meaning from India.", tags: ["blue", "colour"] },
  { slug: "cleo", name: "Cleo", gender: "female", origin: "greek", vibe: "classic", meaning: "Short for Cleopatra, glory. Four letters with a little drama.", tags: ["glory", "short"] },
  { slug: "atlas", name: "Atlas", gender: "male", origin: "greek", vibe: "mythic", meaning: "The titan who holds up the sky. For a big, steady dog.", tags: ["titan", "big"] },
  { slug: "theo", name: "Theo", gender: "male", origin: "greek", vibe: "classic", meaning: "Short for Theodore, gift of god. Friendly and current.", tags: ["gift", "short"] },
  { slug: "zeus", name: "Zeus", gender: "male", origin: "greek", vibe: "mythic", meaning: "King of the Greek gods. Says everything in one syllable.", tags: ["god", "loud"] },
  { slug: "nike", name: "Nike", gender: "female", origin: "greek", vibe: "mythic", meaning: "The goddess of victory. Said nee-kay if you want to be proper.", tags: ["victory", "goddess"] },
  { slug: "phoebe", name: "Phoebe", gender: "female", origin: "greek", vibe: "cosmic", meaning: "Bright and radiant, a titan linked with the moon.", tags: ["bright", "moon"] },
  { slug: "hera", name: "Hera", gender: "female", origin: "greek", vibe: "mythic", meaning: "Queen of the Greek gods. Short, and not to be argued with.", tags: ["queen", "goddess"] },
  { slug: "apollo", name: "Apollo", gender: "male", origin: "greek", vibe: "mythic", meaning: "The god of light, music and archery.", tags: ["god", "light"] },
  { slug: "iris", name: "Iris", gender: "female", origin: "greek", vibe: "cosmic", meaning: "Rainbow, and the messenger goddess who travelled along one.", tags: ["rainbow", "colour"] },
  { slug: "orion", name: "Orion", gender: "male", origin: "greek", vibe: "cosmic", meaning: "The hunter of myth, now the easiest constellation to find.", tags: ["stars", "hunter"] },
  { slug: "basil", name: "Basil", gender: "male", origin: "greek", vibe: "foodie", meaning: "From basileus, royal. Also the herb, which is the fun part.", tags: ["herb", "royal"] },
  { slug: "zephyr", name: "Zephyr", gender: "unisex", origin: "greek", vibe: "nature", meaning: "The west wind. For a dog that arrives before you hear it.", tags: ["wind", "fast"] },
  { slug: "argos", name: "Argos", gender: "male", origin: "greek", vibe: "mythic", meaning: "Odysseus's dog, who waited twenty years and knew him at once.", tags: ["loyal", "literary"] },
  { slug: "comet", name: "Comet", gender: "unisex", origin: "greek", vibe: "cosmic", meaning: "From kometes, long-haired star. Fits a fast dog or a fluffy tail.", tags: ["stars", "fast"] },
  { slug: "sofia", name: "Sofia", gender: "female", origin: "greek", vibe: "classic", meaning: "Wisdom. Familiar everywhere, and still lovely to say.", tags: ["wisdom", "warm"] },
  { slug: "maggie", name: "Maggie", gender: "female", origin: "greek", vibe: "classic", meaning: "From Margaret, pearl. Hard g, very easy to yell.", tags: ["pearl", "loud"] },

  // Latin
  { slug: "luna", name: "Luna", gender: "female", origin: "latin", vibe: "cosmic", meaning: "Moon. Soft, and easy to call across a park.", tags: ["moon", "night"] },
  { slug: "milo", name: "Milo", gender: "male", origin: "latin", vibe: "playful", meaning: "Read as soldier, or as merciful. A compact name with bounce.", tags: ["short", "bouncy"] },
  { slug: "nimbus", name: "Nimbus", gender: "unisex", origin: "latin", vibe: "nature", meaning: "Rain cloud. Good for a fluffy or grey dog.", tags: ["cloud", "grey"] },
  { slug: "olive", name: "Olive", gender: "female", origin: "latin", vibe: "nature", meaning: "The olive tree, and its colour. Quiet, green, easy to love.", tags: ["tree", "green"] },
  { slug: "felix", name: "Felix", gender: "male", origin: "latin", vibe: "classic", meaning: "Lucky and happy. A good mouth-feel when you call it.", tags: ["luck", "bright"] },
  { slug: "juniper", name: "Juniper", gender: "female", origin: "latin", vibe: "nature", meaning: "The evergreen shrub behind gin. Longer, still easy to chant.", tags: ["tree", "berry"] },
  { slug: "nova", name: "Nova", gender: "unisex", origin: "latin", vibe: "cosmic", meaning: "New, and the star that suddenly brightens. Four letters.", tags: ["star", "bright"] },
  { slug: "ursa", name: "Ursa", gender: "female", origin: "latin", vibe: "cosmic", meaning: "She-bear, and the two bear constellations.", tags: ["bear", "stars"] },
  { slug: "rex", name: "Rex", gender: "male", origin: "latin", vibe: "classic", meaning: "King. The old reliable, and it still cuts through a park.", tags: ["king", "loud"] },
  { slug: "cato", name: "Cato", gender: "male", origin: "latin", vibe: "classic", meaning: "A Roman family name tied to shrewdness.", tags: ["roman", "short"] },
  { slug: "stella", name: "Stella", gender: "female", origin: "latin", vibe: "cosmic", meaning: "Star. Two syllables that hold at the end.", tags: ["star", "clear"] },
  { slug: "aurora", name: "Aurora", gender: "female", origin: "latin", vibe: "cosmic", meaning: "Dawn, and the goddess of it. Also the northern lights.", tags: ["dawn", "light"] },
  { slug: "clementine", name: "Clementine", gender: "female", origin: "latin", vibe: "foodie", meaning: "From clemens, merciful. Also the small sweet orange.", tags: ["fruit", "sweet"] },
  { slug: "rufus", name: "Rufus", gender: "male", origin: "latin", vibe: "classic", meaning: "Red-haired. A Roman nickname that is still accurate.", tags: ["red", "roman"] },
  { slug: "leo", name: "Leo", gender: "male", origin: "latin", vibe: "bold", meaning: "Lion. Three letters, and it never sounds silly.", tags: ["lion", "short"] },
  { slug: "mars", name: "Mars", gender: "male", origin: "latin", vibe: "cosmic", meaning: "The Roman god of war, and the red planet.", tags: ["planet", "red"] },
  { slug: "vita", name: "Vita", gender: "female", origin: "latin", vibe: "gentle", meaning: "Life. Short, bright and a little literary.", tags: ["life", "short"] },
  { slug: "juno", name: "Juno", gender: "female", origin: "latin", vibe: "mythic", meaning: "The Roman queen of the gods. Two firm syllables.", tags: ["queen", "goddess"] },

  // Hebrew
  { slug: "aria", name: "Aria", gender: "female", origin: "hebrew", vibe: "gentle", meaning: "Lioness, from ariel. In Italian it also means a melody.", tags: ["lion", "music"] },
  { slug: "levi", name: "Levi", gender: "male", origin: "hebrew", vibe: "classic", meaning: "Joined or attached. Soft consonants, easy for daily use.", tags: ["classic", "soft"] },
  { slug: "ari", name: "Ari", gender: "male", origin: "hebrew", vibe: "bold", meaning: "Lion. Three letters, and it rises at the end.", tags: ["lion", "short"] },
  { slug: "asher", name: "Asher", gender: "male", origin: "hebrew", vibe: "gentle", meaning: "Happy or blessed. Ends on a soft sound, which reads as friendly.", tags: ["happy", "warm"] },
  { slug: "eli", name: "Eli", gender: "male", origin: "hebrew", vibe: "classic", meaning: "Ascended, or my god. Two open syllables that travel far.", tags: ["short", "clear"] },
  { slug: "noa", name: "Noa", gender: "female", origin: "hebrew", vibe: "gentle", meaning: "Motion. Distinct from Noah, and softer to say.", tags: ["short", "soft"] },
  { slug: "zev", name: "Zev", gender: "male", origin: "hebrew", vibe: "bold", meaning: "Wolf. Sharp on both ends, hard to mishear.", tags: ["wolf", "short"] },
  { slug: "talia", name: "Talia", gender: "female", origin: "hebrew", vibe: "nature", meaning: "Dew from heaven. Light and unhurried.", tags: ["dew", "soft"] },
  { slug: "sadie", name: "Sadie", gender: "female", origin: "hebrew", vibe: "classic", meaning: "A pet form of Sarah, princess. Homely and warm.", tags: ["vintage", "warm"] },
  { slug: "micah", name: "Micah", gender: "unisex", origin: "hebrew", vibe: "classic", meaning: "Who is like god. Ends with a breath, which suits a calm dog.", tags: ["calm", "classic"] },
  { slug: "shiloh", name: "Shiloh", gender: "unisex", origin: "hebrew", vibe: "gentle", meaning: "A place name usually read as tranquil.", tags: ["calm", "place"] },
  { slug: "jonah", name: "Jonah", gender: "male", origin: "hebrew", vibe: "classic", meaning: "Dove. Two syllables with a quiet landing.", tags: ["dove", "calm"] },

  // Arabic
  { slug: "amir", name: "Amir", gender: "male", origin: "arabic", vibe: "bold", meaning: "Prince or commander. Clean stress on the second syllable.", tags: ["prince", "clear"] },
  { slug: "layla", name: "Layla", gender: "female", origin: "arabic", vibe: "gentle", meaning: "Night. Made for a black coat, and the song does not hurt.", tags: ["night", "black"] },
  { slug: "zara", name: "Zara", gender: "female", origin: "arabic", vibe: "bold", meaning: "Radiance, or blooming. Starts with a buzz and stays bright.", tags: ["bright", "short"] },
  { slug: "sahara", name: "Sahara", gender: "female", origin: "arabic", vibe: "nature", meaning: "From sahra, desert. Golden and wide open.", tags: ["desert", "golden"] },
  { slug: "nour", name: "Nour", gender: "unisex", origin: "arabic", vibe: "gentle", meaning: "Light. One syllable, warm and round.", tags: ["light", "short"] },
  { slug: "rafi", name: "Rafi", gender: "male", origin: "arabic", vibe: "playful", meaning: "Exalted, or high. Quick and friendly to call.", tags: ["short", "bright"] },
  { slug: "jamil", name: "Jamil", gender: "male", origin: "arabic", vibe: "classic", meaning: "Beautiful. Handsome without being soft.", tags: ["beautiful", "clear"] },
  { slug: "karim", name: "Karim", gender: "male", origin: "arabic", vibe: "gentle", meaning: "Generous and noble. A kind thing to call a dog every day.", tags: ["generous", "warm"] },
  { slug: "aziz", name: "Aziz", gender: "male", origin: "arabic", vibe: "bold", meaning: "Beloved, and also mighty. Two z sounds that carry.", tags: ["beloved", "sharp"] },
  { slug: "malik", name: "Malik", gender: "male", origin: "arabic", vibe: "bold", meaning: "King. Firm ending, no ambiguity.", tags: ["king", "clear"] },
  { slug: "qamar", name: "Qamar", gender: "unisex", origin: "arabic", vibe: "cosmic", meaning: "Moon. A rarer moon name if Luna is taken on your street.", tags: ["moon", "night"] },
  { slug: "salma", name: "Salma", gender: "female", origin: "arabic", vibe: "gentle", meaning: "Safe and peaceful, from the root of salam.", tags: ["peace", "calm"] },

  // Sanskrit
  { slug: "nala", name: "Nala", gender: "female", origin: "sanskrit", vibe: "gentle", meaning: "A stem or hollow reed, and a hero of the Mahabharata.", tags: ["reed", "short"] },
  { slug: "ravi", name: "Ravi", gender: "male", origin: "sanskrit", vibe: "cosmic", meaning: "Sun. Warm, short and easy for kids to say.", tags: ["sun", "warm"] },
  { slug: "deva", name: "Deva", gender: "unisex", origin: "sanskrit", vibe: "gentle", meaning: "Divine, or heavenly. Open vowels that carry.", tags: ["divine", "short"] },
  { slug: "neel", name: "Neel", gender: "male", origin: "sanskrit", vibe: "bold", meaning: "Blue. One long syllable, very easy to shout.", tags: ["blue", "short"] },
  { slug: "asha", name: "Asha", gender: "female", origin: "sanskrit", vibe: "gentle", meaning: "Hope or wish. Ends on a breath, which reads as calm.", tags: ["hope", "calm"] },
  { slug: "veda", name: "Veda", gender: "female", origin: "sanskrit", vibe: "classic", meaning: "Knowledge. Crisp and unusual without being difficult.", tags: ["wisdom", "short"] },
  { slug: "arjun", name: "Arjun", gender: "male", origin: "sanskrit", vibe: "mythic", meaning: "Bright or silver, and the great archer of the Mahabharata.", tags: ["archer", "bright"] },
  { slug: "chandra", name: "Chandra", gender: "unisex", origin: "sanskrit", vibe: "cosmic", meaning: "Moon. Longer, with a nice roll in the middle.", tags: ["moon", "night"] },
  { slug: "maya", name: "Maya", gender: "female", origin: "sanskrit", vibe: "classic", meaning: "Illusion, in the sense of the world as it appears.", tags: ["classic", "soft"] },
  { slug: "anand", name: "Anand", gender: "male", origin: "sanskrit", vibe: "gentle", meaning: "Bliss or joy. A cheerful thing to say fifty times a day.", tags: ["joy", "warm"] },
  { slug: "tara", name: "Tara", gender: "female", origin: "sanskrit", vibe: "cosmic", meaning: "Star. Also an Irish hill, which is a happy accident.", tags: ["star", "short"] },
  { slug: "rohan", name: "Rohan", gender: "male", origin: "sanskrit", vibe: "bold", meaning: "Ascending, or growing. Two clean syllables.", tags: ["rising", "clear"] },
  { slug: "kiran", name: "Kiran", gender: "unisex", origin: "sanskrit", vibe: "cosmic", meaning: "A ray of light. Sharp start, soft finish.", tags: ["light", "bright"] },

  // Japanese
  { slug: "suki", name: "Suki", gender: "female", origin: "japanese", vibe: "gentle", meaning: "From suki, liked or beloved. Two syllables, easy recall.", tags: ["beloved", "short"] },
  { slug: "yuki", name: "Yuki", gender: "unisex", origin: "japanese", vibe: "nature", meaning: "Snow. A natural fit for a white coat.", tags: ["snow", "white"] },
  { slug: "akira", name: "Akira", gender: "unisex", origin: "japanese", vibe: "bold", meaning: "Bright or clear. Crisp consonants for outdoor recall.", tags: ["bright", "clear"] },
  { slug: "hana", name: "Hana", gender: "female", origin: "japanese", vibe: "nature", meaning: "Flower. Two open syllables that travel well.", tags: ["flower", "short"] },
  { slug: "kuma", name: "Kuma", gender: "male", origin: "japanese", vibe: "bold", meaning: "Bear. Short, blunt and affectionate.", tags: ["bear", "big"] },
  { slug: "sora", name: "Sora", gender: "unisex", origin: "japanese", vibe: "cosmic", meaning: "Sky. Light on the tongue, and it lifts.", tags: ["sky", "short"] },
  { slug: "momo", name: "Momo", gender: "female", origin: "japanese", vibe: "foodie", meaning: "Peach. Repeating syllables are very easy for a puppy to learn.", tags: ["fruit", "sweet"] },
  { slug: "taro", name: "Taro", gender: "male", origin: "japanese", vibe: "classic", meaning: "Eldest son. A traditional, unfussy name.", tags: ["classic", "short"] },
  { slug: "hoshi", name: "Hoshi", gender: "unisex", origin: "japanese", vibe: "cosmic", meaning: "Star. Soft in the middle, bright at the end.", tags: ["star", "night"] },
  { slug: "kiba", name: "Kiba", gender: "male", origin: "japanese", vibe: "bold", meaning: "Fang. Honest about the puppy phase.", tags: ["fang", "sharp"] },
  { slug: "ren", name: "Ren", gender: "unisex", origin: "japanese", vibe: "nature", meaning: "Lotus. One syllable, nothing wasted.", tags: ["flower", "short"] },
  { slug: "nori", name: "Nori", gender: "unisex", origin: "japanese", vibe: "foodie", meaning: "The seaweed sheet, and separately a word for rule or law.", tags: ["food", "short"] },
  { slug: "mochi", name: "Mochi", gender: "unisex", origin: "japanese", vibe: "foodie", meaning: "The soft pounded rice cake. For a round, squishy dog.", tags: ["food", "soft"] },
  { slug: "shiro", name: "Shiro", gender: "male", origin: "japanese", vibe: "classic", meaning: "White. A long-standing Japanese name for a white dog.", tags: ["white", "coat"] },
  { slug: "aki", name: "Aki", gender: "unisex", origin: "japanese", vibe: "nature", meaning: "Autumn, or bright, depending on the writing.", tags: ["autumn", "short"] },
  { slug: "kaze", name: "Kaze", gender: "unisex", origin: "japanese", vibe: "nature", meaning: "Wind. Said ka-zeh, and it suits a sprinter.", tags: ["wind", "fast"] },

  // Hawaiian
  { slug: "kona", name: "Kona", gender: "unisex", origin: "hawaiian", vibe: "nature", meaning: "The leeward side of an island, and the district on Hawaii.", tags: ["island", "place"] },
  { slug: "koa", name: "Koa", gender: "male", origin: "hawaiian", vibe: "bold", meaning: "Brave warrior, and the hardwood tree named for the same strength.", tags: ["brave", "tree"] },
  { slug: "nalu", name: "Nalu", gender: "unisex", origin: "hawaiian", vibe: "nature", meaning: "Wave. For a dog that runs at the sea.", tags: ["wave", "water"] },
  { slug: "leilani", name: "Leilani", gender: "female", origin: "hawaiian", vibe: "gentle", meaning: "Heavenly flower, or royal child.", tags: ["flower", "long"] },
  { slug: "kai", name: "Kai", gender: "unisex", origin: "hawaiian", vibe: "nature", meaning: "Sea. Three letters, and it cuts through wind beautifully.", tags: ["sea", "short"] },
  { slug: "mano", name: "Mano", gender: "male", origin: "hawaiian", vibe: "bold", meaning: "Shark. Blunt, and funny on a dog that steals food.", tags: ["sea", "bold"] },
  { slug: "hoku", name: "Hoku", gender: "unisex", origin: "hawaiian", vibe: "cosmic", meaning: "Star, and specifically the night of the full moon.", tags: ["star", "night"] },
  { slug: "lani", name: "Lani", gender: "female", origin: "hawaiian", vibe: "cosmic", meaning: "Sky or heaven. Soft, light and short.", tags: ["sky", "soft"] },
  { slug: "makani", name: "Makani", gender: "unisex", origin: "hawaiian", vibe: "nature", meaning: "Wind. Three syllables with a good rhythm.", tags: ["wind", "fast"] },
  { slug: "pua", name: "Pua", gender: "female", origin: "hawaiian", vibe: "nature", meaning: "Flower, or blossom. Two syllables, very quick to say.", tags: ["flower", "short"] },
  { slug: "moana", name: "Moana", gender: "female", origin: "hawaiian", vibe: "nature", meaning: "Ocean, or wide open sea.", tags: ["sea", "wide"] },
  { slug: "ono", name: "Ono", gender: "unisex", origin: "hawaiian", vibe: "foodie", meaning: "Delicious. What the dog thinks about almost everything.", tags: ["food", "short"] },

  // Swahili
  { slug: "simba", name: "Simba", gender: "male", origin: "swahili", vibe: "bold", meaning: "Lion. A big claim that most dogs are happy to make.", tags: ["lion", "big"] },
  { slug: "zuri", name: "Zuri", gender: "female", origin: "swahili", vibe: "gentle", meaning: "Beautiful. Bright buzz at the start, soft landing.", tags: ["beautiful", "short"] },
  { slug: "twiga", name: "Twiga", gender: "unisex", origin: "swahili", vibe: "playful", meaning: "Giraffe. For a leggy dog that has not grown into itself.", tags: ["animal", "leggy"] },
  { slug: "rafiki", name: "Rafiki", gender: "male", origin: "swahili", vibe: "gentle", meaning: "Friend. Three syllables and a genuinely nice thing to shout.", tags: ["friend", "warm"] },
  { slug: "neema", name: "Neema", gender: "female", origin: "swahili", vibe: "gentle", meaning: "Grace, or good fortune.", tags: ["grace", "calm"] },
  { slug: "imani", name: "Imani", gender: "unisex", origin: "swahili", vibe: "gentle", meaning: "Faith. Even stress, easy to say twice.", tags: ["faith", "calm"] },
  { slug: "jabari", name: "Jabari", gender: "male", origin: "swahili", vibe: "bold", meaning: "Brave. Strong middle syllable to lean on when calling.", tags: ["brave", "strong"] },
  { slug: "chui", name: "Chui", gender: "male", origin: "swahili", vibe: "bold", meaning: "Leopard. Suits a spotted or dappled coat.", tags: ["spotted", "cat"] },
  { slug: "asali", name: "Asali", gender: "female", origin: "swahili", vibe: "foodie", meaning: "Honey. Golden, and softer than it looks on the page.", tags: ["sweet", "golden"] },
  { slug: "bahari", name: "Bahari", gender: "unisex", origin: "swahili", vibe: "nature", meaning: "Sea or ocean.", tags: ["sea", "water"] },
  { slug: "furaha", name: "Furaha", gender: "female", origin: "swahili", vibe: "playful", meaning: "Joy. Long, but the middle syllable does all the work.", tags: ["joy", "long"] },
  { slug: "tembo", name: "Tembo", gender: "male", origin: "swahili", vibe: "bold", meaning: "Elephant. Reserve it for a dog with real presence.", tags: ["animal", "big"] },

  // Russian
  { slug: "sasha", name: "Sasha", gender: "unisex", origin: "russian", vibe: "classic", meaning: "A pet form of Alexander and Alexandra, used for anyone.", tags: ["classic", "soft"] },
  { slug: "misha", name: "Misha", gender: "male", origin: "russian", vibe: "gentle", meaning: "A pet form of Mikhail, and an affectionate word for a bear.", tags: ["bear", "warm"] },
  { slug: "nika", name: "Nika", gender: "female", origin: "russian", vibe: "bold", meaning: "Victory, from the Greek. Short and sharp.", tags: ["victory", "short"] },
  { slug: "boris", name: "Boris", gender: "male", origin: "russian", vibe: "classic", meaning: "An old Slavic ruler's name, usually tied to a root meaning fight.", tags: ["sturdy", "old"] },
  { slug: "vlad", name: "Vlad", gender: "male", origin: "russian", vibe: "bold", meaning: "Short for Vladimir, great ruler. One blunt syllable.", tags: ["ruler", "short"] },
  { slug: "laika", name: "Laika", gender: "female", origin: "russian", vibe: "classic", meaning: "From layat, to bark. Also the stray who orbited Earth in 1957.", tags: ["bark", "space"] },
  { slug: "zima", name: "Zima", gender: "female", origin: "russian", vibe: "nature", meaning: "Winter. Cool, short and a good fit for a pale coat.", tags: ["winter", "white"] },
  { slug: "vera", name: "Vera", gender: "female", origin: "russian", vibe: "classic", meaning: "Faith. Also the Latin for true, which is a nice overlap.", tags: ["faith", "clear"] },
  { slug: "anya", name: "Anya", gender: "female", origin: "russian", vibe: "gentle", meaning: "A pet form of Anna. Soft, quick and warm.", tags: ["soft", "short"] },
  { slug: "yuri", name: "Yuri", gender: "male", origin: "russian", vibe: "classic", meaning: "The Russian form of George, the farmer or earth-worker.", tags: ["classic", "short"] },
  { slug: "dasha", name: "Dasha", gender: "female", origin: "russian", vibe: "playful", meaning: "A pet form of Darya. Ends on a breath, which suits a fast dog.", tags: ["quick", "soft"] },
  { slug: "kolya", name: "Kolya", gender: "male", origin: "russian", vibe: "gentle", meaning: "A pet form of Nikolai. Rounded and homely.", tags: ["warm", "short"] },

  // Longer names, kept together so the Long filter has real depth.
  { slug: "marmalade", name: "Marmalade", gender: "unisex", origin: "english", vibe: "foodie", meaning: "The bitter orange preserve. Built for a loud ginger dog.", tags: ["orange", "sweet"] },
  { slug: "blueberry", name: "Blueberry", gender: "female", origin: "english", vibe: "foodie", meaning: "The small dark berry. Suits a blue-grey coat and a sweet temper.", tags: ["berry", "blue"] },
  { slug: "buttercup", name: "Buttercup", gender: "female", origin: "english", vibe: "nature", meaning: "The glossy yellow meadow flower children hold under your chin.", tags: ["flower", "yellow"] },
  { slug: "primrose", name: "Primrose", gender: "female", origin: "english", vibe: "nature", meaning: "The pale flower that opens first in spring.", tags: ["flower", "spring"] },
  { slug: "magnolia", name: "Magnolia", gender: "female", origin: "english", vibe: "nature", meaning: "The tree with enormous blooms that arrive before the leaves.", tags: ["tree", "flower"] },
  { slug: "cinnamon", name: "Cinnamon", gender: "female", origin: "english", vibe: "foodie", meaning: "The bark spice. An honest description of a warm brown coat.", tags: ["spice", "brown"] },
  { slug: "bluebell", name: "Bluebell", gender: "female", origin: "english", vibe: "nature", meaning: "The woodland flower that carpets English woods in May.", tags: ["flower", "blue"] },
  { slug: "dandelion", name: "Dandelion", gender: "unisex", origin: "english", vibe: "nature", meaning: "The bright yellow weed, from dent de lion, lion's tooth.", tags: ["flower", "yellow"] },
  { slug: "hawthorn", name: "Hawthorn", gender: "unisex", origin: "english", vibe: "nature", meaning: "The hedge tree with white blossom and hard red berries.", tags: ["tree", "hedge"] },
  { slug: "chamomile", name: "Chamomile", gender: "female", origin: "english", vibe: "nature", meaning: "The daisy-like herb brewed for calm. Wishful thinking on a puppy.", tags: ["herb", "calm"] },
  { slug: "rosemary", name: "Rosemary", gender: "female", origin: "latin", vibe: "nature", meaning: "The evergreen herb, from ros marinus, dew of the sea.", tags: ["herb", "sea"] },
  { slug: "peregrine", name: "Peregrine", gender: "male", origin: "latin", vibe: "bold", meaning: "Traveller or pilgrim, and the fastest bird in a dive.", tags: ["falcon", "fast"] },
  { slug: "bellatrix", name: "Bellatrix", gender: "female", origin: "latin", vibe: "cosmic", meaning: "Female warrior, and the bright star on Orion's shoulder.", tags: ["star", "warrior"] },
  { slug: "aurelius", name: "Aurelius", gender: "male", origin: "latin", vibe: "classic", meaning: "Golden, from a Roman family name.", tags: ["golden", "roman"] },
  { slug: "persephone", name: "Persephone", gender: "female", origin: "greek", vibe: "mythic", meaning: "Queen of the underworld, who comes back up every spring.", tags: ["goddess", "spring"] },
  { slug: "aphrodite", name: "Aphrodite", gender: "female", origin: "greek", vibe: "mythic", meaning: "The goddess of love, born out of sea foam.", tags: ["goddess", "sea"] },
  { slug: "cassiopeia", name: "Cassiopeia", gender: "female", origin: "greek", vibe: "cosmic", meaning: "The boastful queen, now a W of five stars in the north sky.", tags: ["stars", "queen"] },
  { slug: "hyacinth", name: "Hyacinth", gender: "unisex", origin: "greek", vibe: "nature", meaning: "The heavily scented spring flower, and the youth of the myth.", tags: ["flower", "spring"] },
  { slug: "valkyrie", name: "Valkyrie", gender: "female", origin: "norse", vibe: "mythic", meaning: "Chooser of the slain, who carried warriors to Valhalla.", tags: ["legend", "warrior"] },
  { slug: "yggdrasil", name: "Yggdrasil", gender: "male", origin: "norse", vibe: "mythic", meaning: "The world tree that holds the nine realms together. Shortens to Yggy.", tags: ["tree", "legend"] },
  { slug: "wolfgang", name: "Wolfgang", gender: "male", origin: "german", vibe: "bold", meaning: "Wolf path. Grand on paper, and it shortens to Wolf.", tags: ["wolf", "grand"] },
  { slug: "wilhelmina", name: "Wilhelmina", gender: "female", origin: "german", vibe: "classic", meaning: "Resolute protector. Shortens to Willa or Mina.", tags: ["strong", "vintage"] },
  { slug: "guinevere", name: "Guinevere", gender: "female", origin: "welsh", vibe: "mythic", meaning: "From Gwenhwyfar, white phantom. Arthur's queen.", tags: ["queen", "legend"] },
  { slug: "llewellyn", name: "Llewellyn", gender: "male", origin: "welsh", vibe: "bold", meaning: "A Welsh princely name, usually read as lion-like.", tags: ["lion", "prince"] },
  { slug: "papillon", name: "Papillon", gender: "unisex", origin: "french", vibe: "playful", meaning: "Butterfly, and the toy breed named for its ears.", tags: ["butterfly", "breed"] },
  { slug: "croissant", name: "Croissant", gender: "unisex", origin: "french", vibe: "foodie", meaning: "Crescent, and the pastry folded into that shape.", tags: ["pastry", "crescent"] },
  { slug: "amandine", name: "Amandine", gender: "female", origin: "french", vibe: "foodie", meaning: "Almond, in the French kitchen sense.", tags: ["almond", "sweet"] },
  { slug: "mariposa", name: "Mariposa", gender: "female", origin: "spanish", vibe: "nature", meaning: "Butterfly. Four syllables, and every one of them lands.", tags: ["butterfly", "bright"] },
  { slug: "aventura", name: "Aventura", gender: "unisex", origin: "spanish", vibe: "bold", meaning: "Adventure. A statement of intent on day one.", tags: ["adventure", "bold"] },
  { slug: "chiquita", name: "Chiquita", gender: "female", origin: "spanish", vibe: "gentle", meaning: "Little one. Affectionate, and best on a dog that stays small.", tags: ["small", "warm"] },
  { slug: "serafina", name: "Serafina", gender: "female", origin: "italian", vibe: "gentle", meaning: "From the seraphim, the burning ones. Softer than that sounds.", tags: ["angel", "warm"] },
  { slug: "valentina", name: "Valentina", gender: "female", origin: "italian", vibe: "classic", meaning: "Strong and healthy, from the Latin valens.", tags: ["strong", "warm"] },
  { slug: "chandrika", name: "Chandrika", gender: "female", origin: "sanskrit", vibe: "cosmic", meaning: "Moonlight. Made for a silver or pale grey coat.", tags: ["moon", "light"] },
  { slug: "himalaya", name: "Himalaya", gender: "male", origin: "sanskrit", vibe: "nature", meaning: "Abode of snow, and the mountains named for it.", tags: ["snow", "mountain"] },
  { slug: "nathaniel", name: "Nathaniel", gender: "male", origin: "hebrew", vibe: "classic", meaning: "Gift of god. Shortens to Nate or Nat on a wet walk.", tags: ["gift", "classic"] },
  { slug: "momotaro", name: "Momotaro", gender: "male", origin: "japanese", vibe: "mythic", meaning: "The peach boy of Japanese folklore, who travelled with a dog.", tags: ["folklore", "peach"] },
  { slug: "hokulani", name: "Hokulani", gender: "unisex", origin: "hawaiian", vibe: "cosmic", meaning: "Heavenly star. Long on paper, easy in the mouth.", tags: ["star", "sky"] },
  { slug: "anastasia", name: "Anastasia", gender: "female", origin: "russian", vibe: "classic", meaning: "Resurrection, from the Greek. Shortens to Nastya or Stasia.", tags: ["classic", "grand"] },
  { slug: "svetlana", name: "Svetlana", gender: "female", origin: "russian", vibe: "gentle", meaning: "Light, from the Slavic svet.", tags: ["light", "warm"] },
  { slug: "fionnuala", name: "Fionnuala", gender: "female", origin: "irish", vibe: "mythic", meaning: "Fair shoulder, and the swan-daughter of Irish legend. Shortens to Nola.", tags: ["legend", "swan"] },
] as const satisfies readonly DogName[];

/** Buckets a name by letter count: 4 or fewer is short, 5 to 7 medium, 8 or more long. */
export function nameLength(name: string): NameLength {
  if (name.length <= 4) {
    return "short";
  }
  if (name.length <= 7) {
    return "medium";
  }
  return "long";
}

export function matchesText(item: DogName, needle: string): boolean {
  if (needle.length === 0) {
    return true;
  }
  return (
    item.name.toLowerCase().includes(needle) ||
    item.meaning.toLowerCase().includes(needle) ||
    item.origin.includes(needle) ||
    item.vibe.includes(needle) ||
    item.tags.some((tag) => tag.toLowerCase().includes(needle))
  );
}

export function filterNames(
  names: readonly DogName[],
  query: NameQuery,
): readonly DogName[] {
  const needle = query.text.trim().toLowerCase();

  return names.filter((item) => {
    if (query.gender !== "all" && item.gender !== query.gender) {
      return false;
    }
    if (query.origin !== "all" && item.origin !== query.origin) {
      return false;
    }
    if (query.vibe !== "all" && item.vibe !== query.vibe) {
      return false;
    }
    if (query.length !== "all" && nameLength(item.name) !== query.length) {
      return false;
    }
    return matchesText(item, needle);
  });
}

export function sortNames(
  names: readonly DogName[],
  sort: Sort,
): readonly DogName[] {
  const byName = (a: DogName, b: DogName) => a.name.localeCompare(b.name);
  const sorted = [...names];

  switch (sort) {
    case "za":
      return sorted.sort((a, b) => byName(b, a));
    case "shortest":
      return sorted.sort(
        (a, b) => a.name.length - b.name.length || byName(a, b),
      );
    case "longest":
      return sorted.sort(
        (a, b) => b.name.length - a.name.length || byName(a, b),
      );
    default:
      return sorted.sort(byName);
  }
}

/** Filter then sort. This is what the browse grid renders. */
export function queryNames(
  names: readonly DogName[],
  query: NameQuery,
): readonly DogName[] {
  return sortNames(filterNames(names, query), query.sort);
}

export function isFiltered(query: NameQuery): boolean {
  return (
    query.text.trim().length > 0 ||
    query.gender !== "all" ||
    query.origin !== "all" ||
    query.vibe !== "all" ||
    query.length !== "all"
  );
}

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function originLabel(origin: Origin | "all"): string {
  return origin === "all" ? "All origins" : titleCase(origin);
}

export function genderLabel(gender: Gender | "all"): string {
  return gender === "all" ? "Any" : titleCase(gender);
}

export function vibeLabel(vibe: Vibe | "all"): string {
  return vibe === "all" ? "Any vibe" : titleCase(vibe);
}

export function lengthLabel(length: NameLength | "all"): string {
  switch (length) {
    case "short":
      return "Short (1-4)";
    case "medium":
      return "Medium (5-7)";
    case "long":
      return "Long (8+)";
    default:
      return "Any length";
  }
}

export function sortLabel(sort: Sort): string {
  switch (sort) {
    case "za":
      return "Z to A";
    case "shortest":
      return "Shortest first";
    case "longest":
      return "Longest first";
    default:
      return "A to Z";
  }
}

/** Real counts, computed from the catalog. Nothing here is a popularity figure. */
export function countBy<Key extends string>(
  names: readonly DogName[],
  pick: (item: DogName) => Key,
): Record<Key, number> {
  const counts = {} as Record<Key, number>;
  for (const item of names) {
    const key = pick(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

export function findName(
  names: readonly DogName[],
  slug: string,
): DogName | undefined {
  return names.find((item) => item.slug === slug);
}

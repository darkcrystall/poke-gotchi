import { accentColors } from "../palette/accentColors";
import { backgroundColors } from "../palette/backgroundColors";
import { IStarterConfig } from "../types/game";

export const starters: IStarterConfig[] = [
  // Normal
  {
    label: "Sentret",
    species: "sentret",
    accent: accentColors.normal,
    background: backgroundColors.normal,
    evolutions: [{ name: "furret", minLevel: 15 }],
  },

  // Fire
  {
    label: "Charmander",
    species: "charmander",
    accent: accentColors.fire,
    background: backgroundColors.fire,
    evolutions: [
      { name: "charmeleon", minLevel: 16 },
      { name: "charizard", minLevel: 36 },
    ],
  },

  // Water
  {
    label: "Squirtle",
    species: "squirtle",
    accent: accentColors.water,
    background: backgroundColors.water,
    evolutions: [
      { name: "wartortle", minLevel: 16 },
      { name: "blastoise", minLevel: 36 },
    ],
  },

  // Electric
  {
    label: "Pikachu",
    species: "pikachu",
    accent: accentColors.electric,
    background: backgroundColors.electric,
    evolutions: [{ name: "raichu", minLevel: 20 }],
  },

  // Grass
  {
    label: "Bulbasaur",
    species: "bulbasaur",
    accent: accentColors.grass,
    background: backgroundColors.grass,
    evolutions: [
      { name: "ivysaur", minLevel: 16 },
      { name: "venusaur", minLevel: 32 },
    ],
  },

  // Ice
  {
    label: "Swinub",
    species: "swinub",
    accent: accentColors.ice,
    background: backgroundColors.ice,
    evolutions: [
      { name: "piloswine", minLevel: 33 },
      { name: "mamoswine", minLevel: 40 },
    ],
  },

  // Fighting
  {
    label: "Machop",
    species: "machop",
    accent: accentColors.fighting,
    background: backgroundColors.fighting,
    evolutions: [
      { name: "machoke", minLevel: 28 },
      { name: "machamp", minLevel: 40 },
    ],
  },

  // Poison
  {
    label: "Ekans",
    species: "ekans",
    accent: accentColors.poison,
    background: backgroundColors.poison,
    evolutions: [{ name: "arbok", minLevel: 22 }],
  },

  // Ground
  {
    label: "Sandshrew",
    species: "sandshrew",
    accent: accentColors.ground,
    background: backgroundColors.ground,
    evolutions: [{ name: "sandslash", minLevel: 22 }],
  },

  // Flying
  {
    label: "Rookidee",
    species: "rookidee",
    accent: accentColors.flying,
    background: backgroundColors.flying,
    evolutions: [
      { name: "corvisquire", minLevel: 18 },
      { name: "corviknight", minLevel: 38 },
    ],
  },

  // Psychic
  {
    label: "Abra",
    species: "abra",
    accent: accentColors.psychic,
    background: backgroundColors.psychic,
    evolutions: [
      { name: "kadabra", minLevel: 16 },
      { name: "alakazam", minLevel: 40 },
    ],
  },

  // Bug
  {
    label: "Caterpie",
    species: "caterpie",
    accent: accentColors.bug,
    background: backgroundColors.bug,
    evolutions: [
      { name: "metapod", minLevel: 7 },
      { name: "butterfree", minLevel: 10 },
    ],
  },

  // Rock
  {
    label: "Geodude",
    species: "geodude",
    accent: accentColors.rock,
    background: backgroundColors.rock,
    evolutions: [
      { name: "graveler", minLevel: 25 },
      { name: "golem", minLevel: 40 },
    ],
  },

  // Ghost
  {
    label: "Gastly",
    species: "gastly",
    accent: accentColors.ghost,
    background: backgroundColors.ghost,
    evolutions: [
      { name: "haunter", minLevel: 25 },
      { name: "gengar", minLevel: 40 },
    ],
  },

  // Dragon
  {
    label: "Dratini",
    species: "dratini",
    accent: accentColors.dragon,
    background: backgroundColors.dragon,
    evolutions: [
      { name: "dragonair", minLevel: 30 },
      { name: "dragonite", minLevel: 55 },
    ],
  },

  // Dark
  {
    label: "Poochyena",
    species: "poochyena",
    accent: accentColors.dark,
    background: backgroundColors.dark,
    evolutions: [{ name: "mightyena", minLevel: 18 }],
  },

  // Steel
  {
    label: "Aron",
    species: "aron",
    accent: accentColors.steel,
    background: backgroundColors.steel,
    evolutions: [
      { name: "lairon", minLevel: 32 },
      { name: "aggron", minLevel: 42 },
    ],
  },

  // Fairy
  {
    label: "Togepi",
    species: "togepi",
    accent: accentColors.fairy,
    background: backgroundColors.fairy,
    evolutions: [
      { name: "togetic", minLevel: 20 },
      { name: "togekiss", minLevel: 35 },
    ],
  },
];

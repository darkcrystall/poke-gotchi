import { accentColors } from "../palette/accentColors";
import { backgroundColors } from "../palette/backgroundColors";
import { colors } from "../palette/colors";
import { IStarterConfig } from "../types/game";

export const starters: IStarterConfig[] = [
  {
    label: "Bulbasaur",
    species: "bulbasaur",
    accent: accentColors.bulbasaur,
    background: backgroundColors.bulbasaur,
    evolutions: [
      { name: "ivysaur", minLevel: 16 },
      { name: "venusaur", minLevel: 32 },
    ],
  },
  {
    label: "Charmander",
    species: "charmander",
    accent: accentColors.charmander,
    background: backgroundColors.charmander,
    evolutions: [
      { name: "charmeleon", minLevel: 16 },
      { name: "charizard", minLevel: 36 },
    ],
  },
  {
    label: "Squirtle",
    species: "squirtle",
    accent: accentColors.squirtle,
    background: backgroundColors.squirtle,
    evolutions: [
      { name: "wartortle", minLevel: 16 },
      { name: "blastoise", minLevel: 36 },
    ],
  },
];
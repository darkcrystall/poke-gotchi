import { colors } from "../palette/colors";
import { IStarterConfig } from "../types/IStarterConfig";

export const starters: IStarterConfig[] = [
  {
    label: "Bulbasaur",
    species: "bulbasaur",
    accent: "#49A86E",
    background: colors.primary,
    evolutions: [
      { name: "ivysaur", minLevel: 16 },
      { name: "venusaur", minLevel: 32 },
    ],
  },
  {
    label: "Charmander",
    species: "charmander",
    accent: "#F07D43",
    background: colors.primary,
    evolutions: [
      { name: "charmeleon", minLevel: 16 },
      { name: "charizard", minLevel: 36 },
    ],
  },
  {
    label: "Squirtle",
    species: "squirtle",
    accent: "#4A92D6",
    background: colors.primary,
    evolutions: [
      { name: "wartortle", minLevel: 16 },
      { name: "blastoise", minLevel: 36 },
    ],
  },
];
import { MD3LightTheme } from "react-native-paper";

import { colors } from "./colors";

export const theme = {
  ...MD3LightTheme,
  roundness: 12,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
  },
};
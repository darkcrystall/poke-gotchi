import React from 'react';
import { StyleSheet } from 'react-native';
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './palette/colors';

export const theme = {
  ...MD3LightTheme,
  roundness: 4,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
  },
};

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView>

        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

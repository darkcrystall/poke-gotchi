import { useState } from "react";
import { PaperProvider } from "react-native-paper";
import { theme } from "./src/palette/theme";
import GamePage from "./src/pages/GamePage";
import { IStarterConfig } from "./src/types/game";
import { SelectStarterPage } from "./src/pages/SelectStarterPage";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

export default function App() {
  const [starter, setStarter] = useState<IStarterConfig | null>(null);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView>
          {starter ? (
            <GamePage
              starter={starter}
              onChangeStarter={() => setStarter(null)}
            />
          ) : (
            <ScrollView>
              <SelectStarterPage onChooseStarter={setStarter} />
            </ScrollView>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

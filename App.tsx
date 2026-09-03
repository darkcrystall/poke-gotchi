import { useState } from "react";
import { PaperProvider } from "react-native-paper";
import { theme } from "./src/palette/theme";
import GamePage from "./src/pages/GamePage";
import { IStarterConfig } from "./src/types/game";
import { SelectStarterPage } from "./src/pages/SelectStarterPage";

export default function App() {
  const [starter, setStarter] = useState<IStarterConfig | null>(null);

  return (
    <PaperProvider theme={theme}>
      {starter ? (
        <GamePage
          starter={starter}
          onChangeStarter={() => setStarter(null)}
        />
      ) : (
        <SelectStarterPage
          onChooseStarter={setStarter}
        />
      )}
    </PaperProvider>
  );
}
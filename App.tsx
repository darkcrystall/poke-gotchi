import { useState } from "react";
import { ScrollView } from "react-native";
import { PaperProvider } from "react-native-paper";

import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import { theme } from "./src/palette/theme";
import GamePage from "./src/pages/GamePage";
import { SelectStarterPage } from "./src/pages/SelectStarterPage";
import { IStarterConfig } from "./src/types/game";

export default function App() {
  // Já existia:
  // Guarda o Pokémon escolhido pelo jogador
  const [starter, setStarter] =
    useState<IStarterConfig | null>(null);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>

        {/*  ALTERADO:
            Adicionado flex: 1 para o SafeAreaView
            ocupar toda a tela do celular. */}
        <SafeAreaView style={{ flex: 1 }}>

          {/* Já existia:
              Se o jogador já escolheu um Pokémon,
              mostra a GamePage. */}
          {starter ? (
            <GamePage
              starter={starter}

              /* Já existia:
                  Ao clicar em "Trocar", volta para
                  a tela de escolha. */
              onChangeStarter={() => setStarter(null)}
            />

          ) : (

            // Já existia:
            // Enquanto nenhum Pokémon foi escolhido,
            // mostra a tela de seleção.
            <ScrollView>
              <SelectStarterPage
                onChooseStarter={setStarter}
              />
            </ScrollView>
          )}

        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
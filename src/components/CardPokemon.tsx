import { Image, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { IPokemonViewModel, IStarterConfig } from "../types/game";
import { capitalize, getTypeColor } from "../utils/pokemon";
import { colors } from "../palette/colors";

interface CardPokemonProps {
  pokemon: IPokemonViewModel;
  starter: IStarterConfig;

  // para usar no game
  level?: number;
  experience?: number;

  // para usar na seleção
  onChoose?: () => void;
}

export const CardPokemon = ({
  pokemon,
  starter,
  level,
  experience,
  onChoose,
}: CardPokemonProps) => {
  const textColor = starter.accent;
  return (
    <Card
      style={[
        styles.card,
        {
          borderColor: starter.accent,
          backgroundColor: starter.background,
        },
      ]}
    >
      <Card.Content>
        <Card.Cover style={styles.image} source={{ uri: pokemon.image }} />
        <Text
          variant="headlineLarge"
          style={[styles.name, { color: textColor }]}
        >
          {capitalize(pokemon.name)}
        </Text>

        <Text
          variant="headlineSmall"
          style={[styles.name, { color: getTypeColor(pokemon.type) }]}
        >
          {capitalize(pokemon.type)}
        </Text>

        <Text style={styles.info}>#{pokemon.id}</Text>

        <Text style={styles.info}>Altura: {pokemon.height} m</Text>

        <Text style={styles.info}>Peso: {pokemon.weight} kg</Text>

        {/* essas informações só aparecem no game */}
        {level !== undefined && <Text style={styles.info}>Nível: {level}</Text>}

        {experience !== undefined && (
          <Text style={styles.info}>XP: {experience}/100</Text>
        )}

        {/* o botão só aparece quando onChoose for passado */}
        {onChoose && (
          <Button mode="contained" onPress={onChoose} style={styles.button}>
            Escolher
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    borderWidth: 3,
  },

  image: {
    width: 130,
    height: 160,
    alignSelf: "center",
  },

  name: {
    textAlign: "center",
    marginTop: 8,
  },

  info: {
    textAlign: "center",
    marginTop: 4,
    color: colors.textSecondary,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },

  button: {
    marginTop: 12,
    backgroundColor: colors.secondary,
    fontWeight: "900",
  },
});

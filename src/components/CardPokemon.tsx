import { Image, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { IPokemonViewModel } from "../types/game";
import { capitalize, getTypeColor } from "../utils/pokemon";

interface CardPokemonProps {
  pokemon: IPokemonViewModel;

  // para usar no game
  level?: number;
  experience?: number;

  // para usar na seleção
  onChoose?: () => void;
}

export const CardPokemon = ({
  pokemon,
  level,
  experience,
  onChoose,
}: CardPokemonProps) => {
  return (
    <Card
      style={[
        styles.card,
        {
          borderColor: getTypeColor(pokemon.type),
        },
      ]}
    >
      <Card.Content>
        <Image source={{ uri: pokemon.image }} style={styles.image} />

        <Text variant="headlineSmall" style={styles.name}>
          {capitalize(pokemon.name)}
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
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    borderWidth: 3,
  },

  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },

  name: {
    textAlign: "center",
    marginTop: 8,
  },

  info: {
    textAlign: "center",
    marginTop: 4,
  },

  button: {
    marginTop: 12,
  },
});
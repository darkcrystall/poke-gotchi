import { StyleSheet } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";

interface CardProps {
  nome: string;
  imagem: string;
  numero?: number;
  tipo: string;
  nivel?: string;
  experiencia?: number;
}

const CardPokemon = ({
  nome,
  imagem,
  numero,
  tipo,
  nivel,
  experiencia
}: CardProps) => {
  return (
    <Card mode="contained">
      <Card.Title title={nome}></Card.Title>
      <Card.Cover source={{uri: imagem}}/>
      <Card.Content>
        <Text variant="labelSmall">{tipo}</Text>
        <Text variant="labelSmall">{nivel}</Text>
        <Text variant="labelSmall">{experiencia}</Text>
        <Text variant="labelSmall">{numero}</Text>
      </Card.Content>
    </Card>
  );
};

export default CardPokemon;

const styles = StyleSheet.create({});

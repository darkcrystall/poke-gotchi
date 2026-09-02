import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { IPokemonViewModel } from "../types/IPokemonViewModel";
import CardPokemon from "./CardPokemon";

const ListPokemon = () => {
    const [pokemons, setPokemons] = useState<IPokemonViewModel[]>([]);
  return (
    <View>
      <FlatList data={pokemons} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => <CardPokemon nome={item.name} imagem={item.image} tipo={item.type}></CardPokemon>}/>
    </View>
  );
};

export default ListPokemon;

const styles = StyleSheet.create({});

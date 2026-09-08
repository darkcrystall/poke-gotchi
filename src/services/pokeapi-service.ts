
import { IPokemonViewModel } from "../types/game";
const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemon(
  name: string
): Promise<IPokemonViewModel> {


  const response = await fetch(
    `${BASE_URL}/pokemon/${name.toLowerCase().trim()}`
  );

  if (!response.ok) {
    throw new Error(
      `Erro ao buscar Pokémon: ${response.statusText}`
    );
  }
  // permitindo acessar os dados do Pokémon.
  const data = await response.json();

  // Retorna somente as informações que o nosso jogo precisa.
  return {
    // Número do Pokémon na Pokédex
    id: data.id,
    // Nome do Pokémon
    name: data.name,
    // Imagem oficial do Pokémon
    image:
     data.sprites.versions["generation-v"]["black-white"].animated.front_default,
    // Pega o primeiro tipo do Pokémon
    type: data.types[0].type.name,
    // A API fornece altura em decímetros.
    height: data.height / 10,
    weight: data.weight / 10,
  };
}
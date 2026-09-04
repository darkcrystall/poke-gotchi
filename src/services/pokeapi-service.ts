import { IPokemonViewModel } from "../types/game";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemon(name: string): Promise<IPokemonViewModel> {
  const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase().trim()}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar Pokémon: ${response.statusText}`);
  }
  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other["showdown"].front_default, // pegar imagem animada (gif), antes pegavamos pela chave "official-artwork"
    type: data.types[0].type.name, // pegar o primeiro tipo
    height: data.height / 10, // decímetros para metros
    weight: data.weight / 10, // hectogramas para kg
  };
}

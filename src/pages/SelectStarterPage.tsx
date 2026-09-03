import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";

// lista dos pokemons iniciais
import { starters } from "../data/starters";

// tipos utilizados
import { IPokemonViewModel, IStarterConfig } from "../types/game";

// função responsável por buscar os dados
import { getPokemon } from "../services/pokeapi-service";
import { CardPokemon } from "../components/CardPokemon";

// define as propriedades que o componente recebe
interface SelectStarterPageProps {
  // função chamada quando o jogador escolhe
  onChooseStarter: (starter: IStarterConfig) => void;
}

// página de escolha (inicial)

export function SelectStarterPage({ onChooseStarter }: SelectStarterPageProps) {
  // armazena os dados dos pokemons
  // o objeto utiliza o nome do pokémon como chave
  //
  // {
  //   bulbasaur: { ...dados do Bulbasaur... },
  //   charmander: { ...dados do Charmander... }
  // }
  // Record serve pra tipar objetos assim <chave, valor>
  // aqui nossa chave é string e o valor é nossa interface
  const [pokemon, setPokemon] = useState<Record<string, IPokemonViewModel>>({});

  // indica se os dados ainda estão sendo carregados
  const [loading, setLoading] = useState(true);

  // executa o carregamento dos pokemons
  useEffect(() => {
    // função assíncrona que busca os dados dos pokémon iniciais
    async function loadStarters() {
      try {
        // faz as requisições para todos os pokemons ao mesmo tempo
        //
        // starters contém os que podem ser escolhidos
        // para cada um deles, a gente vai usar getPokemon para buscar os dados e mostrar
        //
        // Promise.all espera todas as requisições terminarem antes de continuar (porque temos tres pokemons)
        const results = await Promise.all(
          starters.map((starter) => getPokemon(starter.species)),
        );

        // cria um objeto vazio que irá armazenar os dados deles
        const pokemonMap: Record<string, IPokemonViewModel> = {};

        // percorre os resultados obtidos
        results.forEach((pokemon) => {
          // armazena cada um usando seu nome como chave.
          //
          // isso permite posteriormente acessar os dados usando:
          // pokemon[starter.species]
          pokemonMap[pokemon.name] = pokemon;
        });

        // salva os dados obtidos no estado
        setPokemon(pokemonMap);
      } catch (error) {
        // caso alguma requisição falhe
        console.error("Erro ao carregar pokémon: ", error);
      } finally {
        // mesmo com sucesso ou erro, tira do estado de carregar
        setLoading(false);
      }
    }

    // executa a função responsável por carregar
    loadStarters();

    // o array vazio significa que o efeito será executao apenas uma vez, quando o componente for montado
  }, []);

  // enquanto os dados estão sendo carregados, exibe um icone padrao de "carregando"
  if (loading) {
    return <ActivityIndicator></ActivityIndicator>;
  }

  return (
    <View style={{ padding: 16 }}>
      <Text variant="headlineMedium">Escolha seu Pokémon</Text>

      {/* percorre todos os pokemons */}
      {starters.map((starter) => {
        // obtém os dados correspondentes ao pokemon atual
        //
        // starter.species vem da lista local de starters,
        // enquanto os dados de pokemon foram obtidos da api
        const data = pokemon[starter.species];

        return (
          // a especie é utilizada como chave única do componente, e pegamos os dados que vieram da api
          <CardPokemon
            key={starter.species}
            pokemon={data}
            onChoose={() => onChooseStarter(starter)}
          />
        );
      })}
    </View>
  );
}
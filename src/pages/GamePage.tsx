import { Image, ScrollView, StyleSheet, Text, View, } from "react-native";
import React, { useEffect, useState } from "react";
import { IPokemonViewModel, IStarterConfig, } from "../types/game";
import { getPokemon } from "../services/pokeapi-service";
import StatBar from "../components/StatBar";
import ActionButton from "../components/ActionButton";
import AsyncStorage from "@react-native-async-storage/async-storage"

interface GameProps {
  starter: IStarterConfig;
  onChangeStarter: () => void;
}

const GamePage = ({
  starter,
  onChangeStarter,
}: GameProps) => {
  const [pokemon, setPokemon] = useState<IPokemonViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [hunger, setHunger] = useState(18);
  const [happiness, setHappiness] = useState(85);
  const [energy, setEnergy] = useState(86);
  const [hygiene, setHygiene] = useState(90);
  const [level, setLevel] = useState(5);
  const [experience, setExperience] = useState(0);
  const [message, setMessage] = useState(
    `Companheiro: ${starter.label}`
  );

// pra salvar nivel/experiencia
const pokeSalvo = async () => {
  const dados = {
    level,
    experience,
  };
  await AsyncStorage.setItem(`@poke-gotchi:${starter.species}`, JSON.stringify(dados));

  setMessage("Dados salvos com sucesso!");
};
//executa quando abre o gamestorage
useEffect(() => {
  const loadData = async () => { //funçao pra buscar os dados salvos 
    const savedData = await AsyncStorage.getItem(`@poke-gotchi:${starter.species}`);// chave especifica do pokemon
    if (savedData) { //se encontrar algo salvo
      const { level, experience } = JSON.parse(savedData);//texto= objeto
      setLevel(level); //coloca no estado do jogo
      setExperience(experience);
    }
  };

  loadData();
}, []);



  useEffect(() => {
    getPokemon(starter.species)
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar: ", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHunger((prev) => Math.min(100, prev + 3));
      setHappiness((prev) => Math.max(0, prev - 2));
      setEnergy((prev) => Math.max(0, prev - 2));
      setHygiene((prev) => Math.max(0, prev - 2));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (experience < 100) return;

    setExperience((prev) => prev - 100);
    setLevel((prev) => prev + 1);
    setHappiness((prev) => Math.min(100, prev + 10));
    setMessage("Level up!");
  }, [experience]);

  useEffect(() => {
    const evolutions = starter.evolutions.filter(
      (evo) => evo.minLevel <= level
    );

    const lastEvolution = evolutions.at(-1);

    if (
      lastEvolution &&
      pokemon &&
      lastEvolution.name !== pokemon.name
    ) {
      getPokemon(lastEvolution.name)
        .then((data) => setPokemon(data))
        .catch((err) =>
          console.error(
            "Erro ao evoluir pokémon: ",
            err
          )
        );
    }
  }, [level]);

  function feed() {
    if (hunger <= 5) {
      setMessage(
        "Seu pokémon já está alimentado!"
      );
      return;
    }

    setHunger((prev) =>
      Math.max(0, prev - 28)
    );

    setHygiene((prev) =>
      Math.max(0, prev - 4)
    );

    setHappiness((prev) =>
      Math.min(100, prev + 5)
    );

    setExperience((prev) => prev + 6);

    setMessage(
      "Você alimentou seu pokémon!"
    );
  }

  function play() {
    if (energy < 15) {
      setMessage(
        "Seu pokémon está cansado demais para brincar!"
      );
      return;
    }

    setHappiness((prev) =>
      Math.min(100, prev + 25)
    );

    setEnergy((prev) =>
      Math.max(0, prev - 14)
    );

    setHunger((prev) =>
      Math.min(100, prev + 9)
    );

    setExperience((prev) => prev + 10);

    setMessage(
      "Você brincou com seu pokémon!"
    );
  }

  function sleep() {
    if (energy >= 95) {
      setMessage(
        "Seu pokémon não está com sono!"
      );
      return;
    }

    setEnergy((prev) =>
      Math.min(100, prev + 38)
    );

    setHunger((prev) =>
      Math.min(100, prev + 8)
    );

    setExperience((prev) => prev + 4);

    setMessage(
      "Seu pokémon dormiu e recuperou energia!"
    );
  }

  function clean() {
    setHygiene(100);

    setHappiness((prev) =>
      Math.min(100, prev + 5)
    );

    setExperience((prev) => prev + 4);

    setMessage(
      "Seu pokémon foi limpo com sucesso!"
    );
  }

  function train() {
    if (energy < 25) {
      setMessage(
        "Seu pokémon precisa descansar antes de treinar!"
      );
      return;
    }

    if (hunger > 75) {
      setMessage(
        "Seu pokémon precisa comer antes de treinar!"
      );
      return;
    }

    setEnergy((prev) =>
      Math.max(0, prev - 22)
    );

    setHunger((prev) =>
      Math.min(100, prev + 17)
    );

    setHappiness((prev) =>
      Math.max(0, prev - 4)
    );

    setHygiene((prev) =>
      Math.max(0, prev - 8)
    );

    setExperience((prev) => prev + 26);

    setMessage(
      "Seu pokémon treinou com sucesso!"
    );
  }

  function mood() {
    if (hunger >= 90) {
      return "faminto";
    }

    if (energy <= 15) {
      return "preciso dormir";
    }

    if (hygiene <= 20) {
      return "preciso de banho";
    }

    if (happiness <= 20) {
      return "quero brincar";
    }

    if (
      hunger <= 25 &&
      happiness >= 75 &&
      energy >= 65 &&
      hygiene >= 65
    ) {
      return "incrível";
    }

    return "de boa";
  }

  //  carregamento
  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Carregando seu Pokémon...</Text>
      </View>
    );
  }

  // proteção caso não carregue
  if (!pokemon) {
    return (
      <View style={styles.loading}>
        <Text>
          Não foi possível carregar o Pokémon.
        </Text>
      </View>
    );
  }

 // Tela do jogo
return (
  <ScrollView
    style={styles.container}
    showsVerticalScrollIndicator={false}
  >

    {/* CABEÇALHO */}
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>
          POKÉGOTCHI
        </Text>

        <Text style={styles.subtitle}>
          Pocket Partner
        </Text>
      </View>

      {/* Botão para trocar o Pokémon */}
      <Text
        style={styles.trocar}
        onPress={onChangeStarter}
      >
        Trocar
      </Text>


      
    </View>

    {/* APARELHO */}
    <View style={styles.device}>

      {/* Luzes do aparelho */}
      <View style={styles.deviceLights}>
        <View style={styles.lightBlue} />
        <View style={styles.lightRed} />
        <View style={styles.lightYellow} />
        <View style={styles.lightGreen} />
      </View>

      {/* Tela do aparelho que chama o gif*/}
      <View style={styles.screen}>
        <Image
          source={{ uri: pokemon.image }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />

        {/* Humor do Pokémon / verificação */}
        <View style={styles.mood}>
          <Text style={styles.moodText}>
            Estou {mood()}!
          </Text>
        </View>
      </View>
    </View>

    {/* INFORMAÇÕES DO POKÉMON */}
    <View style={styles.card}>
      <View style={styles.nameRow}>
        <View>
          {/* Nome do Pokémon */}
          <Text style={styles.pokemonName}>
            {pokemon.name}
          </Text>

          {/* Número do Pokémon */}
          <Text style={styles.info}>
            #{String(pokemon.id).padStart(3, "0")}
          </Text>
        </View>

        {/* Tipo do Pokémon */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>
            {pokemon.type.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Altura e peso */}
      <Text style={styles.infoDetails}>
        Altura {pokemon.height} m{" "}
        {" • "}
        Peso {pokemon.weight} kg
      </Text>

      {/* Nível e experiência  */}
      <View style={styles.levelRow}>
        <Text style={styles.level}>
          NÍVEL {level}
        </Text>

        <Text style={styles.exp}>
          {experience}/100 EXP
        </Text>
      </View>

      {/* Barra de experiência */}
      <View style={styles.expBackground}>
        <View
          style={[
            styles.expProgress,
            {
              width: `${experience}%`,
            },
          ]}
        />
      </View>
    </View>

    {/* CUIDADOS */}
    <View style={styles.card}>
      <View style={styles.sectionHeader}>

        {/* Título da seção */}
        <Text style={styles.sectionTitle}>
          CUIDADOS
        </Text>

        {/* Tempo de atualização */}
        <Text style={styles.updateText}>
          Atualiza a cada 5s
        </Text>
      </View>

      {/* Barra de saciedade */}
      <StatBar
        icon="🍗"
        label="Saciedade"
        value={100 - hunger}
      />

      {/* Barra de felicidade */}
      <StatBar
        icon="💖"
        label="Felicidade"
        value={happiness}
      />

      {/* Barra de energia */}
      <StatBar
        icon="⚡"
        label="Energia"
        value={energy}
      />

      {/* Barra de higiene */}
      <StatBar
        icon="✨"
        label="Higiene"
        value={hygiene}
      />
    </View>

    {/* MENSAGEM atual */}
    <View style={styles.message}>
      <Text style={styles.messageText}>
        {message}
      </Text>
    </View>

    {/* AÇÕES */}
    <View style={styles.card}>

      {/* Título das ações */}
      <Text style={styles.sectionTitle}>
        O QUE VAMOS FAZER?
      </Text>
      

      {/* Primeira linha de botões */}
      <View style={styles.actionRow}>

        {/* Botão alimentar */}
        <View style={styles.actionButton}>
          <ActionButton
            icon="food-apple"
            label="ALIMENTAR"
            onPress={feed}
            color="#DD5B48"
          />
        </View>

        {/* Botão brincar */}
        <View style={styles.actionButton}>
          <ActionButton
            icon="tennis-ball"
            label="BRINCAR"
            onPress={play}
            color="#4DA36B"
          />
        </View>
      </View>

      {/* Segunda linha de botões */}
      <View style={styles.actionRow}>

        {/* Botão dormir */}
        <View style={styles.actionButton}>
          <ActionButton
            icon="sleep"
            label="DORMIR"
            onPress={sleep}
            color="#6875BA"
          />
        </View>

        {/* Botão limpar */}
        <View style={styles.actionButton}>
          <ActionButton
            icon="bathtub"
            label="LIMPAR"
            onPress={clean}
            color="#45A0BC"
          />
        </View>
      </View>

      {/* Botão treinar */}
      <ActionButton
        icon="arm-flex"
        label="TREINAR +26 EXP"
        onPress={train}
        color="#75a5e9ff"
      />
      {/* Botão salvar */}
      <ActionButton
        icon="arm-flex"
        label="SALVAR"
        onPress={pokeSalvo}
        color="#75a5e9ff"
      />
    </View>




    {/* RODAPÉ */}
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        ⚪ Dados dos Pokémon: PokéAPI
      </Text>
    </View>

  </ScrollView>
);
};
export default GamePage;

// ESTILOS DA TELA
const styles = StyleSheet.create({

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#F7F3EB",
    padding: 16,
  },

  //  Cabeçalho 
  header: {
    backgroundColor: "#254dcfff",
    marginHorizontal: -16,
    marginTop: -16,
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#FFD92F",
    fontSize: 25,
    fontWeight: "900",
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 2,
  },

  trocar: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  // Aparelho
  device: {
    backgroundColor: "#254dcfff",
    borderRadius: 32,
    padding: 10,
    marginTop: 17,
    marginBottom: 14,
    minHeight: 100,
  },

  deviceLights: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  lightBlue: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#87b2e9ff",
    borderWidth: 5,
    borderColor: "#FFFFFF",
    marginRight: 14,
  },

  lightRed: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#9e0f0aff",
    marginRight: 12,
  },

  lightYellow: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#F5C928",
    marginRight: 12,
  },

  lightGreen: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF70",
  },

  screen: {
    backgroundColor: "#c2e3e9ff",
    borderRadius: 24,
    borderWidth: 5,
    borderColor: "#383838",
    padding: 10,
    minHeight: 410,
    justifyContent: "center",
    alignItems: "center",
  },

  pokemonImage: {
    width: 200,
    height: 320,
  },

  mood: {
    backgroundColor: "#5e75d8ea",
    borderWidth: 3,
    borderColor: "#333333",
    borderRadius: 30,
    paddingHorizontal: 22,
    paddingVertical: 9,
  },

  moodText: {
    fontSize: 17,
    fontWeight: "900",
    color: "#ffffffff",
  },

  // Cards brancos
  card: {
    backgroundColor: "#002ae493",
    padding: 10,
    marginBottom: 20,
    borderRadius: 20,
    elevation: 4,
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pokemonName: {
    fontSize: 25,
    fontWeight: "900",
    color: "#ffffffff",
  },

  info: {
    fontSize: 10,
    fontWeight: "700",
    color: "#ffffffff",
    marginTop: 2,
  },

  infoDetails: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffffff",
    marginTop: 5,
  },

  typeBadge: {
    backgroundColor: "#F5822A",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },

  typeText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15,
  },

  levelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
  },

  level: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffffff",
  },

  exp: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ffffffff",
  },

  expBackground: {
    height: 18,
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },

  expProgress: {
    height: "100%",
    backgroundColor: "#4af185ff",
    borderRadius: 10,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    color: "#ffffffff",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#ffffffff",
  },

  updateText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ffffffff",
  },

  // Mensagem amarela
  message: {
    backgroundColor: "#FFD02E",
    borderWidth: 3,
    borderColor: "#0e22d8ff",
    borderRadius: 22,
    padding: 5,
    marginBottom: 20,
  },

  messageText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "900",
    color: "#000000ff",
  },

  // Botões em duas colunas
  actionRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 14,
  },

  actionButton: {
    flex: 1,
  },

  // Rodapé
  footer: {
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 40,
  },

  footerText: {
    fontSize: 15,
    color: "#ffffffff",
    fontWeight: "700",
  },
});
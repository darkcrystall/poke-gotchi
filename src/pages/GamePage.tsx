import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { IPokemonViewModel, IStarterConfig } from "../types/game";
import { getPokemon } from "../services/pokeapi-service";

interface GameProps {
  starter: IStarterConfig;
  onChangeStarter: () => void;
}

const GamePage = ({ starter, onChangeStarter }: GameProps) => {
  const [pokemon, setPokemon] = useState<IPokemonViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [hunger, setHunger] = useState(18);
  const [happiness, setHappiness] = useState(85);
  const [energy, setEnergy] = useState(86);
  const [hygiene, setHygiene] = useState(90);
  const [level, setLevel] = useState(5);
  const [experience, setExperience] = useState(0);
  const [message, setMessage] = useState(`Companheiro: ${starter.label}`);

  useEffect(() => {
    // chama a função de carregamento passando a espécie do starter
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
      (evo) => evo.minLevel <= level,
    );

    const lastEvolution = evolutions.at(-1);

    if (lastEvolution && pokemon && lastEvolution.name !== pokemon.name) {
      getPokemon(lastEvolution.name)
        .then((data) => setPokemon(data))
        .catch((err) => console.error("Erro ao evoluir pokémon: ", err));
    }
  }, [level]);

  function feed() {
    if (hunger <= 5) {
      setMessage("Seu pokémon já está alimentado!");
      return;
    }

    setHunger((prev) => Math.max(0, prev - 28));
    setHygiene((prev) => Math.max(0, prev - 4));
    setHappiness((prev) => Math.min(100, prev + 5));
    setExperience((prev) => prev + 6);
    setMessage("Você alimentou seu pokémon!");
  }

  function play() {
    if (energy < 15) {
      setMessage("Seu pokémon está cansado demais para brincar!");
      return;
    }

    setHappiness((prev) => Math.min(100, prev + 25));
    setEnergy((prev) => Math.max(0, prev - 14));
    setHunger((prev) => Math.min(100, prev + 9));
    setExperience((prev) => prev + 10);
    setMessage("Você brincou com seu pokémon!");
  }

  function sleep() {
    if (energy >= 95) {
      setMessage("Seu pokémon não está com sono!");
      return;
    }

    setEnergy((prev) => Math.min(100, prev + 38));
    setHunger((prev) => Math.min(100, prev + 8));
    setExperience((prev) => prev + 4);
    setMessage("Seu pokémon dormiu e recuperou energia!");
  }

  function clean() {
    setHygiene(100);
    setHappiness((prev) => Math.min(100, prev + 5));
    setExperience((prev) => prev + 4);
    setMessage("Seu pokémon foi limpo com sucesso!");
  }

  function train() {
    if (energy < 25) {
      setMessage("Seu pokémon precisa descansar antes de treinar!");
      return;
    }

    if (hunger > 75) {
      setMessage("Seu pokémon precisa comer antes de treinar!");
      return;
    }

    setEnergy((prev) => Math.max(0, prev - 22));
    setHunger((prev) => Math.min(100, prev + 17));
    setHappiness((prev) => Math.max(0, prev - 4));
    setHygiene((prev) => Math.max(0, prev - 8));
    setExperience((prev) => prev + 26);
    setMessage("Seu pokémon treinou com sucesso!");
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
    if (hunger <= 25 && happiness >= 75 && energy >= 65 && hygiene >= 65) {
      return "incrível";
    }
    return "de boa";
  }

  return (
    <View>
      <Text>GamePage</Text>
    </View>
  );
};

export default GamePage;

const styles = StyleSheet.create({});

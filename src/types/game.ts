export interface IPokemonViewModel {
  id: number;
  name: string;
  image: string;
  type: string;
  height: number;
  weight: number;
}
export interface IStarterConfig {
  label: string;
  species: string;
  accent: string;
  background: string;
  evolutions: {
    name: string;
    minLevel: number;
  }[];
}
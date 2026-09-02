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
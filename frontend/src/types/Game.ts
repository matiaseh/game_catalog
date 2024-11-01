export interface Game {
  id: number;
  name: string;
  provider: number;
  cover: string;
  converLarge: string;
  date: string;
}

interface Provider {
  id: number;
  name: string;
  logo: string;
}

interface Group {
  id: number;
  name: string;
  games: number[];
}

export interface GamesData {
  games: Game[];
  providers: Provider[];
  groups: Group[];
}

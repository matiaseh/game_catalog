export interface Game {
  id: number;
  name: string;
  provider: number;
  cover: string;
  converLarge: string;
  date: string;
}

export interface Provider {
  id: number;
  name: string;
  logo: string;
}

export interface Group {
  id: number;
  name: string;
  games: number[];
}

export interface GamesData {
  games: Game[];
  providers: Provider[];
  groups: Group[];
}

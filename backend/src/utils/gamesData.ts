import fs from 'fs';
import path from 'path';
import { GamesData } from '../types/Game';

// Load games from JSON file
const gamesFilePath = path.join(__dirname, '../data/data.json');

export const getGamesData = (): GamesData => {
  const data = fs.readFileSync(gamesFilePath, 'utf-8');
  return JSON.parse(data);
};

export const saveGamesData = (data: GamesData) => {
  fs.writeFileSync(gamesFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

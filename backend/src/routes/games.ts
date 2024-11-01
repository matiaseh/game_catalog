import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Load games from JSON file
const gamesFilePath = path.join(__dirname, '../data/data.json');

const getGames = () => {
  const data = fs.readFileSync(gamesFilePath, 'utf-8');
  return JSON.parse(data);
};

router.get('/', (req, res) => {
  const gamesData = getGames();
  res.json(gamesData);
});

export default router;

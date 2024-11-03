import express from 'express';
import { getGamesData, saveGamesData } from '../utils/gamesData';

const router = express.Router();

// Get all games data
router.get('/', (req, res) => {
  const gamesData = getGamesData();
  res.json(gamesData);
});

export default router;

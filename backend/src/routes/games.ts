import express from 'express';
import fs from 'fs';
import path from 'path';
import { GamesData } from '../types/Game';

const router = express.Router();

// Load games from JSON file
const gamesFilePath = path.join(__dirname, '../data/data.json');

const getGamesData = (): GamesData => {
  const data = fs.readFileSync(gamesFilePath, 'utf-8');
  return JSON.parse(data);
};

const saveGamesData = (data: GamesData) => {
  fs.writeFileSync(gamesFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Get all games data
router.get('/', (req, res) => {
  const gamesData = getGamesData();
  res.json(gamesData);
});

// Delete a group from games data
router.delete('/groups/:id', (req, res) => {
  const groupId = parseInt(req.params.id);
  const gamesData = getGamesData();

  const groupIndex = gamesData.groups.findIndex(
    (group) => group.id === groupId,
  );

  if (groupIndex === -1) {
    res.status(404).json({ error: 'Group not found' });
  }

  // Remove the group and save the updated data
  gamesData.groups.splice(groupIndex, 1);
  saveGamesData(gamesData);

  res.status(200).json({ message: 'Group deleted successfully' });
});

export default router;

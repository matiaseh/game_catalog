import express from 'express';
import { getGamesData, saveGamesData } from '../utils/gamesData';

const router = express.Router();

router.patch('/:id', (req, res) => {
  const groupId = parseInt(req.params.id);

  const { games, name } = req.body.updatedGroup || {};

  const data = getGamesData();
  const group = data.groups.find((group) => group.id === groupId);

  if (!group) {
    res.status(404).send({ error: 'Group not found' });
    return;
  }

  if (
    Array.isArray(games) &&
    games.length > 0 &&
    games.every((id) => typeof id === 'number')
  ) {
    group.games = games;
  }

  if (typeof name === 'string') {
    group.name = name;
  }

  saveGamesData(data);

  res.status(200).send({ message: 'Group updated successfully', group });
});

// Delete a group by ID
router.delete('/:id', (req, res) => {
  const groupId = parseInt(req.params.id);

  const data = getGamesData();
  const groupIndex = data.groups.findIndex((group) => group.id === groupId);

  if (groupIndex === -1) {
    res.status(404).send({ error: 'Group not found' });
  }

  data.groups.splice(groupIndex, 1);

  saveGamesData(data);

  res.status(200).send({ message: 'Group deleted successfully' });
});

export default router;

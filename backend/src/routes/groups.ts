import express from 'express';
import { getGamesData, saveGamesData } from '../utils/gamesData';

const router = express.Router();

router.post('/', (req, res) => {
  const { name, games } = req.body;

  if (typeof name !== 'string' || !Array.isArray(games)) {
    res.status(400).send({ error: 'Invalid group data' });
  }

  const data = getGamesData();

  // Generate a new ID by adding 1 to the highest existing ID
  const newGroupId =
    data.groups.length > 0
      ? Math.max(...data.groups.map((group) => group.id)) + 1
      : 1;

  const newGroup = {
    id: newGroupId,
    name,
    games,
  };

  data.groups.push(newGroup);

  saveGamesData(data);

  res
    .status(201)
    .send({ message: 'Group created successfully', group: newGroup });
});

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

import Router from 'express';
import { addSession, isLoggedIn, removeSession } from '../config/sessionStore';
import { validUsers } from '../config/users';

const router = Router();

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (validUsers[username] === password) {
    addSession(username);
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  const { username } = req.body;
  if (isLoggedIn(username)) {
    removeSession(username);
    res.status(200).send({ message: 'Logout successful' });
  } else {
    res.status(401).send({ message: 'User is not logged in' });
  }
});

// Check login status route
router.get('/isLoggedIn/:username', (req, res) => {
  const { username } = req.params;
  const loggedIn = isLoggedIn(username);
  res.status(200).send({ loggedIn });
});

export default router;

import express from 'express';
import cors from 'cors';
import { addSession, isLoggedIn, removeSession } from './sessionStore';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());

// Hardcoded user credentials
const validUsers: Record<string, string> = {
  player1: 'player1',
  player2: 'player2',
};

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (validUsers[username] === password) {
    addSession(username);
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

// Logout route
app.post('/api/logout', (req, res) => {
  const { username } = req.body;
  if (isLoggedIn(username)) {
    removeSession(username);
    res.status(200).send({ message: 'Logout successful' });
  } else {
    res.status(401).send({ message: 'User is not logged in' });
  }
});

// Check login status route
app.get('/api/isLoggedIn/:username', (req, res) => {
  const { username } = req.params;
  const loggedIn = isLoggedIn(username);
  res.status(200).send({ loggedIn });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import gamesRoutes from './routes/games';
import groupsRoutes from './routes/groups';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_APP_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/groups', groupsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

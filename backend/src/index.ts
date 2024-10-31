import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.get('/api', (req, res) => {
  res.send({ message: `Hello from ${PORT}` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

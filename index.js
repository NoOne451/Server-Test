import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { eventsRouter } from './routes/events.js';
import prisma, { connectPrisma } from './prisma/client.js';
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

//routes
app.get('/', async (req, res) => {
  res.send('This an REST API for an Event App');
});
app.use('/api/events', eventsRouter);

//invalid endpoints

app.use((req, res, next) => {
  res.status(404).json({ error: 'Invalid endpoint' });
});

var port = process.env.PORT || 8080;

app.listen(port, async () => {
  await connectPrisma();
  console.log(`Server is running on port http://localhost:${port}/`);
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { eventsRouter } from './routes/events.js';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});
const app = express();

//database

//middleware & configuration

app.use(cors());
app.use(express.json());
dotenv.config();

//routes
app.get('/', (req, res) => {
  res.send('This an REST API for an Event App');
});
app.use('/api/events', eventsRouter);

//invalid endpoints

app.use((req, res, next) => {
  res.status(404).json({ error: 'Invalid endpoint' });
});

var port = process.env.PORT || 8080;

prisma
  .$connect()
  .then(() => {
    console.log('Database connected');
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}/`);
    });
  })
  .catch((e) => {
    console.log('Error connecting to database', e);
  });

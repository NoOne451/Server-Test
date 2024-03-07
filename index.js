import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { eventsRouter } from './routes/events.js';
import { prisma } from './controllers/index.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

//routes
app.get('/', async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.send(events);
  } catch (error) {
    res.send(error);
  }
  // res.send('This an REST API for an Event App');
});
app.use('/api/events', eventsRouter);

//invalid endpoints

app.use((req, res, next) => {
  res.status(404).json({ error: 'Invalid endpoint' });
});

var port = process.env.PORT || 8080;

// (async function main() {
//   await prisma
//     .$connect()
//     .then(() => {
//       console.log('Database connected');
//       app.listen(port, () => {
//         console.log(`Server is running on port http://localhost:${port}/`);
//       });
//     })
//     .catch((e) => {
//       console.log('Error connecting to database', e);
//     });
// })();

app.listen(port, async () => {
  await prisma.$connect();
  console.log(`Server is running on port http://localhost:${port}/`);
});

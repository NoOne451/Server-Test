import { Router } from 'express';
// import { prisma } from '..';

import { createEvent, getEvents } from '../controllers/index.js';
export const eventsRouter = Router();

eventsRouter.get('/', getEvents);

eventsRouter.post('/', createEvent);

eventsRouter.get('/:eventId', (req, res) => {
  res.send('getting the event');
});

eventsRouter.put('/:eventId', (req, res) => {
  res.send('updating the event');
});

eventsRouter.delete('/:eventId', (req, res) => {
  res.send('deleting the event');
});

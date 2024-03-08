import { Router } from 'express';
import {
  createEvent,
  deleteEvent,
  getEvents,
  getSingleEvent,
  updateEvent,
} from './../controllers/index.js';

export const eventsRouter = Router();

eventsRouter.get('/', getEvents);

eventsRouter.post('/', createEvent);

eventsRouter.get('/:eventId', getSingleEvent);

eventsRouter.put('/:eventId', updateEvent);

eventsRouter.delete('/:eventId', deleteEvent);

import prisma from '../prisma/client.js';

export const getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.send(events);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const createEvent = async (req, res) => {
  try {
    //validation
    if (!req?.body?.title) return res.status(400).send('Title is required');
    if (!req?.body?.description)
      return res.status(400).send('Description is required');
    if (!req?.body?.location)
      return res.status(400).send('Location is required');
    if (!req?.body?.date) return res.status(400).send('Date is required');
    if (!req?.body?.imageUrl)
      return res.status(400).send('Image Url is required');
    if (!req?.body?.time) return res.status(400).send('Time is required');

    //create
    const { title, description, location, date, imageUrl, time } = req.body;
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date,
        location,
        time,
        imageUrl,
      },
    });
    res.send(event);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
//getting an single event
export const getSingleEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });

    if (!event) return res.status(404).send('Event not found');

    res.send(event);
  } catch (error) {
    console.log(error);
    res.status(400).send(error?.message);
  }
};

//Updating an event

export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!req?.body?.title) return res.status(400).send('Title is required');
    if (!req?.body?.description)
      return res.status(400).send('Description is required');
    if (!req?.body?.location)
      return res.status(400).send('Location is required');
    if (!req?.body?.date) return res.status(400).send('Date is required');
    if (!req?.body?.imageUrl)
      return res.status(400).send('Image Url is required');
    if (!req?.body?.time) return res.status(400).send('Time is required');

    const { title, description, location, date, imageUrl, time } = req.body;

    const event = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        title,
        description,
        location,
        date,
        imageUrl,
        time,
      },
    });

    if (!event) return res.status(404).send('Event not found');

    res.send(event);
  } catch (error) {
    console.log(error);
    res.status(400).send(error?.message);
  }
};

//Delete the Event

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await prisma.event.delete({
      where: {
        id: eventId,
      },
    });
    if (!event) return res.status(404).send('Event not found');

    res.send(event);
  } catch (error) {
    console.log(error);
    res.status(400).send(error?.message);
  }
};

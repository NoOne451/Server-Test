import { prisma } from './../prisma/client.js';
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

    //create
    const event = await prisma.event.create({
      data: {
        ...req.body,
      },
    });
    res.send(event);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

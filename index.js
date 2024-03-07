import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const prisma = new PrismaClient({});
const app = express();
app.use(cors());
app.use(express.json());

//Geting all Users

app.get('/user', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
        liked: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Create a User
app.post('/user', async (req, res) => {
  if (!req.body?.email?.trim())
    return res.status(400).json({ error: 'Please provide email' });
  const { email } = req.body;
  console.log(email);
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Geting all Posts

app.get('/post', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        likedBy: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//Create a Post

app.post('/post', async (req, res) => {
  if (!req.body?.title?.trim())
    return res.status(400).json({ error: 'Please provide title' });
  if (!req.body?.description?.trim())
    return res.status(400).json({ error: 'Please provide discription' });
  if (!req.body?.userId?.trim())
    return res.status(400).json({ error: 'Please provide userId' });
  try {
    const { title, description, userId } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        description,
        userId,
      },
    });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
//Update a Post
app.post('/post/update', async (req, res) => {
  if (!req.body?.id?.trim())
    return res.status(400).json({ error: 'Please provide id' });
  if (!req?.body?.data)
    return res.status(400).json({ error: 'Please provide data' });
  try {
    const { id } = req.body;
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        ...req.body.data,
      },
    });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Invalid endpoint' });
});
var port = process.env.PORT || 8080;
app.listen(port, async () => {
  try {
    console.log(`Server is running on port http://localhost:${port}/`);
    await prisma.$connect().catch((e) => console.log(e));
    console.log('Database connected');
  } catch (error) {
    console.log(error);
  }
});

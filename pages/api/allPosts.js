import Post from '../../models/post';
import connectDB from '../../db';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include all HTTP methods
    origin: '*', // Allow all origins (not recommended for production)
  })
);
connectDB()

export default async function handler(req, res) {
  await cors(req, res);
  console.log("endpoint /allPosts called")

  if (req.method === 'GET') {
    try {
      const posts = await Post.find({});
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
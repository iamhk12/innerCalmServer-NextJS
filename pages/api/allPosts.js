import Post from '../../models/post';
import connectDB from '../../db';
import Cors from 'cors';

// Configure CORS to allow requests from a specific origin
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include all HTTP methods
  origin: '*', // Set the allowed origin to your Netlify app URL
});

connectDB();

export default async function handler(req, res) {
  // Enable CORS for this route
  await cors(req, res);
  console.log("endpoint /allPosts called");

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

import Post from '../../models/post';
import connectDB from '../../db';

connectDB();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Check if it's a preflight request (OPTIONS) and handle it
  if (req.method === 'OPTIONS') {
    res.status(204).end(); // Respond with a 204 No Content for preflight requests
    return;
  }

  console.log("Endpoint /allPosts called");

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

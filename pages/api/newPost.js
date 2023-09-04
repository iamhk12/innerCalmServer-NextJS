import Post from '../../models/post';
import connectDB from '../db';
connectDB()
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, story } = req.body;

    try {
      const newpost = new Post({
        name,
        story,
        supports: 0,
      });

      await newpost.save();
      console.log('Post saved');
      res.status(200).json({ message: 'Post added successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Post not added' });
    }
  } else {
    res.status(405).json({method : "The method should be POST"}); // Method Not Allowed
  }
}
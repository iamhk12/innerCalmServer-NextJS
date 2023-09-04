
import connectDB from '../../db'; // Import your database connection setup
import Post from '../../models/post';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include all HTTP methods
    origin: '*', // Allow all origins (not recommended for production)
  })
); // Import your Post model or schema

connectDB(); // Initialize your database connection

const supportPost = async (req, res) => {
  await cors(req, res);
  const { id } = req.query; // Use req.query to get the id parameter

  console.log("Supporting post with id:", id);

  if (req.method === 'PUT') {
    try {
      const postToUpdate = await Post.findById(id);

      if (!postToUpdate) {
        return res.status(404).json({ error: 'Post not found' });
      }

      postToUpdate.supports += 1;

      await postToUpdate.save();

      return res.status(200).json({ message: 'Support added successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default supportPost;
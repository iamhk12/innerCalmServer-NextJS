import connectDB from '../../db'; // Import your database connection setup
import Post from '../../models/post';

connectDB(); // Initialize your database connection

const notSupportPost = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { id } = req.query; // Use req.query to get the id parameter

  console.log("Not Supporting post with id:", id);

  if (req.method === 'OPTIONS') {
    // Respond to preflight request with a 200 OK status
    res.status(200).end();
    return;
  }

  if (req.method === 'PUT') {
    try {
      const postToUpdate = await Post.findById(id);

      if (!postToUpdate) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (postToUpdate.supports > 0) {
        postToUpdate.supports -= 1;
      }

      await postToUpdate.save();

      return res.status(200).json({ message: 'Support removed successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default notSupportPost;

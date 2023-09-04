import connectDB from '../db'; // Import your database connection setup
import Post from '../../models/post'; // Import your Post model or schema

connectDB(); // Initialize your database connection

const getPost = async (req, res) => {
  const postId = req.query.id;

  try {
    const foundPost = await Post.findById(postId);

    if (!foundPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json(foundPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getPost;

import connectDB from '../../db'; // Import your database connection setup
import Contact from '../../models/contact'; // Import your Contact model or schema
import Cors from 'cors';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include all HTTP methods
    origin: '*', // Allow all origins (not recommended for production)
  })
);

connectDB(); // Initialize your database connection

const newContact = async (req, res) => {
  await cors(req, res);
  if (req.method === 'POST') {
    const { name, email, phone, subject, message } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        subject,
        message,
      });

      await newContact.save();

      console.log("Contacted form saved");
      return res.status(200).json({ message: "Contacted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: "Not contacted" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default newContact;

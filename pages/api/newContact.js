
import connectDB from '../../db'; // Import your database connection setup
import Contact from '../../models/contact'; // Import your Contact model or schema


connectDB(); // Initialize your database connection

const newContact = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end(); // Respond with a 204 No Content for preflight requests
    return;
  }

  
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

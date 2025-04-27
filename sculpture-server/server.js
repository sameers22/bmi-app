const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI
const mongoURI = 'mongodb+srv://Sameer:sameer@cluster0.vey9rvf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a simple User model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  birthday: Date,
  age: Number,
  height: Number,
  weight: Number,
});

const User = mongoose.model('User', UserSchema);

// Create a POST route to save user data
app.post('/api/user', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send('User created successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

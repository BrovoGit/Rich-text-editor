// controllers/user.js

// Import your User model and any other necessary modules

// Example: Import Mongoose User model
const mongoose = require('mongoose'); // Import mongoose module
//const User = require('../models/User'); // Import the User model

const changeAvatar = async (req, res) => {
  try {
    // Define the User schema
    const userSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      avatar: String, // Make sure this field is defined
    });

    // Create the User model using the schema
    const User = mongoose.model('User', userSchema);

    // Find the user by ID and update the avatar field
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: req.file.filename }, { new: true });

    // Send a success response
    res.status(200).json({ message: 'Avatar changed successfully' });
  } catch (error) {
    console.error('Error changing avatar:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {
  changeAvatar,
};

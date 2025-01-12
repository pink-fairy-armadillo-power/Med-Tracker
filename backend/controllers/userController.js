/* userController contains
- login
- register
- getUserProfile
*/


const User = require('../models/User');

const userController = {
  // Register new user
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({
        username,
        email,
        password
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ email });
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get user profile
  getUserProfile: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = userController;
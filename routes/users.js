const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

let userProfiles = {};

router.put('/profile', authMiddleware, (req, res) => {
  try {
    const { name, email, phone, skills, resume, profilePicture } = req.body;
    
    userProfiles[req.userId] = {
      ...userProfiles[req.userId],
      name,
      email,
      phone,
      skills,
      resume,
      profilePicture,
      updatedAt: new Date()
    };

    res.json({
      _id: req.userId,
      ...userProfiles[req.userId]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile', authMiddleware, (req, res) => {
  try {
    const profile = userProfiles[req.userId] || {};
    res.json({
      _id: req.userId,
      ...profile
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

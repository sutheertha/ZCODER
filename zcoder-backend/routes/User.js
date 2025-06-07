const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const upload = require('../middleware/upload');
const path = require('path');

//get user profile info
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user', error: err.message });
    }
});

// Update user profile
router.put('/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      ).select('-passwordHash'); // omit sensitive info
  
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: 'Error updating user', error: err.message });
    }
  });

// POST /user/:id/upload-profile
router.post('/:id/upload-profile', upload.single('profile'), async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { profilePicture: `/uploads/${req.file.filename}` },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Upload failed', error: err.message });
    }
  });
  
module.exports = router;
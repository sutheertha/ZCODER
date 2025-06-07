const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');

// GET all chat messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await ChatMessage.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new chat message
router.post('/messages', async (req, res) => {
  const { sender, message, timestamp } = req.body;
  if (!sender || !message) {
    return res.status(400).json({ error: 'Sender and message are required' });
  }

  try {
    const newMessage = new ChatMessage({ sender, message, timestamp: timestamp || new Date() });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

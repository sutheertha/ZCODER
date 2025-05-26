const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  roomId:   { type: String },  // Or a Room reference if you model rooms
  sender:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content:  { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
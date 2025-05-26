const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email:    { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  bio: { type: String, default: "" },

  savedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  
  contributions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],

  bookmarks: [{
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
    tags: [String],
    notes: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
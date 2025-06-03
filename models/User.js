const mongoose = require('mongoose');

const bookmarkedProblemSchema = new mongoose.Schema({
  title: String,
  url: String,
  source: String, 
  tags: [String],
  dateBookmarked: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email:    { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  bio: { type: String, default: "" },
  bookmarks: [bookmarkedProblemSchema],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
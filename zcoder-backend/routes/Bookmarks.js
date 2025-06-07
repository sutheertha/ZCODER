const { Router } = require('express');
const Bookmark = require('../models/Bookmarks'); // import Bookmark model

const router = Router();

// Save new bookmark
router.post('/user/:id/bookmarks', async (req, res) => {
  const { questionName, platform, tags, questionId } = req.body;
  const userId = req.params.id;

  if (!questionName || !platform || !tags || !questionId) {
      return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
      const newBookmark = new Bookmark({
          userId,
          questionName,
          platform,
          tags,
          questionId,
          dateAdded: new Date()
      });

      await newBookmark.save();
      await User.findByIdAndUpdate(userId, { $push: { bookmarks: newBookmark._id } });
      res.status(201).json({ message: 'Bookmark added', bookmark: newBookmark });
  } catch (err) {
      res.status(500).json({ message: 'Error saving bookmark', error: err.message });
  }
});

// Get a user's bookmarks
router.get('/user/:id/bookmarks', async (req, res) => {
  const { title = '', tag = 'All', sort = '', order = 'asc' } = req.query;
  const userId = req.params.id;

  let filter = { userId };

  if (title) {
    filter.questionName = { $regex: title, $options: 'i' }; // case-insensitive
  }

  if (tag !== 'All') {
    filter.tags = tag;
  }

  let sortOptions = {};
  if (sort === 'Name') sortOptions.questionName = order === 'asc' ? 1 : -1;
  else if (sort === 'Date Added') sortOptions.dateAdded = order === 'asc' ? 1 : -1;
  else if (sort === 'Difficulty') sortOptions.difficulty = order === 'asc' ? 1 : -1;

    try {
        const bookmarks = await Bookmark.find({ userId: req.params.id }).sort({ dateAdded: -1 });
        res.json(bookmarks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching bookmarks', error: err.message });
    }
});

// Remove a bookmark
router.delete('/user/:id/bookmarks/:bookmarkId', async (req, res) => {
    try {
        await Bookmark.deleteOne({ QID: req.params.bookmarkId, userId: req.params.id });
        res.json({ message: 'Bookmark removed' });
    } catch (err) {
        res.status(500).json({ message: 'Error removing bookmark', error: err.message });
    }
});

module.exports = router;
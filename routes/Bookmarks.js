const {Router} = require('express');

const router= Router();

//save new bookmarks
router.post('/user/:id/bookmarks', async (req, res) => {
    const { title, url, source, tags } = req.body;
    const user = await User.findById(req.params.id);
    user.bookmarks.push({ title, url, source, tags });
    await user.save();
    res.json({ message: 'Bookmarked' });
  });

//get a user's bookmarks
router.get('/user/:id/bookmarks', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user.bookmarks);
  });

//remove a bookmark
router.delete('/user/:id/bookmarks/:bookmarkId', async (req, res) => {
    await User.updateOne(
      { _id: req.params.id },
      { $pull: { bookmarks: { _id: req.params.bookmarkId } } }
    );
    res.json({ message: 'Bookmark removed' });
  });
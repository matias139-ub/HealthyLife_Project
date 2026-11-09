const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Daftar favorit
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.userId).populate('favorites');
  res.json(user.favorites);
});

// Toggle favorit (tambah / hapus)
router.post('/:contentId', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  const id = req.params.contentId;
  const idx = user.favorites.findIndex((f) => f.toString() === id);
  let favorited;
  if (idx >= 0) {
    user.favorites.splice(idx, 1);
    favorited = false;
  } else {
    user.favorites.push(id);
    favorited = true;
  }
  await user.save();
  res.json({ favorited });
});

module.exports = router;
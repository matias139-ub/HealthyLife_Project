const router = require('express').Router();
const auth = require('../middleware/auth');
const Activity = require('../models/Activity');

router.get('/', auth, async (req, res) => {
  const list = await Activity.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(list);
});

router.post('/', auth, async (req, res) => {
  if (!req.body.title) return res.status(400).json({ message: 'Judul wajib diisi' });
  const act = await Activity.create({ user: req.userId, title: req.body.title });
  res.status(201).json(act);
});

router.delete('/:id', auth, async (req, res) => {
  await Activity.deleteOne({ _id: req.params.id, user: req.userId });
  res.json({ message: 'Dihapus' });
});

module.exports = router;
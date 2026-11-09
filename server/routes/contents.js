const router = require('express').Router();
const Content = require('../models/Content');

// GET /api/contents?category=article
router.get('/', async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const list = await Content.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/contents/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await Content.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Konten tidak ditemukan' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
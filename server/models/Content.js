const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['article', 'workout', 'video', 'nutrition'],
      required: true,
    },
    summary: String,
    body: String,
    imageUrl: String,
    videoUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Content', contentSchema);
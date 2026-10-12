const mongoose = require('mongoose');

const helpRequestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    userId: { type: String, required: true },
    status: { type: String, default: 'open', enum: ['open', 'in-progress', 'resolved', 'closed'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HelpRequest', helpRequestSchema);

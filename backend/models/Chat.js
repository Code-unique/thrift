const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

chatSchema.index({ participants: 1 }); // Add index for performance

module.exports = mongoose.model('Chat', chatSchema);
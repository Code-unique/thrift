const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);

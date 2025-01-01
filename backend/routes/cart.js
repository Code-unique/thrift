const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get the user's cart
router.get('/:userId', async (req, res) => {
  const cart = await Cart.findOne({ user: req.params.userId }).populate('products');
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  res.json(cart);
});

// Add products to the cart
router.post('/:userId', async (req, res) => {
  const { products, total } = req.body;
  let cart = await Cart.findOne({ user: req.params.userId });

  if (!cart) {
    cart = new Cart({ user: req.params.userId, products, total });
  } else {
    cart.products.push(...products);
    cart.total += total;
  }
  await cart.save();
  res.json(cart);
});

// Remove a product from the cart
router.delete('/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.products = cart.products.filter((id) => id.toString() !== productId);
  await cart.save();
  res.json(cart);
});

module.exports = router;

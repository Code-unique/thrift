const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get orders for a user
router.get('/:userId', async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).populate('products');
  res.json(orders);
});

// Create a new order
router.post('/', async (req, res) => {
  const { user, products, total, status } = req.body;
  const order = new Order({ user, products, total, status });
  await order.save();
  res.status(201).json(order);
});

// Update the status of an order
router.patch('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.json(order);
});

module.exports = router;

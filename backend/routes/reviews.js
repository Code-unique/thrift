const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Add a review
router.post('/', async (req, res) => {
  const { product, user, rating, comment } = req.body;
  const review = new Review({ product, user, rating, comment });
  await review.save();
  res.status(201).json(review);
});

// Get reviews for a product
router.get('/:productId', async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId });
  res.json(reviews);
});

module.exports = router;

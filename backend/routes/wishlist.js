const express = require('express');

const router = express.Router();
const Wishlist = require('../models/WishList');  // Make sure this is your Wishlist model

// Add a product to the user's wishlist
router.post('/:userId', async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    // Find the user's wishlist by userId
    let wishlist = await Wishlist.findOne({ user: req.params.userId });

    if (!wishlist) {
      // If no wishlist, create a new one with the product
      wishlist = new Wishlist({ user: req.params.userId, products: [productId] });
    } else {
      // If wishlist exists, add the product to the array if not already there
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    // Save the wishlist to the database
    await wishlist.save();

    // Respond with the updated wishlist
    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error, could not add product to wishlist' });
  }
});

module.exports = router;

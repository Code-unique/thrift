const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Search and filter products
router.get('/search', async (req, res) => {
  const { keyword, minPrice, maxPrice, category, vendor } = req.query;
  let query = {};

  if (keyword) query.name = { $regex: keyword, $options: 'i' };
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (category) query.category = category;
  if (vendor) query.vendor = vendor;

  const products = await Product.find(query);
  res.json(products);
});

// Add a new product
router.post('/', async (req, res) => {
  const { name, description, price, image, vendor,category } = req.body;
  // Validate if category is provided
  if (!category) {
    return res.status(400).json({ message: "Category is required" });
  }

  const product = new Product({ name, description, price, image, vendor, category });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

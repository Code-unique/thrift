const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch all vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await User.find({ role: 'vendor' }).select('name email _id');
    res.status(200).json(vendors);
  } catch (err) {
    console.error("Error fetching vendors:", err);
    res.status(500).json({ message: 'Error fetching vendors' });
  }
});

module.exports = router;

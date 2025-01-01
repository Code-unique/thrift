const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get notifications for a user
router.get('/:userId', async (req, res) => {
  const notifications = await Notification.find({ user: req.params.userId });
  res.json(notifications);
});

// Create a notification
router.post('/', async (req, res) => {
  const { user, message } = req.body;
  const notification = new Notification({ user, message });
  await notification.save();
  res.status(201).json(notification);
});

// Mark notifications as read
router.patch('/:userId', async (req, res) => {
  const { userId } = req.params;
  await Notification.updateMany({ user: userId }, { read: true });
  res.json({ message: 'Notifications marked as read' });
});

module.exports = router;

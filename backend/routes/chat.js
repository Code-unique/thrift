const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Message = require('../models/Message');

// Utility function for ObjectId validation
const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a chat
router.post('/', async (req, res) => {
  const { participants } = req.body;

  if (!participants || participants.length < 2) {
    return res.status(400).json({ message: 'Participants array is required and must include at least two users.' });
  }

  try {
    const chat = await Chat.findOne({ participants: { $all: participants } });

    if (!chat) {
      const newChat = new Chat({ participants });
      await newChat.save();
      return res.status(201).json(newChat);
    }

    return res.status(200).json(chat);
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ message: 'Error creating chat' });
  }
});


// Get all chats for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!validateObjectId(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const chats = await Chat.find({ participants: userId }).populate('participants');
    res.json(chats);
  } catch (err) {
    console.error("Error fetching chats:", err);
    res.status(500).json({ message: "Error fetching chats" });
  }
});

// Get messages for a specific chat with pagination
router.get('/:chatId/messages', async (req, res) => {
  const { chatId } = req.params;
  const { page = 1, limit = 20 } = req.query;

  if (!validateObjectId(chatId)) {
    return res.status(400).json({ message: "Invalid chat ID" });
  }

  try {
    const messages = await Message.find({ chat: chatId })
      .populate('sender')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Error fetching messages" });
  }
});

// Send a message in a chat
router.post('/:chatId/messages', async (req, res) => {
  const { chatId } = req.params;
  const { sender, content } = req.body;

  if (!validateObjectId(chatId) || !validateObjectId(sender)) {
    return res.status(400).json({ message: "Invalid chat ID or sender ID" });
  }

  try {
    const message = new Message({ chat: chatId, sender, content });
    await message.save();

    res.status(201).json(message);
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ message: "Error sending message" });
  }
});

module.exports = router;

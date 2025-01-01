const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const Message = require("./models/Message");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const Chat = require("./models/Chat");
const Coupon = require("./models/Coupon");
const Notification = require("./models/Notification");
const Order = require("./models/Order");
const Review = require("./models/Review");
const User = require("./models/User");
const WishList = require("./models/WishList");
const authRouter = require("./routes/auth");

// Load environment variables
dotenv.config();

// Initialize express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS options
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5173"], // Ensure this matches your frontend origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:8080"], // Add http://localhost:8080 here
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow credentials (cookies, headers)
};
app.use(cors(corsOptions));

// Middleware setup
app.use(express.json());
app.use(morgan("dev"));

// WebSocket (Socket.IO) Connection
io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Listen for a user joining a specific chat room
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat room ${chatId}`);
  });

  // Handle sending a message and saving it to the database
  socket.on("sendMessage", async ({ chatId, sender, content }) => {
    try {
      // Save the message to the database
      const message = new Message({ chat: chatId, sender, content });
      await message.save();

      // Emit the message to all participants in the chat room
      io.to(chatId).emit("receiveMessage", message);
      console.log(`Message sent to chat ${chatId}: ${content}`);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // Handle notifications for a specific user
  socket.on("notify", (data) => {
    io.to(data.userId).emit("notification", data.message);
    console.log(`Notification sent to user ${data.userId}: ${data.message}`);
  });

  // Handle disconnection of a user
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


  app.use("/api/auth", authRouter);
  app.use('/api/vendors', require('./routes/vendors'));


// Product Fetching Route
app.get("/api/products", async (req, res) => {
  const { category, priceRange, condition } = req.query;
  let filter = {};

  if (category) filter.category = category;
  if (condition) filter.condition = condition;
  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split("-");
    filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
  }

  try {
    const products = await Product.find(filter).limit(20); // Added pagination limit
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Routes for chat-related API
app.use("/api/chat", require("./routes/chat"));

// Serve static files (e.g., image uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware
app.use(require("./middleware/errorHandler"));

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

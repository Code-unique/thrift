const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

// Import models
const User = require("./models/User");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Vendor Users Data
const vendorUsers = [
  { name: "Vendor1", email: "vendor1@example.com", password: bcrypt.hashSync("password123", 10), role: "vendor" },
  { name: "Vendor2", email: "vendor2@example.com", password: bcrypt.hashSync("password123", 10), role: "vendor" },
  { name: "Vendor3", email: "vendor3@example.com", password: bcrypt.hashSync("password123", 10), role: "vendor" },
  { name: "Vendor4", email: "vendor4@example.com", password: bcrypt.hashSync("password123", 10), role: "vendor" },
  { name: "Vendor5", email: "vendor5@example.com", password: bcrypt.hashSync("password123", 10), role: "vendor" },
];

// Seed database
const seedVendors = async () => {
  try {
    // Clean existing vendor data
    await User.deleteMany({ role: "vendor" });

    // Insert vendor users
    const createdVendors = await User.insertMany(vendorUsers);
    console.log("Vendor users seeded:", createdVendors);

    console.log("Database seeding for vendors completed!");
  } catch (error) {
    console.error("Error seeding vendor users:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedVendors();

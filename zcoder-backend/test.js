const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Problem = require('./models/Problem');
const ChatMessage = require('./models/ChatMessage');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("✅ Connected to MongoDB");

  // 1. Create a test user
  const user = new User({
    username: "pratyush_test",
    email: "pratyush_test@gmail.com",
    passwordHash: "fakehashedpass",
    bio: "Testing user"
  });

  await user.save();
  console.log("👤 User saved:", user);

  // 2. Create a test problem created by that user
  const problem = new Problem({
    title: "Test Problem Title",
    description: "This is a test description for a coding problem.",
    tags: ["test", "mongo", "mongoose"],
    difficulty: "Medium",
    solution: "This is a test solution.",
    createdBy: user._id
  });

  await problem.save();
  console.log("❓ Problem saved:", problem);

  // 3. Create a test chat message from that user
  const message = new ChatMessage({
    roomId: "test-room-123",
    sender: user._id,
    content: "This is a test message in the room."
  });

  await message.save();
  console.log("💬 Message saved:", message);

  // Close DB connection
  await mongoose.connection.close();
  console.log("🔌 Connection closed.");
})
.catch(err => {
  console.error("❌ Error:", err.message);
  mongoose.connection.close();
});
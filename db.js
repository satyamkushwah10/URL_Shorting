// db.js or inside app.js/server.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://satyamkushwah:2l73LjrKDmn22mVm@test.sg7tsg3.mongodb.net/?retryWrites=true&w=majority&appName=test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

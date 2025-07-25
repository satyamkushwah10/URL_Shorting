const express = require('express');
const app = express();
const connectDB = require("./db"); // adjust path

const urlRoutes = require("./routes/url");

connectDB(); // connect to DB

// Start server
const PORT = 1000;
app.use(express.json()); // for parsing application/json

app.use("/url", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
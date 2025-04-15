const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/config");
const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/ticket");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/ticket", ticketRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();

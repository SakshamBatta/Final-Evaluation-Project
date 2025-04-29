const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/config");
const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/ticket");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const chatbotRoutes = require("./routes/chatbot");
const analyticsRoutes = require("./routes/analytics");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
connectDB();

const mongoose = require("mongoose");

const chatbotSchema = new mongoose.Schema({
  headerColor: String,
  backgroundColor: String,
  customMessage1: String,
  customMessage2: String,
  name: String,
  phone: String,
  email: String,
  buttonText: String,
  welcomeMessage: String,
  hours: String,
  minutes: String,
  seconds: String,
});

module.exports = mongoose.model("Chatbot", chatbotSchema);

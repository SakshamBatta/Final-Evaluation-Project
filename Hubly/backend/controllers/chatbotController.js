const Chatbot = require("../models/Chatbot");

exports.saveChatbotSettings = async (req, res) => {
  try {
    const existingChatbot = await Chatbot.findOne();

    if (existingChatbot) {
      await Chatbot.updateOne({}, { $set: req.body.dataToSend });

      return res.status(200).json({ message: "Chatbot settings saved" });
    }

    const chatbot = new Chatbot(req.body.dataToSend);
    await chatbot.save();

    res.status(200).json({ message: "Chatbot settings saved" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getChatbotSettings = async (req, res) => {
  const chatbot = await Chatbot.findOne({});

  return res.status(200).json({
    chatbot,
  });
};
exports.getChatbotMessage = async (req, res) => {
  const chatbot = await Chatbot.findOne({});
  const message = chatbot.welcomeMessage;

  return res.status(200).json({
    message,
  });
};

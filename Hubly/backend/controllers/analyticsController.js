const Ticket = require("../models/Ticket");
const Chatbot = require("../models/Chatbot");

exports.getTotalChats = async (req, res) => {
  try {
    const totalChats = await Ticket.countDocuments();
    res.status(200).json({
      totalChats: totalChats,
    });
  } catch (error) {
    console.error("Error fetching total chats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch total chats",
      error: error.message,
    });
  }
};

exports.resolvedTickets = async (req, res) => {
  try {
    const resolvedTickets = await Ticket.countDocuments({ status: "Resolved" });
    const totalTickets = await Ticket.countDocuments();

    const resolvedPercentage =
      totalTickets > 0 ? (resolvedTickets / totalTickets) * 100 : 0;

    res.status(200).json({
      resolvedTickets: resolvedTickets,
      resolvedPercentage: resolvedPercentage.toFixed(0),
    });
  } catch (error) {
    console.error("Error fetching resolved tickets:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch resolved tickets",
      error: error.message,
    });
  }
};

exports.getMissedChats = async (req, res) => {
  try {
    const chatbotSettings = await Chatbot.findOne({});

    const replyTimeoutMs =
      (parseInt(chatbotSettings.hours) * 3600 +
        parseInt(chatbotSettings.minutes) * 60 +
        parseInt(chatbotSettings.seconds)) *
      1000;

    const tickets = await Ticket.find({}).lean();

    const missedChatTimestamps = [];

    for (const ticket of tickets) {
      const customerMessages = ticket.messages.filter(
        (msg) => msg.sender === "customer"
      );

      for (let i = 0; i < customerMessages.length; i++) {
        const customerMsg = customerMessages[i];

        const adminReply = ticket.messages.find(
          (msg) =>
            (msg.sender === "admin" || msg.sender === "team_member") &&
            new Date(msg.timestamp) > new Date(customerMsg.timestamp) &&
            new Date(msg.timestamp) - new Date(customerMsg.timestamp) <=
              replyTimeoutMs
        );

        if (!adminReply) {
          missedChatTimestamps.push(customerMsg.timestamp);
        }
      }
    }

    res.status(200).json({
      totalMissedChats: missedChatTimestamps.length,
      missedChatTimestamps,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getAverageReplyTime = async (req, res) => {
  try {
    const tickets = await Ticket.find({}).lean();

    let averageReplyTimeSum = 0;
    let count = 0;

    for (const ticket of tickets) {
      const createdAt = new Date(ticket.createdAt);

      const adminReply = ticket.messages.find(
        (msg) => msg.sender === "admin" || msg.sender === "team-member"
      );

      if (adminReply) {
        const diffInMs = new Date(adminReply.timestamp) - createdAt;
        averageReplyTimeSum += diffInMs;
        count++;
      }
    }

    if (count === 0) {
      return res.status(200).json({ averageReplyTime: 0 });
    }

    const averageReplyTimeInMs = averageReplyTimeSum / count;
    const averageReplyTimeInSeconds = averageReplyTimeInMs / 1000;

    res
      .status(200)
      .json({ averageReplyTime: averageReplyTimeInSeconds.toFixed(0) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

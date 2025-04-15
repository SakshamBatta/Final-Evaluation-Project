const Ticket = require("../models/Ticket");
const User = require("../models/User");

exports.createTicket = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await User.findOne({ role: "admin" });

    let existingTicket = await Ticket.findOne({ phone, status: "unresolved" });

    if (!existingTicket) {
      existingTicket = new Ticket({
        name,
        phone,
        email,
        assigned_to: admin ? admin._id : null,
        messages: [],
      });

      await existingTicket.save();
    }

    res.status(200).json({
      existingTicket,
    });
  } catch (error) {
    console.error("Error creating ticket", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addMessageToTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text are required" });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.messages.push({ text });
    await ticket.save();

    res.status(200).json({ ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.replyToTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { text, sender } = req.body;

    if (!text || !sender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.messages.push({
      text,
      sender,
    });

    await ticket.save();

    res.status(201).json({
      message: "Reply sent successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error replying to ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

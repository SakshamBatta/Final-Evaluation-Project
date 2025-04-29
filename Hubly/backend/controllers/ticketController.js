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

exports.getAllTickets = async (req, res) => {
  try {
    const userId = req.id;
    const userRole = req.role;

    let ticketsQuery = {};

    if (userRole !== "admin") {
      ticketsQuery = { assigned_to: userId };
    }
    const tickets = await Ticket.find(ticketsQuery).sort({ updaredAt: -1 });

    const formattedTickets = tickets.map((ticket, index) => {
      const lastMessage = ticket.messages?.[ticket.messages.length - 1];

      const createdDate = new Date(ticket.createdAt);
      const year = createdDate.getFullYear();
      const month = (createdDate.getMonth() + 1).toString().padStart(2, "0");
      const day = createdDate.getDate().toString().padStart(2, "0");

      const ticketTitle = `Ticket# ${year}-0${month}${day}`;

      return {
        id: ticket._id,
        title: ticketTitle,
        name: `Chat ${index + 1}`,
        status: ticket.status,
        assigned_to: ticket.assigned_to,
        lastMsg: lastMessage?.text || "No message yet",
        date: lastMessage
          ? new Date(lastMessage.timestamp).toLocaleDateString("en-IN", {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "",
        userDetails: {
          name: ticket.name,
          email: ticket.email,
          phone: ticket.phone,
        },
        messages: ticket.messages.map((msg) => ({
          from: msg.sender === "customer" ? "user" : "admin",
          text: msg.text,
        })),
      };
    });

    res.json(formattedTickets);
  } catch (err) {
    console.error("Error fetching all tickets:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

exports.resolveTicket = async (req, res) => {
  const { ticketId } = req.params;

  const ticket = await Ticket.findByIdAndUpdate(ticketId, {
    status: "Resolved",
  });

  if (!ticket) {
    return res.status(400).json({ message: "No ticket found" });
  }

  res.status(200).json({ message: "Ticket resolved successfully" });
};

exports.assignTicket = async (req, res) => {
  try {
    const { ticketId, memberId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.assigned_to = memberId;
    await ticket.save();

    res.json({ success: true, message: "Ticket assigned successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ smessage: "Internal Server Error" });
  }
};

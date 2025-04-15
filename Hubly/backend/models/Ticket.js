const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      enum: ["admin", "team_member", "customer"],
      default: "customer",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  messages: [messageSchema],

  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  status: {
    type: String,
    enum: ["unresolved", "resolved"],
    default: "unresolved",
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);

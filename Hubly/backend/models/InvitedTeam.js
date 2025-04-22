const mongoose = require("mongoose");

const invitedTeamSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  invited_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("InvitedTeam", invitedTeamSchema);

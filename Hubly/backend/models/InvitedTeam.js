const mongoose = require("mongoose");

const invitedTeamSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  invited_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("InvitedTeam", invitedTeamSchema);

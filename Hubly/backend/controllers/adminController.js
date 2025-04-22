const InvitedTeam = require("../models/InvitedTeam");
const User = require("../models/User");

exports.inviteTeamMember = async (req, res) => {
  try {
    const { username, email, phone } = req.body;
    const adminId = req.id;

    const alreadyInvited = await InvitedTeam.findOne({ email });

    if (alreadyInvited) {
      return res.status(409).json({ message: "User already invited" });
    }

    await InvitedTeam.create({ username, email, phone, invited_by: adminId });

    res.status(201).json({ message: "Team member invited successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTeam = async (req, res) => {
  try {
    const adminId = req.id;

    const admin = await User.findById(adminId).select(
      "_id firstName lastName email role"
    );

    const members = await InvitedTeam.find({ invited_by: adminId }).select(
      "_id username email phone"
    );

    const team = [
      {
        id: admin._id,
        name: `${admin.firstName} ${admin.lastName}`.trim(),
        email: admin.email,
        role: admin.role,
      },
      ...members.map((member) => ({
        id: member._id,
        name: member.username,
        email: member.email,
        phone: member.phone,
        role: "team_member",
      })),
    ];

    res.status(200).json({ success: true, team });
  } catch (err) {
    console.error("Error fetching team:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

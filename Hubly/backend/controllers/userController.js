const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { firstName, lastName, email, password } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    let isSensitiveChange = false;

    if (firstName && firstName !== user.firstName) {
      user.firstName = firstName;
      isSensitiveChange = true;
    }

    if (lastName && lastName !== user.lastName) {
      user.lastName = lastName;
      isSensitiveChange = true;
    }

    if (email && email !== user.email) {
      user.email = email;
      isSensitiveChange = true;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      isSensitiveChange = true;
    }

    await user.save();

    if (isSensitiveChange) {
      return res.status(200).json({
        message: "Profile updated. Please login again.",
        logout: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.id = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    console.error("Token error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyAdmin;

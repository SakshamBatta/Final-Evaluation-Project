const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.id = decoded.id;
    next();
  } catch (err) {
    console.error("Token error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyAdmin;

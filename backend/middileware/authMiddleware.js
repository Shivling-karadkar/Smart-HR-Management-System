const jwt = require("jsonwebtoken");
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || "MySuperMErnHRSecret";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ msg: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // attach full user info (id + role) from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = { authMiddleware, authorizeRoles };

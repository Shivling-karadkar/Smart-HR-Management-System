const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "MySuperMErnHRSecret";

// Helper: generate token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // include role!
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashPassword });

    const token = generateToken(user);

    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      msg: "User login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

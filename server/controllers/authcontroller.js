const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER FUNCTION
const register = async (req, res) => {
  try {
    const { username, name, email, password, phone, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email aur password required hain!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email pehle se registered hai!" });
    }

    let hashedPassword = password;
    try {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    } catch (err) {
      console.log("Bcrypt hash skipped/failed.");
    }

    const newUser = new User({
      username: username || email.split("@")[0],
      name: name || username || email.split("@")[0],
      email: email,
      password: hashedPassword,
      phone: phone || "0000000000",
      role: role || "user"
    });

    await newUser.save();
    return res.status(201).json({ message: "Registration successful!" });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};

// LOGIN FUNCTION (Token & User Response Fix)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email aur password required hain!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User nahi mila!" });
    }

    // Password verification (if hashed)
    if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$")) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Galat password!" });
      }
    } else if (user.password !== password) {
      return res.status(400).json({ message: "Galat password!" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey123",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login Successful",
      token : token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};

module.exports = {
  register,
  login
};
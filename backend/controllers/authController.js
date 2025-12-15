import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ---------------- CUSTOMER SIGNUP ----------------
export const signupCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "customer"
    });

    res.json({ message: "Customer registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- VENDOR SIGNUP -------------------
export const signupVendor = async (req, res) => {
  try {
    const { name, email, password, vendorType } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "vendor",
      vendorType
    });

    res.json({ message: "Vendor registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- LOGIN (ALL ROLES) ---------------
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

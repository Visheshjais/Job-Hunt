import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataUri, cloudinary } from "../utils/cloudinary.js";

/* ── Register ── */
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }
    const file = req.file;
    let profilePhotoUrl = "";
    if (file) {
      const dataUri = getDataUri(file);
      const cloudRes = await cloudinary.uploader.upload(dataUri.content);
      profilePhotoUrl = cloudRes.secure_url;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname, email, phoneNumber: Number(phoneNumber), password: hashedPassword, role,
      profile: { profilePhoto: profilePhotoUrl },
    });
    return res.status(201).json({ message: "Account created successfully!", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

/* ── Login ── */
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password", success: false });
    }
    if (role !== user.role) {
      return res.status(400).json({ message: "Account doesn't exist with this role", success: false });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
    const userData = {
      _id: user._id, fullname: user.fullname, email: user.email,
      phoneNumber: user.phoneNumber, role: user.role, profile: user.profile,
    };
    return res.status(200).cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "none", secure: true,
    }).json({ message: `Welcome back, ${user.fullname}!`, user: userData, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

/* ── Logout ── */
export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

/* ── Update Profile ── */
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    let resumeUrl = "", resumeOriginalName = "";
    if (file) {
      const dataUri = getDataUri(file);
      const cloudRes = await cloudinary.uploader.upload(dataUri.content);
      resumeUrl = cloudRes.secure_url;
      resumeOriginalName = file.originalname;
    }
    const skillsArray = skills ? skills.split(",").map(s => s.trim()) : [];
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = Number(phoneNumber);
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    if (resumeUrl) { user.profile.resume = resumeUrl; user.profile.resumeOriginalName = resumeOriginalName; }

    await user.save();
    const userData = {
      _id: user._id, fullname: user.fullname, email: user.email,
      phoneNumber: user.phoneNumber, role: user.role, profile: user.profile,
    };
    return res.status(200).json({ message: "Profile updated successfully", user: userData, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

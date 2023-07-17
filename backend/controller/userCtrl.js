// const Users = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
import User from "../models/userModel.js";

import generateToken from "../util/generateToken.js";
import asyncHandler from "express-async-handler";

const authUser = asyncHandler(async (req, res) => {
  res.json({ msg: "Auth User" });
});
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  }

  // res.json({ msg: "Register User" });
});
const loginUser = asyncHandler(async (req, res) => {
  res.json({ msg: "Login User" });
});
const logoutUser = asyncHandler(async (req, res) => {
  res.json({ msg: "Logout User" });
});
const getUserProfile = asyncHandler(async (req, res) => {
  res.json({ msg: "Profile User" });
});
const updateUserProfile = asyncHandler(async (req, res) => {
  res.json({ msg: "Update Profile User" });
});

// const userCtrl = {
//   registerUser: async (req, res) => {
//     try {
//       const { username, email, password } = req.body;
//       const user = await Users.findOne({ email: email });
//       if (user)
//         return res.status(400).json({ msg: "The email already exists." });

//       const passwordHash = await bcrypt.hash(password, 10);
//       const newUser = new Users({
//         username: username,
//         email: email,
//         password: passwordHash,
//       });
//       await newUser.save();
//       // res.json(newUser);
//       res.json({ msg: "Sign up Success" });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   loginUser: async (req, res) => {
//     const { email, password } = req.body;
//     const user = await Users.findOne({ email: email });
//     if (!user) return res.status(400).json({ msg: "User does not exists." });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

//     const payload = { id: user._id, name: user.username };
//     const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
//       expiresIn: "1d",
//     });

//     res.json({ token });

//     res.json({ msg: "Login a User" });
//   },
//   verifiedToken: (req, res) => {
//     try {
//       const token = req.header("Authorization");
//       if (!token) return res.send(false);

//       jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
//         if (err) return res.send(false);

//         const user = await Users.findById(verified.id);
//         if (!user) return res.send(false);

//         return res.send(true);
//       });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
// };
export {
  authUser,
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};

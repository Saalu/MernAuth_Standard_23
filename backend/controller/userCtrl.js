import User from "../models/userModel.js";
import generateToken from "../util/generateToken.js";
import asyncHandler from "express-async-handler";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
// Register
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
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // res.json({ msg: "Register User" });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ msg: "User logged out" });
});
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.json({ user });
});
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = password;
    }

    const userUpdated = await user.save();
    res.json(userUpdated);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// const updateUserProfile = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { name, email, password } = req.body;
//     const user = await User.findByIdAndUpdate(
//       userId,
//       { name, email, password },
//       { new: true }
//     );

//     res.json({ msg: user });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };

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
  logoutUser,
  getUserProfile,
  updateUserProfile,
};

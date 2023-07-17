import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controller/userCtrl.js";
// const userCtrl = require("../controller/userCtrl");

//Register

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);

export default router;

import express from "express";
import { getOtherUsers, login, logout, register } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// sign up new user
router.route("/register").post(register);

// login existing user
router.route("/login").post(login);

// logout existing user
router.route("/logout").get(logout);

// home page for chating
router.route("/").get(isAuthenticated, getOtherUsers);

export default router;
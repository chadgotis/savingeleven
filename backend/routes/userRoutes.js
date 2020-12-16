import express from "express";
const router = express.Router();
import {
  getUsers,
  getUsersById,
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

// Get All users
// Access : Private
// /api/users/
router.route("/").get(getUsers);

// Register User
// Access : Private
// /api/users/
router.route("/").post(registerUser);

// Get user Profile
// Access : Private
// /api/users/profile
router.route("/profile").get(protect, getUserProfile);

// Get user By ID
// Access : Private
// /api/users/:id
router.route("/:id").get(getUsersById);

// Login User
// Access : Public
// /api/users/login
router.route("/login").post(authUser);

export default router;

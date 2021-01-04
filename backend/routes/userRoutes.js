import express from "express";
const router = express.Router();
import {
  getUsersById,
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsersList,
  removeUser,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

// Register User
// Access : public / admin
// /api/users/
router.route("/").post(registerUser).get(protect, admin, getUsersList);

// Get user Profile && Update User Profile
// Access : Private
// /api/users/profile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Login User
// Access : Public
// /api/users/login
router.route("/login").post(authUser);

// Get user By ID, Delete User
// Access : Private
// /api/users/:id
router
  .route("/:id")
  .get(protect, admin, getUsersById)
  .delete(protect, admin, removeUser)
  .put(protect, admin, updateUser);

export default router;

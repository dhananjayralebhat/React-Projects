import express from "express";
import {
  login,
  signup,
  updateProfile,
  checkAuth,
  getAllUsers,
} from "../controllers/userController.js";
import { protectRoute } from "../middleware/auth.js";

const userRouter = express.Router();

// Auth routes
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", protectRoute, updateProfile);
userRouter.get("/check", protectRoute, checkAuth);

// Users route
userRouter.get("/users", protectRoute, getAllUsers);

export default userRouter;

import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/user.middleware.js";

const router = Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);

export default router;

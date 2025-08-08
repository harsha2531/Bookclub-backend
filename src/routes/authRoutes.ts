import { Router } from "express";
import { login, register } from "../controllers/authController";

const router = Router();

// Login staff
router.post("/login", login);

// Register staff (use once to create admin account)
router.post("/register", register);

export default router;

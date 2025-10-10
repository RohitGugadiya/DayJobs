import express from "express";
import { login, signup, getUser } from "../controllers/auth.controllers";     

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/users/:id", getUser);

export default router;  
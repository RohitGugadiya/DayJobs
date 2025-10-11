import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";


const router = express.Router();

const cookiesOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
};

const generateToken = (id) => { 
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
}
router.post("/signup", async(req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]); 
    if (userExists.rows.length > 0) {
        res.status(400).json({ message: "User already exists" });
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
        [name, email, hashedPassword]
     );

    const token = generateToken(newUser.rows[0].id);
    res.cookie("token", token, cookiesOptions);
    res.status(201).json({ message: "User created successfully", user: newUser.rows[0], token });
}           
);

router.post("/login", async(req, res) => { 

    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const userData = user.rows[0];

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }   
    const token = generateToken(userData.id);
    res.cookie("token", token, cookiesOptions);
    res.json({ message: "Login successful", user: { id: userData.id, username: userData.username, email: userData.email }});

   
});

router.get("/home", authMiddleware, async(req, res) => {
    res.json(req.user); } )

export default router;
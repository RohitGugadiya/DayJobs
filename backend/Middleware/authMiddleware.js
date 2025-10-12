import pool from "../config/db.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) =>{
    try {   
    const token =req.cookies.token;
    console.log("User authenticated:", token);

    if(!token) {
        return res.status(401).json({message: "No token, authorization denied"});   
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await pool.query("SELECT name, email, id FROM users WHERE id = $1", [decoded.id]);
    console.log(user.rows[0]);
    if (user.rows.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    req.user = user.rows[0];
    next();
}
catch (error) {
    console.error("Auth middleware error:", error);     
    res.status(500).json({ message: "Server error authmid" });
}       
};
import pool from "../config/db.js";

export const authMiddleware = async (req, res, next) =>{
    try {   
    const token =req.cookies.token;

    if(!token) {
        return res.status(401).json({message: "No token, authorization denied"});   
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = pool.query("SELECT id, username, email FROM users WHERE id = $1", [decoded.id]);
    if (user.rows.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    req.user = user.rows[0];
    next();
}
catch (error) {
    console.error("Auth middleware error:", error);     
    res.status(500).json({ message: "Server error" });
}       
};
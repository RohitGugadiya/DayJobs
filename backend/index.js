import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import jobsRoutes from "./routes/jobs.routes.js";  
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authMiddleware } from "./Middleware/authMiddleware.js";
dotenv.config();

const app = express();


  app.use(cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
  }));


  app.use(express.json());
  app.use(cookieParser());
  
  app.use("/api/auth", authRoutes);
  app.use("/api/jobs", jobsRoutes);

  
  const PORT = process.env.PORT || 5000;

  app.get("/", (req, res) => {
    res.send("Simple CRUD API is running 🚀");
  });

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

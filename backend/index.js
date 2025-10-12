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
//  const availableJobs= [
  //     { id: 1, title: "Furniture Move", location: "Adelaide CBD", date: "2025-10-10" },
  //     { id: 2, title: "Office Relocation", location: "Glenelg", date: "2025-10-12" },
  //     { id: 3, title: "Storage Move", location: "Mawson Lakes", date: "2025-10-18" },
  //   ];
  
  app.use("/api/auth", authRoutes);
  app.use("/api/jobs", jobsRoutes);

  
  const PORT = process.env.PORT || 5000;


// // ======== READ one post by ID ========
// app.get("/api/posts/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const post = jobs.find((p) => p.id === id);

//   if (!post) {
//     return res.status(404).json({ message: "Post not found" });
//   }

//   res.json(post);
// });

// // ======== CREATE new post ========
// app.post("/api/posts", (req, res) => {
//   const { title, content } = req.body;

//   if (!title || !content) {
//     return res.status(400).json({ message: "Title and content are required" });
//   }

//   const newPost = {
    
//     id: jobs.length + 1,
//     title,
//     content,
//   };

//   jobs.push(newPost);
//   res.status(201).json(newPost);
// });

// // ======== UPDATE a post ========
// app.put("/api/posts/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const post = jobs.find((p) => p.id === id);

//   if (!post) {
//     return res.status(404).json({ message: "Post not found" });
//   }




//   const { title, content } = req.body;

//   if (title) post.title = title;
//   if (content) post.content = content;

//   res.json(post);
// });

// // ======== DELETE a post ========
// app.delete("/api/posts/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = jobs.findIndex((p) => p.id === id);

//   if (index === -1) {
//     return res.status(404).json({ message: "Post not found" });
//   }

//   const deleted = jobs.splice(index, 1);
//   res.json({ message: "Post deleted", post: deleted[0] });
// });

// ======== ROOT route ========
app.get("/", (req, res) => {
  res.send("Simple CRUD API is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes";
import jobsRoutes from "./routes/jobs.routes";  

const app = express();
app.use(cors());

const PORT = 3000;
// Middleware to parse JSON request bodies
app.use(express.json());

// Dummy data
let users = [
  
  { id: 1, name: "Rohit", email: "rohitgugadiya@gmail.com", password: "12345",  acceptedJobs: []},
  { id: 2, name: "John", email: "John@gmail.com", password: "67890", acceptedJobs: [] },
  { id: 3, name: "Jane", email: "Jane@gmail.com", password: "78901", acceptedJobs: [] }
];

 const availableJobs= [
    { id: 1, title: "Furniture Move", location: "Adelaide CBD", date: "2025-10-10" },
    { id: 2, title: "Office Relocation", location: "Glenelg", date: "2025-10-12" },
    { id: 3, title: "Storage Move", location: "Mawson Lakes", date: "2025-10-18" },
  ];
// ======== READ all posts ========
app.post("/api/auth", authRoutes);


app.get("/api/jobs", jobsRoutes);


  



app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
});

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

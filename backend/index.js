import express from "express";

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Dummy data
let posts = [
  { id: 1, title: "First Post", content: "This is my first post." },
  { id: 2, title: "Second Post", content: "This is my second post." },
];

// ======== READ all posts ========
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// ======== READ one post by ID ========
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});

// ======== CREATE new post ========
app.post("/api/posts", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// ======== UPDATE a post ========
app.put("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }




  const { title, content } = req.body;

  if (title) post.title = title;
  if (content) post.content = content;

  res.json(post);
});

// ======== DELETE a post ========
app.delete("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  const deleted = posts.splice(index, 1);
  res.json({ message: "Post deleted", post: deleted[0] });
});

// ======== ROOT route ========
app.get("/", (req, res) => {
  res.send("Simple CRUD API is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

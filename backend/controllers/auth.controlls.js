export const login = async(req, res) => { console.log(req.body);
    
    const userEmail = req.body.email;
    const userPassword = req.body.password;
      const user = users.find(u => u.email === userEmail && u.password === userPassword);
      if (user) {
        res.json({ message: "Login successful", user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
}

export const signup = async(req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
    }
}           

export const getUser = async(req, res) => {
    console.log(req.params.id);
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
}
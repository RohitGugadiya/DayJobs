import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../CSS/LoginPage.css"; 
import { useAuthStore } from "../store/userAuthStore.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password })
      .then(() => {
        setMessage("Login successful! Redirecting...");
        console.log("Login successful! Redirecting...");
        navigate("/");
      })
  
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-footer">
          Don’t have an account? <Link to="/SignUp">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginstyle.css"; // Your existing CSS

function Login() {
  const navigate = useNavigate();

  const [action, setAction] = useState("Sign Up");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on input change
  };

  const switchMode = () => {
    setAction(action === "Sign Up" ? "Login" : "Sign Up");
    setError("");
    setFormData({ username: "", email: "", password: "" });
  };

  const handleSubmit = async () => {
    setError("");

    // ✅ VALIDATION
    if (!formData.username || !formData.password) {
      setError("Username and password are required");
      return;
    }

    if (action === "Sign Up" && !formData.email) {
      setError("Email is required for registration");
      return;
    }

    const endpoint =
      action === "Sign Up"
        ? "https://moviealert-26ig.onrender.com/api/auth/register"
        : "https://moviealert-26ig.onrender.com/api/auth/login";

    const payload =
      action === "Sign Up"
        ? {
            username: formData.username,
            email: formData.email,
            password: formData.password
          }
        : {
            username: formData.username,
            password: formData.password
          };

    console.log("🔐 Auth request:", action, endpoint);

    setIsLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      console.log("📥 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Auth error:", errorText);
        
        if (response.status === 409) {
          setError("Username already exists. Please choose another.");
        } else if (response.status === 401) {
          setError("Invalid username or password.");
        } else {
          setError(`Error: ${errorText || "Authentication failed"}`);
        }
        return;
      }

      const data = await response.json();
      console.log("✅ Auth response:", data);

      if (action === "Sign Up") {
        // ✅ REGISTRATION SUCCESS - now log them in
        setError("");
        alert("✅ Registration successful! You can now log in.");
        setAction("Login");
        setFormData({ ...formData, email: "" });
        
      } else {
        // ✅ LOGIN SUCCESS - store token
        
        // Check if token exists in response
        const token = data.token || data.jwt || data.accessToken;
        
        if (!token) {
          console.error("❌ No token in response:", data);
          setError("Login succeeded but no token received. Please contact support.");
          return;
        }

        // ✅ STORE TOKEN
        localStorage.setItem("token", token);
        console.log("✅ Token stored successfully!");
        console.log("Token (first 30 chars):", token.substring(0, 30) + "...");

        // ✅ VERIFY TOKEN WAS STORED
        const storedToken = localStorage.getItem("token");
        if (storedToken !== token) {
          console.error("❌ Token storage failed!");
          setError("Token storage failed. Please try again.");
          return;
        }

        console.log("✅ Token verified in localStorage");
        
        // Navigate to movies page
        navigate("/movie");
      }

    } catch (err) {
      console.error("❌ Network error:", err);
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        
        <div className="auth-logo">
          <span style={{ fontSize: "2rem" }}>🎬</span>
          <h1 className="auth-title">CINEPLEX</h1>
        </div>

        <p style={{ 
          textAlign: "center", 
          color: "#8a93a6", 
          fontSize: "0.9rem",
          marginBottom: "24px" 
        }}>
          {action === "Sign Up" 
            ? "Create your account to start booking" 
            : "Welcome back! Please sign in"}
        </p>

        {/* USERNAME */}
        <div className="auth-input-group">
          <span className="input-icon">👤</span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
        </div>

        {/* EMAIL (Sign Up only) */}
        {action === "Sign Up" && (
          <div className="auth-input-group">
            <span className="input-icon">✉️</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
          </div>
        )}

        {/* PASSWORD */}
        <div className="auth-input-group">
          <span className="input-icon">🔒</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="auth-error">
            ⚠️ {error}
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          className={`btn btn-primary auth-submit${isLoading ? " is-loading" : ""}`}
          onClick={handleSubmit}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              {action === "Sign Up" ? "Creating Account..." : "Signing In..."}
            </>
          ) : (
            action
          )}
        </button>

        {/* SWITCH MODE */}
        <div className="auth-switch">
          {action === "Sign Up" 
            ? "Already have an account? " 
            : "Don't have an account? "}
          <button 
            onClick={switchMode}
            disabled={isLoading}
            style={{ 
              background: "none", 
              border: "none", 
              color: "#f5a623",
              cursor: "pointer",
              textDecoration: "underline",
              fontWeight: "600"
            }}
          >
            {action === "Sign Up" ? "Login" : "Sign Up"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;

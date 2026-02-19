import React, { useState } from "react";
import "./loginstyle1.css";
import user_icon from "../assets/person.png";
import user_email from "../assets/email.png";
import user_pass from "../assets/password.png";
import user_telephone from "../assets/telephone.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setError(""); // clear error when user types
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const switchMode = (mode) => {
    setAction(mode);
    setError("");
    setFormData({
      name: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.username || !formData.password) {
      setError("Username and password are required");
      return;
    }

    if (action === "Sign Up") {
      if (!formData.name || !formData.email || !formData.phoneNumber) {
        setError("All fields are required for registration");
        return;
      }
    }

    const url =
      action === "Login"
        ? "https://moviealert-26ig.onrender.com/api/auth/login"
        : "https://moviealert-26ig.onrender.com/api/auth/register";

    const payload =
      action === "Login"
        ? {
            username: formData.username,
            password: formData.password,
          }
        : {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
          };

    console.log("🔐 Auth request:", action, url);

    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("📥 Response:", response.status, data);

      if (response.ok) {
        setError("");
        
        // Store token
        const token = data.token || data.jwt || data.accessToken;
        if (token) {
          localStorage.setItem("token", token);
          console.log("✅ Token stored successfully");
        }

        // Navigate to movies
        navigate("/movie");
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      setError("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        
        {/* Logo Section */}
        <div className="auth-logo">
          <span>🎬</span>
          <h1 className="auth-title">CINEPLEX</h1>
        </div>

        {/* Subtitle */}
        <p className="auth-subtitle">
          {action === "Login" 
            ? "Welcome back! Sign in to continue" 
            : "Create your account to start booking"}
        </p>

        {/* Form */}
        <form autoComplete="off" onSubmit={handleSubmit}>
          
          {/* Sign Up Fields */}
          {action === "Sign Up" && (
            <>
              {/* Name */}
              <div className="auth-input-group">
                <img src={user_icon} alt="" className="input-icon-img" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  disabled={isLoading}
                />
              </div>

              {/* Username */}
              <div className="auth-input-group">
                <img src={user_icon} alt="" className="input-icon-img" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  disabled={isLoading}
                />
              </div>

              {/* Email */}
              <div className="auth-input-group">
                <img src={user_email} alt="" className="input-icon-img" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  disabled={isLoading}
                />
              </div>

              {/* Phone Number */}
              <div className="auth-input-group">
                <img src={user_telephone} alt="" className="input-icon-img" />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div className="auth-input-group">
                <img src={user_pass} alt="" className="input-icon-img" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="new-password"
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          {/* Login Fields */}
          {action === "Login" && (
            <>
              {/* Username */}
              <div className="auth-input-group">
                <img src={user_icon} alt="" className="input-icon-img" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div className="auth-input-group">
                <img src={user_pass} alt="" className="input-icon-img" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="new-password"
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="auth-error">
              ⚠️ {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`auth-submit${isLoading ? " is-loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                {action === "Sign Up" ? "Creating Account..." : "Signing In..."}
              </>
            ) : (
              action === "Sign Up" ? "Sign Up" : "Login"
            )}
          </button>
        </form>

        {/* Mode Switch */}
        <div className="auth-switch">
          {action === "Login" ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => switchMode("Sign Up")} disabled={isLoading}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => switchMode("Login")} disabled={isLoading}>
                Login
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Login;

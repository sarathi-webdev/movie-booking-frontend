import React, { useState } from "react";
import "./login.css";
import user_icon from "../assets/person.png";
import user_email from "../assets/email.png";
import user_pass from "../assets/password.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const switchMode = (mode) => {
    setAction(mode);
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

    if (!formData.username || !formData.password) {
      alert("Username and Password are required");
      return;
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

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(action + " successful");
        navigate("/movie");
      } else {
        alert(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      {/* FORM WITH AUTOCOMPLETE OFF */}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="inputs">
          {action === "Sign Up" && (
            <>
              <div className="input">
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

               <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

              <div className="input">
                <img src={user_email} alt="" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="input">
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="input">
            <img src={user_pass} alt="" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
            </>
          )}
         
         {action  === "Login" && (
          <>
             <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="input">
            <img src={user_pass} alt="" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
         
          </>
         )}
            
            
        </div>

        {/* SINGLE SUBMIT BUTTON */}
        <div className="submit-container d-flex justify-content-center">
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>

      {/* MODE SWITCH */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {action === "Login" ? (
          <p>
            Don’t have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => switchMode("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => switchMode("Login")}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;





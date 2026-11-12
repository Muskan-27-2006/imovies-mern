import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("passwords do not match!");
      return;
    }
    try {
      await API.post("/auth/register", formData);
      alert("registration successful! please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "registration failed");
    }
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "420px", backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "30px", boxSizing: "border-box" }}>
        <h2 style={{ color: "#ffffff", textAlign: "center", marginBottom: "4px", fontSize: "24px" }}>iMovies</h2>
        <h4 style={{ color: "#94a3b8", textAlign: "center", marginBottom: "20px", fontWeight: "500" }}>Register</h4>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ color: "#cbd5e1", fontSize: "14px" }}>Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              style={{ padding: "12px", borderRadius: "6px", border: "1px solid #374151", backgroundColor: "#1f2937", color: "#ffffff", outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ color: "#cbd5e1", fontSize: "14px" }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ padding: "12px", borderRadius: "6px", border: "1px solid #374151", backgroundColor: "#1f2937", color: "#ffffff", outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ color: "#cbd5e1", fontSize: "14px" }}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ padding: "12px", borderRadius: "6px", border: "1px solid #374151", backgroundColor: "#1f2937", color: "#ffffff", outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ color: "#cbd5e1", fontSize: "14px" }}>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              style={{ padding: "12px", borderRadius: "6px", border: "1px solid #374151", backgroundColor: "#1f2937", color: "#ffffff", outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            />
            <label htmlFor="showPassword" style={{ color: "#94a3b8", fontSize: "13px", cursor: "pointer" }}>Show Password</label>
          </div>

          <button type="submit" style={{ padding: "12px", backgroundColor: "#e11d48", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: "600", fontSize: "15px", cursor: "pointer", marginTop: "8px" }}>
            Submit
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "16px", color: "#94a3b8", fontSize: "14px" }}>
          Already have an account? <Link to="/login" style={{ color: "#e11d48", textDecoration: "none", fontWeight: "600" }}>Login</Link>
        </div>

        <div style={{ textAlign: "center", marginTop: "12px" }}>
          <button 
            type="button" 
            onClick={() => setFormData({ ...formData, role: "admin" })}
            style={{ background: "none", border: "none", color: "#e11d48", fontSize: "13px", cursor: "pointer", textDecoration: "underline" }}
          >
            Register as an Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
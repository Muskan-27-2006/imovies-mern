import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/adminDashboard";
import ExploreMovies from "./pages/exploreMovies";
import BookTickets from "./pages/bookTickets";
import UserProducts from "./pages/userProducts";
import "./App.css";

// Admin emails list
const ADMIN_EMAILS = ["admin@imovies.com", "myadmin@gmail.com"];

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [activeTab, setActiveTab] = useState("home"); // Navigation tab state
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      try {
        setUser(JSON.parse(localStorage.getItem("user")) || null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    window.location.href = "/login";
  };

  const isAdmin = token && user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  return (
    <Router>
      <header className="navbar">
        <Link to="/" className="logo" onClick={() => setActiveTab("home")}>iMovies</Link>
        <div className="nav-links">
          {/* Home Button */}
          <Link 
            to="/" 
            className={`nav-item ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </Link>

          {/* User Bookings / Profile Button */}
          {token && (
            <Link 
              to="/user-products" 
              className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              My Bookings
            </Link>
          )}

          {/* Admin Panel Button */}
          {isAdmin && (
            <Link 
              to="/admin" 
              className={`nav-item ${activeTab === "admin" ? "active" : ""}`}
              style={{ color: "#e11d48", fontWeight: "bold" }}
              onClick={() => setActiveTab("admin")}
            >
              Admin Panel
            </Link>
          )}

          {/* Auth Action Toggle Button */}
          {token ? (
            <button onClick={handleLogout} className="btn-primary" style={{ backgroundColor: "#e50914" }}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn-primary" onClick={() => setActiveTab("login")}>
              Sign In
            </Link>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreMovies />} />
        <Route path="/book-tickets" element={<BookTickets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected User Route */}
        <Route 
          path="/user-products" 
          element={token ? <UserProducts /> : <Navigate to="/login" replace />} 
        />

        {/* Protected Admin Route Guard */}
        <Route 
          path="/admin" 
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
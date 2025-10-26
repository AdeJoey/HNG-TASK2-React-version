import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const handleDashboardClick = () => {
    setMenuOpen(false);
    if (isAuthenticated) navigate("/dashboard");
    else navigate("/login");
  };

  return (
    <header className="site-header">
      <div className="container">
        <h1 className="logo">TicketSys</h1>

        <nav className="site-nav">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <button onClick={handleDashboardClick} className="link-btn">
            Dashboard
          </button>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <Link to="/login" onClick={closeMenu}>Login</Link>
          )}
        </nav>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" onClick={closeMenu}>Home</Link>
            <button onClick={handleDashboardClick} className="link-btn">Dashboard</button>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={18} /> Logout
              </button>
            ) : (
              <Link to="/login" onClick={closeMenu}>Login</Link>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

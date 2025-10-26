import React from "react";
import "/src/App.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Ticket System</p>
      </div>
    </footer>
  );
}

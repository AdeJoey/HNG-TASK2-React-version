import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "/src/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="home-section">
      {/* Animated decorative circles */}
      <motion.div
        className="circle circle-1"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="circle circle-2"
        animate={{ y: [0, 25, 0], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      {/* Main content */}
      <div className="home-content">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Simplify Ticket Management
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Track, assign, and resolve tickets faster with a clear and efficient
          system designed for teams.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cta-btn"
          onClick={() => navigate("/signup")}
        >
          Get Started
        </motion.button>
      </div>

      {/* Wavy footer */}
      <div className="wave-footer">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="wave-svg"
        >
          <path
            fill="#271b5478"
            d="M0,224L60,208C120,192,240,160,360,154.7C480,149,600,171,720,176C840,181,960,171,1080,154.7C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
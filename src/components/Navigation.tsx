"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#countdown", label: "Countdown" },
  { href: "#story", label: "Our Story" },
  { href: "#events", label: "Events" },
  { href: "#wishes", label: "Wishes" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          background: scrolled ? "rgba(4,1,8,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,170,0,0.1)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,170,0,0.1)",
                border: "1px solid rgba(255,170,0,0.4)",
              }}
            >
              <span className="font-cinzel text-xs" style={{ color: "#FFAA00" }}>W</span>
            </div>
            <span
              className="font-great-vibes text-2xl hidden sm:block"
              style={{
                fontFamily: "Great Vibes",
                background: "linear-gradient(135deg, #B36D00, #FFAA00, #FFD047)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Wajahat Mustafa
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-cinzel text-xs tracking-[0.2em] transition-colors duration-300"
                style={{ color: "rgba(255,170,0,0.5)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,170,0,1)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,170,0,0.5)")}
              >
                {link.label.toUpperCase()}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.div
              className="w-6 h-px"
              style={{ background: "#FFAA00" }}
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
            />
            <motion.div
              className="w-6 h-px"
              style={{ background: "#FFAA00" }}
              animate={{ opacity: menuOpen ? 0 : 1 }}
            />
            <motion.div
              className="w-6 h-px"
              style={{ background: "#FFAA00" }}
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: "rgba(4,1,8,0.98)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="font-cinzel text-sm tracking-[0.4em] py-4"
                style={{ color: "rgba(255,170,0,0.6)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,170,0,1)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,170,0,0.6)")}
              >
                {link.label.toUpperCase()}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

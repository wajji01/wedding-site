"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#countdown", label: "Countdown" },
    { href: "#story", label: "Our Story" },
    { href: "#events", label: "Events" },
    { href: "#wishes", label: "Wishes" },
  ];

  return (
    <footer
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center top, #1A0535 0%, #0C0318 40%, #040108 100%)" }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,170,0,0.4), transparent)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Main message */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Large ornament */}
          <div className="flex items-center justify-center mb-8">
            <svg width="120" height="60" viewBox="0 0 120 60">
              <line x1="0" y1="30" x2="40" y2="30" stroke="rgba(255,170,0,0.3)" strokeWidth="0.5" />
              <path d="M44 30 L48 20 L52 30 L56 20 L60 30 L64 20 L68 30 L72 20 L76 30" stroke="rgba(255,170,0,0.6)" strokeWidth="1" fill="none" />
              <line x1="80" y1="30" x2="120" y2="30" stroke="rgba(255,170,0,0.3)" strokeWidth="0.5" />
              <circle cx="60" cy="45" r="3" fill="rgba(255,170,0,0.5)" />
              <circle cx="60" cy="15" r="3" fill="rgba(255,170,0,0.5)" />
            </svg>
          </div>

          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <h2
              className="font-great-vibes text-7xl md:text-8xl mb-4"
              style={{
                fontFamily: "Great Vibes",
                background: "linear-gradient(135deg, #B36D00 0%, #FFAA00 50%, #FFD047 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 30px rgba(255,170,0,0.4))",
              }}
            >
              Wajahat & His Beloved
            </h2>
          </motion.div>

          <p
            className="font-cormorant italic text-xl md:text-2xl max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(245,240,232,0.6)", fontFamily: "Cormorant Garamond" }}
          >
            &ldquo;And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy.&rdquo;
          </p>
          <p className="font-cinzel text-xs tracking-[0.3em] mt-3" style={{ color: "rgba(255,170,0,0.4)" }}>
            — QURAN 30:21
          </p>
        </motion.div>

        {/* Dates summary */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-16 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {[
            { label: "Barat", date: "10 September 2026", day: "Thursday" },
            { label: "Walima", date: "12 September 2026", day: "Saturday" },
          ].map((event) => (
            <div
              key={event.label}
              className="text-center glass-card p-4"
            >
              <p className="font-cinzel text-xs tracking-[0.3em] mb-1" style={{ color: "rgba(255,170,0,0.6)" }}>
                {event.label}
              </p>
              <p className="font-cormorant text-base" style={{ color: "rgba(245,240,232,0.8)", fontFamily: "Cormorant Garamond" }}>
                {event.date}
              </p>
              <p className="font-cormorant italic text-sm" style={{ color: "rgba(245,240,232,0.4)", fontFamily: "Cormorant Garamond" }}>
                {event.day}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Nav links */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-cinzel text-xs tracking-[0.25em] transition-colors duration-300"
              style={{ color: "rgba(255,170,0,0.4)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,170,0,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,170,0,0.4)")}
            >
              {link.label.toUpperCase()}
            </a>
          ))}
        </motion.div>

        {/* Social placeholders */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {["Instagram", "Facebook", "WhatsApp"].map((social) => (
            <motion.button
              key={social}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,170,0,0.05)", border: "1px solid rgba(255,170,0,0.2)", color: "rgba(255,170,0,0.5)" }}
              whileHover={{ background: "rgba(255,170,0,0.1)", borderColor: "rgba(255,170,0,0.4)", color: "#FFAA00", scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-cinzel text-xs">{social.charAt(0)}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,170,0,0.2), transparent)" }}
        />

        {/* Bottom */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p
            className="font-cormorant italic text-base"
            style={{ color: "rgba(245,240,232,0.3)", fontFamily: "Cormorant Garamond" }}
          >
            Made with love for the wedding of Wajahat Mustafa · September 2026 · Pakistan
          </p>
          <p className="font-cinzel text-xs tracking-widest mt-2" style={{ color: "rgba(255,170,0,0.2)" }}>
            بِسْمِ اللَّهِ
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

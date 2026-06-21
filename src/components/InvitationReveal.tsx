"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InvitationRevealProps {
  onComplete: () => void;
}

export default function InvitationReveal({ onComplete }: InvitationRevealProps) {
  const [phase, setPhase] = useState<"envelope" | "open" | "content" | "exit">("envelope");
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const s = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 2,
    }));
    setSparkles(s);

    // Auto-progress: envelope → open → content
    // But NEVER auto-exit — user must click "OPEN INVITATION"
    const t1 = setTimeout(() => setPhase("open"), 1800);
    const t2 = setTimeout(() => setPhase("content"), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleOpen = () => {
    setPhase("exit");
    // Small delay so exit animation plays before unmount
    setTimeout(() => onComplete(), 900);
  };

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden"
          style={{ background: "radial-gradient(ellipse at center, #1A0535 0%, #0C0318 40%, #040108 100%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* Background sparkles */}
          {sparkles.map((sp) => (
            <motion.div
              key={sp.id}
              className="absolute rounded-full"
              style={{
                left: `${sp.x}%`,
                top: `${sp.y}%`,
                width: sp.size,
                height: sp.size,
                background: sp.id % 3 === 0 ? "#FFD047" : sp.id % 3 === 1 ? "#FFAA00" : "#fff",
              }}
              animate={{ opacity: [0, 1, 0.3, 1, 0], scale: [0, 1, 0.7, 1.2, 0] }}
              transition={{ duration: 3, delay: sp.delay, repeat: Infinity, repeatDelay: Math.random() * 2 }}
            />
          ))}

          {/* Radial glow */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, rgba(255,170,0,0.15) 0%, transparent 70%)" }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Card container */}
          <motion.div
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* Outer glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ boxShadow: "0 0 80px rgba(255,170,0,0.4), 0 0 150px rgba(255,170,0,0.2)" }}
              animate={{ opacity: phase === "envelope" ? [0, 1] : 1 }}
              transition={{ duration: 1.5 }}
            />

            {/* The invitation card */}
            <motion.div
              className="relative overflow-hidden rounded-2xl"
              style={{
                width: "min(420px, 90vw)",
                height: "min(560px, 80vh)",
                background: "linear-gradient(145deg, #1a0a2e 0%, #0d0520 50%, #1a0a2e 100%)",
                border: "1px solid rgba(255,170,0,0.5)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
                transformStyle: "preserve-3d",
              }}
              animate={
                phase === "open"
                  ? { rotateY: [0, -15, 0], rotateX: [0, 10, 0], scale: [1, 1.05, 1] }
                  : {}
              }
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px shimmer" />
              <div className="absolute bottom-0 left-0 right-0 h-px shimmer" />

              {/* Corner ornaments */}
              {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${pos} w-8 h-8`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <svg viewBox="0 0 32 32" fill="none">
                    <path
                      d={
                        i === 0 ? "M2 30 L2 2 L30 2" :
                        i === 1 ? "M30 30 L30 2 L2 2" :
                        i === 2 ? "M2 2 L2 30 L30 30" :
                        "M30 2 L30 30 L2 30"
                      }
                      stroke="rgba(255,170,0,0.7)"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={i < 2 ? (i === 0 ? 2 : 30) : (i === 2 ? 2 : 30)}
                      cy={i < 2 ? 2 : 30}
                      r="2"
                      fill="#FFAA00"
                    />
                  </svg>
                </motion.div>
              ))}

              <div className="absolute inset-4 border border-gold-700/30 rounded-xl pointer-events-none" />

              {/* Card content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                {/* Bismillah */}
                <motion.p
                  className="text-sm tracking-[0.3em] mb-6 font-cinzel"
                  style={{ color: "rgba(255,170,0,0.7)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: phase !== "envelope" ? 1 : 0, y: phase !== "envelope" ? 0 : 10 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </motion.p>

                {/* Ornament */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: phase !== "envelope" ? 1 : 0, scale: phase !== "envelope" ? 1 : 0.5 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <svg width="80" height="30" viewBox="0 0 80 30">
                    <line x1="0" y1="15" x2="28" y2="15" stroke="rgba(255,170,0,0.6)" strokeWidth="0.5" />
                    <path d="M32 15 L36 8 L40 15 L44 8 L48 15" stroke="#FFAA00" strokeWidth="1" fill="none" />
                    <line x1="52" y1="15" x2="80" y2="15" stroke="rgba(255,170,0,0.6)" strokeWidth="0.5" />
                    <circle cx="40" cy="22" r="2" fill="#FFAA00" />
                  </svg>
                </motion.div>

                {/* Invite text */}
                <motion.p
                  className="font-cormorant italic text-base tracking-widest mb-4"
                  style={{ color: "rgba(245,240,232,0.7)", fontFamily: "Cormorant Garamond" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase !== "envelope" ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  With love &amp; blessings, you are invited to
                </motion.p>

                {/* Names */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: phase !== "envelope" ? 1 : 0, y: phase !== "envelope" ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <p className="font-cinzel text-xs tracking-[0.5em] mb-2" style={{ color: "rgba(255,170,0,0.6)" }}>
                    THE WEDDING OF
                  </p>
                  <h1
                    className="font-great-vibes text-5xl mb-2"
                    style={{
                      fontFamily: "Great Vibes",
                      background: "linear-gradient(135deg, #B36D00 0%, #FFAA00 50%, #FFD047 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Wajahat Mustafa
                  </h1>
                  <p className="font-cinzel text-xs tracking-[0.3em] mb-2" style={{ color: "rgba(255,170,0,0.5)" }}>
                    &amp;
                  </p>
                  <h1
                    className="font-great-vibes text-5xl"
                    style={{
                      fontFamily: "Great Vibes",
                      background: "linear-gradient(135deg, #B36D00 0%, #FFAA00 50%, #FFD047 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    His Beloved
                  </h1>
                </motion.div>

                {/* Dates */}
                <motion.div
                  className="mt-6 space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase !== "envelope" ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <div className="ornament-line">
                    <span className="font-cinzel text-xs tracking-widest" style={{ color: "rgba(255,170,0,0.6)" }}>
                      10 &bull; 12 SEPTEMBER 2026
                    </span>
                  </div>
                  <p className="font-cormorant text-sm italic" style={{ color: "rgba(245,240,232,0.5)", fontFamily: "Cormorant Garamond" }}>
                    Pakistan
                  </p>
                </motion.div>

                {/* OPEN INVITATION button — only clickable, never auto-skipped */}
                <motion.button
                  className="mt-8 font-cinzel text-xs tracking-[0.3em] px-6 py-3 rounded-full cursor-pointer"
                  style={{
                    border: "1px solid rgba(255,170,0,0.5)",
                    color: "#FFAA00",
                    background: "rgba(255,170,0,0.07)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: phase === "content" ? 1 : 0,
                    y: phase === "content" ? 0 : 10,
                  }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  whileHover={{
                    background: "rgba(255,170,0,0.15)",
                    boxShadow: "0 0 30px rgba(255,170,0,0.3)",
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleOpen}
                >
                  OPEN INVITATION
                </motion.button>
              </div>

              {/* Wax seal overlay — shows only during envelope phase */}
              <AnimatePresence>
                {phase === "envelope" && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "linear-gradient(145deg, #1a0a2e 0%, #0d0520 50%, #1a0a2e 100%)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <svg width="100" height="100" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="rgba(179,109,0,0.3)" stroke="rgba(255,170,0,0.5)" strokeWidth="1" />
                          <circle cx="50" cy="50" r="35" fill="rgba(179,109,0,0.4)" stroke="rgba(255,208,71,0.4)" strokeWidth="0.5" />
                          <text x="50" y="44" textAnchor="middle" fontSize="18" fill="#FFD047" fontFamily="serif">W</text>
                          <text x="50" y="62" textAnchor="middle" fontSize="8" fill="rgba(255,208,71,0.7)" fontFamily="serif" letterSpacing="3">MUSTAFA</text>
                          {Array.from({ length: 8 }).map((_, i) => (
                            <line
                              key={i}
                              x1="50" y1="5" x2="50" y2="12"
                              stroke="rgba(255,170,0,0.5)"
                              strokeWidth="1"
                              transform={`rotate(${i * 45} 50 50)`}
                            />
                          ))}
                        </svg>
                      </motion.div>
                      <motion.p
                        className="font-cinzel text-xs tracking-[0.4em] mt-4"
                        style={{ color: "rgba(255,170,0,0.6)" }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        OPENING...
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
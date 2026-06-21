"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const petals = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 8,
    size: Math.random() * 12 + 6,
  }));

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-10"
      style={{ background: "radial-gradient(ellipse at top center, #2D0D5C 0%, #1A0535 20%, #0C0318 60%, #040108 100%)" }}
    >
      {/* Floating petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="petal"
          style={{ left: petal.left, width: petal.size, height: petal.size }}
          animate={{
            y: ["-10vh", "110vh"],
            x: [0, Math.random() > 0.5 ? 80 : -80],
            rotate: [0, 720],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 20 20" fill="none">
            <ellipse cx="10" cy="10" rx="6" ry="10" fill="rgba(255,170,0,0.3)" transform={`rotate(${Math.random() * 360} 10 10)`} />
          </svg>
        </motion.div>
      ))}

      {/* Top glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,170,0,0.15) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-6xl mx-auto px-4">
        {/* Bismillah */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="font-cinzel text-xs tracking-[0.5em]" style={{ color: "rgba(255,170,0,0.6)" }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <p className="font-cormorant italic text-sm mt-2" style={{ color: "rgba(245,240,232,0.5)", fontFamily: "Cormorant Garamond" }}>
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </motion.div>

        {/* With great joy */}
        <motion.p
          className="text-center font-cormorant italic text-xl md:text-2xl mb-4"
          style={{ color: "rgba(245,240,232,0.7)", fontFamily: "Cormorant Garamond" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          With immense love &amp; divine blessings
        </motion.p>

        {/* Names */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <h1
            className="font-great-vibes text-7xl md:text-9xl leading-none"
            style={{
              fontFamily: "Great Vibes",
              background: "linear-gradient(135deg, #B36D00 0%, #FFAA00 40%, #FFD047 60%, #FFAA00 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              filter: "drop-shadow(0 0 30px rgba(255,170,0,0.4))",
            }}
          >
            Wajahat Mustafa
          </h1>
          <motion.div
            className="flex items-center justify-center gap-6 my-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="h-px flex-1 max-w-32" style={{ background: "linear-gradient(90deg, transparent, rgba(255,170,0,0.6))" }} />
            <span className="font-cinzel text-sm" style={{ color: "rgba(255,170,0,0.6)" }}>
              ♦ weds ♦
            </span>
            <div className="h-px flex-1 max-w-32" style={{ background: "linear-gradient(90deg, rgba(255,170,0,0.6), transparent)" }} />
          </motion.div>
          <h1
            className="font-great-vibes text-7xl md:text-9xl leading-none"
            style={{
              fontFamily: "Great Vibes",
              background: "linear-gradient(135deg, #B36D00 0%, #FFAA00 40%, #FFD047 60%, #FFAA00 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(255,170,0,0.4))",
            }}
          >
            His Beloved
          </h1>
        </motion.div>

        {/* Photo frames */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          {/* Groom */}
          <div className="relative group">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "conic-gradient(from 0deg, #B36D00, #FFAA00, #FFD047, #FFAA00, #B36D00)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative m-1 rounded-full overflow-hidden"
              style={{ width: "min(220px, 50vw)", height: "min(220px, 50vw)" }}>
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(255,170,0,0.05)", border: "2px solid rgba(255,170,0,0.3)" }}
              />
              <Image
                src="/images/groom.jpg"
                alt="Wajahat Mustafa"
                // fill
                width={0}
                height={0}
                sizes="(max-width: 768px) 50vw, 220px"
                style={{ width: "100%", height: "100%" }}
                className="object-cover"
                onError={() => {}}
              />
              {/* Placeholder overlay when image fails */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "linear-gradient(145deg, #1a0a2e 0%, #0d0520 100%)" }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center"
                    style={{ background: "rgba(255,170,0,0.1)", border: "1px solid rgba(255,170,0,0.3)" }}>
                    <span className="font-cinzel text-2xl" style={{ color: "#FFAA00" }}>W</span>
                  </div>
                  <p className="font-cinzel text-xs" style={{ color: "rgba(255,170,0,0.6)" }}>Groom</p>
                </div>
              </div>
            </div>
            <motion.div
              className="absolute -inset-3 rounded-full border border-gold-500/20 pointer-events-none"
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -inset-6 rounded-full border border-gold-500/10 pointer-events-none"
              animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
            />
            <p className="text-center mt-4 font-cinzel text-sm tracking-widest" style={{ color: "rgba(255,170,0,0.8)" }}>
              WAJAHAT MUSTAFA
            </p>
            <p className="text-center font-cormorant italic text-sm" style={{ color: "rgba(245,240,232,0.4)", fontFamily: "Cormorant Garamond" }}>The Groom</p>
          </div>

          {/* Heart divider */}
          <motion.div
            className="flex flex-col items-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60">
              <defs>
                <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B36D00" />
                  <stop offset="50%" stopColor="#FFAA00" />
                  <stop offset="100%" stopColor="#FFD047" />
                </linearGradient>
              </defs>
              <path d="M30 50 C30 50 5 35 5 20 C5 12 12 5 20 5 C24 5 28 7 30 10 C32 7 36 5 40 5 C48 5 55 12 55 20 C55 35 30 50 30 50Z" fill="url(#heartGrad)" opacity="0.8" />
            </svg>
          </motion.div>

          {/* Bride */}
          <div className="relative group">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "conic-gradient(from 180deg, #B36D00, #FFAA00, #FFD047, #FFAA00, #B36D00)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative m-1 rounded-full overflow-hidden"
              style={{ width: "min(220px, 50vw)", height: "min(220px, 50vw)" }}>
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(255,170,0,0.05)", border: "2px solid rgba(255,170,0,0.3)" }}
              />
              <Image
                src="/images/bride.jpg"
                alt="The Bride"
                fill
                className="object-cover"
                onError={() => {}}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "linear-gradient(145deg, #1a0a2e 0%, #0d0520 100%)" }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center"
                    style={{ background: "rgba(255,170,0,0.1)", border: "1px solid rgba(255,170,0,0.3)" }}>
                    <span className="font-cinzel text-2xl" style={{ color: "#FFAA00" }}>♥</span>
                  </div>
                  <p className="font-cinzel text-xs" style={{ color: "rgba(255,170,0,0.6)" }}>Bride</p>
                </div>
              </div>
            </div>
            <motion.div
              className="absolute -inset-3 rounded-full border border-gold-500/20 pointer-events-none"
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div
              className="absolute -inset-6 rounded-full border border-gold-500/10 pointer-events-none"
              animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}
            />
            <p className="text-center mt-4 font-cinzel text-sm tracking-widest" style={{ color: "rgba(255,170,0,0.8)" }}>
              HIS BELOVED
            </p>
            <p className="text-center font-cormorant italic text-sm" style={{ color: "rgba(245,240,232,0.4)", fontFamily: "Cormorant Garamond" }}>The Bride</p>
          </div>
        </motion.div>

        {/* Date line */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="ornament-line max-w-md mx-auto mb-4">
            <span className="font-cinzel text-xs tracking-[0.4em]" style={{ color: "rgba(255,170,0,0.7)" }}>
              SEPTEMBER 2026 · PAKISTAN
            </span>
          </div>
          <motion.a
            href="#events"
            className="inline-block font-cinzel text-xs tracking-[0.3em] px-8 py-3 rounded-full mt-4"
            style={{
              border: "1px solid rgba(255,170,0,0.4)",
              color: "#FFAA00",
              background: "rgba(255,170,0,0.05)",
            }}
            whileHover={{
              background: "rgba(255,170,0,0.1)",
              boxShadow: "0 0 30px rgba(255,170,0,0.2)",
              scale: 1.05,
            }}
            whileTap={{ scale: 0.98 }}
          >
            VIEW DETAILS
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="24" height="40" viewBox="0 0 24 40">
          <rect x="1" y="1" width="22" height="38" rx="11" stroke="rgba(255,170,0,0.3)" strokeWidth="1" fill="none" />
          <motion.rect
            x="10" y="8" width="4" height="8" rx="2" fill="rgba(255,170,0,0.6)"
            animate={{ y: [8, 20, 8], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    </section>
  );
}

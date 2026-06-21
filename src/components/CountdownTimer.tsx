"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BARAT_DATE = new Date("2026-09-10T21:00:00+05:00");

function getTimeLeft() {
  const now = new Date();
  const diff = BARAT_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const prevValue = useRef(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (prevValue.current !== value) {
      setFlip(true);
      const t = setTimeout(() => setFlip(false), 400);
      prevValue.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="countdown-card relative" style={{ width: "min(140px, 22vw)", height: "min(140px, 22vw)", minWidth: 70, minHeight: 70 }}>
        {/* Background glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: "0 0 40px rgba(255,170,0,0.1), inset 0 0 40px rgba(255,170,0,0.05)" }}
        />
        {/* Number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            key={value}
            className="font-cinzel font-bold"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              background: "linear-gradient(135deg, #B36D00 0%, #FFAA00 50%, #FFD047 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 10px rgba(255,170,0,0.5))",
            }}
            initial={{ y: flip ? -20 : 0, opacity: flip ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {display}
          </motion.span>
        </div>
        {/* Center divider */}
        <div
          className="absolute left-0 right-0"
          style={{ top: "50%", height: "1px", background: "rgba(255,170,0,0.15)" }}
        />
        {/* Corner dots */}
        {["-3px -3px", "-3px auto", "auto -3px", "auto auto"].map((pos, i) => {
          const [t, l] = pos.split(" ");
          return (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                top: i < 2 ? t : "auto",
                bottom: i >= 2 ? "auto" : undefined,
                left: i % 2 === 0 ? l : "auto",
                right: i % 2 === 1 ? "auto" : undefined,
                background: "rgba(255,170,0,0.4)",
              }}
            />
          );
        })}
      </div>
      <span className="font-cinzel text-xs tracking-[0.3em]" style={{ color: "rgba(255,170,0,0.6)" }}>
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="countdown"
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #040108 0%, #0C0318 50%, #040108 100%)" }}
    >
      {/* Background ornament */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          className="w-[600px] h-[600px] rounded-full border"
          style={{ borderColor: "rgba(255,170,0,0.05)" }}
          animate={{ scale: [1, 1.1, 1], rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full border"
          style={{ borderColor: "rgba(255,170,0,0.08)" }}
          animate={{ scale: [1, 1.15, 1], rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <div className="text-center mb-16">
          <p className="font-cinzel text-xs tracking-[0.5em] mb-4" style={{ color: "rgba(255,170,0,0.5)" }}>
            THE CELEBRATION BEGINS IN
          </p>
          <h2
            className="font-great-vibes text-6xl md:text-7xl"
            style={{
              fontFamily: "Great Vibes",
              background: "linear-gradient(135deg, #B36D00 0%, #FFAA00 50%, #FFD047 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(255,170,0,0.3))",
            }}
          >
            Counting the Days
          </h2>
          <div className="ornament-line max-w-xs mx-auto mt-4">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M8 1 L9.5 6 L15 6 L10.5 9.5 L12 15 L8 11.5 L4 15 L5.5 9.5 L1 6 L6.5 6Z" fill="#FFAA00" opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Countdown units */}
        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          <CountdownUnit value={timeLeft.days} label="DAYS" />
          <motion.span
            className="font-cinzel text-2xl md:text-4xl mb-6 md:mb-0"
            style={{ color: "rgba(255,170,0,0.4)" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            :
          </motion.span>
          <CountdownUnit value={timeLeft.hours} label="HOURS" />
          <motion.span
            className="font-cinzel text-2xl md:text-4xl mb-6 md:mb-0"
            style={{ color: "rgba(255,170,0,0.4)" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          >
            :
          </motion.span>
          <CountdownUnit value={timeLeft.minutes} label="MINUTES" />
          <motion.span
            className="font-cinzel text-2xl md:text-4xl mb-6 md:mb-0"
            style={{ color: "rgba(255,170,0,0.4)" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            :
          </motion.span>
          <CountdownUnit value={timeLeft.seconds} label="SECONDS" />
        </div>

        {/* Until label */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="ornament-line max-w-sm mx-auto">
            <span className="font-cormorant italic text-lg" style={{ color: "rgba(245,240,232,0.5)", fontFamily: "Cormorant Garamond" }}>
              until the Barat — 10 September 2026, 9:00 PM
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
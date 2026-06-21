"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const events = [
  {
    title: "Barat",
    urdu: "بارات",
    date: "Thursday, 10 September 2026",
    time: "9:00 PM — 12:00 AM",
    venue: "Clock Tower Banquet",
    locationUrl: "https://maps.app.goo.gl/59bYHSuT7DU6RERP9",
    description: "Join us as the groom arrives in royal procession, marking the sacred union of two families bound by love, faith, and the blessings of Allah. An evening of splendour, tradition, and unforgettable memories.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 42 C8 32 40 32 40 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 10 L24 5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 12 L14 8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M30 12 L34 8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="5" r="2" fill="currentColor" />
        <circle cx="13" cy="7" r="1.5" fill="currentColor" />
        <circle cx="35" cy="7" r="1.5" fill="currentColor" />
      </svg>
    ),
    accentColor: "#FFAA00",
    delay: 0,
  },
  {
    title: "Walima",
    urdu: "ولیمہ",
    date: "Saturday, 12 September 2026",
    time: "9:00 PM — 12:00 AM",
    venue: "Two Rings Banquet",
    locationUrl: "https://maps.app.goo.gl/PsYBjepQL79XcwNL9",
    description: "Two days after the Barat, we celebrate the Walima — a Sunnah feast of gratitude and joy. Come and partake in this blessed gathering as we honour the newlyweds with prayers, food, and heartfelt blessings.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M8 36 L16 20 L24 30 L32 14 L40 36 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <path d="M6 36 L42 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 8 L26 8 M24 6 L24 10" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    accentColor: "#C084FC",
    delay: 0.2,
  },
];

export default function WeddingEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #040108 0%, #0C0318 50%, #040108 100%)" }}
    >
      {/* Large decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-cinzel font-bold select-none"
          style={{ fontSize: "20vw", color: "rgba(255,170,0,0.02)", lineHeight: 1 }}
        >
          2026
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cinzel text-xs tracking-[0.5em] mb-4" style={{ color: "rgba(255,170,0,0.5)" }}>
            JOIN US FOR
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
            The Celebrations
          </h2>
          <div className="ornament-line max-w-xs mx-auto mt-4">
            <svg width="20" height="12" viewBox="0 0 20 12">
              <path d="M0 6 L4 2 L10 8 L16 2 L20 6" stroke="rgba(255,170,0,0.6)" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </motion.div>

        {/* Event cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={i}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: event.delay }}
            >
              {/* Card */}
              <div
                className="relative overflow-hidden rounded-2xl p-8 h-full flex flex-col"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
                  border: `1px solid rgba(255,170,0,0.2)`,
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `0 0 60px ${event.accentColor}20, inset 0 0 60px ${event.accentColor}05` }}
                />

                {/* Top shimmer */}
                <div className="absolute top-0 left-0 right-0 h-px shimmer" />

                {/* Corner ornaments */}
                <div className="absolute top-4 right-4 opacity-30">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <path d="M30 2 L30 30 L2 30" stroke="rgba(255,170,0,0.8)" strokeWidth="1" fill="none" />
                    <circle cx="30" cy="30" r="2" fill="#FFAA00" />
                  </svg>
                </div>
                <div className="absolute bottom-4 left-4 opacity-30">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <path d="M2 30 L2 2 L30 2" stroke="rgba(255,170,0,0.8)" strokeWidth="1" fill="none" />
                    <circle cx="2" cy="2" r="2" fill="#FFAA00" />
                  </svg>
                </div>

                {/* Urdu watermark */}
                <p
                  className="absolute top-6 right-10 font-cinzel text-4xl opacity-10 select-none"
                  style={{ color: "#FFAA00", fontFamily: "serif" }}
                  dir="rtl"
                >
                  {event.urdu}
                </p>

                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: "rgba(255,170,0,0.1)",
                    border: "1px solid rgba(255,170,0,0.3)",
                    color: "#FFAA00",
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {event.icon}
                </motion.div>

                {/* Event name */}
                <h3
                  className="font-cinzel text-3xl md:text-4xl font-bold mb-1"
                  style={{
                    background: "linear-gradient(135deg, #B36D00 0%, #FFAA00 50%, #FFD047 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {event.title}
                </h3>

                {/* Date */}
                <p className="font-cormorant italic text-lg mb-1" style={{ color: "rgba(245,240,232,0.8)", fontFamily: "Cormorant Garamond" }}>
                  {event.date}
                </p>

                {/* Time */}
                <div className="flex items-center gap-2 mb-4">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ color: "rgba(255,170,0,0.6)", flexShrink: 0 }}>
                    <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1" />
                    <path d="M6.5 3.5 L6.5 6.5 L9 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <p className="font-cinzel text-xs tracking-widest" style={{ color: "rgba(255,170,0,0.6)" }}>
                    {event.time}
                  </p>
                </div>

                <div className="h-px mb-5" style={{ background: "linear-gradient(90deg, rgba(255,170,0,0.3), transparent)" }} />

                {/* Description */}
                <p
                  className="font-cormorant text-base leading-relaxed mb-6 flex-1"
                  style={{ color: "rgba(245,240,232,0.65)", fontFamily: "Cormorant Garamond" }}
                >
                  {event.description}
                </p>

                {/* Venue + Location row */}
                <div
                  className="rounded-xl p-4 mb-5"
                  style={{
                    background: "rgba(255,170,0,0.05)",
                    border: "1px solid rgba(255,170,0,0.15)",
                  }}
                >
                  {/* Venue name */}
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "#FFAA00", flexShrink: 0 }}>
                      <rect x="1" y="4" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1" />
                      <path d="M4 4 L4 2.5 C4 1.7 4.7 1 5.5 1 L8.5 1 C9.3 1 10 1.7 10 2.5 L10 4" stroke="currentColor" strokeWidth="1" />
                      <path d="M5 7.5 L9 7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    <span
                      className="font-cinzel text-xs tracking-widest"
                      style={{ color: "#FFAA00" }}
                    >
                      {event.venue}
                    </span>
                  </div>

                  {/* Location button */}
                  <a
                    href={event.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 group/loc"
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/loc:scale-110"
                      style={{ background: "rgba(255,170,0,0.15)", border: "1px solid rgba(255,170,0,0.4)" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: "#FFAA00" }}>
                        <path d="M6 1 C4 1 2.5 2.5 2.5 4.5 C2.5 7 6 11 6 11 C6 11 9.5 7 9.5 4.5 C9.5 2.5 8 1 6 1Z" stroke="currentColor" strokeWidth="1" fill="none" />
                        <circle cx="6" cy="4.5" r="1.5" stroke="currentColor" strokeWidth="0.8" />
                      </svg>
                    </div>
                    <span
                      className="font-cinzel text-xs tracking-wide transition-colors duration-300 group-hover/loc:text-yellow-300"
                      style={{ color: "rgba(255,170,0,0.6)" }}
                    >
                      VIEW ON GOOGLE MAPS →
                    </span>
                  </a>
                </div>

                {/* Save the date */}
                <motion.div
                  className="inline-flex items-center gap-2 text-xs font-cinzel tracking-widest"
                  style={{ color: "rgba(255,170,0,0.4)" }}
                  whileHover={{ color: "rgba(255,170,0,0.9)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1" />
                    <path d="M1 6 L13 6" stroke="currentColor" strokeWidth="1" />
                    <path d="M4 1 L4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M10 1 L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  SAVE THE DATE
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

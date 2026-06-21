"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const timelineEvents = [
  {
    year: "The Beginning",
    title: "Two Worlds Aligned",
    description: "In the grand design of the universe, two souls were destined to find one another. Paths crossed, hearts recognized a familiar warmth, and a story unlike any other quietly began.",
    icon: "✦",
  },
  {
    year: "The Spark",
    title: "A Connection Blossomed",
    description: "What started as gentle conversations grew into something profound. Every shared laugh, every meaningful silence, every late-night dream spoken aloud — weaving the threads of a lifelong bond.",
    icon: "♡",
  },
  {
    year: "The Promise",
    title: "Hearts United in Faith",
    description: "Under the blessed canopy of faith and family, hands were joined and promises were made. A nikah not just of two people, but of two families, two futures — one beautiful destiny.",
    icon: "◇",
  },
  {
    year: "10 September 2026",
    title: "The Barat — A Royal Celebration",
    description: "The groom arrives in splendour as families, friends, and loved ones gather to witness this sacred union. Every detail curated with love, every moment a memory for eternity.",
    icon: "♛",
  },
  {
    year: "12 September 2026",
    title: "The Walima — A Feast of Gratitude",
    description: "Two days later, the celebration continues as the newlyweds receive the blessings of their community. Food, laughter, prayers, and the warmth of shared joy fill every heart.",
    icon: "❋",
  },
  {
    year: "Forever After",
    title: "A Love Story Without End",
    description: "And so begins the greatest chapter — a life built together on love, trust, and unwavering faith. May every sunrise bring them closer, and every sunset find them grateful.",
    icon: "∞",
  },
];

function TimelineItem({ event, index }: { event: typeof timelineEvents[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-0 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row mb-12`}
    >
      {/* Content card */}
      <motion.div
        className="flex-1 max-w-md"
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={visible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div
          className="glass-card p-6 md:p-8 relative group"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,170,0,0.2)",
          }}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: "0 0 40px rgba(255,170,0,0.1)" }}
          />
          {/* Shimmer top */}
          <div className="absolute top-0 left-0 right-0 h-px shimmer rounded-t-2xl" />

          <p className="font-cinzel text-xs tracking-[0.3em] mb-2" style={{ color: "rgba(255,170,0,0.5)" }}>
            {event.year}
          </p>
          <h3
            className="font-cinzel font-semibold text-lg md:text-xl mb-3"
            style={{
              background: "linear-gradient(135deg, #FFAA00, #FFD047)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {event.title}
          </h3>
          <p
            className="font-cormorant text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(245,240,232,0.7)", fontFamily: "Cormorant Garamond" }}
          >
            {event.description}
          </p>
        </div>
      </motion.div>

      {/* Center node */}
      <motion.div
        className="flex flex-col items-center mx-4 md:mx-0 flex-shrink-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={visible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center relative"
          style={{
            background: "linear-gradient(135deg, rgba(179,109,0,0.3) 0%, rgba(255,170,0,0.1) 100%)",
            border: "1px solid rgba(255,170,0,0.5)",
            boxShadow: "0 0 20px rgba(255,170,0,0.2)",
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border border-gold-500/20"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <span className="text-xl" style={{ color: "#FFAA00" }}>{event.icon}</span>
        </div>
      </motion.div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block flex-1 max-w-md" />
    </div>
  );
}

export default function LoveStoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, #1A0535 0%, #0C0318 40%, #040108 100%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute border rounded-full"
            style={{
              width: `${(i + 1) * 150}px`,
              height: `${(i + 1) * 150}px`,
              borderColor: "rgba(255,170,0,0.3)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={titleVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cinzel text-xs tracking-[0.5em] mb-4" style={{ color: "rgba(255,170,0,0.5)" }}>
            OUR JOURNEY TOGETHER
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
            Our Love Story
          </h2>
          <div className="ornament-line max-w-xs mx-auto mt-4">
            <svg width="20" height="16" viewBox="0 0 20 16">
              <path d="M10 2 C10 2 2 6 2 10 C2 12 4 14 6 13 C8 12 10 10 10 10 C10 10 12 12 14 13 C16 14 18 12 18 10 C18 6 10 2 10 2Z" fill="#FFAA00" opacity="0.6" />
            </svg>
          </div>
        </motion.div>

        {/* Timeline with vertical line */}
        <div className="relative">
          {/* Vertical line - hidden on mobile, shown on md */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, transparent, rgba(255,170,0,0.4), transparent)" }}
          />

          {timelineEvents.map((event, i) => (
            <TimelineItem key={i} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

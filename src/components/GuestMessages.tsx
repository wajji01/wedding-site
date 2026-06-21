"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Wish {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
}

const preloadedWishes: Wish[] = [
  { id: 1, name: "Ahmed & Fatima", message: "May Allah bless this beautiful union with endless love, laughter, and prosperity. Congratulations, dear Wajahat!", timestamp: new Date() },
  { id: 2, name: "The Hassan Family", message: "Wishing you both a lifetime of happiness and blessings. May your home always be filled with love and light.", timestamp: new Date() },
  { id: 3, name: "Zainab Malik", message: "MashaAllah! What a beautiful couple. May Allah bless you both with a love that grows stronger each passing day. Ameen!", timestamp: new Date() },
];

export default function GuestMessages() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>(preloadedWishes);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    const newWish: Wish = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date(),
    };
    setWishes(prev => [newWish, ...prev]);
    setSubmitted(true);
    setName("");
    setMessage("");
    setIsSubmitting(false);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      ref={sectionRef}
      id="wishes"
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #040108 0%, #0C0318 50%, #040108 100%)" }}
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cinzel text-xs tracking-[0.5em] mb-4" style={{ color: "rgba(255,170,0,0.5)" }}>
            SHARE YOUR BLESSINGS
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
            Wishes & Prayers
          </h2>
          <div className="ornament-line max-w-xs mx-auto mt-4">
            <svg width="20" height="16" viewBox="0 0 20 16">
              <path d="M10 2 C10 2 2 6 2 10 C2 12 4 14 6 13 C8 12 10 10 10 10 C10 10 12 12 14 13 C16 14 18 12 18 10 C18 6 10 2 10 2Z" fill="#FFAA00" opacity="0.6" />
            </svg>
          </div>
          <p
            className="font-cormorant italic text-lg mt-4 max-w-md mx-auto"
            style={{ color: "rgba(245,240,232,0.5)", fontFamily: "Cormorant Garamond" }}
          >
            Your prayers and blessings mean the world to us. Leave a heartfelt message for the happy couple.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="glass-card p-8 mb-12 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute top-0 left-0 right-0 h-px shimmer rounded-t-2xl" />

          <div className="space-y-4">
            <div>
              <label className="block font-cinzel text-xs tracking-widest mb-2" style={{ color: "rgba(255,170,0,0.6)" }}>
                YOUR NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name..."
                className="wedding-input"
              />
            </div>
            <div>
              <label className="block font-cinzel text-xs tracking-widest mb-2" style={{ color: "rgba(255,170,0,0.6)" }}>
                YOUR MESSAGE
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Share your wishes, prayers, or a heartfelt message for the couple..."
                className="wedding-textarea"
              />
            </div>
            <div className="flex items-center justify-between">
              <AnimatePresence>
                {submitted && (
                  <motion.p
                    className="font-cormorant italic text-lg"
                    style={{ color: "rgba(255,170,0,0.8)", fontFamily: "Cormorant Garamond" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    ✨ JazakAllah! Your wishes were sent.
                  </motion.p>
                )}
              </AnimatePresence>
              <motion.button
                className="gold-btn ml-auto"
                onClick={handleSubmit}
                disabled={isSubmitting || !name.trim() || !message.trim()}
                whileHover={name.trim() && message.trim() ? { scale: 1.05 } : {}}
                whileTap={name.trim() && message.trim() ? { scale: 0.98 } : {}}
                style={{
                  opacity: !name.trim() || !message.trim() ? 0.5 : 1,
                  cursor: !name.trim() || !message.trim() ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting ? "SENDING..." : "SEND WISHES"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Wishes display */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {wishes.slice(0, 6).map((wish, i) => (
              <motion.div
                key={wish.id}
                className="glass-card p-6 relative"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="absolute top-0 left-0 right-0 h-px shimmer rounded-t-2xl" style={{ opacity: 0.4 }} />
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,170,0,0.1)", border: "1px solid rgba(255,170,0,0.3)" }}
                  >
                    <span className="font-cinzel text-sm" style={{ color: "#FFAA00" }}>
                      {wish.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-cinzel text-sm tracking-wide" style={{ color: "rgba(255,170,0,0.8)" }}>
                        {wish.name}
                      </h4>
                      <span className="font-cormorant italic text-xs" style={{ color: "rgba(245,240,232,0.3)", fontFamily: "Cormorant Garamond" }}>
                        ✦
                      </span>
                    </div>
                    <p
                      className="font-cormorant text-base leading-relaxed"
                      style={{ color: "rgba(245,240,232,0.7)", fontFamily: "Cormorant Garamond" }}
                    >
                      &ldquo;{wish.message}&rdquo;
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

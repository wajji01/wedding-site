"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

import InvitationReveal from "@/components/InvitationReveal";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import LoveStoryTimeline from "@/components/LoveStoryTimeline";
import WeddingEvents from "@/components/WeddingEvents";
import GuestMessages from "@/components/GuestMessages";
import Footer from "@/components/Footer";

const ParticlesBackground = dynamic(() => import("@/components/ParticlesBackground"), { ssr: false });

export default function Home() {
  const [showReveal, setShowReveal] = useState(true);
  const [mainVisible, setMainVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if already visited this session
    const visited = sessionStorage.getItem("visited");
    if (visited) {
      setShowReveal(false);
      setMainVisible(true);
    }
  }, []);

  const handleRevealComplete = () => {
    sessionStorage.setItem("visited", "true");
    setShowReveal(false);
    setTimeout(() => setMainVisible(true), 300);
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen" style={{ background: "#040108" }}>
      {/* Particles */}
      <ParticlesBackground />

      {/* Invitation reveal */}
      <AnimatePresence>
        {showReveal && (
          <InvitationReveal onComplete={handleRevealComplete} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {mainVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <Navigation />
            <HeroSection />
            <CountdownTimer />
            <WeddingEvents />
            <LoveStoryTimeline />
            <GuestMessages />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

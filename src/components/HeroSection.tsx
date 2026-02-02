import { motion } from "framer-motion";
import { Trophy, Users, Lightbulb, TrendingUp, Calendar, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import ieconLogo from "@/assets/iecon-logo.png";
import React, { useEffect, useState } from "react";
// Helper function to calculate time left
function getTimeLeft(targetDate: Date) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const highlights = [
  { icon: Trophy, text: "Cash Prizes worth INR 2,00,000" },
  { icon: TrendingUp, text: "Opportunity to secure Investments" },
  { icon: Users, text: "Networking with Investors & Entrepreneurs" },
  { icon: Lightbulb, text: "Real-world pitching experience" },
];

const HeroSection = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  // Set deadline to 7th Feb 2026, 23:59:59
  const deadline = new Date("2026-02-07T23:59:59");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(deadline));
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container relative z-10 px-4 mx-auto max-w-6xl">
        {/* Theme Toggle */}
        <div className="absolute right-4 top-4 z-20">
          <button
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            onClick={toggleTheme}
            className="rounded-full p-2 bg-background border border-border shadow hover:bg-muted transition-colors"
            type="button"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>
        </div>
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <a href="https://www.ieconlpu.com/" target="_blank" rel="noopener noreferrer">
            <motion.img
              src={ieconLogo}
              alt="IECON'26 Logo"
              className="h-24 md:h-32 mx-auto mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </a>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            <span className="text-foreground">Indian Entrepreneurship</span>
            <br />
            <span className="text-gradient-primary">Conclave 2026</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-6">
            Gateway to IECON'26 – Startup Registration
          </p>

          <span className="highlight-badge">Pre-Conclave Pitching Initiative</span>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-2xl p-6 md:p-8 mb-10 max-w-4xl mx-auto"
        >
          <p className="text-muted-foreground leading-relaxed text-center text-base md:text-lg">
            <span className="text-foreground font-semibold">Gateway to IECON'26</span> is a pre-conclave pitching initiative designed to identify and nurture high-potential startups by providing a structured platform for founders to present their ideas before investors and industry experts.
          </p>
        </motion.div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="glass-card rounded-xl p-5 text-center group hover:glow-orange transition-all duration-300"
            >
              <item.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm text-foreground font-medium">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Deadline Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="deadline-banner rounded-xl p-4 md:p-5 flex flex-col items-center justify-center gap-3"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-primary-foreground" />
            <span className="text-primary-foreground font-display font-bold text-lg md:text-xl">
              Registration Deadline: 7th February 2026
            </span>
          </div>
          <div className="mt-2 flex gap-4 text-primary-foreground font-mono text-lg md:text-xl">
            <div>
              {timeLeft.days} <span className="text-xs font-normal">days</span>
            </div>
            <div>
              {timeLeft.hours} <span className="text-xs font-normal">hrs</span>
            </div>
            <div>
              {timeLeft.minutes} <span className="text-xs font-normal">min</span>
            </div>
            <div>
              {timeLeft.seconds} <span className="text-xs font-normal">sec</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

import { motion } from "framer-motion";
import { Trophy, Users, Lightbulb, TrendingUp, Calendar } from "lucide-react";
import ieconLogo from "@/assets/iecon-logo.png";

const highlights = [
  { icon: Trophy, text: "Cash Prizes worth INR 2,00,000" },
  { icon: TrendingUp, text: "Opportunity to secure Investments" },
  { icon: Users, text: "Networking with Investors & Entrepreneurs" },
  { icon: Lightbulb, text: "Real-world pitching experience" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container relative z-10 px-4 mx-auto max-w-6xl">
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
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="deadline-banner rounded-xl p-4 md:p-5 flex items-center justify-center gap-3"
        >
          <Calendar className="w-6 h-6 text-primary-foreground" />
          <span className="text-primary-foreground font-display font-bold text-lg md:text-xl">
            Registration Deadline: 5th February 2026
          </span>
        </motion.div> */}
      </div>
    </section>
  );
};

export default HeroSection;

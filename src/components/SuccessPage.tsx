import { motion } from "framer-motion";
import { CheckCircle2, PartyPopper, Mail, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ieconLogo from "@/assets/iecon-logo.png";

interface SuccessPageProps {
  onReset: () => void;
}

const SuccessPage = ({ onReset }: SuccessPageProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center py-12 lg:py-20">
      <div className="container px-4 mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card-elevated rounded-3xl p-8 md:p-12 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center"
          >
            <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
          </motion.div>

          {/* Logo */}
          <motion.img
            src={ieconLogo}
            alt="IECON'26 Logo"
            className="h-16 mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          />

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <PartyPopper className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Registration Successful!
              </h1>
              <PartyPopper className="w-6 h-6 text-primary" />
            </div>

            <p className="text-muted-foreground text-lg mb-8">
              Thank you for registering for Gateway to IECON'26. Your application has been received successfully.
            </p>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          >
            <div className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Confirmation</p>
                <p className="text-foreground font-medium">Email sent to you</p>
              </div>
            </div>

            <div className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Next Steps</p>
                <p className="text-foreground font-medium">Wait for shortlisting</p>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glass-card rounded-xl p-6 text-left mb-8"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">What happens next?</h3>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-bold flex-shrink-0">1</span>
                <span>Our team will review your application and pitch materials.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-bold flex-shrink-0">2</span>
                <span>Shortlisted startups will be notified via email within 7 days.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-bold flex-shrink-0">3</span>
                <span>Selected teams will pitch at IECON'26 before investors.</span>
              </li>
            </ol>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <Button
              variant="hero-outline"
              size="lg"
              onClick={onReset}
              className="gap-2"
            >
              Register Another Startup
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessPage;

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import RegistrationForm from "@/components/RegistrationForm";
import SuccessPage from "@/components/SuccessPage";

const Index = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSubmitted) {
    return <SuccessPage onReset={handleReset} />;
  }

  return (
    <main className="min-h-screen">
      <HeroSection />
      <RegistrationForm onSuccess={handleSuccess} />
      
      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container px-4 mx-auto max-w-6xl text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Indian Entrepreneurship Conclave. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Organized by Lovely Professional University
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;

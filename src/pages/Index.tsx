import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import RegistrationForm from "@/components/RegistrationForm";
import SuccessPage from "@/components/SuccessPage";
import DeadlineTimer from "@/components/DeadlineTimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

// Registration Deadline: 10th February 2026, 11:59 PM (matches HeroSection)
const REGISTRATION_DEADLINE = new Date("2026-02-10T23:59:59");

const Index = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const currentDate = new Date();
  const isRegistrationClosed = currentDate > REGISTRATION_DEADLINE;

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
      
      {isRegistrationClosed ? (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="border-destructive">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                  <CardTitle className="text-2xl">Registration Closed</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  The registration period for IECON 2026 has ended.
                </p>
                <p className="text-sm text-muted-foreground">
                  Registration deadline was: <span className="font-semibold text-foreground">
                    {REGISTRATION_DEADLINE.toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  For any queries, please contact the organizing team at{" "}
                  <a href="mailto:support@ieconlpu.com" className="text-primary hover:underline font-medium">
                    support@ieconlpu.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      ) : (
        <>
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-4xl">
              <DeadlineTimer deadline={REGISTRATION_DEADLINE} />
            </div>
          </section>
          <RegistrationForm onSuccess={handleSuccess} />
        </>
      )}
      
      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container px-4 mx-auto max-w-6xl text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 IECON - Indian Entrepreneurship Conclave. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Organized by Department of Entrepreneurship & Startups, Lovely Professional University
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;

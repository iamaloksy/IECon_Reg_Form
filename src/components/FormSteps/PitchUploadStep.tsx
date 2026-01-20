import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormData } from "@/lib/formSchema";
import FileUpload from "@/components/FileUpload";
import { FileText, Clock, Video } from "lucide-react";

interface PitchUploadStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const slideGuidelines = [
  { slide: 1, title: "Title", content: "Startup Name | Tagline | Founders | Contact" },
  { slide: 2, title: "Problem", content: "What problem are you solving? | Who faces it? | Why does it matter?" },
  { slide: 3, title: "Solution", content: "Your product/service | How it solves the problem? | Key differentiator" },
  { slide: 4, title: "Market", content: "Target customers | Market size | Opportunity gap" },
  { slide: 5, title: "Product", content: "Prototype / MVP / Live product | Key features | Technology overview" },
  { slide: 6, title: "Business Model", content: "Revenue strategy | Pricing strategy | Customer acquisition plan" },
  { slide: 7, title: "Traction", content: "Users | Customers | Revenue | Pilots | Partnerships | Milestones" },
  { slide: 8, title: "USP / Unfair Advantage", content: "Why you? | What makes you difficult to copy?" },
  { slide: 9, title: "Team", content: "Founders | Core strengths | Advisors / Mentors (if any)" },
  { slide: 10, title: "Ask & Vision", content: "Funding / Support needed | Next milestones | Long-term vision" },
];

const PitchUploadStep = ({ form }: PitchUploadStepProps) => {
  const { setValue, watch } = form;
  const pitchDeck = watch("pitchDeck");
  const videoPitch = watch("videoPitch");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="form-section"
    >
      <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
        Pitch Deck & Video
      </h2>
      <p className="text-muted-foreground mb-6">
        Upload your pitch deck and video pitch to showcase your startup.
      </p>

      <div className="space-y-6">
        {/* Pitch Deck Guidelines */}
        <div className="glass-card rounded-xl p-5 border border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Pitch Deck Guidelines</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Pitch Duration</p>
                <p className="text-xs text-muted-foreground">5 minutes max</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <FileText className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">File Format</p>
                <p className="text-xs text-muted-foreground">PDF/PPT only</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-accent mb-4 font-medium">
            📌 The file should be named as the Startup name
          </p>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground mb-3">Slide-by-Slide Structure:</h4>
            <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {slideGuidelines.map((item) => (
                <div 
                  key={item.slide} 
                  className="flex gap-3 p-2.5 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <span className="shrink-0 w-7 h-7 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                    {item.slide}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FileUpload
          label="Upload Pitch Deck"
          accept=".pdf,.ppt,.pptx"
          maxSize={10}
          value={pitchDeck}
          onChange={(file) => setValue("pitchDeck", file)}
        />

        <div className="glass-card rounded-xl p-4 border border-secondary/20">
          <div className="flex items-center gap-2 mb-2">
            <Video className="w-4 h-4 text-secondary" />
            <h4 className="text-sm font-medium text-foreground">Video Pitch Tips</h4>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Video pitch should be 2-3 minutes maximum</li>
            <li>• Speak clearly and maintain good lighting</li>
            <li>• Focus on problem, solution, and traction</li>
          </ul>
        </div>

        <FileUpload
          label="Upload Video Pitch"
          accept="video/mp4,video/mov,video/avi,video/webm"
          maxSize={100}
          value={videoPitch}
          onChange={(file) => setValue("videoPitch", file)}
        />
      </div>
    </motion.div>
  );
};

export default PitchUploadStep;

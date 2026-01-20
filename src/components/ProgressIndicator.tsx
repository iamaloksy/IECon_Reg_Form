import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const ProgressIndicator = ({ currentStep, totalSteps, stepLabels }: ProgressIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                {/* Connector line before */}
                {i > 0 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      stepNumber <= currentStep ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}

                {/* Step circle */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  className={`progress-step ${
                    isCompleted ? "completed" : isActive ? "active" : "pending"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </motion.div>

                {/* Connector line after */}
                {i < totalSteps - 1 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      stepNumber < currentStep ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>

              {/* Step label */}
              <span
                className={`mt-2 text-xs md:text-sm font-medium text-center transition-colors ${
                  isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {stepLabels[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;

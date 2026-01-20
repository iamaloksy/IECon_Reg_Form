import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormData } from "@/lib/formSchema";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle } from "lucide-react";

interface DeclarationStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const DeclarationStep = ({ form }: DeclarationStepProps) => {
  const { watch, setValue, formState: { errors } } = form;
  const declaration = watch("declaration");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="form-section"
    >
      <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
        Declaration
      </h2>
      <p className="text-muted-foreground mb-6">
        Please review and accept the declaration to complete your registration.
      </p>

      <div className="space-y-6">
        {/* Declaration Content */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-primary flex-shrink-0" />
            <div className="text-sm text-muted-foreground space-y-3">
              <p>
                I hereby declare that all the information provided in this registration form is true, accurate, and complete to the best of my knowledge.
              </p>
              <p>
                I understand that providing false or misleading information may result in disqualification from the Gateway to IECON'26 program.
              </p>
              <p>
                I agree to abide by the rules and regulations of the Indian Entrepreneurship Conclave 2026 and consent to the use of my submitted materials for evaluation purposes.
              </p>
              <p>
                I authorize the organizers to contact me via email or phone for updates related to my application.
              </p>
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div
          className={`p-4 rounded-xl border-2 transition-all ${
            declaration
              ? "border-primary bg-primary/5"
              : errors.declaration
              ? "border-destructive bg-destructive/5"
              : "border-border"
          }`}
        >
          <div className="flex items-start gap-3">
            <Checkbox
              id="declaration"
              checked={declaration}
              onCheckedChange={(checked) => setValue("declaration", checked as boolean)}
              className="mt-1"
            />
            <Label
              htmlFor="declaration"
              className="text-sm text-foreground cursor-pointer leading-relaxed"
            >
              I have read, understood, and agree to the above declaration. I confirm that all the information provided is accurate and I accept the terms and conditions of Gateway to IECON'26.
              <span className="text-destructive"> *</span>
            </Label>
          </div>
          {errors.declaration && (
            <p className="text-sm text-destructive mt-2 ml-7">{errors.declaration.message}</p>
          )}
        </div>

        {/* Confirmation */}
        {declaration && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-green-500"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">You're ready to submit!</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DeclarationStep;

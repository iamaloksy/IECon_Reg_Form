import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormData } from "@/lib/formSchema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface LPUAssociationStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const LPUAssociationStep = ({ form }: LPUAssociationStepProps) => {
  const { watch, setValue } = form;
  const isLPUStudent = watch("isLPUStudent");
  const error = form.formState.errors.isLPUStudent;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="form-section"
    >
      <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
        Association with LPU
      </h2>
      <p className="text-muted-foreground mb-6">
        Let us know if you're currently a student at Lovely Professional University.
      </p>

      <div className="space-y-4">
        <Label className="text-base font-medium text-foreground">
          Are you a student at LPU? <span className="text-destructive">*</span>
        </Label>

        <RadioGroup
          value={isLPUStudent}
          onValueChange={(value) => setValue("isLPUStudent", value as "yes" | "no")}
          className="grid grid-cols-2 gap-4 pt-2"
        >
          <Label
            htmlFor="lpu-yes"
            className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              isLPUStudent === "yes"
                ? "border-primary bg-primary/10 glow-orange"
                : "border-border hover:border-primary/50"
            }`}
          >
            <RadioGroupItem value="yes" id="lpu-yes" className="sr-only" />
            <span className={`font-medium ${isLPUStudent === "yes" ? "text-primary" : "text-foreground"}`}>
              Yes, I am
            </span>
          </Label>

          <Label
            htmlFor="lpu-no"
            className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              isLPUStudent === "no"
                ? "border-primary bg-primary/10 glow-orange"
                : "border-border hover:border-primary/50"
            }`}
          >
            <RadioGroupItem value="no" id="lpu-no" className="sr-only" />
            <span className={`font-medium ${isLPUStudent === "no" ? "text-primary" : "text-foreground"}`}>
              No, I'm not
            </span>
          </Label>
        </RadioGroup>

        {error && (
          <p className="text-sm text-destructive mt-2">{error.message}</p>
        )}
      </div>
    </motion.div>
  );
};

export default LPUAssociationStep;

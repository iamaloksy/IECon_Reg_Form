import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormData, yearOptions } from "@/lib/formSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AcademicDetailsStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const AcademicDetailsStep = ({ form }: AcademicDetailsStepProps) => {
  const { register, formState: { errors }, watch, setValue } = form;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="form-section"
    >
      <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
        Academic Details
      </h2>
      <p className="text-muted-foreground mb-6">
        Provide your academic information for verification purposes.
      </p>

      <div className="space-y-5">
        <div>
          <Label htmlFor="registrationNumber" className="text-sm font-medium text-foreground">
            Registration Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="registrationNumber"
            placeholder="Enter your registration number"
            {...register("registrationNumber")}
            className="mt-1.5"
          />
          {errors.registrationNumber && (
            <p className="text-sm text-destructive mt-1">{errors.registrationNumber.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="degreeProgram" className="text-sm font-medium text-foreground">
            Degree & Program <span className="text-destructive">*</span>
          </Label>
          <Input
            id="degreeProgram"
            placeholder="e.g., B.Tech Computer Science"
            {...register("degreeProgram")}
            className="mt-1.5"
          />
          {errors.degreeProgram && (
            <p className="text-sm text-destructive mt-1">{errors.degreeProgram.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="currentYear" className="text-sm font-medium text-foreground">
            Current Year of Degree <span className="text-destructive">*</span>
          </Label>
          <Select
            value={watch("currentYear")}
            onValueChange={(value) => setValue("currentYear", value)}
          >
            <SelectTrigger className="mt-1.5 h-11 bg-input border-border/50">
              <SelectValue placeholder="Select your current year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.currentYear && (
            <p className="text-sm text-destructive mt-1">{errors.currentYear.message}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AcademicDetailsStep;

import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormData, sectorOptions, legalStatusOptions, startupStageOptions } from "@/lib/formSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StartupDetailsStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const StartupDetailsStep = ({ form }: StartupDetailsStepProps) => {
  const { register, formState: { errors }, watch, setValue } = form;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="form-section"
    >
      <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
        Startup Details
      </h2>
      <p className="text-muted-foreground mb-6">
        Tell us about your startup and the problem you're solving.
      </p>

      <div className="space-y-5">
        <div>
          <Label htmlFor="problemStatement" className="text-sm font-medium text-foreground">
            Problem Statement <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="problemStatement"
            placeholder="Describe the problem your startup is solving (minimum 50 characters)"
            {...register("problemStatement")}
            className="mt-1.5"
            rows={4}
          />
          {errors.problemStatement && (
            <p className="text-sm text-destructive mt-1">{errors.problemStatement.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="startupName" className="text-sm font-medium text-foreground">
              Startup / Company Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="startupName"
              placeholder="Enter startup name"
              {...register("startupName")}
              className="mt-1.5"
            />
            {errors.startupName && (
              <p className="text-sm text-destructive mt-1">{errors.startupName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="founderNames" className="text-sm font-medium text-foreground">
              Founder(s) & Co-founder(s) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="founderNames"
              placeholder="e.g., John Doe, Jane Smith"
              {...register("founderNames")}
              className="mt-1.5"
            />
            {errors.founderNames && (
              <p className="text-sm text-destructive mt-1">{errors.founderNames.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="mobileNumber" className="text-sm font-medium text-foreground">
              Mobile Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="mobileNumber"
              type="tel"
              placeholder="10-digit mobile number"
              {...register("mobileNumber")}
              className="mt-1.5"
            />
            {errors.mobileNumber && (
              <p className="text-sm text-destructive mt-1">{errors.mobileNumber.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="yourname@example.com"
              {...register("email")}
              className="mt-1.5"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="state" className="text-sm font-medium text-foreground">
              State <span className="text-destructive">*</span>
            </Label>
            <Input
              id="state"
              placeholder="Enter your state"
              {...register("state")}
              className="mt-1.5"
            />
            {errors.state && (
              <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="city" className="text-sm font-medium text-foreground">
              City <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              placeholder="Enter your city"
              {...register("city")}
              className="mt-1.5"
            />
            {errors.city && (
              <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="linkedinProfile" className="text-sm font-medium text-foreground">
            LinkedIn Profile URL
          </Label>
          <Input
            id="linkedinProfile"
            placeholder="https://linkedin.com/in/yourprofile"
            {...register("linkedinProfile")}
            className="mt-1.5"
          />
          {errors.linkedinProfile && (
            <p className="text-sm text-destructive mt-1">{errors.linkedinProfile.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <Label htmlFor="sector" className="text-sm font-medium text-foreground">
              Sector <span className="text-destructive">*</span>
            </Label>
            <Select
              value={watch("sector")}
              onValueChange={(value) => setValue("sector", value)}
            >
              <SelectTrigger className="mt-1.5 h-11 bg-input border-border/50">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {sectorOptions.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.sector && (
              <p className="text-sm text-destructive mt-1">{errors.sector.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="legalStatus" className="text-sm font-medium text-foreground">
              Legal Status <span className="text-destructive">*</span>
            </Label>
            <Select
              value={watch("legalStatus")}
              onValueChange={(value) => setValue("legalStatus", value)}
            >
              <SelectTrigger className="mt-1.5 h-11 bg-input border-border/50">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {legalStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.legalStatus && (
              <p className="text-sm text-destructive mt-1">{errors.legalStatus.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="startupStage" className="text-sm font-medium text-foreground">
              Startup Stage <span className="text-destructive">*</span>
            </Label>
            <Select
              value={watch("startupStage")}
              onValueChange={(value) => setValue("startupStage", value)}
            >
              <SelectTrigger className="mt-1.5 h-11 bg-input border-border/50">
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                {startupStageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.startupStage && (
              <p className="text-sm text-destructive mt-1">{errors.startupStage.message}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StartupDetailsStep;

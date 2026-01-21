import { z } from "zod";


export const registrationSchema = z.object({
  // Section 1 - Association with LPU
  isLPUStudent: z.enum(["yes", "no"], {
    required_error: "Please select if you are a student at LPU",
  }),

  // Section 2 - Academic Details (conditionally required)
  registrationNumber: z.string().optional(),
  degreeProgram: z.string().optional(),
  currentYear: z.string().optional(),

  // Section 3 - Startup Details
  problemStatement: z.string().min(50, "Problem statement must be at least 50 characters"),
  startupName: z.string().min(1, "Startup name is required"),
  founderNames: z.string().min(1, "Founder name(s) is required"),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  linkedinProfile: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  sector: z.string().min(1, "Sector is required"),
  legalStatus: z.string().min(1, "Legal status is required"),
  startupStage: z.string().min(1, "Startup stage is required"),

  // Section 4 - Files (will be handled separately)
  pitchDeck: z.any().optional(),
  videoPitch: z.any().optional(),

  // Section 5 - Payment
  paymentScreenshot: z.any().optional(),

  // Declaration
  declaration: z.boolean().refine((val) => val === true, {
    message: "You must agree to the declaration to submit",
  }),
}).superRefine((data, ctx) => {
  if (data.isLPUStudent === "yes") {
    if (!data.registrationNumber || data.registrationNumber.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["registrationNumber"],
        message: "Registration number is required",
      });
    }
    if (!data.degreeProgram || data.degreeProgram.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["degreeProgram"],
        message: "Degree & Program is required",
      });
    }
    if (!data.currentYear || data.currentYear.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["currentYear"],
        message: "Current year of degree is required",
      });
    }
  }
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const yearOptions = [
  { value: "1st", label: "1st Year" },
  { value: "2nd", label: "2nd Year" },
  { value: "3rd", label: "3rd Year" },
  { value: "4th", label: "4th Year" },
  { value: "passed_out", label: "Passed Out" },
];

export const sectorOptions = [
  "EdTech",
  "SaaS",
  "FinTech",
  "AI/ML",
  "HealthTech",
  "AgriTech",
  "E-commerce",
  "CleanTech",
  "IoT",
  "Gaming",
  "Other",
];

export const legalStatusOptions = [
  { value: "sole_proprietorship", label: "Sole Proprietorship" },
  { value: "llp", label: "Limited Liability Partnership (LLP)" },
  { value: "private_limited", label: "Private Limited Company" },
  { value: "other", label: "Other" },
];

export const startupStageOptions = [
  { value: "ideation", label: "Ideation Stage" },
  { value: "validation", label: "Validation Stage" },
  { value: "early_traction", label: "Early Traction" },
  { value: "scaling", label: "Scaling Stage" },
];

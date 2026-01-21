import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Send, Loader2 } from "lucide-react";
import { registrationSchema, RegistrationFormData } from "@/lib/formSchema";
import { Button } from "@/components/ui/button";
import ProgressIndicator from "@/components/ProgressIndicator";
import LPUAssociationStep from "@/components/FormSteps/LPUAssociationStep";
import AcademicDetailsStep from "@/components/FormSteps/AcademicDetailsStep";
import StartupDetailsStep from "@/components/FormSteps/StartupDetailsStep";
import PitchUploadStep from "@/components/FormSteps/PitchUploadStep";
import PaymentStep from "@/components/FormSteps/PaymentStep";
import DeclarationStep from "@/components/FormSteps/DeclarationStep";
import { toast } from "@/hooks/use-toast";

const stepLabels = [
  "LPU Status",
  "Academic",
  "Startup",
  "Pitch",
  "Payment",
  "Declaration",
];

const stepFieldsMap: Record<number, (keyof RegistrationFormData)[]> = {
  1: ["isLPUStudent"],
  2: ["registrationNumber", "degreeProgram", "currentYear"],
  3: ["problemStatement", "startupName", "founderNames", "mobileNumber", "email", "state", "city", "sector", "legalStatus", "startupStage"],
  4: [],
  5: [],
  6: ["declaration"],
};

interface RegistrationFormProps {
  onSuccess: () => void;
}

const RegistrationForm = ({ onSuccess }: RegistrationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmittingModal, setShowSubmittingModal] = useState(false);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      isLPUStudent: undefined,
      registrationNumber: "",
      degreeProgram: "",
      currentYear: "",
      problemStatement: "",
      startupName: "",
      founderNames: "",
      mobileNumber: "",
      email: "",
      state: "",
      city: "",
      linkedinProfile: "",
      sector: "",
      legalStatus: "",
      startupStage: "",
      pitchDeck: null,
      videoPitch: null,
      paymentScreenshot: null,
      declaration: false,
    },
    mode: "onChange",
  });

  const totalSteps = 6;

  const validateCurrentStep = async () => {
    const fieldsToValidate = stepFieldsMap[currentStep] || [];
    if (fieldsToValidate.length === 0) return true;
    
    const result = await form.trigger(fieldsToValidate);
    return result;
  };


  const handleNext = async () => {
    // Block next if on Payment step and screenshot not uploaded
    if (currentStep === 5 && !form.getValues("paymentScreenshot")) {
      toast({
        title: "Payment screenshot required",
        description: "Please upload your payment screenshot before proceeding.",
        variant: "destructive",
      });
      return;
    }
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };


  async function fileToBase64(file: File | null | undefined) {
    if (!file) return "";
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function submitForm(formData: RegistrationFormData) {
    // Convert files to base64
    const pitchDeckBase64 = await fileToBase64(formData.pitchDeck);
    const videoPitchBase64 = await fileToBase64(formData.videoPitch);
    const paymentScreenshotBase64 = await fileToBase64(formData.paymentScreenshot);

    await fetch("https://script.google.com/macros/s/AKfycbzVxKWVlPyf1rHHf-2cHvh8tuusCYRu4DjfQpB_qBw6FckABVXKIGSiEfDliloWKyoO0A/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "no-cors",
      body: JSON.stringify({
        is_lpu_student: formData.isLPUStudent,
        registration_number: formData.registrationNumber,
        degree_program: formData.degreeProgram,
        current_year: formData.currentYear,
        problem_statement: formData.problemStatement,
        startup_name: formData.startupName,
        founders_names: formData.founderNames,
        mobile_number: formData.mobileNumber,
        email_address: formData.email,
        state: formData.state,
        city: formData.city,
        linkedin_url: formData.linkedinProfile,
        sector: formData.sector,
        legal_status: formData.legalStatus,
        startup_stage: formData.startupStage,
        pitch_deck_base64: pitchDeckBase64,
        pitch_deck_name: formData.pitchDeck?.name || "",
        pitch_deck_type: formData.pitchDeck?.type || "",
        video_pitch_base64: videoPitchBase64,
        video_pitch_name: formData.videoPitch?.name || "",
        video_pitch_type: formData.videoPitch?.type || "",
        payment_screenshot_base64: paymentScreenshotBase64,
        payment_screenshot_name: formData.paymentScreenshot?.name || "",
        payment_screenshot_type: formData.paymentScreenshot?.type || ""
      })
    });
  }

  const onSubmit = async (data: RegistrationFormData) => {
    setShowSubmittingModal(true);
    setIsSubmitting(true);
    try {
      await submitForm(data);
      toast({
        title: "Registration Successful!",
        description: "Your application has been submitted successfully.",
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setShowSubmittingModal(false), 600); // fade out after submit
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LPUAssociationStep form={form} />;
      case 2:
        return <AcademicDetailsStep form={form} />;
      case 3:
        return <StartupDetailsStep form={form} />;
      case 4:
        return <PitchUploadStep form={form} />;
      case 5:
        return <PaymentStep form={form} />;
      case 6:
        return <DeclarationStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <section className="py-12 lg:py-16">
      <div className="container px-4 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            Registration Form
          </h2>
          <p className="text-muted-foreground">
            Complete all sections to register for Gateway to IECON'26
          </p>
        </motion.div>

        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepLabels={stepLabels}
        />

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                variant="hero"
                onClick={handleNext}
                className="gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Registration
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
      {showSubmittingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-xl flex flex-col items-center max-w-sm w-full animate-pulse">
            <Loader2 className="w-10 h-10 mb-4 animate-spin text-primary" />
            <h3 className="text-lg font-semibold mb-2 text-center">Please do not close this window</h3>
            <p className="text-center text-muted-foreground mb-2">Your registration is being processed. This may take a few minutes.</p>
            <div className="flex items-center justify-center gap-1 text-primary font-bold text-lg mt-2">
              Processing
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-150">.</span>
              <span className="animate-bounce delay-300">.</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RegistrationForm;

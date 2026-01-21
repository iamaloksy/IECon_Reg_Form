import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormData } from "@/lib/formSchema";
import FileUpload from "@/components/FileUpload";
import { QrCode, AlertCircle } from "lucide-react";
import paymentQR from "@/assets/payment QR.png";

interface PaymentStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const PaymentStep = ({ form }: PaymentStepProps) => {
  const { setValue, watch } = form;
  const paymentScreenshot = watch("paymentScreenshot");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="form-section"
    >
      <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
        Payment
      </h2>
      <p className="text-muted-foreground mb-6">
        Complete the registration fee payment and upload the screenshot.
      </p>

      <div className="space-y-6">
        {/* Payment QR Code Section */}
        <div className="glass-card rounded-xl p-6 text-center">
            <div className="w-48 h-48 mx-auto mb-4 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
              <img
                src={paymentQR}
                alt="Payment QR Code"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <p className="text-xs text-muted-foreground mb-2">Scan this QR code to pay</p>
          
          <h4 className="text-lg font-semibold text-foreground mb-2">
            Registration Fee: ₹499
          </h4>
          
          <div className="flex items-start gap-2 text-left bg-primary/5 rounded-lg p-3 mt-4">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Payment Instructions:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Scan the QR code using any UPI app</li>
                <li>Complete the payment of ₹499</li>
                <li>Take a screenshot of the payment confirmation</li>
                <li>Upload the screenshot below</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Upload Payment Screenshot */}
        <FileUpload
          label="Upload Payment Screenshot"
          accept=".jpg,.jpeg,.png,.pdf"
          maxSize={5}
          value={paymentScreenshot}
          onChange={(file) => setValue("paymentScreenshot", file)}
        />
      </div>
    </motion.div>
  );
};

export default PaymentStep;

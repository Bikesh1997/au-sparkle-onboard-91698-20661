import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { CreditCard, Check } from "lucide-react";

const PANVerification = () => {
  const [pan, setPan] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const { addPoints, setProgress } = useGamification();

  const validatePAN = (value: string) => {
    // PAN format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(value);
  };

  const isValidPAN = validatePAN(pan);

  const handlePanChange = (value: string) => {
    const upperValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    setPan(upperValue);
  };

  const handleVerify = () => {
    if (isValidPAN) {
      setIsVerifying(true);
      // Simulate API call
      setTimeout(() => {
        setIsVerifying(false);
        setVerified(true);
        addPoints(20);
        setProgress(45);
        setTimeout(() => {
          navigate("/personal-details");
        }, 1500);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={35} />
        </div>
      </div>

      <BackButton to="/uidai-otp" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
        <div className="w-14 h-14 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <CreditCard className="w-7 h-7 text-purple" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          PAN Verification 💳
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your PAN details for verification
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto">
          {isVerifying ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-medium text-foreground">Verifying PAN…</p>
            </div>
          ) : verified ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-success" />
              </div>
              <p className="text-lg font-bold text-success">✅ PAN Verified Successfully</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Enter PAN Number
                </label>
                <Input
                  type="text"
                  maxLength={10}
                  value={pan}
                  onChange={(e) => handlePanChange(e.target.value)}
                  placeholder="ABCDE1234F"
                  className="text-center text-lg tracking-wider uppercase"
                />
                {pan.length > 0 && !isValidPAN && (
                  <p className="text-sm text-destructive mt-2">
                    Please enter a valid PAN (5 letters + 4 digits + 1 letter)
                  </p>
                )}
                {isValidPAN && (
                  <div className="flex items-center gap-2 mt-2 text-success">
                    <Check className="w-4 h-4" />
                    <p className="text-sm">Valid PAN format</p>
                  </div>
                )}
              </div>

              <div className="bg-purple/5 border border-purple/20 rounded-xl p-4">
                <p className="text-xs text-muted-foreground text-center">
                  <strong className="text-foreground">Format:</strong> 5 letters + 4 digits + 1 letter
                  <br />
                  Example: ABCDE1234F
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      {!isVerifying && !verified && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
          <div className="w-full max-w-md mx-auto">
            <Button 
              onClick={handleVerify}
              className="w-full h-12 text-base font-semibold"
              disabled={!isValidPAN}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PANVerification;

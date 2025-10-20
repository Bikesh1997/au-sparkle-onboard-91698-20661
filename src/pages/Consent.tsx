import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { FileCheck, Check } from "lucide-react";

const Consent = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const { addPoints, setProgress } = useGamification();

  const isValidAadhaar = aadhaar.length === 12 && /^\d{12}$/.test(aadhaar);

  const handleSubmit = () => {
    if (isValidAadhaar) {
      setIsVerifying(true);
      // Simulate API call
      setTimeout(() => {
        setIsVerifying(false);
        setVerified(true);
        addPoints(10);
        setProgress(25);
        setTimeout(() => {
          navigate("/uidai-otp");
        }, 1500);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={20} />
        </div>
      </div>

      <BackButton to="/otp-verification" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
        <div className="w-14 h-14 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <FileCheck className="w-7 h-7 text-purple" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Aadhaar Verification 🛡️
        </h2>
        <p className="text-sm text-muted-foreground">
          Authorize us to fetch your verified details from UIDAI
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto">
          {isVerifying ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-medium text-foreground">Sending OTP…</p>
            </div>
          ) : verified ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-success" />
              </div>
              <p className="text-lg font-bold text-success">OTP Sent Successfully!</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Enter your 12-digit Aadhaar Number
                </label>
                <Input
                  type="text"
                  maxLength={12}
                  value={aadhaar}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setAadhaar(value);
                  }}
                  placeholder="XXXX XXXX XXXX"
                  className="text-center text-lg tracking-wider"
                />
                {aadhaar.length > 0 && !isValidAadhaar && (
                  <p className="text-sm text-destructive mt-2">
                    Please enter a valid 12-digit Aadhaar number
                  </p>
                )}
              </div>

              <p className="text-xs text-center text-muted-foreground px-2">
                OTP will be sent to your registered mobile number
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      {!isVerifying && !verified && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
          <div className="w-full max-w-md mx-auto">
            <Button 
              onClick={handleSubmit}
              className="w-full h-12 text-base font-semibold"
              disabled={!isValidAadhaar}
            >
              Send OTP
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consent;

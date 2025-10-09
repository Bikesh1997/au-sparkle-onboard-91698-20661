import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { FileCheck, Check, FileText, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const Consent = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataConsent, setDataConsent] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const { addPoints, setProgress, triggerConfetti, unlockBadge } = useGamification();

  const handleSubmit = () => {
    if (termsAccepted && dataConsent) {
      setSaved(true);
      addPoints(30);
      setProgress(100);
      unlockBadge("new-member");
      setTimeout(() => navigate("/video-kyc"), 300);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={70} />
        </div>
      </div>

      <BackButton to="/account-selection" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
        <div className="w-14 h-14 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <FileCheck className="w-7 h-7 text-purple" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Terms & Consent
        </h2>
        <p className="text-sm text-muted-foreground">
          Tap to accept
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto space-y-3">
          {/* Terms Card - Tappable */}
          <div
            onClick={() => setTermsAccepted(!termsAccepted)}
            className={cn(
              "p-5 rounded-xl cursor-pointer transition-all duration-200 border-2",
              termsAccepted
                ? "border-purple bg-purple/5 shadow-lg shadow-purple/10"
                : "border-border hover:border-purple/30"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all",
                  termsAccepted
                    ? "bg-purple text-purple-foreground"
                    : "bg-purple/10 text-purple"
                )}
              >
                {termsAccepted ? (
                  <Check className="w-6 h-6 animate-bounce-in" />
                ) : (
                  <FileText className="w-6 h-6" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1 text-base">Terms & Conditions</h3>
                <p className="text-sm text-muted-foreground">
                  I agree to AU Bank's terms of service and account opening conditions
                </p>
              </div>
            </div>
          </div>

          {/* Data Consent Card - Tappable */}
          <div
            onClick={() => setDataConsent(!dataConsent)}
            className={cn(
              "p-5 rounded-xl cursor-pointer transition-all duration-200 border-2",
              dataConsent
                ? "border-purple bg-purple/5 shadow-lg shadow-purple/10"
                : "border-border hover:border-purple/30"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all",
                  dataConsent
                    ? "bg-purple text-purple-foreground"
                    : "bg-purple/10 text-purple"
                )}
              >
                {dataConsent ? (
                  <Check className="w-6 h-6 animate-bounce-in" />
                ) : (
                  <Lock className="w-6 h-6" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1 text-base">Data Consent</h3>
                <p className="text-sm text-muted-foreground">
                  I authorize AU Bank to process my personal data for KYC verification
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-4 px-2">
            Your information is secure and encrypted
          </p>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="w-full max-w-md mx-auto">
          <Button 
            onClick={handleSubmit}
            className="w-full h-12 text-base font-semibold"
            disabled={!termsAccepted || !dataConsent}
          >
            Submit & Continue to KYC
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Consent;

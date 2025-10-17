import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { Video, Check, AlertCircle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const VideoKYC = () => {
  const [aadhaar, setAadhaar] = useState(() => localStorage.getItem("aadhaar") || "");
  const [pan, setPan] = useState(() => localStorage.getItem("pan") || "");
  const [panError, setPanError] = useState("");
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const { addPoints, setProgress, triggerConfetti, unlockBadge } = useGamification();

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
    setAadhaar(value);
    localStorage.setItem("aadhaar", value);
  };

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 10);
    setPan(value);
    localStorage.setItem("pan", value);
    
    // PAN format validation: AAAAA9999A
    if (value.length === 10) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(value)) {
        setPanError("Invalid PAN format");
      } else {
        setPanError("");
      }
    } else {
      setPanError("");
    }
  };

  const isValid = aadhaar.length === 12 && pan.length === 10 && !panError;

  const handleStart = () => {
    if (!isValid) return;
    
    setStarted(true);
    
    // Simulate video KYC process
    setTimeout(() => {
      setCompleted(true);
      addPoints(150);
      setProgress(90);
      unlockBadge("verified-user");
    }, 3000);
  };

  const handleContinue = () => {
    setTimeout(() => navigate("/kyc-status"), 500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={started ? 90 : 80} />
        </div>
      </div>

      <BackButton to="/consent" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-4 px-6">
        <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-2">
          <Video className="w-6 h-6 text-purple" />
        </div>
        <h2 className="text-lg font-bold text-foreground mb-1">
          Video KYC Verification
        </h2>
        <p className="text-xs text-muted-foreground">
          Quick 2-minute video call
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex-shrink-0 px-6 pb-4">
        <div className="w-full max-w-md mx-auto flex items-center justify-center gap-2">
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs">
            <Check className="w-3 h-3 mr-1" />
            Steps 1-4 Complete
          </Badge>
          <span className="text-muted-foreground text-xs">→</span>
          <Badge variant="secondary" className="bg-purple/10 text-purple border-purple/20 text-xs">
            Step 5: Video KYC
          </Badge>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto">
          <div className="space-y-5">
            {!started ? (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Aadhaar Number
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Enter 12-digit Aadhaar"
                        value={aadhaar}
                        onChange={handleAadhaarChange}
                        maxLength={12}
                        className={cn(
                          "text-base pr-10 h-11",
                          aadhaar.length === 12 && "!border-success"
                        )}
                      />
                      {aadhaar.length === 12 && (
                        <Check className="absolute right-3 top-3 w-5 h-5 text-success animate-bounce-in" />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      PAN Number
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="ABCDE1234F"
                        value={pan}
                        onChange={handlePanChange}
                        maxLength={10}
                        className={cn(
                          "text-base uppercase pr-10 h-11",
                          panError && "!border-destructive",
                          pan.length === 10 && !panError && "!border-success"
                        )}
                      />
                      {pan.length === 10 && !panError && (
                        <Check className="absolute right-3 top-3 w-5 h-5 text-success animate-bounce-in" />
                      )}
                      {panError && (
                        <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-destructive" />
                      )}
                    </div>
                    {panError && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {panError}
                      </p>
                    )}
                    {!panError && pan.length > 0 && pan.length < 10 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Format: 5 letters + 4 digits + 1 letter
                      </p>
                    )}
                  </div>
                </div>

                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                  <Video className="w-14 h-14 text-purple" />
                </div>

                <div className="space-y-2 text-sm bg-purple/5 p-4 rounded-xl border border-purple/20">
                  <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-purple" />
                    Before you start:
                  </h3>
                  <ul className="space-y-1.5 text-muted-foreground text-xs">
                    <li className="flex items-start gap-2">
                      <span className="text-purple">•</span>
                      <span>Good lighting and stable internet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple">•</span>
                      <span>Keep Aadhaar and PAN ready</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple">•</span>
                      <span>Follow agent's instructions</span>
                    </li>
                  </ul>
                </div>
              </>
            ) : !completed ? (
              <>
                <div className="aspect-video bg-gradient-to-br from-purple/20 to-purple/5 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-foreground font-medium">Connecting...</p>
                  </div>
                </div>
                <p className="text-center text-muted-foreground text-sm">
                  Connecting with verification agent
                </p>
              </>
            ) : (
              <>
                <div className="aspect-video bg-success/10 rounded-xl flex flex-col items-center justify-center border-2 border-success">
                  <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mb-3 animate-bounce-in">
                    <Check className="w-8 h-8 text-success-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-success mb-2">
                    Verification Complete!
                  </h3>
                  <Badge variant="secondary" className="bg-purple/10 text-purple border-purple/20 text-xs">
                    Badge Unlocked: Verified User
                  </Badge>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="w-full max-w-md mx-auto">
          {!started ? (
            <Button 
              onClick={handleStart}
              className="w-full h-12 text-base font-semibold"
              disabled={!isValid}
            >
              Start Video KYC
            </Button>
          ) : completed ? (
            <Button 
              onClick={handleContinue}
              className="w-full h-12 text-base font-semibold"
            >
              Continue
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VideoKYC;

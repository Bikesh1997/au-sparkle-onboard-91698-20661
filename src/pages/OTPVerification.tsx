import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { Shield, Phone, Check } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { addPoints, setProgress } = useGamification();
  const mobile = location.state?.mobile || "";

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Auto-verify and navigate when OTP is complete
  useEffect(() => {
    if (otp.length === 6 && !verified) {
      setVerified(true);
      addPoints(20);
      setProgress(20);
      
      // Auto-advance after brief success indication
      setTimeout(() => {
        navigate("/personal-details");
      }, 1000);
    }
  }, [otp, verified, addPoints, setProgress, navigate]);

  const handleResend = () => {
    setTimer(30);
    setOtp("");
    setVerified(false);
  };

  const handleCallMe = () => {
    // Inline feedback - show call initiated
    setTimer(60);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={30} />
        </div>
      </div>

      <BackButton to="/mobile-entry" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-24 pb-6 px-6">
        <div className="w-14 h-14 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Shield className="w-7 h-7 text-purple" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Verify OTP
        </h2>
        <p className="text-sm text-muted-foreground mb-1">
          Enter the 6-digit code sent to
        </p>
        <p className="text-sm text-foreground font-semibold">+91 {mobile}</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        <div className="w-full max-w-md mx-auto space-y-5">
          <div className="flex justify-center mt-3">
            <InputOTP 
              maxLength={6} 
              value={otp} 
              onChange={setOtp}
              disabled={verified}
            >
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot 
                    key={index}
                    index={index} 
                    className={cn(
                      "w-12 h-12 text-lg transition-colors border-2",
                      verified && "border-success bg-success/10",
                      !verified && otp[index] && "border-primary"
                    )}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {verified && (
            <div className="flex items-center justify-center gap-2 text-success animate-bounce-in">
              <Check className="w-5 h-5" />
              <span className="text-sm font-semibold">Verified! Proceeding...</span>
            </div>
          )}

          <div className="text-center space-y-3">
            {timer > 0 && (
              <p className="text-sm text-muted-foreground">
                Resend OTP in <span className="text-purple font-semibold">{timer}s</span>
              </p>
            )}
            
            <div className="bg-muted/30 rounded-xl p-4 space-y-2">
              <p className="text-xs text-muted-foreground mb-3">Didn't receive the code?</p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResend}
                  disabled={timer > 0}
                  className="flex-1 h-9 text-xs hover:bg-purple/10 border border-border disabled:opacity-50"
                >
                  Resend OTP
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCallMe}
                  className="flex-1 h-9 text-xs hover:bg-purple/10 border border-border"
                >
                  <Phone className="w-3 h-3 mr-1 text-purple" />
                  Call Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;

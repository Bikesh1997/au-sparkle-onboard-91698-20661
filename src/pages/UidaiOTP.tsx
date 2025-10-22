import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { Shield, Check } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const UidaiOTP = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const { addPoints, setProgress } = useGamification();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setOtp("");
  };

  const handleVerify = async () => {
    if (otp.length === 6) {
      setIsVerifying(true);
      // Simulate API call
      setTimeout(() => {
        setIsVerifying(false);
        setVerified(true);
        addPoints(20);
        setProgress(35);
        setTimeout(() => {
          navigate("/pan-verification");
        }, 1500);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={30} />
        </div>
      </div>

      <BackButton to="/consent" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
        <div className="w-14 h-14 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Shield className="w-7 h-7 text-purple" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Verify ✉️
        </h2>
        <p className="text-sm text-muted-foreground">
          OTP sent from UIDAI to your registered number
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto">
          {isVerifying ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-medium text-foreground">Verifying Aadhaar…</p>
            </div>
          ) : verified ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-success" />
              </div>
              <p className="text-lg font-bold text-success">🎉 Aadhaar Verified Successfully!</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="border-2 border-purple/30" />
                    <InputOTPSlot index={1} className="border-2 border-purple/30" />
                    <InputOTPSlot index={2} className="border-2 border-purple/30" />
                    <InputOTPSlot index={3} className="border-2 border-purple/30" />
                    <InputOTPSlot index={4} className="border-2 border-purple/30" />
                    <InputOTPSlot index={5} className="border-2 border-purple/30" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  {timer > 0 ? (
                    <>Time remaining: <span className="font-semibold text-purple">{timer}s</span></>
                  ) : (
                    <span className="text-muted-foreground">Didn't receive the OTP?</span>
                  )}
                </p>
                {canResend && (
                  <Button
                    variant="link"
                    onClick={handleResend}
                    className="text-purple font-semibold"
                  >
                    Resend OTP
                  </Button>
                )}
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
              disabled={otp.length !== 6}
            >
              Verify OTP
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UidaiOTP;

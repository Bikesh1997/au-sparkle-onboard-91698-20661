import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { PointsBadge } from "@/components/PointsBadge";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { Phone, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileEntry = () => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setProgress } = useGamification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length === 10) {
      setProgress(10);
      setTimeout(() => {
        navigate("/otp-verification", { state: { mobile } });
      }, 300);
    } else {
      setError("Please enter a valid 10-digit mobile number");
      setTimeout(() => setError(""), 3000);
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

      <BackButton to="/" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
        <div className="w-14 h-14 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Phone className="w-7 h-7 text-purple" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Enter Mobile Number
        </h2>
        <p className="text-sm text-muted-foreground">
          We'll send you a verification code
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative mt-3">
              <Input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                  setError("");
                }}
                maxLength={10}
                className={cn(
                  "h-12 text-center text-lg pr-10 border-2",
                  error && "border-destructive",
                  mobile.length === 10 && !error && "border-success",
                  mobile.length > 0 && mobile.length < 10 && !error && "border-primary"
                )}
              />
              {mobile.length === 10 && !error && (
                <Check className="absolute right-3 top-3 w-6 h-6 text-success animate-bounce-in" />
              )}
              {error && (
                <AlertCircle className="absolute right-3 top-3 w-6 h-6 text-destructive" />
              )}
            </div>
            {error && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {error}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="w-full max-w-md mx-auto">
          <Button 
            type="submit"
            onClick={handleSubmit}
            className="w-full h-12 text-base font-semibold"
            disabled={mobile.length !== 10}
          >
            Send OTP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileEntry;

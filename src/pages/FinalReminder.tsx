import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { CheckCircle2, User, Video } from "lucide-react";

const FinalReminder = () => {
  const navigate = useNavigate();
  const { setProgress } = useGamification();

  const handleContinue = () => {
    setProgress(90);
    navigate("/video-kyc");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={85} />
        </div>
      </div>

      <BackButton to="/bank-branch-selection" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
        <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-7 h-7 text-success" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Basic Details Added ✅
        </h2>
        <p className="text-sm text-muted-foreground">
          A few more steps to complete your application
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto">
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex gap-4 p-4 bg-card border border-border rounded-xl">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-purple/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-purple" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-purple text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-bold text-foreground">Share Your Details</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Provide your personal and occupation details for verification
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 p-4 bg-card border border-border rounded-xl">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-purple/10 flex items-center justify-center">
                  <Video className="w-5 h-5 text-purple" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-purple text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-bold text-foreground">Complete Video KYC</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Quick video verification to confirm your identity
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-purple/5 border border-purple/20 rounded-xl p-4 mt-6">
              <p className="text-sm text-center text-foreground">
                <span className="font-semibold">Almost there!</span> These final steps will take just a few minutes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="w-full max-w-md mx-auto">
          <Button 
            onClick={handleContinue}
            className="w-full h-12 text-base font-semibold"
          >
            Continue Application
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinalReminder;

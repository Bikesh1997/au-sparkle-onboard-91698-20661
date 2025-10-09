import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import auLogo from "@/assets/au-finance-logo.png";
import { Rocket, Lock, Gift } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";

const Welcome = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/mobile-entry");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={0} />
        </div>
      </div>

      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
        <img src={auLogo} alt="AU Small Finance Bank" className="h-16 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Welcome to AU Finance
        </h1>
        <p className="text-sm text-muted-foreground">
          Your journey to smart banking starts here
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto">
          {/* Features Card */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <Rocket className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base mb-1">Quick Setup</h3>
                <p className="text-sm text-muted-foreground">Complete in just 5 minutes</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base mb-1">Secure & Safe</h3>
                <p className="text-sm text-muted-foreground">Bank-grade security</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base mb-1">Earn Rewards</h3>
                <p className="text-sm text-muted-foreground">Unlock badges & points</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="w-full max-w-md mx-auto">
          <Button
            className="w-full h-12 text-base font-semibold bg-orange-600 hover:bg-orange-700 text-white"
            onClick={handleContinue}
          >
            Open a New Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGamification } from "@/context/GamificationContext";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Confetti } from "@/components/Confetti";

const SuccessScreen = () => {
  const navigate = useNavigate();
  const { addPoints, triggerConfetti } = useGamification();

  useEffect(() => {
    // Trigger confetti and award final points
    triggerConfetti();
    addPoints(100);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <Confetti />
      
      {/* Success Icon */}
      <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mb-6 animate-scale-in">
        <CheckCircle2 className="w-12 h-12 text-success" />
      </div>

      {/* Header */}
      <h1 className="text-3xl font-bold text-foreground mb-3 text-center">
        🎉 Congratulations!
      </h1>
      <p className="text-lg text-muted-foreground text-center mb-8 max-w-md">
        Your account application has been submitted successfully
      </p>

      {/* Info Card */}
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 mb-8">
        <h3 className="font-bold text-foreground mb-3 text-center">What's Next?</h3>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <span>Your application is under review</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <span>You'll receive a confirmation SMS within 24 hours</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <span>Check your email for further instructions</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-md space-y-3">
        <Button
          onClick={() => navigate("/")}
          className="w-full h-12 text-base font-semibold"
        >
          Go to Dashboard
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="w-full h-12 text-base font-semibold"
        >
          Set up Debit Card
        </Button>
      </div>
    </div>
  );
};

export default SuccessScreen;

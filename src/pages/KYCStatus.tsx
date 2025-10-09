import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { CheckCircle2, ArrowRight, UserPlus, Building2 } from "lucide-react";
import { useEffect } from "react";
import { ProgressBar } from "@/components/ProgressBar";

const KYCStatus = () => {
  const navigate = useNavigate();
  const { addPoints, unlockBadge } = useGamification();

  useEffect(() => {
    // Award bonus points for KYC completion
    setTimeout(() => {
      addPoints(200);
      unlockBadge("kyc-complete");
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={100} />
        </div>
      </div>

      <BackButton to="/video-kyc" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-4 px-6">
        <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3 animate-fade-in">
          <CheckCircle2 className="w-7 h-7 text-success" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-1">
          You're Verified!
        </h1>
        <p className="text-xs text-muted-foreground">
          Your account is now active and ready to use
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto space-y-3">
          {/* Complete Profile Section - First */}
          <div className="bg-gradient-to-br from-purple/5 to-transparent rounded-xl p-4 border border-purple/20">
            <div className="mb-3">
              <Badge className="bg-warning/10 text-warning border-warning/20 text-xs mb-2">
                Action Required
              </Badge>
              <h3 className="text-base font-bold text-foreground mb-1">
                Complete Your Profile
              </h3>
              <p className="text-xs text-muted-foreground">
                Add details to unlock all features
              </p>
            </div>

            <div className="space-y-2">
              <div
                className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-purple/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple/10 flex items-center justify-center group-hover:bg-purple/20 transition-colors">
                    <UserPlus className="w-5 h-5 text-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Add Nominee</p>
                    <p className="text-xs text-muted-foreground">Required for account</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs border-warning/30 text-warning bg-warning/5">
                    Pending
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-purple group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-purple/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple/10 flex items-center justify-center group-hover:bg-purple/20 transition-colors">
                    <Building2 className="w-5 h-5 text-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Banking Preferences</p>
                    <p className="text-xs text-muted-foreground">Set up your preferences</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs border-warning/30 text-warning bg-warning/5">
                    Pending
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-purple group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-success/5 rounded-xl p-4 border border-success/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground">Verification Status</h3>
              <Badge className="bg-success text-success-foreground text-xs">
                Complete
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full" />
                <span className="text-foreground text-xs">Identity verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full" />
                <span className="text-foreground text-xs">Documents approved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full" />
                <span className="text-foreground text-xs">Video KYC completed</span>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground px-2">
            Welcome to the AU Finance family!
          </p>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="w-full max-w-md mx-auto">
          <Button 
            onClick={() => navigate("/")}
            className="w-full h-12 text-base font-semibold"
          >
            Start Banking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KYCStatus;

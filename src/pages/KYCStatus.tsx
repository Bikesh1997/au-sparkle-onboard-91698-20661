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
        <div className="w-full max-w-md mx-auto space-y-4">
          {/* Complete Profile Section - First */}
          <div className="bg-gradient-to-br from-purple/10 to-transparent rounded-2xl p-6 border-2 border-purple/30 shadow-lg">
            <div className="mb-4">
              <Badge className="bg-warning text-warning-foreground text-xs mb-3">
                Action Required
              </Badge>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Complete Your Profile
              </h3>
              <p className="text-sm text-muted-foreground">
                Add details to unlock all features
              </p>
            </div>

            <div className="space-y-3">
              <div
                className="flex items-center justify-between p-4 bg-background rounded-xl border-2 border-purple/20 hover:border-purple hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple/20 flex items-center justify-center group-hover:bg-purple/30 transition-colors">
                    <UserPlus className="w-6 h-6 text-purple" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground">Add Nominee</p>
                    <p className="text-xs text-muted-foreground">Required for account</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs border-warning text-warning bg-warning/10">
                    Pending
                  </Badge>
                  <ArrowRight className="w-5 h-5 text-purple group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                className="flex items-center justify-between p-4 bg-background rounded-xl border-2 border-purple/20 hover:border-purple hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple/20 flex items-center justify-center group-hover:bg-purple/30 transition-colors">
                    <Building2 className="w-6 h-6 text-purple" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground">Banking Preferences</p>
                    <p className="text-xs text-muted-foreground">Set up your preferences</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs border-warning text-warning bg-warning/10">
                    Pending
                  </Badge>
                  <ArrowRight className="w-5 h-5 text-purple group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground px-2 pt-2">
            Welcome to the AU Finance family! 🎉
          </p>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-success/10 border border-success/30 rounded-xl p-3 flex items-center gap-2 justify-center">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="text-sm font-semibold text-success">Account Setup Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCStatus;

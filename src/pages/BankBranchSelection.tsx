import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { Building2, MapPin, Check } from "lucide-react";

const branches = [
  {
    id: 1,
    name: "Mumbai - Andheri West",
    address: "Shop 4, Veera Desai Road, Andheri West",
    distance: "2.3 km",
    recommended: true,
  },
  {
    id: 2,
    name: "Mumbai - Goregaon",
    address: "Link Road, Near Station, Goregaon East",
    distance: "3.8 km",
    recommended: false,
  },
  {
    id: 3,
    name: "Mumbai - Malad",
    address: "SV Road, Malad West",
    distance: "5.1 km",
    recommended: false,
  },
];

const BankBranchSelection = () => {
  const [selectedBranch, setSelectedBranch] = useState(branches[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { addPoints, setProgress } = useGamification();

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      addPoints(20);
      setProgress(85);
      navigate("/final-reminder");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={80} />
        </div>
      </div>

      <BackButton to="/preview-confirmation" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
        <div className="w-14 h-14 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Building2 className="w-7 h-7 text-purple" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Select Your Branch 🏦
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose your nearest AU Finance branch
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto">
          {isSubmitting ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-medium text-foreground">Submitting Application…</p>
            </div>
          ) : (
            <div className="space-y-3">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedBranch === branch.id
                      ? "border-purple bg-purple/5"
                      : "border-border bg-card hover:border-purple/50"
                  }`}
                >
                  {branch.recommended && (
                    <div className="absolute -top-2 right-4">
                      <span className="bg-purple text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Recommended
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedBranch === branch.id ? "bg-purple text-white" : "bg-purple/10 text-purple"
                    }`}>
                      {selectedBranch === branch.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Building2 className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">{branch.name}</h3>
                      <div className="flex items-start gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="inline-flex items-center gap-1 text-xs font-medium text-purple bg-purple/10 px-2 py-1 rounded-full">
                        <MapPin className="w-3 h-3" />
                        {branch.distance} away
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      {!isSubmitting && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
          <div className="w-full max-w-md mx-auto">
            <Button 
              onClick={handleSubmit}
              className="w-full h-12 text-base font-semibold"
            >
              Submit Application
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankBranchSelection;

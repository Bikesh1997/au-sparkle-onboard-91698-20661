import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { Wallet, Check, CreditCard, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const accounts = [
  {
    id: "savings",
    name: "Savings",
    icon: Wallet,
    amb: "Zero",
    interest: "3.5%",
    benefits: ["Zero balance", "UPI & NEFT"],
  },
  {
    id: "current",
    name: "Current",
    icon: CreditCard,
    amb: "₹10K",
    interest: "N/A",
    benefits: ["High limits", "Overdraft"],
  },
  {
    id: "salary",
    name: "Salary",
    icon: Building2,
    amb: "Zero",
    interest: "4.0%",
    benefits: ["Auto sweep", "Cashback"],
  },
];

const AccountSelection = () => {
  const [selectedAccount, setSelectedAccount] = useState(() => localStorage.getItem("accountSelection") || "");
  const navigate = useNavigate();
  const { addPoints, setProgress, triggerConfetti } = useGamification();

  const handleSelect = (accountId: string) => {
    setSelectedAccount(accountId);
    localStorage.setItem("accountSelection", accountId);
  };

  const [saved, setSaved] = useState(false);

  const handleSubmit = () => {
    if (selectedAccount) {
      setSaved(true);
      addPoints(20);
      setProgress(70);
      setTimeout(() => navigate("/consent"), 300);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={60} />
        </div>
      </div>

      <BackButton to="/address-details" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-4 px-6">
        <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Wallet className="w-6 h-6 text-purple" />
        </div>
        <h2 className="text-lg font-bold text-foreground mb-1">
          Pick Your Perfect Account 💳
        </h2>
        <p className="text-xs text-muted-foreground">
          Choose what works best for you
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto space-y-2">
          {accounts.map((account) => {
            const Icon = account.icon;
            return (
              <div
                key={account.id}
                className={cn(
                  "p-3 rounded-xl cursor-pointer transition-all duration-200 border-2",
                  selectedAccount === account.id
                    ? "border-purple bg-purple/5"
                    : "border-border hover:border-purple/30"
                )}
                onClick={() => handleSelect(account.id)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      selectedAccount === account.id
                        ? "bg-purple text-purple-foreground"
                        : "bg-purple/10 text-purple"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-sm">{account.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>AMB: <span className="font-semibold text-foreground">{account.amb}</span></span>
                      <span className="text-success">{account.interest}</span>
                    </div>
                  </div>
                  {selectedAccount === account.id && (
                    <div className="w-5 h-5 bg-purple rounded-full flex items-center justify-center animate-bounce-in">
                      <Check className="w-3 h-3 text-purple-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 ml-13 mt-2">
                  {account.benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="w-full max-w-md mx-auto">
          <Button 
            onClick={handleSubmit}
            className="w-full h-12 text-base font-semibold"
            disabled={!selectedAccount}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSelection;

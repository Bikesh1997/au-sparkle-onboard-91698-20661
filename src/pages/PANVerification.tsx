import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { CreditCard, Check, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

const PANVerification = () => {
  const [panNumber, setPanNumber] = useState("");
  const [panImage, setPanImage] = useState<File | null>(null);
  const [validPan, setValidPan] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const { addPoints, setProgress } = useGamification();

  const validatePAN = (value: string) => {
    // PAN format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(value);
  };

  const handlePanChange = (value: string) => {
    const upperValue = value.toUpperCase();
    setPanNumber(upperValue);
    setValidPan(validatePAN(upperValue));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPanImage(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setPanImage(null);
  };

  const handleVerify = async () => {
    if (validPan) {
      setIsVerifying(true);
      // Simulate API call
      setTimeout(() => {
        setIsVerifying(false);
        setVerified(true);
        addPoints(20);
        setProgress(40);
        setTimeout(() => {
          navigate("/personal-details");
        }, 1500);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={35} />
        </div>
      </div>

      <BackButton to="/uidai-otp" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
        <div className="w-14 h-14 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <CreditCard className="w-7 h-7 text-purple" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          PAN Verification 💳
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your PAN details for verification
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto">
          {isVerifying ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-medium text-foreground">Verifying PAN…</p>
            </div>
          ) : verified ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-success" />
              </div>
              <p className="text-lg font-bold text-success">✅ PAN Verified Successfully</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="pan" className="text-sm font-medium">PAN Number</Label>
                <div className="relative">
                  <Input
                    id="pan"
                    type="text"
                    placeholder="Enter PAN (e.g., ABCDE1234F)"
                    value={panNumber}
                    onChange={(e) => handlePanChange(e.target.value)}
                    maxLength={10}
                    className={cn("h-11 pr-10 uppercase", validPan && "!border-success")}
                  />
                  {validPan && (
                    <Check className="absolute right-3 top-3 w-5 h-5 text-success animate-bounce-in" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Format: 5 letters + 4 digits + 1 letter
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Upload PAN Card (Optional)</Label>
                {panImage ? (
                  <div className="relative border-2 border-purple/30 rounded-lg p-4 bg-purple/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple/10 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-purple" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{panImage.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(panImage.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveImage}
                        className="h-8 w-8"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple/30 rounded-lg p-6 cursor-pointer hover:border-purple transition-colors bg-purple/5">
                    <Upload className="w-8 h-8 text-purple mb-2" />
                    <p className="text-sm font-medium text-foreground mb-1">Upload PAN Card</p>
                    <p className="text-xs text-muted-foreground">Front side only • Max 5MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
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
              disabled={!validPan}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PANVerification;

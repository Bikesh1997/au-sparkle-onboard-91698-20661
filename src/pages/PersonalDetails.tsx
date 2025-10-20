import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { User, Check, Mail, GraduationCap, Flag } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

const PersonalDetails = () => {
  // Auto-populated from Aadhaar/PAN
  const [name] = useState("Rajesh Kumar Singh"); // Auto-filled
  const [dob] = useState<Date>(new Date("1997-10-13")); // Auto-filled
  const [gender] = useState("male"); // Auto-filled
  const [mobile] = useState("9876543210"); // Auto-filled

  // Manual/Selectable fields
  const [maritalStatus, setMaritalStatus] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [isAbettedPerson, setIsAbettedPerson] = useState("");
  const [isIndianCitizen, setIsIndianCitizen] = useState("");
  
  const [validEmail, setValidEmail] = useState(false);
  
  const navigate = useNavigate();
  const { addPoints, setProgress } = useGamification();

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setValidEmail(validateEmail(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      addPoints(15);
      setProgress(50);
      setTimeout(() => navigate("/address-details"), 300);
    }
  };

  const isFormValid = maritalStatus && validEmail && qualification && isAbettedPerson && isIndianCitizen;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={40} />
        </div>
      </div>

      <BackButton to="/pan-verification" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
        <div className="w-14 h-14 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="w-7 h-7 text-purple" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Personal Information 📝
        </h2>
        <p className="text-sm text-muted-foreground">
          Auto-filled from Aadhaar/PAN • Complete remaining details
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Auto-filled fields (read-only) */}
            <div className="bg-purple/5 border border-purple/20 rounded-lg p-4 space-y-3">
              <p className="text-xs font-semibold text-purple uppercase tracking-wide">Auto-filled from Aadhaar/PAN</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Full Name</Label>
                  <p className="text-sm font-medium text-foreground">{name}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Mobile</Label>
                  <p className="text-sm font-medium text-foreground">{mobile}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Date of Birth</Label>
                  <p className="text-sm font-medium text-foreground">{format(dob, "PPP")}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Gender</Label>
                  <p className="text-sm font-medium text-foreground capitalize">{gender}</p>
                </div>
              </div>
            </div>

            {/* Manual/Selectable fields */}
            <div className="space-y-2">
              <Label htmlFor="maritalStatus" className="text-sm font-medium">Marital Status 💍</Label>
              <Select value={maritalStatus} onValueChange={setMaritalStatus}>
                <SelectTrigger className="h-11 border-2 border-purple/30">
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email 📧</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={cn("h-11 pr-10", validEmail && "!border-success")}
                />
                {validEmail && (
                  <Check className="absolute right-3 top-3 w-5 h-5 text-success animate-bounce-in" />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualification" className="text-sm font-medium">Qualification 🎓</Label>
              <Select value={qualification} onValueChange={setQualification}>
                <SelectTrigger className="h-11 border-2 border-purple/30">
                  <SelectValue placeholder="Select your qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                  <SelectItem value="postgraduate">Postgraduate</SelectItem>
                  <SelectItem value="doctorate">Doctorate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Are you an Abetted Person?</Label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={cn(
                    "p-4 rounded-xl cursor-pointer transition-all text-center border-2",
                    isAbettedPerson === "no" ? "border-purple bg-purple/5" : "border-border hover:border-purple/30"
                  )}
                  onClick={() => setIsAbettedPerson("no")}
                >
                  <p className="text-base font-medium">No</p>
                </div>
                <div
                  className={cn(
                    "p-4 rounded-xl cursor-pointer transition-all text-center border-2",
                    isAbettedPerson === "yes" ? "border-purple bg-purple/5" : "border-border hover:border-purple/30"
                  )}
                  onClick={() => setIsAbettedPerson("yes")}
                >
                  <p className="text-base font-medium">Yes</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Indian Citizen? 🇮🇳</Label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={cn(
                    "p-4 rounded-xl cursor-pointer transition-all text-center border-2",
                    isIndianCitizen === "yes" ? "border-purple bg-purple/5" : "border-border hover:border-purple/30"
                  )}
                  onClick={() => setIsIndianCitizen("yes")}
                >
                  <p className="text-base font-medium">Yes</p>
                </div>
                <div
                  className={cn(
                    "p-4 rounded-xl cursor-pointer transition-all text-center border-2",
                    isIndianCitizen === "no" ? "border-purple bg-purple/5" : "border-border hover:border-purple/30"
                  )}
                  onClick={() => setIsIndianCitizen("no")}
                >
                  <p className="text-base font-medium">No</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="w-full max-w-md mx-auto">
          <Button 
            onClick={handleSubmit}
            className="w-full h-12 text-base font-semibold"
            disabled={!isFormValid}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;

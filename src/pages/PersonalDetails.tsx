import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { User, Check, UserCircle2, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

const PersonalDetails = () => {
  const [name, setName] = useState(() => localStorage.getItem("personalDetails_name") || "");
  const [dob, setDob] = useState<Date>(() => {
    const saved = localStorage.getItem("personalDetails_dob");
    if (saved) return new Date(saved);
  
    // Default date: 18 years ago from today
    const today = new Date();
    const defaultDob = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return defaultDob;
  });
  const [gender, setGender] = useState(() => localStorage.getItem("personalDetails_gender") || "");
  const [validName, setValidName] = useState(() => {
    const saved = localStorage.getItem("personalDetails_name") || "";
    return saved.length >= 3;
  });
  const [validDob, setValidDob] = useState(() => {
    const saved = localStorage.getItem("personalDetails_dob");
    return !!saved;
  });
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const { addPoints, setProgress, triggerConfetti } = useGamification();

  const handleNameChange = (value: string) => {
    setName(value);
    setValidName(value.length >= 3);
    localStorage.setItem("personalDetails_name", value);
  };

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDobChange = (date: Date | undefined) => {
    setDob(date);
    setValidDob(!!date);
    setIsCalendarOpen(false); // Auto-close calendar
    if (date) {
      localStorage.setItem("personalDetails_dob", date.toISOString());
    }
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
    localStorage.setItem("personalDetails_gender", value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validName && validDob && gender) {
      setSaved(true);
      addPoints(15);
      setProgress(30);
      setTimeout(() => navigate("/address-details"), 300);
    }
  };

  const isFormValid = validName && validDob && gender;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={40} />
        </div>
      </div>

      <BackButton to="/otp-verification" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
        <div className="w-14 h-14 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="w-7 h-7 text-purple" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Personal Details
        </h2>
        <p className="text-sm text-muted-foreground">
          Help us know you better
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className={cn("h-11 pr-10", validName && "!border-success")}
                />
                {validName && (
                  <Check className="absolute right-3 top-3 w-5 h-5 text-success animate-bounce-in" />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Date of Birth</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 justify-start text-left font-normal border-2 border-purple/30 hover:border-purple",
                      !dob && "text-muted-foreground",
                      validDob && "!border-success"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-purple" />
                    {dob ? format(dob, "PPP") : <span>Pick your date of birth</span>}
                    {validDob && (
                      <Check className="ml-auto w-5 h-5 text-success animate-bounce-in" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dob}
                    onSelect={handleDobChange}
                    disabled={(date) => {
                      const today = new Date();
                      const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
                      return date > eighteenYearsAgo || date < new Date("1900-01-01");
                    }}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Gender</Label>
              <div className="grid grid-cols-3 gap-3">
                <div
                  className={cn(
                    "p-3 rounded-xl cursor-pointer transition-all text-center border-2",
                    gender === "male" ? "border-purple bg-purple/5" : "border-border hover:border-purple/30"
                  )}
                  onClick={() => handleGenderChange("male")}
                >
                  <UserCircle2 className="w-7 h-7 mx-auto mb-1 text-purple" />
                  <p className="text-sm font-medium">Male</p>
                </div>
                <div
                  className={cn(
                    "p-3 rounded-xl cursor-pointer transition-all text-center border-2",
                    gender === "female" ? "border-purple bg-purple/5" : "border-border hover:border-purple/30"
                  )}
                  onClick={() => handleGenderChange("female")}
                >
                  <User className="w-7 h-7 mx-auto mb-1 text-purple" />
                  <p className="text-sm font-medium">Female</p>
                </div>
                <div
                  className={cn(
                    "p-3 rounded-xl cursor-pointer transition-all text-center border-2",
                    gender === "other" ? "border-purple bg-purple/5" : "border-border hover:border-purple/30"
                  )}
                  onClick={() => handleGenderChange("other")}
                >
                  <Users className="w-7 h-7 mx-auto mb-1 text-purple" />
                  <p className="text-sm font-medium">Other</p>
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

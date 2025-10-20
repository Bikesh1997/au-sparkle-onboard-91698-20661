import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { FileCheck, Edit, User, MapPin, Briefcase, Users } from "lucide-react";

const PreviewConfirmation = () => {
  const navigate = useNavigate();
  const { addPoints, setProgress } = useGamification();

  // Mock data from localStorage
  const personalInfo = {
    name: localStorage.getItem("personalDetails_name") || "John Doe",
    dob: "15/08/1995",
    gender: "Male",
    mobile: localStorage.getItem("mobile") || "9876543210",
    email: localStorage.getItem("personalDetails_email") || "john@example.com",
    maritalStatus: localStorage.getItem("personalDetails_maritalStatus") || "Single",
  };

  const addressInfo = {
    address: localStorage.getItem("addressDetails_address") || "20 Saraf Kaskar Indl Estate",
    city: localStorage.getItem("addressDetails_city") || "Mumbai",
    state: localStorage.getItem("addressDetails_state") || "Maharashtra",
    pincode: localStorage.getItem("addressDetails_pincode") || "400001",
  };

  const handleConfirm = () => {
    addPoints(15);
    setProgress(75);
    navigate("/bank-branch-selection");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={70} />
        </div>
      </div>

      <BackButton to="/address-details" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
        <div className="w-14 h-14 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <FileCheck className="w-7 h-7 text-purple" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Review Your Details 📋
        </h2>
        <p className="text-sm text-muted-foreground">
          Please verify all information before submitting
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto space-y-4">
          {/* Personal Information */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple" />
                <h3 className="font-bold text-foreground">Personal Information</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/personal-details")}
                className="h-8 text-purple"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium text-foreground">{personalInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">DOB:</span>
                <span className="font-medium text-foreground">{personalInfo.dob}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gender:</span>
                <span className="font-medium text-foreground">{personalInfo.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mobile:</span>
                <span className="font-medium text-foreground">{personalInfo.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-foreground">{personalInfo.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Marital Status:</span>
                <span className="font-medium text-foreground">{personalInfo.maritalStatus}</span>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple" />
                <h3 className="font-bold text-foreground">Address</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/address-details")}
                className="h-8 text-purple"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-foreground font-medium">{addressInfo.address}</p>
              <p className="text-muted-foreground">
                {addressInfo.city}, {addressInfo.state} - {addressInfo.pincode}
              </p>
            </div>
          </div>

          <div className="bg-purple/5 border border-purple/20 rounded-xl p-4">
            <p className="text-xs text-center text-muted-foreground">
              By clicking "Confirm & Proceed", you agree that the information provided is accurate and complete.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="w-full max-w-md mx-auto">
          <Button 
            onClick={handleConfirm}
            className="w-full h-12 text-base font-semibold"
          >
            Confirm & Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewConfirmation;

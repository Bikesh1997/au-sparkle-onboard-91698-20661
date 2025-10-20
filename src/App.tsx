import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GamificationProvider } from "./context/GamificationContext";
import Welcome from "./pages/Welcome";
import MobileEntry from "./pages/MobileEntry";
import OTPVerification from "./pages/OTPVerification";
import Consent from "./pages/Consent";
import UidaiOTP from "./pages/UidaiOTP";
import PANVerification from "./pages/PANVerification";
import PersonalDetails from "./pages/PersonalDetails";
import AddressDetails from "./pages/AddressDetails";
import PreviewConfirmation from "./pages/PreviewConfirmation";
import BankBranchSelection from "./pages/BankBranchSelection";
import FinalReminder from "./pages/FinalReminder";
import AccountSelection from "./pages/AccountSelection";
import VideoKYC from "./pages/VideoKYC";
import SuccessScreen from "./pages/SuccessScreen";
import KYCStatus from "./pages/KYCStatus";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GamificationProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/mobile-entry" element={<MobileEntry />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/consent" element={<Consent />} />
            <Route path="/uidai-otp" element={<UidaiOTP />} />
            <Route path="/pan-verification" element={<PANVerification />} />
            <Route path="/personal-details" element={<PersonalDetails />} />
            <Route path="/address-details" element={<AddressDetails />} />
            <Route path="/preview-confirmation" element={<PreviewConfirmation />} />
            <Route path="/bank-branch-selection" element={<BankBranchSelection />} />
            <Route path="/final-reminder" element={<FinalReminder />} />
            <Route path="/account-selection" element={<AccountSelection />} />
            <Route path="/video-kyc" element={<VideoKYC />} />
            <Route path="/success" element={<SuccessScreen />} />
            <Route path="/kyc-status" element={<KYCStatus />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </GamificationProvider>
  </QueryClientProvider>
);

export default App;

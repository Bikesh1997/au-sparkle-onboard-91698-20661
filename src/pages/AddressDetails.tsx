import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { BackButton } from "@/components/BackButton";
import { useGamification } from "@/context/GamificationContext";
import { MapPin, Navigation, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const pincodeData: Record<string, { city: string; state: string; lat: number; lng: number }> = {
  "400001": { city: "Mumbai", state: "Maharashtra", lat: 18.9388, lng: 72.8354 },
  "110001": { city: "New Delhi", state: "Delhi", lat: 28.6139, lng: 77.2090 },
  "560001": { city: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5946 },
  "600001": { city: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707 },
  "700001": { city: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639 },
};

const AddressDetails = () => {
  const [address, setAddress] = useState(() => localStorage.getItem("addressDetails_address") || "");
  const [pincode, setPincode] = useState(() => localStorage.getItem("addressDetails_pincode") || "");
  const [city, setCity] = useState(() => localStorage.getItem("addressDetails_city") || "");
  const [state, setState] = useState(() => localStorage.getItem("addressDetails_state") || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [geoLocating, setGeoLocating] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const { addPoints, setProgress, triggerConfetti } = useGamification();

  const handleAddressChange = (value: string) => {
    setAddress(value);
    localStorage.setItem("addressDetails_address", value);
  };

  const handlePincodeChange = (value: string) => {
    const pin = value.replace(/\D/g, "").slice(0, 6);
    setPincode(pin);
    setLocationDetected(false);
    localStorage.setItem("addressDetails_pincode", pin);
    
    if (pin.length > 0) {
      const matches = Object.keys(pincodeData).filter(p => p.startsWith(pin));
      setSuggestions(matches.slice(0, 3));
    } else {
      setSuggestions([]);
    }
    
    if (pin.length === 6 && pincodeData[pin]) {
      const cityValue = pincodeData[pin].city;
      const stateValue = pincodeData[pin].state;
      setCity(cityValue);
      setState(stateValue);
      localStorage.setItem("addressDetails_city", cityValue);
      localStorage.setItem("addressDetails_state", stateValue);
      setSuggestions([]);
      setLocationDetected(true);
    } else if (pin.length === 6) {
      setCity("");
      setState("");
    }
  };

  const handleGeoLocate = () => {
    setGeoLocating(true);
    setTimeout(() => {
      const mockPin = "400001";
      setPincode(mockPin);
      const cityValue = pincodeData[mockPin].city;
      const stateValue = pincodeData[mockPin].state;
      setCity(cityValue);
      setState(stateValue);
      localStorage.setItem("addressDetails_pincode", mockPin);
      localStorage.setItem("addressDetails_city", cityValue);
      localStorage.setItem("addressDetails_state", stateValue);
      setLocationDetected(true);
      setGeoLocating(false);
    }, 1500);
  };

  const handleSelectPincode = (pin: string) => {
    setPincode(pin);
    const cityValue = pincodeData[pin].city;
    const stateValue = pincodeData[pin].state;
    setCity(cityValue);
    setState(stateValue);
    localStorage.setItem("addressDetails_pincode", pin);
    localStorage.setItem("addressDetails_city", cityValue);
    localStorage.setItem("addressDetails_state", stateValue);
    setSuggestions([]);
    setLocationDetected(true);
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    localStorage.setItem("addressDetails_city", value);
  };

  const handleStateChange = (value: string) => {
    setState(value);
    localStorage.setItem("addressDetails_state", value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address && pincode.length === 6 && city && state) {
      setSaved(true);
      addPoints(15);
      setProgress(50);
      setTimeout(() => navigate("/account-selection"), 300);
    }
  };

  const currentLocation = pincode.length === 6 && pincodeData[pincode];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border p-4 z-10">
        <div className="w-full max-w-md mx-auto pl-12">
          <ProgressBar value={50} />
        </div>
      </div>

      <BackButton to="/personal-details" />
      
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
        <div className="w-14 h-14 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <MapPin className="w-7 h-7 text-purple" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Address Details
        </h2>
        <p className="text-sm text-muted-foreground">
          Where should we reach you?
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">Full Address</Label>
              <Textarea
                id="address"
                placeholder="House no, Street, Landmark"
                value={address}
                onChange={(e) => handleAddressChange(e.target.value)}
                className={cn("min-h-20 border-2 border-purple/30 focus-visible:border-purple", address.length > 10 && "!border-success")}
              />
            </div>

            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <Label htmlFor="pincode" className="text-sm font-medium">PIN Code</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleGeoLocate}
                  disabled={geoLocating}
                  className="h-7 text-xs text-purple hover:text-purple hover:bg-purple/10"
                >
                  <Navigation className="w-3 h-3 mr-1" />
                  {geoLocating ? "Locating..." : "Use Location"}
                </Button>
              </div>
              <div className="relative">
                <Input
                  id="pincode"
                  type="tel"
                  placeholder="Enter 6-digit PIN code"
                  value={pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  maxLength={6}
                  className={cn("h-11 pr-10", locationDetected && "!border-success")}
                />
                {locationDetected && (
                  <Check className="absolute right-3 top-3 w-5 h-5 text-success animate-bounce-in" />
                )}
              </div>
              {suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-card border border-border rounded-lg shadow-lg mt-1 overflow-hidden">
                  {suggestions.map((pin) => (
                    <button
                      key={pin}
                      type="button"
                      onClick={() => handleSelectPincode(pin)}
                      className="w-full px-4 py-2 text-left hover:bg-purple/10 transition-colors text-sm"
                    >
                      <span className="font-semibold text-purple">{pin}</span>
                      <span className="text-muted-foreground ml-2">
                        {pincodeData[pin].city}, {pincodeData[pin].state}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mini Map Preview */}
            {currentLocation && (
              <div className="rounded-xl overflow-hidden border border-border bg-muted h-28 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-7 h-7 text-purple mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{currentLocation.city}</p>
                  <p className="text-xs text-muted-foreground">
                    {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="city" className="text-sm font-medium">City</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleGeoLocate}
                    disabled={geoLocating}
                    className="h-6 text-xs text-purple hover:text-purple hover:bg-purple/10 px-2"
                  >
                    <Navigation className="w-3 h-3 mr-1" />
                    {geoLocating ? "..." : "Auto"}
                  </Button>
                </div>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  placeholder="Enter city"
                  className={cn("h-11", city.length > 2 && "!border-success")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium">State</Label>
                <Input
                  id="state"
                  value={state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  placeholder="Enter state"
                  className={cn("h-11", state.length > 2 && "!border-success")}
                />
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
            disabled={!address || pincode.length !== 6 || !city || !state}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
}

export const BackButton = ({ to }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleBack}
      className="fixed top-4 left-4 z-50 hover:bg-purple/10"
    >
      <ArrowLeft className="w-5 h-5 text-foreground" />
    </Button>
  );
};

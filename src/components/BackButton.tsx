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
      variant="outline"
      size="icon"
      onClick={handleBack}
      className="fixed top-4 left-4 z-50 w-9 h-9 border-2 border-purple/30 bg-background hover:bg-purple/10 hover:border-purple shadow-md"
    >
      <ArrowLeft className="w-5 h-5 text-purple" />
    </Button>
  );
};

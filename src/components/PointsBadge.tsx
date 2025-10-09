import { useGamification } from "@/context/GamificationContext";
import { Coins } from "lucide-react";

export const PointsBadge = () => {
  const { points } = useGamification();

  return (
    <div className="fixed top-4 right-4 bg-card border border-purple/20 rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1.5 z-40 animate-bounce-in">
      <Coins className="w-4 h-4 text-purple" />
      <span className="font-bold text-sm text-purple">{points}</span>
    </div>
  );
};

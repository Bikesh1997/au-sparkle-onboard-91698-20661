import { useGamification } from "@/context/GamificationContext";

export const Confetti = () => {
  const { showConfetti } = useGamification();

  if (!showConfetti) return null;

  const confettiPieces = Array.from({ length: 25 }, (_, i) => i);
  const colors = ['#F15A29', '#FFB84D', '#4A90E2', '#E8F4F8', '#2D5F7E'];

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            width: `${4 + Math.random() * 4}px`,
            height: `${4 + Math.random() * 4}px`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2.5 + Math.random() * 1.5}s`,
            opacity: 0.7,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
};

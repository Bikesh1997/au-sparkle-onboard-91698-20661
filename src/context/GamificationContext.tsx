import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
}

interface GamificationContextType {
  points: number;
  addPoints: (amount: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
  badges: Badge[];
  unlockBadge: (badgeId: string) => void;
  showConfetti: boolean;
  triggerConfetti: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [badges, setBadges] = useState<Badge[]>([
    { id: 'new-member', name: 'New Member', icon: '🎉', unlocked: false },
    { id: 'verified-user', name: 'Verified User', icon: '✅', unlocked: false },
    { id: 'kyc-complete', name: 'KYC Complete', icon: '🏆', unlocked: false },
  ]);

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  const unlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((badge) =>
        badge.id === badgeId ? { ...badge, unlocked: true } : badge
      )
    );
    triggerConfetti();
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <GamificationContext.Provider
      value={{
        points,
        addPoints,
        progress,
        setProgress,
        badges,
        unlockBadge,
        showConfetti,
        triggerConfetti,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
}

export const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs font-medium text-muted-foreground">Progress</span>
        <span className="text-xs font-semibold text-purple">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
};

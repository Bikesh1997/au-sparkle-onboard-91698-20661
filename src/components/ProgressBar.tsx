import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
}

export const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs font-medium text-muted-foreground">Progress</span>
      </div>
      <div className="relative">
        <Progress value={value} className="h-6" />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-purple z-10">
          {value}%
        </span>
      </div>
    </div>
  );
};

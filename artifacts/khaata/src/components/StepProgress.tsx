import { motion } from 'framer-motion';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="flex gap-2 w-full px-4 py-3">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const step = i + 1;
        const isActive = step <= currentStep;
        return (
          <div key={step} className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
            {isActive && (
              <motion.div
                layoutId={`step-${step}`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className="h-full bg-primary"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
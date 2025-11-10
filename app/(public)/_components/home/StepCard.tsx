// app/(public)/_components/home/StepCard.tsx
import { ReactNode } from "react";

interface StepProps {
  step: {
    number: number;
    icon: ReactNode;
    title: string;
    description: string;
  };
  isLast?: boolean;
}

export default function StepCard({ step, isLast = false }: StepProps) {
  return (
    <div className="relative group">
      {/* Step connection line */}
      {!isLast && (
        <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-base-200 dark:bg-base-700 -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-500"></div>
        </div>
      )}

      {/* Card */}
      <div className="card card-bordered card-body h-full transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-lg relative">
        {/* Step Number */}
        <div className="absolute -top-4 -right-4 bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">
          {step.number}
        </div>

        {/* Icon */}
        <div className="icon-container icon-container-accent mb-6">
          {step.icon}
        </div>

        <h3 className="title-card mb-3">{step.title}</h3>

        <p className="text-muted">{step.description}</p>
      </div>
    </div>
  );
}

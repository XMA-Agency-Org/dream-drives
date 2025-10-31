// components/ui/FeatureItem.tsx
import { ReactNode } from 'react';

interface FeatureItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex">
      <div className="bg-white p-4 rounded-lg mr-4 h-16 w-16 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-white text-xl font-semibold mb-1">{title}</h3>
        <p className="text-secondary-300">{description}</p>
      </div>
    </div>
  );
}

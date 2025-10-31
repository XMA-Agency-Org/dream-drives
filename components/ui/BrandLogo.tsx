// components/ui/BrandLogo.tsx
import React from "react";

interface BrandLogoProps {
  icon: React.ReactNode;
  name: string;
}

/**
 * A component for consistently displaying brand logos
 * with proper sizing that works across all devices including iOS
 */
export default function BrandLogo({ icon, name }: BrandLogoProps) {
  return (
    <div
      className="flex items-center justify-center p-6 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-800 opacity-60 hover:opacity-100 transition-opacity duration-300"
      aria-label={`${name} logo`}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        {/* Apply sizing to the SVG itself */}
        <div className="w-full h-full">{icon}</div>
      </div>
    </div>
  );
}

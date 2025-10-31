// app/(public)/_components/home/BrandGrid.tsx
import Image from "next/image";
import React from "react";
import { IconType } from "react-icons";

interface BrandProps {
  brands: {
    name: string;
    icon: IconType;
  }[];
}

export default function BrandGrid({ brands }: BrandProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="flex items-center justify-center p-6 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-800 opacity-60 hover:opacity-100 transition-opacity duration-300"
        >
          <div className="h-20 flex items-center justify-center">
            {/* Using explicit sizing with the component */}
            <Image src={brand.icon} className="h-full object-contain" />
          </div>
        </div>
      ))}
    </div>
  );
}

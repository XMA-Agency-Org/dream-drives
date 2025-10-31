// app/(public)/vehicles/_components/VehicleDetails.tsx
"use client";

import { useState } from "react";
import { Car } from "@/types/car";
import ImageCarousel from "./ImageCarousel";
import VehicleInfo from "./vehicle-details/VehicleInfo";
import VehicleTabs from "./vehicle-details/VehicleTabs";
import Breadcrumbs from "./vehicle-details/Breadcrumbs";

interface VehicleDetailsProps {
  car: Car;
}

export default function VehicleDetails({ car }: VehicleDetailsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "specs">(
    "description",
  );

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Breadcrumbs */}
        <Breadcrumbs carName={car.name} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <ImageCarousel
              images={car.images || [car.image]}
              altText={car.name}
            />
          </div>

          {/* Right Column - Car Info */}
          <div className="lg:col-span-1">
            <VehicleInfo car={car} />
          </div>
        </div>

        {/* Tabs for Description and Specifications */}
        <VehicleTabs
          car={car}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}

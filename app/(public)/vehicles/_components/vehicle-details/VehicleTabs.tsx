// app/(public)/vehicles/_components/vehicle-details/VehicleTabs.tsx
import { Dispatch, SetStateAction } from "react";
import { Fuel, Star, Timer } from "lucide-react";
import { Car as CarType } from "@/types/car";

interface VehicleTabsProps {
  car: CarType;
  activeTab: "description" | "specs";
  setActiveTab: Dispatch<SetStateAction<"description" | "specs">>;
}

export default function VehicleTabs({
  car,
  activeTab,
  setActiveTab,
}: VehicleTabsProps) {
  // Create an array of specification items for display
  const specificationItems = [
    {
      icon: <Timer className="w-5 h-5" />,
      label: "0-100 km/h",
      value: car.specs?.acceleration || "N/A",
    },
    {
      icon: <Fuel className="w-5 h-5" />,
      label: "Fuel Consumption",
      value: car.specs?.fuelConsumption || "N/A",
    },
  ].filter((item) => item.value !== "N/A");

  return (
    <div className="mt-10">
      <div className="border-b border-light">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`py-4 font-medium text-sm border-b-2 cursor-pointer ${
              activeTab === "description"
                ? "border-accent text-body"
                : "text-body border-transparent opacity-90 hover:opacity-100"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`py-4 font-medium text-sm border-b-2 cursor-pointer ${
              activeTab === "specs"
                ? "border-accent text-body"
                : "text-body border-transparent opacity-90 hover:opacity-100"
            }`}
          >
            Specifications
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === "description" && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="title-card mb-4">About this vehicle</h2>
            <p className="text-body">
              {car.description ||
                `The ${car.name} offers a premium driving experience with its powerful engine, comfortable interior, and cutting-edge technology. Whether you're looking for a vehicle for business travel or a weekend getaway, this car delivers performance, style, and reliability.`}
            </p>

            {car.specs?.features && car.specs.features.length > 0 && (
              <div className="mt-6">
                <h3 className="title-card-sm mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {car.specs.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="text-accent mr-2 mt-1">
                        <Star className="w-4 h-4" />
                      </div>
                      <span className="text-body">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "specs" && (
          <div>
            <h2 className="title-card mb-6">Technical Specifications</h2>

            {specificationItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specificationItems.map((item, index) => (
                  <div key={index} className="card card-bordered p-4">
                    <div className="flex items-center mb-2">
                      <div className="mr-2 text-accent">{item.icon}</div>
                      <h3 className="text-sm font-medium">{item.label}</h3>
                    </div>
                    <p className="text-lg font-semibold text-base-900 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8">
                Technical specifications not available for this vehicle.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

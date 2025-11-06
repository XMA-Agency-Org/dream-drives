// components/cars/CarCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Star, Zap, Settings, Gauge, Fuel, ArrowRight } from "lucide-react";
import { Car } from "@/types/car";
import { formatBrandName } from "@/lib/formatters";
import { getBrandIcon } from "@/lib/brand-icons";

interface CarCardProps {
  car: Car;
  showFeatures?: boolean;
}

export default function CarCard({ car, showFeatures = true }: CarCardProps) {
  // Get the brand name and icon
  const brandName = formatBrandName(car.brand);
  const brandIcon = getBrandIcon(car.brand, "w-full h-full object-contain");
  const detailUrl = `/vehicles/${car.id}`;

  return (
    <div className="group relative card card-shadow overflow-hidden h-full flex flex-col">
      {/* Accent top border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-400 to-accent-600"></div>

      {/* Car Image - Clickable with larger size */}
      <Link
        href={detailUrl}
        className="block card-image h-64 bg-gradient-to-b from-secondary-100 to-white dark:from-secondary-700 dark:to-secondary-800"
      >
        {car.image ? (
          <>
            <Image
              src={car.image}
              alt={car.name}
              height={100}
              width={500}
              className="object-cover p-0 w-full h-full transform group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={
                car.id.includes("mercedes") || car.id.includes("bentley")
              }
            />
            {/* Overlay using design system */}
            <div className="card-overlay"></div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary-200 to-secondary-300 dark:from-secondary-600 dark:to-secondary-700 flex items-center justify-center">
            <div className="text-secondary-500 dark:text-secondary-400 text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-secondary-300 dark:bg-secondary-600 flex items-center justify-center">
                <span className="text-2xl">🚗</span>
              </div>
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}

        {/* Rating badge */}
        <div className="absolute top-3 left-3 flex items-center bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm px-2.5 py-1.5 rounded-md shadow-sm">
          <Star className="icon-rating mr-1.5" />
          <span className="text-secondary-900 dark:text-white text-sm font-medium">
            {car.rating.toFixed(1)}
          </span>
          <span className="text-secondary-500 text-xs ml-1.5">
            ({car.reviews})
          </span>
        </div>

        {/* Brand icon - Using same icon system as nav */}
        {brandIcon ? (
          <div className="absolute top-3 right-3 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm p-1.5 rounded-lg shadow-sm w-12 h-12 flex items-center justify-center">
            {brandIcon}
          </div>
        ) : (
          <div className="absolute top-3 right-3 badge badge-secondary">
            {brandName}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Car Name - Clickable */}
        <Link href={detailUrl} className="block">
          <h3 className="title-card mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
            {car.name}
          </h3>
        </Link>

        {/* Car Performance Specs - Optional */}
        {showFeatures && (
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-3 mb-4">
            {car.specs?.acceleration && (
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-muted mr-2 flex-shrink-0" />
                <span className="text-body text-sm">
                  {car.specs.acceleration}
                </span>
              </div>
            )}
            {car.specs?.driveTrain && (
              <div className="flex items-center">
                <Settings className="w-4 h-4 text-muted mr-2 flex-shrink-0" />
                <span className="text-body text-sm">
                  {car.specs.driveTrain}
                </span>
              </div>
            )}
            {car.specs?.topSpeed && (
              <div className="flex items-center">
                <Gauge className="w-4 h-4 text-muted mr-2 flex-shrink-0" />
                <span className="text-body text-sm">{car.specs.topSpeed}</span>
              </div>
            )}
            {car.specs?.fuelConsumption && (
              <div className="flex items-center">
                <Fuel className="w-4 h-4 text-muted mr-2 flex-shrink-0" />
                <span className="text-body text-sm">
                  {car.specs.fuelConsumption}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Category tag */}
        <div className="mb-4">
          <span className="badge badge-accent">
            {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Price and Action */}
        <div className="flex justify-between items-center pt-4 mt-2 border-t border-secondary-200 dark:border-secondary-800">
          <div>
            <span className="block text-2xl font-bold text-secondary-900 dark:text-white">
              AED {car.price}
            </span>
            <span className="text-accent-600 dark:text-accent-400 text-sm font-medium">
              per day
            </span>
          </div>
          <Link
            href={detailUrl}
            className="btn-sm btn-ghost-accent inline-flex items-center"
          >
            View details
            <ArrowRight className="ml-1.5 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

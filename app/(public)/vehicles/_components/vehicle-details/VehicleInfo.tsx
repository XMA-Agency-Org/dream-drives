// app/(public)/vehicles/_components/vehicle-details/VehicleInfo.tsx
import {
  DoorOpen,
  Fuel,
  Gauge,
  Users,
  Clock,
  Zap,
  Shield,
  Award,
} from "lucide-react";
import { Car } from "@/types/car";
import StarRating from "@/components/ui/StarRating";
import PriceDisplay from "@/components/ui/PriceDisplay";
import WhatsappBooking from "../WhatsappBooking";
import ShareButton from "../ShareButton";
import { formatBrandName } from "@/lib/formatters";

interface VehicleInfoProps {
  car: Car;
}

export default function VehicleInfo({ car }: VehicleInfoProps) {
  // Get the brand name
  const brandName = formatBrandName(car.brand);

  return (
    <div className="bg-white dark:bg-secondary-900 rounded-xl shadow-sm p-6 border border-secondary-200 dark:border-secondary-800">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300 mb-2">
            {brandName}
          </div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
            {car.name}
          </h1>
          <div className="flex items-center">
            <StarRating
              rating={car.rating}
              showRating={true}
              showCount={true}
              count={car.reviews}
            />
          </div>
        </div>
        <ShareButton car={car} />
      </div>

      {/* Quick Info */}
      <div className="border-t border-b border-secondary-200 dark:border-secondary-800 py-4 my-4 grid grid-cols-2 gap-y-3">
        <div className="flex items-center">
          <Users className="w-5 h-5 text-primary-500 dark:text-primary-400 mr-2" />
          <span className="text-secondary-700 dark:text-secondary-300">
            {car.passengers} Passengers
          </span>
        </div>
        <div className="flex items-center">
          <DoorOpen className="w-5 h-5 text-primary-500 dark:text-primary-400 mr-2" />
          <span className="text-secondary-700 dark:text-secondary-300">
            {car.doors} Doors
          </span>
        </div>
        <div className="flex items-center">
          <Gauge className="w-5 h-5 text-primary-500 dark:text-primary-400 mr-2" />
          <span className="text-secondary-700 dark:text-secondary-300">
            {car.transmission}
          </span>
        </div>
        <div className="flex items-center">
          <Fuel className="w-5 h-5 text-primary-500 dark:text-primary-400 mr-2" />
          <span className="text-secondary-700 dark:text-secondary-300">
            {car.specs?.fuelType || "Gasoline"}
          </span>
        </div>
      </div>

      {/* Pricing and Booking */}
      <div className="mb-6">
        <div className="flex items-end justify-between mb-2">
          <PriceDisplay
            amount={car.price}
            currency="AED"
            period="day"
            size="xl"
            className="text-primary-600 dark:text-primary-400"
          />
          <div className="text-secondary-600 dark:text-secondary-400 text-sm">
            +AED 75 booking fee
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <WhatsappBooking car={car} />
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-3 text-sm">
        <div className="flex items-start">
          <div className="mt-0.5 mr-2 text-primary-500 dark:text-primary-400">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-secondary-700 dark:text-secondary-300">
            <strong>24/7 Concierge Service</strong>
            <p className="text-secondary-600 dark:text-secondary-400 text-xs mt-0.5">
              Premium assistance whenever you need it
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="mt-0.5 mr-2 text-primary-500 dark:text-primary-400">
            <Shield className="w-4 h-4" />
          </div>
          <div className="text-secondary-700 dark:text-secondary-300">
            <strong>Comprehensive Insurance</strong>
            <p className="text-secondary-600 dark:text-secondary-400 text-xs mt-0.5">
              All rentals include premium coverage
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="mt-0.5 mr-2 text-primary-500 dark:text-primary-400">
            <Award className="w-4 h-4" />
          </div>
          <div className="text-secondary-700 dark:text-secondary-300">
            <strong>Exclusive Experience</strong>
            <p className="text-secondary-600 dark:text-secondary-400 text-xs mt-0.5">
              Personalized service and special amenities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

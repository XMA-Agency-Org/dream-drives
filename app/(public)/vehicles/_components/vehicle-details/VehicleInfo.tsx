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
    <div className="card card-shadow p-12 shadow-sm rounded-3xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="badge badge-base mb-2">{brandName}</div>
          <h1 className="title-card-lg mb-2">{car.name}</h1>
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
      <div className="border-t border-b border-base-200 dark:border-base-800 py-4 my-4 grid grid-cols-2 gap-y-3">
        <div className="flex items-center">
          <Users className="w-5 h-5 text-accent-500 dark:text-accent-400 mr-2" />
          <span className="text-body">{car.passengers} Passengers</span>
        </div>
        <div className="flex items-center">
          <DoorOpen className="w-5 h-5 text-accent-500 dark:text-accent-400 mr-2" />
          <span className="text-body">{car.doors} Doors</span>
        </div>
        <div className="flex items-center">
          <Gauge className="w-5 h-5 text-accent-500 dark:text-accent-400 mr-2" />
          <span className="text-body">{car.transmission}</span>
        </div>
        <div className="flex items-center">
          <Fuel className="w-5 h-5 text-accent-500 dark:text-accent-400 mr-2" />
          <span className="text-body">{car.specs?.fuelType || "Gasoline"}</span>
        </div>
      </div>

      {/* Pricing and Booking */}
      <div className="mb-6">
        <div className="flex items-end justify-between mb-2">
          <PriceDisplay
            amount={car.price}
            currency="AED"
            period="day"
            size="lg"
            className="text-accent-600 dark:text-accent-400"
          />
          <div className="text-body text-sm">+AED 75 booking fee</div>
        </div>

        <div className="space-y-4 mt-6">
          <WhatsappBooking car={car} />
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-3 text-sm">
        <div className="flex items-start">
          <div className="mt-0.5 mr-2 text-accent-500 dark:text-accent-400">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-body">
            <strong>24/7 Concierge Service</strong>
            <p className="text-xs mt-0.5">
              Premium assistance whenever you need it
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="mt-0.5 mr-2 text-accent-500 dark:text-accent-400">
            <Shield className="w-4 h-4" />
          </div>
          <div className="text-body">
            <strong>Comprehensive Insurance</strong>
            <p className="text-xs mt-0.5">
              All rentals include premium coverage
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="mt-0.5 mr-2 text-accent-500 dark:text-accent-400">
            <Award className="w-4 h-4" />
          </div>
          <div className="text-body">
            <strong>Exclusive Experience</strong>
            <p className="text-xs mt-0.5">
              Personalized service and special amenities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

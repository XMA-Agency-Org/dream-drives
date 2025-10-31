// app/(public)/vehicles/_components/RelatedVehicles.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Car } from "@/types/car";
import CarCard from "@/components/cars/CarCard";
import SectionHeader from "@/components/ui/SectionHeader";

interface RelatedVehiclesProps {
  cars: Car[];
  currentCarId: string;
}

export default function RelatedVehicles({ cars }: RelatedVehiclesProps) {
  // If no related cars, don't render this section
  if (!cars || cars.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-secondary-50 dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeader
          title="Similar Vehicles You Might Like"
          description="Explore more options in our collection that match your preferences"
          align="center"
          className="mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/vehicles"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300"
          >
            View all vehicles
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

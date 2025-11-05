// app/(public)/vehicles/[id]/not-found.tsx
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Car, Search, Home } from "lucide-react";
import Button from "@/components/ui/Button";

export default function VehicleNotFound() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-secondary-950">
      <Header />

      <main className="pt-24">
        <div className="max-w-3xl mx-auto px-4 py-24 flex flex-col items-center text-center">
          <div className="icon-container icon-container-secondary icon-container-lg mb-8">
            <Search className="h-16 w-16" />
          </div>

          <h1 className="title-section mb-4">
            Vehicle Not Found
          </h1>

          <p className="text-body text-muted mb-8">
            We couldn't find the vehicle you're looking for. It might have been
            removed or the link may be incorrect.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              size="lg"
              icon={<Car />}
              asLink
              href="/vehicles"
            >
              Browse All Vehicles
            </Button>

            <Button variant="accent" size="lg" icon={<Home />} asLink href="/">
              Back to Homepage
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

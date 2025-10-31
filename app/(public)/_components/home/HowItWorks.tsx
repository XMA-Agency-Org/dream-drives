// app/(public)/_components/home/HowItWorks.tsx
import { CheckCircle, CalendarDays, Car } from "lucide-react";
import Button from "@/components/ui/Button";
import StepCard from "./StepCard";
import SectionHeader from "@/components/ui/SectionHeader";
import BrandGrid from "./BrandGrid";
import Mercedes from "@/public/brands/Mercedes-Benz-logo-2009-1920x1080.png"
import Bentley from "@/public/brands/bentley-logo-2002-download.png"
import Rollsroyce from "@/public/brands/rolls-royce.svg"
import Bmw from "@/public/brands/bmw-logo-2020-white-download.png"
import Lamborghini from "@/public/brands/lamborghini.svg"
import Porsche from "@/public/brands/porsche-logo-2014-download.png"

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: <CheckCircle className="text-primary-500 w-7 h-7" />,
      title: "Select Your Vehicle",
      description: "Browse our collection of premium and luxury vehicles to find the perfect match for your needs."
    },
    {
      number: 2,
      icon: <CalendarDays className="text-primary-500 w-7 h-7" />,
      title: "Choose Your Dates",
      description: "Select your preferred pickup and return dates and times that suit your schedule."
    },
    {
      number: 3,
      icon: <Car className="text-primary-500 w-7 h-7" />,
      title: "Enjoy Your Experience",
      description: "Complete your booking and enjoy our premium delivery and concierge services."
    }
  ];

  const brands = [
    { name: "Mercedes-Benz", icon: Mercedes },
    { name: "Bentley", icon: Bentley },
    { name: "Rolls-Royce", icon: Rollsroyce },
    { name: "BMW", icon: Bmw },
    { name: "Lamborghini", icon: Lamborghini },
    { name: "Porsche", icon: Porsche }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-secondary-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeader
          subtitle="Seamless Experience"
          title="Luxury Made Simple in Three Steps"
          description="Our premium rental process is designed to be effortless, allowing you to focus on what matters—enjoying the extraordinary."
          align="center"
          className="mb-16"
        />
        
        {/* Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {steps.map((step) => (
            <StepCard
              key={step.number}
              step={step}
              isLast={step.number === steps.length}
            />
          ))}
        </div>

        {/* CTA Section */}
        <CtaSection />

        {/* Brands Section */}
        <div className="mt-24">
          <h3 className="text-center text-xl font-semibold text-secondary-900 dark:text-white mb-8">
            The World's Finest Automobile Brands
          </h3>
          <BrandGrid brands={brands} />
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 md:p-10 shadow-lg">
      <div className="mb-6 md:mb-0 text-white">
        <h3 className="text-2xl font-bold mb-2">Ready to experience luxury?</h3>
        <p className="text-primary-100 max-w-md">
          Book your premium vehicle today and elevate your journey with our exceptional service and attention to detail.
        </p>
      </div>
      <Button 
        variant="secondary" 
        size="lg"
        className="bg-primary-100 text-primary-950 hover:bg-primary-200"
        asLink
        href="/vehicles"
      >
        Browse Our Collection
      </Button>
    </div>
  );
}

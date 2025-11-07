// app/(public)/_components/home/HowItWorks.tsx
import { CheckCircle, CalendarDays, Car } from "lucide-react";
import Button from "@/components/ui/Button";
import StepCard from "./StepCard";
import SectionHeader from "@/components/ui/SectionHeader";
import BrandGrid from "./BrandGrid";
import Mercedes from "@/public/brands/light-mode/mercedes-lm.png"
import Bentley from "@/public/brands/bentley-logo-2002-download.png"
import Rollsroyce from "@/public/brands/light-mode/rolls-royce-lm.png"
import Bmw from "@/public/brands/light-mode/BMW-logo-lm.png"
import Lamborghini from "@/public/brands/lamborghini.svg"
import Porsche from "@/public/brands/porsche-logo-2014-download.png"

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: <CheckCircle className="text-accent-500 w-7 h-7" />,
      title: "Select Your Vehicle",
      description: "Browse our collection of premium and luxury vehicles to find the perfect match for your needs."
    },
    {
      number: 2,
      icon: <CalendarDays className="text-accent-500 w-7 h-7" />,
      title: "Choose Your Dates",
      description: "Select your preferred pickup and return dates and times that suit your schedule."
    },
    {
      number: 3,
      icon: <Car className="text-accent-500 w-7 h-7" />,
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
    <section id="how-it-works" className="section-lg bg-white dark:bg-base-900 overflow-hidden">
      <div className="container-default">
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
          <h3 className="text-center text-xl font-semibold text-base-900 dark:text-white mb-8">
            The World&apos;s Finest Automobile Brands
          </h3>
          <BrandGrid brands={brands} />
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between card-filled-primary shadow-lg p-8 md:p-10">
      <div className="mb-6 md:mb-0">
        <h3 className="text-2xl font-bold text-white mb-2">Ready to experience luxury?</h3>
        <p className="text-white/90 max-w-md">
          Book your premium vehicle today and elevate your journey with our exceptional service and attention to detail.
        </p>
      </div>
      <Button 
        variant="base" 
        size="lg"
        className="bg-white text-primary-950 hover:bg-base-100"
        asLink
        href="/vehicles"
      >
        Browse Our Collection
      </Button>
    </div>
  );
}

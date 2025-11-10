"use client";

import Image from "next/image";
import ScrollReveal from "@/lib/animations/ScrollReveal";
import VehicleSearch from "@/app/(public)/_components/home/VehicleSearch";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative bg-base-50/30 dark:bg-base-950 z-20">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border-[80px] border-gray-200/30 -translate-y-1/3 translate-x-1/4 xl:hidden z-[-1]"></div>
      <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full border-[60px] border-gray-200/30 translate-x-1/4 xl:hidden z-[-1]"></div>

      {/* Background art element */}
      <div className="absolute top-[375px] left-[650px] xl:left-1/2  -translate-x-1/4 -translate-y-1/2 w-[700px] h-[700px] md:w-[750px] md:h-[750px] lg:w-[800px] lg:h-[800px] pointer-events-none z-[-1]">
        <Image
          src="/landing-redesign/43RJTEoD8nGmYVtJBcLKrep0W8.avif"
          alt="Bg Shape"
          fill
          className="object-contain object-center opacity-90"
          unoptimized
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container-default text-center lg:text-left pt-44 lg:pt-52 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-3 relative z-20">
            <ScrollReveal variant="fadeUp" duration={0.8} animateOnMount>
              <h1 className="title-hero leading-tight">
                Luxury cars in Dubai, deposit free.
              </h1>
            </ScrollReveal>

            <ScrollReveal
              variant="fadeUp"
              delay={0.2}
              duration={0.8}
              animateOnMount
            >
              <p className="text-body lg:max-w-xl lg:mb-12">
                Rent a luxury or premium car in Dubai — zero deposit needed.
                Choose from the finest fleet and enjoy seamless service and
                swift delivery.
              </p>
            </ScrollReveal>

            <ScrollReveal
              variant="fadeUp"
              delay={0.3}
              duration={0.8}
              animateOnMount
              className="hidden md:block"
            >
              <Button
                variant="primary"
                size="lg"
                asLink
                href="/vehicles"
                className="mt-2"
              >
                Browse Vehicles
              </Button>
            </ScrollReveal>
          </div>

          {/* Right Content - Car Image */}
          <ScrollReveal
            variant="slideRight"
            delay={0.3}
            duration={1}
            animateOnMount
          >
            <div className="relative h-[180px] md:h-[220px] lg:h-[300px] z-20 px-4 lg:px-0">
              {/* Car Image */}
              <div className="relative h-full w-full">
                <Image
                  src="/landing-redesign/hero-car.png"
                  alt="g-wagon"
                  fill
                  priority
                  className="object-contain object-top drop-shadow-2xl"
                  style={{ transform: "scale(1.1)" }}
                />
              </div>
            </div>

            {/* Browse Vehicles Button - Visible on small screens only */}
            <ScrollReveal
              variant="fadeUp"
              delay={0.4}
              duration={0.8}
              animateOnMount
              className="md:hidden mt-12 text-center"
            >
              <Button variant="primary" size="lg" asLink href="/vehicles">
                Browse Vehicles
              </Button>
            </ScrollReveal>
          </ScrollReveal>
        </div>

        {/* Search Bar - Centered below both columns */}
        <ScrollReveal
          variant="fadeUp"
          delay={0.4}
          duration={0.8}
          animateOnMount
        >
          <VehicleSearch />
        </ScrollReveal>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-100/50 to-transparent"></div>
    </section>
  );
}

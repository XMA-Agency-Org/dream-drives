"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "@/lib/animations/ScrollReveal";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Navigate to vehicles page with search query
    window.location.href = `/vehicles?search=${encodeURIComponent(
      searchQuery
    )}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative bg-secondary-50 dark:bg-secondary-950 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border-[80px] border-gray-200/30 dark:border-gray-700/30 -translate-y-1/3 translate-x-1/4"></div>
      <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full border-[60px] border-gray-200/20 dark:border-gray-700/20 translate-x-1/4"></div>

      {/* Background art element */}
      <div className="absolute top-[360px] left-[650px] -translate-x-1/4 -translate-y-1/2 w-[700px] h-[700px] md:w-[750px] md:h-[750px] lg:w-[800px] lg:h-[800px] pointer-events-none">
        <Image
          src="https://framerusercontent.com/images/43RJTEoD8nGmYVtJBcLKrep0W8.png?scale-down-to=2048&width=2301&height=1902"
          alt="Bg Shape"
          fill
          className="object-contain object-center opacity-90"
          unoptimized
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container-default text-center lg:text-left pt-28 lg:pt-52 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-3 relative z-20">
            <ScrollReveal variant="fadeUp" duration={0.8}>
              <h1 className="title-hero leading-tight">
                The largest luxury car rentals marketplace
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.2} duration={0.8}>
              <p className="text-body text-muted lg:max-w-xl">
                Our team offering you a wide selection of high-end cars for rent
              </p>
            </ScrollReveal>
          </div>

          {/* Right Content - Car Image */}
          <ScrollReveal variant="slideLeft" delay={0.3} duration={1}>
            <div className="relative h-[180px] md:h-[220px] lg:h-[300px] z-20 px-4 lg:px-0">
              {/* Car Image */}
              <div className="relative h-full w-full">
                <Image
                  src="/landing-redesign/hero-car.avif"
                  alt="Luxury Rolls-Royce"
                  fill
                  priority
                  className="object-contain object-top drop-shadow-2xl"
                  style={{ transform: "scale(1.1)" }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Search Bar - Centered below both columns */}
        <ScrollReveal variant="fadeUp" delay={0.4} duration={0.8}>
          <div className="relative z-20 mt-8 flex justify-center">
            <div
              className="bg-white rounded-xl py-3 px-4 flex items-center w-full max-w-xl"
              style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.09)" }}
            >
              <input
                type="text"
                placeholder="Car brand, model, and etc."
                className="flex-1 text-base font-bold bg-transparent border-none outline-none focus:ring-0 text-gray-900 placeholder:text-gray-900 placeholder:font-bold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleSearch}
                className="btn-icon bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white transition-all duration-200 cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100/50 to-transparent"></div>
    </section>
  );
}

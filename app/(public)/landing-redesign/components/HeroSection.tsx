"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useState } from "react";

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
    <div className="relative bg-[#FCFCFC] overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border-[80px] border-gray-200/30 -translate-y-1/3 translate-x-1/4"></div>
      <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full border-[60px] border-gray-200/20 translate-x-1/4"></div>

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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-52 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-3 relative z-20">
            <h1 className="text-5xl md:text-5xl lg:text-6xl font-extrabold text-gray-950 leading-[1.2]">
              The largest luxury car rentals marketplace
            </h1>

            <p className="text-md text-[#6F828A] max-w-xl">
              Our team offering you a wide selection of high-end cars for rent
            </p>
          </div>

          {/* Right Content - Car Image */}
          <div className="relative h-[300px] z-20">
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
        </div>

        {/* Search Bar - Centered below both columns */}
        <div className="relative z-20 mt-8 flex justify-center">
          <div
            className="bg-white rounded-xl p-3 flex items-center w-full max-w-xl"
            style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.09)" }}
          >
            <input
              type="text"
              placeholder="Car brand, model, and etc."
              className="flex-1 px-6 py-5 text-base font-bold bg-transparent border-none outline-none focus:ring-0 text-gray-900 placeholder:text-gray-900 placeholder:font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSearch}
              className="bg-black hover:bg-gray-800 text-white p-4 rounded-xl transition-all duration-200 flex items-center justify-center"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100/50 to-transparent"></div>
    </div>
  );
}


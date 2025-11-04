import { Search, CarFront, CalendarDays } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-md text-[#6B7C85] mb-2">How it Works</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950">
            Follow 3 easy steps
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting lines - positioned absolutely */}
          {/* Line between step 1 and 2 */}
          <div className="hidden md:block absolute top-8 left-[calc(33.333%-3rem)] w-16 h-[0.8px] bg-gray-300 z-0"></div>
          {/* Line between step 2 and 3 */}
          <div className="hidden md:block absolute top-8 left-[calc(66.666%-3rem)] w-16 h-[0.8px] bg-gray-300 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#6B7C85] rounded-2xl flex items-center justify-center mb-5">
                <Search className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-3">
                Search for a car
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Know your purchase: Tools to calculate budget, financing and
                more
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#6B7C85] rounded-2xl flex items-center justify-center mb-5">
                <CalendarDays className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-3">
                Select pick-up date
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Know before you buy: Honest reviews, rankings and video
                test-drives
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#6B7C85] rounded-2xl flex items-center justify-center mb-5">
                <CarFront className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-3">
                Book your car
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Know your offer: Deal ratings on new and used listings near you
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

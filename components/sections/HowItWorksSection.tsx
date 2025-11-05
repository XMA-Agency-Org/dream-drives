"use client";

import { Search, CarFront, CalendarDays } from "lucide-react";
import ScrollReveal from "@/lib/animations/ScrollReveal";
import StaggerContainer, {
  StaggerItem,
  staggerItemVariants,
} from "@/lib/animations/StaggerContainer";

export default function HowItWorksSection() {
  return (
    <section className="section">
      <div className="container-default">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp">
          <div className="section-header-lg">
            <p className="subtitle">How it Works</p>
            <h2 className="title-section">Follow 3 easy steps</h2>
          </div>
        </ScrollReveal>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting lines - positioned absolutely */}
          {/* Line between step 1 and 2 */}
          <div className="hidden md:block absolute top-8 left-[calc(33.333%-3rem)] w-16 h-[0.8px] bg-gray-300 z-0"></div>
          {/* Line between step 2 and 3 */}
          <div className="hidden md:block absolute top-8 left-[calc(66.666%-3rem)] w-16 h-[0.8px] bg-gray-300 z-0"></div>

          <StaggerContainer
            staggerDelay={0.15}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10"
          >
            {/* Step 1 */}
            <StaggerItem variants={staggerItemVariants}>
              <div className="step-container">
                <div className="step-icon">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="step-title">Search for a car</h3>
                <p className="step-description">
                  Know your purchase: Tools to calculate budget, financing and
                  more
                </p>
              </div>
            </StaggerItem>

            {/* Step 2 */}
            <StaggerItem variants={staggerItemVariants}>
              <div className="step-container">
                <div className="step-icon">
                  <CalendarDays className="w-7 h-7" />
                </div>
                <h3 className="step-title">Select pick-up date</h3>
                <p className="step-description">
                  Know before you buy: Honest reviews, rankings and video
                  test-drives
                </p>
              </div>
            </StaggerItem>

            {/* Step 3 */}
            <StaggerItem variants={staggerItemVariants}>
              <div className="step-container">
                <div className="step-icon">
                  <CarFront className="w-7 h-7" />
                </div>
                <h3 className="step-title">Book your car</h3>
                <p className="step-description">
                  Know your offer: Deal ratings on new and used listings near
                  you
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

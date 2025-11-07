"use client";

import { Shield, DollarSign, CreditCard } from "lucide-react";
import ScrollReveal from "@/lib/animations/ScrollReveal";
import StaggerContainer, {
  StaggerItem,
  staggerItemVariants,
} from "@/lib/animations/StaggerContainer";

export default function USP() {
  return (
    <section className="section pb-32">
      <div className="container-default">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp">
          <div className="section-header-lg">
            <p className="subtitle">Values</p>
            <h2 className="title-section">Why Choose Us</h2>
          </div>
        </ScrollReveal>

        {/* USP Grid */}
        <div className="relative">
          {/* Connecting lines - positioned absolutely */}
          {/* Line between item 1 and 2 */}
          <div className="hidden md:block absolute top-8 left-[calc(33.333%-3rem)] w-16 connecting-line-horizontal z-0"></div>
          {/* Line between item 2 and 3 */}
          <div className="hidden md:block absolute top-8 left-[calc(66.666%-3rem)] w-16 connecting-line-horizontal z-0"></div>

          <StaggerContainer
            staggerDelay={0.15}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10"
          >
            {/* Safety First */}
            <StaggerItem variants={staggerItemVariants}>
              <div className="step-container">
                <div className="step-icon">
                  <Shield className="w-7 h-7" />
                </div>
                <h3 className="step-title">Safety First</h3>
                <p className="step-description">
                  All our cars undergo rigorous safety checks and are maintained
                  by experts to guarantee a safe drive.
                </p>
              </div>
            </StaggerItem>

            {/* Transparent Pricing */}
            <StaggerItem variants={staggerItemVariants}>
              <div className="step-container">
                <div className="step-icon">
                  <DollarSign className="w-7 h-7" />
                </div>
                <h3 className="step-title">Transparent Pricing</h3>
                <p className="step-description">
                  No hidden fees or surcharges. What you see is what you pay,
                  ensuring transparency in your transactions.
                </p>
              </div>
            </StaggerItem>

            {/* No Deposit Rental */}
            <StaggerItem variants={staggerItemVariants}>
              <div className="step-container">
                <div className="step-icon">
                  <CreditCard className="w-7 h-7" />
                </div>
                <h3 className="step-title">No Deposit Rental</h3>
                <p className="step-description">
                  Rent your dream car with zero deposit required. Get on the
                  road faster with our hassle-free rental process.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

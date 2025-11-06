"use client";

import { Building2, Phone, Mail } from "lucide-react";
import ScrollReveal from "@/lib/animations/ScrollReveal";
import StaggerContainer, {
  StaggerItem,
  staggerItemVariants,
} from "@/lib/animations/StaggerContainer";

export default function ContactSection() {
  return (
    <section className="relative section overflow-hidden bg-secondary-200 dark:bg-secondary-800">
      {/* Map Background with Gradient Mask */}
      <div
        className="absolute top-0 bottom-0 -right-1/4 left-1/4 z-0"
        style={{
          maskImage:
            "radial-gradient(circle at 70% center, black 0%, black 20%, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(circle at 70% center, black 0%, black 20%, transparent 60%)",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.0864458515984!2d55.13693931501204!3d25.08037998395047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6ca7b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sDubai%20Marina!5e0!3m2!1sen!2sae!4v1635789012345!5m2!1sen!2sae"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale"
        ></iframe>
      </div>

      {/* Content */}
      <div className="relative z-20 container-default">
        {/* Header */}
        <ScrollReveal variant="fadeUp">
          <div className="section-header">
            <p className="subtitle">Contact Us</p>
            <h2 className="title-section">Get in touch</h2>
          </div>
        </ScrollReveal>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Cards */}
          <StaggerContainer staggerDelay={0.12} className="space-y-4">
            {/* Headquarter Office */}
            <StaggerItem variants={staggerItemVariants}>
              <div className="card-filled-primary-dark">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="title-card-white mb-2">
                      Headquarter office
                    </h3>
                    <div className="text-inverse text-sm leading-snug space-y-0.5 opacity-80">
                      <p>Dubai Marina</p>
                      <p>Marina Plaza Building</p>
                      <p>Office 2304</p>
                      <p>Dubai, United Arab Emirates</p>
                    </div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Phone */}
            <StaggerItem variants={staggerItemVariants}>
              <div className="card-filled-primary">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="title-card-white mb-1">+971 54 555 5402</h3>
                    <h3 className="title-card-white mb-1">+971 54 555 5403</h3>
                    <p className="text-inverse text-sm opacity-80">Call us</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Email */}
            <StaggerItem variants={staggerItemVariants}>
              <div className="card-filled-primary-light">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="title-card-white mb-1">
                      info@dreamdrives.com
                    </h3>
                    <p className="text-inverse text-sm opacity-80">
                      Send your email
                    </p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Right Column - Empty (shows map through) */}
          <div></div>
        </div>
      </div>
    </section>
  );
}

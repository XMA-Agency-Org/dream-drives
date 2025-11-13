"use client";

import { Building2, Phone, Mail } from "lucide-react";
import ScrollReveal from "@/lib/animations/ScrollReveal";
import StaggerContainer, {
  StaggerItem,
  staggerItemVariants,
} from "@/lib/animations/StaggerContainer";
import { Card, CardContent } from "@/components/ui/Card";

export default function ContactSection() {
  return (
    <section className="relative section overflow-hidden pb-32">
      {/* Map Background with Gradient Mask */}
      {/* Content */}
      <div className="relative z-20 container-default">
        {/* Header */}
        <ScrollReveal variant="fadeUp">
          <div className="section-header">
            <p className="subtitle">Contact Us</p>
            <h2 className="title-section">Get in Touch</h2>
          </div>
        </ScrollReveal>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Cards */}
          <StaggerContainer staggerDelay={0.12} className="space-y-4">
            {/* Headquarter Office */}
            <StaggerItem variants={staggerItemVariants}>
              <Card className="h-full border border-default/5 bg-base-50/10 hover:bg-base-50/30 text-default rounded-3xl shadow-none">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="title-card mb-2">Headquarter office</h3>
                      <div className="text-default text-sm leading-snug space-y-0.5 opacity-80">
                        <p>
                          Office 405, Business Avenue, Port Saeed Road - Sheikh
                          Rashid Rd - Port Saeed - Dubai - United Arab Emirates
                        </p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Phone */}
            <StaggerItem variants={staggerItemVariants}>
              <Card className="h-full border border-default/5 bg-base-50/10 hover:bg-base-50/30 text-default rounded-3xl shadow-none">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="title-card mb-1">+971 54 555 5402</h3>
                      <h3 className="title-card mb-1">+971 54 555 5403</h3>
                      <p className="text-default text-sm opacity-80">Call us</p>
                    </div>
                    <div className="p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Email */}
            <StaggerItem variants={staggerItemVariants}>
              <Card className="h-full border border-default/5 bg-base-50/10 hover:bg-base-50/30 text-default rounded-3xl shadow-none">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="title-card mb-1">info@dreamdrives.com</h3>
                      <p className="text-default text-sm opacity-80">
                        Send your email
                      </p>
                    </div>
                    <div className="p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>

          {/* Right Column */}
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.2585414!2d55.3366432!3d25.2585414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5dbe633684c7%3A0xd97a4d55de63513c!2sDream+Drives+Rent+A+Car!5e0!3m2!1sen!2sae!4v1733456789!5m2!1sen!2sae"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-3xl border-0"
              style={{ minHeight: "400px" }}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

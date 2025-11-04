"use client";

import { Building2, Phone, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="relative py-16 overflow-hidden bg-[#F2F2F2] dark:bg-secondary-900">
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
      <div className="relative z-20 container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#6B7C85] dark:text-gray-400 text-xs uppercase tracking-wider mb-3">
            Contact Us
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Get in touch
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Cards */}
          <div className="space-y-4">
            {/* Headquarter Office */}
            <div className="bg-[#454F53] dark:bg-secondary-800 rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-4 tracking-tight leading-tight">
                    Headquarter office
                  </h3>
                  <div className="space-y-0.5 text-gray-200 tracking-tight leading-snug">
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

            {/* Phone */}
            <div className="bg-[#6F828A] dark:bg-secondary-800 rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight leading-tight">
                    +971 (4) 555-0132
                  </h3>
                  <p className="text-gray-200 tracking-tight leading-snug">
                    Call us
                  </p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-[#5A6B75] dark:bg-secondary-800 rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight leading-tight">
                    contact@dreamdrives.ae
                  </h3>
                  <p className="text-gray-200 tracking-tight leading-snug">
                    Send your email
                  </p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Empty (shows map through) */}
          <div></div>
        </div>
      </div>
    </section>
  );
}

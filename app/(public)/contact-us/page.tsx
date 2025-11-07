// app/(public)/contact-us/page.tsx
import { Metadata } from "next";
import { Phone, Mail, MapPin, Building2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FaqSection from "@/components/sections/FaqSection";
import ContactForm from "./_components/ContactForm";
import LocationMapContainer from "./_components/LocationMapContainer";
import ScrollReveal from "@/lib/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact Us | Dream Drives Luxury Car Rental",
  description:
    "Get in touch with our luxury car rental specialists. We're here to help with bookings, inquiries, and personalized service.",
};

// Location data
const location = {
  id: "main-office",
  name: "Dubai Office",
  address: "Dubai, United Arab Emirates",
  phone: "+971 54 555 5402",
  email: "info@dreamdrives.com",
  hours: "Mon-Fri: 9am-8pm | Sat-Sun: 10am-6pm",
  coordinates: { lat: 25.186, lng: 55.28 }, // Dubai Business Bay coordinates
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-base-950">
      <Header />
      <main className="pt-24">
        {/* Hero Section - Contact */}
        <section className="relative section overflow-hidden">
          {/* Content */}
          <div className="relative z-20 container-default">
            {/* Header */}
            <div className="section-header">
              <h2 className="title-section">Get in touch</h2>
            </div>

            {/* Three Column Layout - Contact Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Headquarter Office */}
              <div className="card-filled-primary-dark">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="title-card-white mb-2">
                        Headquarter office
                      </h3>
                      <div className="text-gray-200 text-sm leading-snug space-y-0.5">
                        <p>Dubai, United Arab Emirates</p>
                      </div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg flex-shrink-0">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="card-filled-primary">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="title-card-white mb-1">
                        +971 54 555 5402
                      </h3>
                      <h3 className="title-card-white mb-1">
                        +971 54 555 5403
                      </h3>
                      <p className="text-gray-200 text-sm">Call us anytime</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="card-filled-primary-light">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="title-card-white mb-1">
                        info@dreamdrives.com
                      </h3>
                      <p className="text-gray-200 text-sm">Send your email</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="section bg-base-50 dark:bg-base-900">
          <div className="container-default">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <ScrollReveal variant="slideRight" duration={0.8}>
                <div className="card card-shadow card-body-lg">
                  <h2 className="title-card mb-4">Send Us a Message</h2>
                  <p className="text-muted mb-6">
                    Fill out the form below and we&apos;ll get back to you
                    shortly.
                  </p>

                  <ContactForm />
                </div>
              </ScrollReveal>

              {/* Locations Info */}
              <ScrollReveal variant="slideLeft" delay={0.2} duration={0.8}>
                <div>
                  <h2 className="title-subsection mb-4">Our Location</h2>
                  <p className="text-muted mb-6">
                    Call us today and book your car with zero deposit required.
                  </p>

                  <div className="card card-bordered card-body">
                    <h3 className="title-card mb-4">{location.name}</h3>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-muted mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-body">{location.address}</span>
                      </div>

                      <div className="flex items-start">
                        <Phone className="w-5 h-5 text-muted mr-3 flex-shrink-0 mt-0.5" />
                        <a
                          href={`tel:${location.phone.replace(/\D/g, "")}`}
                          className="text-body hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                        >
                          {location.phone}
                        </a>
                      </div>

                      <div className="flex items-start">
                        <Mail className="w-5 h-5 text-muted mr-3 flex-shrink-0 mt-0.5" />
                        <a
                          href={`mailto:${location.email}`}
                          className="text-body hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                        >
                          {location.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="section">
          <div className="container-default">
            <ScrollReveal variant="fadeUp">
              <div className="section-header">
                <h2 className="title-section mb-4">Find Us</h2>
                <p className="text-body text-muted max-w-2xl mx-auto">
                  We are here for you in Dubai – book your car today, deposit
                  free.
                </p>
              </div>
            </ScrollReveal>

            {/* Map Component */}
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <div className="card card-shadow overflow-hidden h-[500px]">
                <LocationMapContainer location={location} />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ Section - Using unified component */}
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}

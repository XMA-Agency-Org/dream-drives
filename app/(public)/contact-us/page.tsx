// app/(public)/contact-us/page.tsx
import { Metadata } from "next";
import { Phone, Mail, MapPin, Building2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FaqSection from "@/components/sections/FaqSection";
import ContactForm from "./_components/ContactForm";
import LocationMapContainer from "./_components/LocationMapContainer";
import ScrollReveal from "@/lib/animations/ScrollReveal";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Contact Us | Dream Drives Luxury Car Rental",
  description:
    "Get in touch with our luxury car rental specialists. We're here to help with bookings, inquiries, and personalized service.",
};

// Location data
const location = {
  id: "main-office",
  name: "Dubai Office",
  address:
    "Office 405, Business Avenue, Port Saeed Road - Sheikh Rashid Rd - Port Saeed - Dubai - United Arab Emirates",
  phone: "+971 54 555 5402",
  email: "info@dreamdrives.com",
  hours: "Mon-Fri: 9am-8pm | Sat-Sun: 10am-6pm",
  coordinates: { lat: 25.2585414, lng: 55.3366432 }, // Dream Drives Rent A Car coordinates
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
              <Card className="h-full border-none bg-primary text-inverse rounded-3xl">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="title-card-white mb-2">
                        Headquarter office
                      </h3>
                      <div className="text-inverse text-sm leading-snug space-y-0.5 opacity-80">
                        <p>
                          Office 405, Business Avenue, Port Saeed Road - Sheikh
                          Rashid Rd - Port Saeed - Dubai - United Arab Emirates
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg shrink-0">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card className="h-full border-none bg-primary text-inverse rounded-3xl">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="title-card-white mb-1">
                        +971 54 555 5402
                      </h3>
                      <h3 className="title-card-white mb-1">
                        +971 54 555 5403
                      </h3>
                      <p className="text-inverse text-sm opacity-80">
                        Call us anytime
                      </p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="h-full border-none bg-primary text-inverse rounded-3xl">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="title-card-white mb-1">
                        info@dreamdrives.com
                      </h3>
                      <p className="text-inverse text-sm opacity-80">
                        Send your email
                      </p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="section bg-base-50/50 dark:bg-base-900">
          <div className="container-default">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <ScrollReveal variant="slideRight" duration={0.8} animateOnMount>
                <Card className="border-0 p-8 rounded-3xl">
                  <CardContent className="p-0">
                    <h2 className="title-card mb-4">Send Us a Message</h2>
                    <p className="text-body mb-6">
                      Fill out the form below and we&apos;ll get back to you
                      shortly.
                    </p>

                    <ContactForm />
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Locations Info */}
              <ScrollReveal
                variant="slideLeft"
                delay={0.2}
                duration={0.8}
                animateOnMount
              >
                <div>
                  <h2 className="title-subsection mb-4">Our Location</h2>
                  <p className="text-body mb-6">
                    Call us today and book your car with zero deposit required.
                  </p>

                  <Card className="border-0 rounded-3xl">
                    <CardContent>
                      <h3 className="title-card mb-4">{location.name}</h3>

                      <div className="space-y-3">
                        <div className="flex items-start">
                          <MapPin className="text-body w-5 h-5 mr-3 shrink-0 mt-0.5" />
                          <span className="text-body">{location.address}</span>
                        </div>

                        <div className="flex items-start">
                          <Phone className="text-body w-5 h-5 mr-3 shrink-0 mt-0.5" />
                          <a
                            href={`tel:${location.phone.replace(/\D/g, "")}`}
                            className="text-body hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            {location.phone}
                          </a>
                        </div>

                        <div className="flex items-start">
                          <Mail className="text-body w-5 h-5 mr-3 shrink-0 mt-0.5" />
                          <a
                            href={`mailto:${location.email}`}
                            className="text-body hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            {location.email}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                <p className="text-body max-w-2xl mx-auto">
                  We are here for you in Dubai – book your car today, deposit
                  free.
                </p>
              </div>
            </ScrollReveal>

            {/* Map Component */}
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <Card className="shadow-lg overflow-hidden h-[500px] p-0">
                <LocationMapContainer location={location} />
              </Card>
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

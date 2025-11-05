// app/(public)/about-us/page.tsx
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Car, Users, Award, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Dream Drives Luxury Car Rental",
  description: "Learn about Dream Drives, Dubai's premier luxury car rental service. Experience exceptional service, premium vehicles, and unmatched customer satisfaction.",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-secondary-950">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section bg-secondary-50 dark:bg-secondary-900">
          <div className="container-default">
            <div className="section-header">
              <p className="subtitle">About Dream Drives</p>
              <h1 className="title-hero max-w-4xl mx-auto">
                Dubai's Premier Luxury Car Rental Experience
              </h1>
              <p className="text-body text-muted max-w-3xl mx-auto">
                We deliver exceptional luxury car rental experiences in Dubai, combining premium vehicles
                with unparalleled customer service since our inception.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section">
          <div className="container-default">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="icon-container mx-auto mb-4">
                  <Car className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-secondary-900 dark:text-white mb-2">
                  200+
                </div>
                <p className="text-muted">Premium Vehicles</p>
              </div>
              
              <div className="text-center">
                <div className="icon-container mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-secondary-900 dark:text-white mb-2">
                  10K+
                </div>
                <p className="text-muted">Happy Customers</p>
              </div>
              
              <div className="text-center">
                <div className="icon-container mx-auto mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-secondary-900 dark:text-white mb-2">
                  15+
                </div>
                <p className="text-muted">Luxury Brands</p>
              </div>
              
              <div className="text-center">
                <div className="icon-container mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-secondary-900 dark:text-white mb-2">
                  24/7
                </div>
                <p className="text-muted">Customer Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section bg-secondary-50 dark:bg-secondary-900">
          <div className="container-default max-w-4xl">
            <div className="section-header-left">
              <p className="subtitle">Our Story</p>
              <h2 className="title-section">Driven by Excellence</h2>
            </div>
            
            <div className="space-y-6 text-body">
              <p>
                Dream Drives was founded with a singular vision: to redefine luxury car rental 
                in Dubai by offering an unparalleled experience that combines premium vehicles 
                with exceptional customer service.
              </p>
              
              <p>
                Our journey began with a passion for automotive excellence and a commitment to 
                exceeding customer expectations. Today, we're proud to be one of Dubai's most 
                trusted luxury car rental services, offering an extensive fleet of premium 
                vehicles from the world's most prestigious brands.
              </p>
              
              <p>
                What sets us apart is our dedication to delivering more than just a car rental 
                service. We provide a complete experience, from the moment you browse our collection 
                to the time you return your vehicle. Every interaction is designed to be seamless, 
                professional, and memorable.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="section">
          <div className="container-default">
            <div className="section-header">
              <p className="subtitle">Our Values</p>
              <h2 className="title-section">What Drives Us</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card card-shadow">
                <div className="card-body-lg text-center">
                  <div className="icon-container mx-auto mb-6">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="title-card mb-4">Excellence</h3>
                  <p className="text-description">
                    We maintain the highest standards in vehicle quality, service delivery, 
                    and customer satisfaction.
                  </p>
                </div>
              </div>
              
              <div className="card card-shadow">
                <div className="card-body-lg text-center">
                  <div className="icon-container mx-auto mb-6">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="title-card mb-4">Customer Focus</h3>
                  <p className="text-description">
                    Your experience is our priority. We go above and beyond to ensure 
                    complete satisfaction.
                  </p>
                </div>
              </div>
              
              <div className="card card-shadow">
                <div className="card-body-lg text-center">
                  <div className="icon-container mx-auto mb-6">
                    <Car className="w-8 h-8" />
                  </div>
                  <h3 className="title-card mb-4">Quality Fleet</h3>
                  <p className="text-description">
                    Every vehicle in our collection is meticulously maintained to ensure 
                    peak performance and safety.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section bg-secondary-50 dark:bg-secondary-900">
          <div className="container-default">
            <div className="section-header">
              <p className="subtitle">Why Dream Drives</p>
              <h2 className="title-section">The Dream Drives Advantage</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="flex gap-4">
                <div className="icon-container-sm icon-container-accent flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900 dark:text-white mb-2">
                    Premium Selection
                  </h3>
                  <p className="text-description">
                    Choose from an extensive collection of luxury vehicles from renowned brands 
                    including Mercedes-Benz, BMW, Bentley, and Rolls-Royce.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="icon-container-sm icon-container-accent flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900 dark:text-white mb-2">
                    Flexible Rental Terms
                  </h3>
                  <p className="text-description">
                    Whether you need a vehicle for a day, week, or month, we offer flexible 
                    rental options to suit your needs.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="icon-container-sm icon-container-accent flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900 dark:text-white mb-2">
                    Delivery & Collection
                  </h3>
                  <p className="text-description">
                    Enjoy complimentary delivery and collection service across Dubai for 
                    your convenience.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="icon-container-sm icon-container-accent flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900 dark:text-white mb-2">
                    24/7 Support
                  </h3>
                  <p className="text-description">
                    Our dedicated team is available around the clock to assist with any 
                    queries or requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section">
          <div className="container-default">
            <div className="card-primary text-center max-w-4xl mx-auto">
              <h2 className="title-section text-white mb-4">
                Ready to Experience Luxury?
              </h2>
              <p className="text-white opacity-90 text-lg mb-8 max-w-2xl mx-auto">
                Browse our premium collection and find the perfect vehicle for your needs.
              </p>
              <a
                href="/vehicles"
                className="btn btn-white inline-flex"
              >
                Explore Our Fleet
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

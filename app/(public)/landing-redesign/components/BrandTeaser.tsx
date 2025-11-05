import Image from "next/image";

export default function BrandTeaser() {
  return (
    <section className="landing-section-sm">
      <div className="landing-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card */}
          <div className="landing-card h-[500px] group">
            <Image
              src="/landing-redesign/5DRqsrNraWafPJYylxJFw7hnnXQ.jpeg"
              alt="Luxury car on city street"
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="landing-card-overlay"></div>

            {/* Content */}
            <div className="absolute top-8 left-8 right-8">
              <div className="landing-card-content-dark">
                <h3 className="landing-card-title-white">
                  Experience luxury car rentals in Dubai
                </h3>
                <p className="landing-card-description-white">
                  Dream Drives offers an exclusive collection of premium and
                  luxury vehicles in Dubai. From exotic supercars to elegant
                  sedans, discover the perfect car for your journey through the
                  city of dreams.
                </p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="landing-card h-[500px] group">
            <Image
              src="/landing-redesign/qcHmEYofDfhcS57d0hEjJHIjiUo.jpeg"
              alt="Premium car rental service in Dubai"
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="landing-card-overlay"></div>

            {/* Content */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="landing-card-content-medium">
                <h3 className="landing-card-title-white">
                  Transparent pricing across Dubai
                </h3>
                <p className="landing-card-description-white">
                  All our rentals include comprehensive insurance, 24/7 roadside
                  assistance, flexible pick-up and drop-off locations across
                  Dubai, and dedicated customer support throughout your rental
                  period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

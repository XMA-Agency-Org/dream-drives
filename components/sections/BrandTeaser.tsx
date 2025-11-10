import Image from "next/image";

export default function BrandTeaser() {
  return (
    <section className="section-sm">
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card */}
          <div className="relative h-[500px] group">
            <Image
              src="/landing-redesign/ahmed-aldaie-lVSrpZ-0B8o-unsplash-opt.jpg"
              alt="Luxury car on city street"
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="absolute top-8 left-8 right-8">
              <div className="bg-primary rounded-3xl text-center p-6">
                <h3 className="title-card-white mb-2">
                  Experience luxury car rentals in Dubai
                </h3>
                <p className="text-white opacity-90 text-sm leading-relaxed">
                  Dream Drives offers an exclusive collection of premium and
                  luxury vehicles in Dubai. From exotic supercars to elegant
                  sedans, discover the perfect car for your journey through the
                  city of dreams.
                </p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="relative h-[500px] group">
            <Image
              src="/landing-redesign/zafeerah-heesambee-bXsJnwcIykw-unsplash.jpg"
              alt="Premium car rental service in Dubai"
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-primary/80 rounded-3xl text-center p-6">
                <h3 className="title-card-white mb-2">
                  Transparent pricing across Dubai
                </h3>
                <p className="text-white opacity-90 text-sm leading-relaxed">
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

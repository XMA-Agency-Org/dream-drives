import Image from "next/image";

export default function BrandTeaser() {
  return (
    <section className="pb-16 pt-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card - Rental Deals */}
          <div className="relative h-[500px] rounded-3xl overflow-hidden group">
            <Image
              src="/landing-redesign/5DRqsrNraWafPJYylxJFw7hnnXQ.jpeg"
              alt="Luxury car on city street"
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="absolute top-8 left-8 right-8">
              <div className="backdrop-blur-sm text-center rounded-2xl p-8 bg-[#454F53]">
                <h3 className="text-xl font-bold text-white mb-2">
                  Feel the best experience with rental deals
                </h3>
                <p className="text-white/90 text-xs leading-relaxed">
                  The 2023 Volkswagen Jetta is an affordable European sedan that
                  offers a spacious interior, unique styling, and engaging
                  driving manners. It comes equipped with an efficient.
                </p>
              </div>
            </div>
          </div>

          {/* Right Card - Deal Ratings */}
          <div className="relative h-[500px] rounded-3xl overflow-hidden group">
            <Image
              src="/landing-redesign/qcHmEYofDfhcS57d0hEjJHIjiUo.jpeg"
              alt="Luxury car interior"
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="backdrop-blur-sm rounded-2xl text-center p-8 bg-[#6F828A]">
                <h3 className="text-xl font-bold text-white mb-2">
                  Deal ratings on all listings near you
                </h3>
                <p className="text-white/90 text-xs leading-relaxed">
                  Standard features include Volkswagen&apos;s Digital Cockpit,
                  Apple CarPlay/Android Auto, forward collision warning with
                  automatic emergency braking, blind-spot monitoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

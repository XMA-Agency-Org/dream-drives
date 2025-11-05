"use client";
import { Briefcase, User, Car, Headset } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function WhyChooseUs() {
  const features: Feature[] = [
    {
      icon: <Briefcase className="text-primary-400 h-6 w-6" />,
      title: "Best price guaranteed",
      description:
        "Find a lower price? We'll refund you 100% of the difference.",
    },
    {
      icon: <User className="text-primary-400 h-6 w-6" />,
      title: "Experience driver",
      description:
        "Don't have driver? Don't worry, we have many experienced driver for you.",
    },
    {
      icon: <Car className="text-primary-400 h-6 w-6" />,
      title: "24 hour car delivery",
      description:
        "Book your car anytime and we will deliver it directly to you.",
    },
    {
      icon: <Headset className="text-primary-400 h-6 w-6" />,
      title: "24/7 technical support",
      description:
        "Have a question? Contact Rentcars support any time when you have problem.",
    },
  ];

  // Ref for the section
  const sectionRef = useRef(null);

  // Using Framer Motion's useScroll hook to track scroll position
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Transform the scrollYProgress (0-1) to X translation (-100px to 200px)
  // Start with car slightly off-screen to the left (-100px) and move it right
  const carX = useTransform(scrollYProgress, [0, 1], ["-50%", "-5%"]);

  return (
    <div
      ref={sectionRef}
      className="relative bg-secondary-50 dark:bg-[#0b102b] min-h-[600px] overflow-hidden"
    >
      {/* Car absolute positioned at bottom left with Framer Motion animation */}
      <div className="hidden lg:block absolute bottom-0 left-0 z-10">
        <motion.div style={{ x: carX }}>
          <Image
            src="/Audi 1.png"
            alt="Luxury Car"
            width={900}
            height={500}
            priority
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Diagonal background shape */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-[#131c3f] dark:to-[#0d1229] opacity-80"
          style={{
            clipPath: "polygon(0 30%, 40% 0, 40% 100%, 0% 100%)",
          }}
        ></div>
      </div>

      {/* Content container - positioned to the right */}
      <div className="max-w-7xl mx-auto px-4 py-24 relative z-20">
        <div className="flex justify-end">
          <div className="w-full lg:w-1/2 lg:pl-12 bg-secondary-50/80 dark:bg-secondary-950/80 backdrop-blur-sm dark:backdrop-blur-sm rounded-lg p-6 lg:p-8">
            {/* Header */}
            <div className="mb-12">
              <div className="inline-block bg-primary-600 text-white dark:text-white text-xs font-medium px-4 py-2 rounded-md uppercase tracking-wider mb-4">
                WHY CHOOSE US
              </div>
              <h2 className="text-secondary-900 dark:text-white text-3xl md:text-4xl font-bold mb-8">
                We offer the best experience with our rental deals
              </h2>
            </div>

            {/* Features List */}
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-primary-100 dark:bg-primary-900/40 rounded-full aspect-square w-14 h-14 flex items-center justify-center mr-4" >
                    {feature.icon}
                  </div>
                  <div className="mt-3">
                    <h3 className="text-secondary-900 dark:text-white text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-secondary-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

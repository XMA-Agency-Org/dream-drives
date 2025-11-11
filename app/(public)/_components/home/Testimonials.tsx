// app/(public)/_components/home/Testimonials.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "@/lib/animations/ScrollReveal";
import { Card, CardDescription } from "@/components/ui/Card";

interface Testimonial {
  id: number;
  rating: number;
  text: string;
  name: string;
  position: string;
  location: string;
  carRented?: string;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      rating: 5.0,
      text: "Amazing company for renting high end and comfort cars. Excellent customer services especially. 100% recommend",
      name: "Hamza",
      position: "",
      location: "Dubai, UAE",
    },
    {
      id: 2,
      rating: 5.0,
      text: "Really great service. Good new car. All inclusive competitive price.",
      name: "Maya Dillers",
      position: "",
      location: "Dubai, UAE",
    },
    {
      id: 3,
      rating: 5.0,
      text: "Service was perfect. Always in touch with you. Smoothest rental proses I had in Dubai. Car top spec and clean. Just like advertised. Highly recommended.",
      name: "Paaso Sidat",
      position: "",
      location: "Dubai, UAE",
    },
    {
      id: 4,
      rating: 5.0,
      text: "Next time we want a seamless ride around the city, I am definitely booking again! Thanks for the wonderful experience. Would recommend dream drives to anyone looking to drive around Dubai without any hassles.",
      name: "Sean",
      position: "",
      location: "Dubai, UAE",
    },
    {
      id: 5,
      rating: 5.0,
      text: "Nice clean cars.",
      name: "Samir",
      position: "",
      location: "Dubai, UAE",
    },
  ];

  // Responsive cards per slide calculation
  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth < 768) {
        // Mobile: 1 card per slide
        setCardsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        // Tablet: 2 cards per slide
        setCardsPerSlide(2);
      } else {
        // Desktop: 3 cards per slide
        setCardsPerSlide(3);
      }
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  // Calculate max slide index based on cards per slide
  const maxSlideIndex = Math.max(0, testimonials.length - cardsPerSlide);

  const handlePrev = () => {
    if (!animating) {
      setAnimating(true);
      setCurrentIndex((prev) => (prev === 0 ? maxSlideIndex : prev - 1));
    }
  };

  const handleNext = () => {
    if (!animating) {
      setAnimating(true);
      setCurrentIndex((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Reset to first slide when cards per slide changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [cardsPerSlide]);

  return (
    <section className="section bg-base-50/50 dark:bg-base-950 relative overflow-hidden py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient background */}
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary-50/30 to-transparent dark:from-primary-900/10 dark:to-transparent"></div>
      </div>

      <div className="container-default">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp">
          <div className="section-header">
            <p className="subtitle">Attested Quality</p>
            <h2 className="title-section">What Our Clients Say</h2>
          </div>
        </ScrollReveal>

        {/* Testimonials Slider */}
        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="relative">
            {/* Testimonials Container */}
            <div className="overflow-hidden relative py-4">
              <div
                ref={testimonialsRef}
                className={`flex transition-transform duration-500 ease-in-out ${
                  animating ? "opacity-70" : "opacity-100"
                }`}
                style={{
                  gap:
                    cardsPerSlide === 1
                      ? "0"
                      : cardsPerSlide === 2
                      ? "1rem"
                      : "1.5rem",
                  transform:
                    cardsPerSlide === 1
                      ? `translateX(calc(-${currentIndex} * 100%))`
                      : cardsPerSlide === 2
                      ? `translateX(calc(-${currentIndex} * ((100% + 1rem) / 2)))`
                      : `translateX(calc(-${currentIndex} * ((100% + 1.5rem) / 3)))`,
                }}
              >
                {/* Render all testimonials for smooth sliding */}
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="shrink-0"
                    style={{
                      width:
                        cardsPerSlide === 1
                          ? "100%"
                          : cardsPerSlide === 2
                          ? "calc((100% - 1rem) / 2)"
                          : "calc((100% - 3rem) / 3)",
                    }}
                  >
                    <Card className="h-full bg-surface border-none p-8 rounded-3xl hover:shadow-md duration-200">
                      <div className="relative">
                        <div className="pt-6 pl-6 md:pt-8 md:pl-8">
                          {/* Rating */}
                          <div className="flex items-center mb-6">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < Math.floor(testimonial.rating)
                                      ? "text-rating fill-rating"
                                      : "text-base-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 font-bold text-base-900 dark:text-white">
                              {testimonial.rating.toFixed(1)}
                            </span>
                          </div>

                          <CardDescription className="text-body italic leading-relaxed mb-8">
                            {testimonial.text}
                          </CardDescription>

                          {/* Person info */}
                          <div className="flex flex-col">
                            <h4 className="font-bold text-base-900 dark:text-white text-lg">
                              {testimonial.name}
                            </h4>
                            <div className="flex flex-col sm:flex-row sm:items-center mt-2">
                              {testimonial.position && (
                                <>
                                  <span className="text-primary-600 dark:text-primary-400 text-sm">
                                    {testimonial.position}
                                  </span>
                                  <span className="hidden sm:block mx-2 text-base-400">
                                    •
                                  </span>
                                </>
                              )}
                              <span className="text-sm">
                                {testimonial.location}
                              </span>
                            </div>
                            {testimonial.carRented && (
                              <span className="text-xs italic mt-2">
                                Vehicle: {testimonial.carRented}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={handlePrev}
                className="cursor-pointer btn-icon bg-white dark:bg-base-800 text-base-600 dark:text-base-400 hover:text-primary-600 dark:hover:text-primary-400 shadow-md transition-colors"
                disabled={animating}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Indicators */}
              <div className="flex space-x-2">
                {Array.from({ length: maxSlideIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "bg-primary-600 dark:bg-primary-400 w-6"
                        : "bg-base-300 dark:bg-base-700"
                    }`}
                    onClick={() => !animating && setCurrentIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="cursor-pointer btn-icon bg-white dark:bg-base-800 text-base-600 dark:text-base-400 hover:text-primary-600 dark:hover:text-primary-400 shadow-md transition-colors"
                disabled={animating}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

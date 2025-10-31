// app/(public)/_components/home/Testimonials.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  rating: number;
  text: string;
  name: string;
  position: string;
  location: string;
  image: string;
  carRented?: string;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      rating: 5.0,
      text: "The experience with 4MATIC Luxury exceeded all expectations. The Mercedes-Benz S-Class was immaculate, and the concierge service was exceptional—arranging everything from airport pickup to special requests. The level of professionalism and attention to detail sets them apart from any other luxury rental service I've used.",
      name: "James Wilson",
      position: "Executive Director",
      location: "New York, US",
      image: "/testimonials/person1.jpg",
      carRented: "Mercedes-Benz S-Class"
    },
    {
      id: 2,
      rating: 4.9,
      text: "Renting the Bentley Continental GT from 4MATIC Luxury transformed our anniversary weekend. From the moment we received the keys, we knew this was unlike any other rental experience. The vehicle was pristine, the booking process seamless, and the personalized service made us feel truly valued. Absolutely worth every penny.",
      name: "Sophie Chen",
      position: "Design Director",
      location: "San Francisco, US",
      image: "/testimonials/person2.jpg",
      carRented: "Bentley Continental GT"
    },
    {
      id: 3,
      rating: 5.0,
      text: "My experience with the Rolls-Royce Cullinan rental was nothing short of spectacular. The vehicle arrived in perfect condition, and the delivery was precisely on time. The 24/7 concierge support was particularly impressive—they arranged luxury dining reservations that perfectly complemented our travel itinerary. This is how luxury service should be.",
      name: "Michael Rodriguez",
      position: "CEO, Global Ventures",
      location: "Chicago, US",
      image: "/testimonials/person3.jpg",
      carRented: "Rolls-Royce Cullinan"
    },
  ];

  const handlePrev = () => {
    if (!animating) {
      setAnimating(true);
      setCurrentIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
    }
  };

  const handleNext = () => {
    if (!animating) {
      setAnimating(true);
      setCurrentIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section className="py-24 bg-secondary-50 dark:bg-secondary-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient background */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-50/30 to-transparent dark:from-primary-900/10 dark:to-transparent"></div>
        
        {/* Decorative quotes */}
        <div className="absolute top-20 left-20 text-primary-200/10 dark:text-primary-900/10">
          <Quote size={120} />
        </div>
        <div className="absolute bottom-20 right-20 text-primary-200/10 dark:text-primary-900/10 transform rotate-180">
          <Quote size={120} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            Client Experiences
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-6">
            Exceptional Service, Memorable Journeys
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 text-lg">
            Discover what our distinguished clients have to say about their 4MATIC Luxury experience
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Main Testimonial */}
          <div 
            ref={testimonialsRef}
            className="flex flex-col lg:flex-row items-center bg-white dark:bg-secondary-900 rounded-2xl p-6 md:p-8 shadow-xl"
          >
            {/* Left side - Image */}
            <div className="w-full lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
              <div className="relative aspect-w-1 aspect-h-1 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={testimonials[currentIndex].image || "/testimonials/default.jpg"}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Rating on image */}
                <div className="absolute bottom-4 left-4 flex items-center">
                  <div className="bg-white dark:bg-secondary-800 rounded-full px-3 py-1 flex items-center shadow-md">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(testimonials[currentIndex].rating) ? "text-yellow-400 fill-yellow-400" : "text-secondary-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-bold text-secondary-900 dark:text-white">
                      {testimonials[currentIndex].rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Person info - mobile only */}
              <div className="flex flex-col items-center text-center lg:hidden mt-4">
                <h4 className="text-lg font-bold text-secondary-900 dark:text-white">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-primary-600 dark:text-primary-400 text-sm">
                  {testimonials[currentIndex].position}
                </p>
                <p className="text-secondary-500 dark:text-secondary-400 text-xs mt-1">
                  {testimonials[currentIndex].location}
                </p>
                {testimonials[currentIndex].carRented && (
                  <p className="text-secondary-600 dark:text-secondary-500 text-xs mt-2 italic">
                    Vehicle: {testimonials[currentIndex].carRented}
                  </p>
                )}
              </div>
            </div>
            
            {/* Right side - Content */}
            <div className="w-full lg:w-2/3">
              <div className="relative">
                <div className="absolute -top-6 -left-6 text-primary-200 dark:text-primary-800">
                  <Quote size={48} />
                </div>
                
                <div className="pt-8 pl-8">
                  <p className="text-secondary-700 dark:text-secondary-300 text-lg italic leading-relaxed mb-8">
                    {testimonials[currentIndex].text}
                  </p>
                  
                  {/* Person info - desktop */}
                  <div className="hidden lg:flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary-200 dark:border-primary-800">
                      <Image
                        src={testimonials[currentIndex].image || "/testimonials/default.jpg"}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-secondary-900 dark:text-white">
                        {testimonials[currentIndex].name}
                      </h4>
                      <div className="flex flex-col md:flex-row md:items-center">
                        <span className="text-primary-600 dark:text-primary-400 text-sm">
                          {testimonials[currentIndex].position}
                        </span>
                        <span className="hidden md:block mx-2 text-secondary-400">•</span>
                        <span className="text-secondary-500 dark:text-secondary-400 text-sm">
                          {testimonials[currentIndex].location}
                        </span>
                      </div>
                      {testimonials[currentIndex].carRented && (
                        <span className="text-secondary-600 dark:text-secondary-500 text-xs italic">
                          Vehicle: {testimonials[currentIndex].carRented}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 shadow-md transition-colors"
                disabled={animating}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 shadow-md transition-colors"
                disabled={animating}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            {/* Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? "bg-primary-600 dark:bg-primary-400 w-6" 
                      : "bg-secondary-300 dark:bg-secondary-700"
                  }`}
                  onClick={() => !animating && setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "What documents do I need to rent a car in Dubai?",
    answer:
      "For UAE residents, you'll need a valid UAE driving license, Emirates ID, and a credit card. International tourists require a valid passport, visit visa, international driving license (or home country license from approved countries), and a credit card for the security deposit.",
  },
  {
    question: "What's included in the rental price?",
    answer:
      "All our rentals include comprehensive insurance, 24/7 roadside assistance, and standard mileage allowance. Additional services like GPS navigation, child seats, or additional drivers can be added during booking. Fuel charges and Salik (toll) fees are charged separately based on usage.",
  },
  {
    question: "Can I drive to other Emirates or neighboring countries?",
    answer:
      "Yes, you can drive to all Emirates within the UAE. If you plan to travel to Oman or other GCC countries, please inform us in advance as additional insurance and documentation may be required. Cross-border travel is subject to approval and may incur additional charges.",
  },
  {
    question: "How does the security deposit work?",
    answer:
      "A security deposit is blocked on your credit card at the time of rental. The amount varies based on the vehicle category, typically ranging from AED 1,500 to AED 10,000 for luxury vehicles. The deposit is released 21-30 days after return, once we confirm there are no traffic fines or damages.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "Free cancellation is available up to 48 hours before your booking start time for a full refund. Cancellations made within 48 hours are subject to a 50% charge. No-shows or same-day cancellations are non-refundable. We recommend booking with flexibility for peace of mind.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pb-20 bg-white dark:bg-secondary-900">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#6B7C85] dark:text-gray-400 text-sm uppercase tracking-wider mb-3">
            Faq
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Popular Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-secondary-800 rounded-2xl border border-gray-300 dark:border-secondary-700 overflow-hidden transition-all duration-200 hover:shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-8 py-4 flex items-center justify-between text-left transition-colors cursor-pointer group"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white pr-8">
                  {item.question}
                </h3>
                <div
                  className={`p-3 rounded-lg flex-shrink-0 transition-colors ${
                    openIndex === index
                      ? "bg-black dark:bg-white"
                      : "bg-gray-100 dark:bg-secondary-700 group-hover:bg-gray-200 dark:group-hover:bg-secondary-600"
                  }`}
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-all duration-200 ${
                      openIndex === index
                        ? "rotate-180 text-white dark:text-black"
                        : "text-black dark:text-gray-400"
                    }`}
                  />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-8 pb-6 pt-2">
                  <p className="text-sm text-black dark:text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

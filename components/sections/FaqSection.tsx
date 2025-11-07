"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "@/lib/animations/ScrollReveal";
import StaggerContainer, {
  StaggerItem,
  staggerItemVariants,
} from "@/lib/animations/StaggerContainer";

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
    <section className="section bg-white dark:bg-base-950 pt-24">
      <div className="container-default max-w-6xl">
        {/* Header */}
        <ScrollReveal variant="fadeUp">
          <div className="section-header">
            <p className="subtitle">Faq</p>
            <h2 className="title-section">Popular Questions</h2>
          </div>
        </ScrollReveal>

        {/* FAQ Items */}
        <StaggerContainer staggerDelay={0.08} className="space-y-2">
          {faqItems.map((item, index) => (
            <StaggerItem key={index} variants={staggerItemVariants}>
              <div className="accordion-item">
                <button
                  onClick={() => toggleFaq(index)}
                  className="accordion-button group"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="accordion-title">{item.question}</h3>
                  <div
                    className={`accordion-icon-container ${
                      openIndex === index
                        ? "accordion-icon-active"
                        : "accordion-icon-inactive"
                    }`}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-all duration-200 ${
                        openIndex === index
                          ? "rotate-180 text-white dark:text-base-900"
                          : "text-black dark:text-white"
                      }`}
                    />
                  </div>
                </button>

                <div
                  className={`accordion-content ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="accordion-body">{item.answer}</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

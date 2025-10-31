// app/(public)/vehicles/_components/WhatsappBooking.tsx
"use client";

import { Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import { Car } from "@/types/car";
import { formatBrandName } from "@/lib/formatters";

interface WhatsappBookingProps {
  car: Car;
  className?: string;
}

export default function WhatsappBooking({
  car,
  className = "",
}: WhatsappBookingProps) {
  // Get the brand name
  const brandName = formatBrandName(car.brand);

  // Function to generate the WhatsApp link with template message
  const handleWhatsAppBooking = () => {
    // The phone number should be replaced with your actual business phone number
    // Format: Country code without + and then the number, e.g., 1XXXXXXXXXX for US
    const phoneNumber = "+971563626000";

    // Create a template message with the car details and luxury service offering
    const message = `
Hello 4MATIC Luxury Car Rental,

I'm interested in booking the ${brandName} ${car.name}.

*Vehicle Details:*
• Vehicle ID: ${car.id}
• Daily Rate: AED ${car.price}
• Category: ${car.category.charAt(0).toUpperCase() + car.category.slice(1)}
• Passengers: ${car.passengers}
• Transmission: ${car.transmission}

Please provide information about availability and any premium services or amenities included with this vehicle rental.

Thank you.
    `.trim();

    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);

    // Generate the WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      variant="primary"
      fullWidth
      size="lg"
      icon={<Phone className="w-5 h-5" />}
      onClick={handleWhatsAppBooking}
      className={className}
    >
      Request Reservation
    </Button>
  );
}

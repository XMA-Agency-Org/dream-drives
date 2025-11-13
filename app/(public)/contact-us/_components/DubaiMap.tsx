"use client";

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  hours: string;
}

interface DubaiMapProps {
  location: Location;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function DubaiMap(_props: DubaiMapProps) {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.2585414!2d55.3366432!3d25.2585414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5dbe633684c7%3A0xd97a4d55de63513c!2sDream+Drives+Rent+A+Car!5e0!3m2!1sen!2sae!4v1733456789!5m2!1sen!2sae"
      width="100%"
      height="100%"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded-xl border-0"
    ></iframe>
  );
}

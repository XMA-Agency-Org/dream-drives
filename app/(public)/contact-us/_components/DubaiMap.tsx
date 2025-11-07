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
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100910.04310938287!2d54.88950351953123!3d25.186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682b38b7ee3d%3A0x35d9d8e26a1b1b1!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1635789012345!5m2!1sen!2sae"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded-xl"
    ></iframe>
  );
}

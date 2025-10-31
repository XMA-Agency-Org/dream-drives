"use client";

import DubaiMap from "./DubaiMap";

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

interface LocationMapContainerProps {
  location: Location;
}

export default function LocationMapContainer({ location }: LocationMapContainerProps) {
  return (
    <div className="h-full w-full">
      <DubaiMap location={location} />
    </div>
  );
}

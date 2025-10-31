"use client";

import { useState, useEffect } from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

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

export default function DubaiMap({ location }: DubaiMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Set map as loaded after a brief delay
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Map container */}
      <div className="h-full w-full relative">
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary-100 dark:bg-secondary-800">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            {/* Google Maps iframe */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4368.732489532579!2d55.27629254362721!3d25.184994129966434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6959ffb4d9d9%3A0x91756f3e315c269f!2s4matic%20Car%20Rental!5e0!3m2!1sen!2sae!4v1745930898405!5m2!1sen!2sae" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="4MATIC Car Rental Location"
              className="absolute inset-0"
              onLoad={() => setMapLoaded(true)}
            />
            
            {/* Information overlay */}
            <div className="absolute bottom-0 left-0 right-0 md:right-auto md:w-80 bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm p-4 rounded-t-lg md:rounded-tr-none md:rounded-tl-lg shadow-lg m-4 z-10">
              <div className="space-y-3">
                <h3 className="font-bold text-secondary-900 dark:text-white flex items-center">
                  <MapPin className="h-4 w-4 text-primary-500 mr-2" />
                  {location.name}
                </h3>
                
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  {location.address}
                </p>
                
                <div className="flex justify-between pt-1">
                  <a
                    href="https://goo.gl/maps/dVvbmJUCJyTBi82t7"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    <Navigation className="mr-1.5 h-4 w-4" />
                    Get Directions
                  </a>
                  
                  <a
                    href={`tel:${location.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    Call Us
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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

interface LocationMapProps {
  locations: Location[];
}

export default function LocationMap({ locations }: LocationMapProps) {
  const [activeLocation, setActiveLocation] = useState<string>(locations[0]?.id || "");
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Get the active location object
  const location = locations.find(loc => loc.id === activeLocation) || locations[0];

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
          <>
            {/* Dubai map embedded SVG */}
            <div className="absolute inset-0 overflow-hidden bg-secondary-50 dark:bg-secondary-800">
              <svg width="100%" height="100%" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Background */}
                <rect width="1200" height="800" fill="currentColor" className="text-secondary-100 dark:text-secondary-900" />
                
                {/* Water - Dubai Creek/Canal */}
                <path d="M200,400 C300,350 400,450 500,400 C600,350 700,400 800,350 C900,300 1000,370 1100,350 L1100,800 L200,800 Z" className="fill-primary-100 dark:fill-primary-900/30" />
                
                {/* Main roads */}
                <path d="M100,350 L1100,350" className="stroke-secondary-200 dark:stroke-secondary-700" strokeWidth="15" />
                <path d="M100,500 L1100,500" className="stroke-secondary-200 dark:stroke-secondary-700" strokeWidth="15" />
                <path d="M300,100 L300,700" className="stroke-secondary-200 dark:stroke-secondary-700" strokeWidth="15" />
                <path d="M600,100 L600,700" className="stroke-secondary-200 dark:stroke-secondary-700" strokeWidth="15" />
                <path d="M900,100 L900,700" className="stroke-secondary-200 dark:stroke-secondary-700" strokeWidth="15" />
                
                {/* Secondary roads */}
                <path d="M150,200 L1050,200" className="stroke-secondary-200 dark:stroke-secondary-700" strokeWidth="8" />
                <path d="M150,650 L1050,650" className="stroke-secondary-200 dark:stroke-secondary-700" strokeWidth="8" />
                <path d="M450,100 L450,700" className="stroke-secondary-200 dark:stroke-secondary-700" strokeWidth="8" />
                <path d="M750,100 L750,700" className="stroke-secondary-200 dark:stroke-secondary-700" strokeWidth="8" />
                
                {/* Buildings */}
                <rect x="320" y="220" width="70" height="40" className="fill-secondary-300 dark:fill-secondary-600" />
                <rect x="420" y="230" width="80" height="60" className="fill-secondary-300 dark:fill-secondary-600" />
                <rect x="530" y="220" width="50" height="70" className="fill-secondary-300 dark:fill-secondary-600" />
                <rect x="620" y="240" width="40" height="40" className="fill-secondary-300 dark:fill-secondary-600" />
                <rect x="700" y="220" width="90" height="50" className="fill-secondary-300 dark:fill-secondary-600" />
                <rect x="830" y="230" width="60" height="70" className="fill-secondary-300 dark:fill-secondary-600" />
                
                <rect x="350" y="370" width="60" height="80" className="fill-secondary-300 dark:fill-secondary-600" />
                <rect x="440" y="390" width="70" height="50" className="fill-secondary-300 dark:fill-secondary-600" />
                <rect x="550" y="370" width="40" height="90" className="fill-secondary-300 dark:fill-secondary-600" />
                <rect x="630" y="380" width="90" height="60" className="fill-secondary-300 dark:fill-secondary-600" />
                <rect x="760" y="370" width="70" height="70" className="fill-secondary-300 dark:fill-secondary-600" />
                <rect x="860" y="390" width="50" height="50" className="fill-secondary-300 dark:fill-secondary-600" />
                
                {/* Business Bay area */}
                <rect x="570" y="420" width="60" height="70" className="fill-primary-100 dark:fill-primary-900/30 stroke-primary-500 dark:stroke-primary-400" strokeWidth="3" />
                
                {/* Marquise Square Tower - highlight the specific building */}
                <rect x="580" y="435" width="40" height="40" className="fill-primary-200 dark:fill-primary-800/50 stroke-primary-600 dark:stroke-primary-400" strokeWidth="3" />
                
                {/* Labels */}
                <text x="600" y="415" fontFamily="Arial" fontSize="12" textAnchor="middle" className="fill-secondary-600 dark:fill-secondary-400">Business Bay</text>
                <text x="600" y="490" fontFamily="Arial" fontSize="10" textAnchor="middle" className="fill-primary-700 dark:fill-primary-300">Marquise Square</text>
                
                {/* Burj Khalifa (iconic landmark) */}
                <polygon points="650,300 670,200 690,300" className="fill-secondary-400 dark:fill-secondary-500 stroke-secondary-500 dark:stroke-secondary-400" strokeWidth="2" />
                <text x="670" y="320" fontFamily="Arial" fontSize="10" textAnchor="middle" className="fill-secondary-600 dark:fill-secondary-400">Burj Khalifa</text>
                
                {/* Dubai Mall */}
                <rect x="700" y="300" width="80" height="40" className="fill-secondary-400 dark:fill-secondary-500 stroke-secondary-500 dark:stroke-secondary-400" strokeWidth="2" />
                <text x="740" y="320" fontFamily="Arial" fontSize="10" textAnchor="middle" className="fill-secondary-600 dark:fill-secondary-400">Dubai Mall</text>
                
                {/* Compass */}
                <circle cx="1100" cy="100" r="30" className="fill-white dark:fill-secondary-700 stroke-secondary-400 dark:stroke-secondary-500" strokeWidth="1" />
                <text x="1100" y="85" fontFamily="Arial" fontSize="16" textAnchor="middle" className="fill-secondary-600 dark:fill-secondary-400">N</text>
                <text x="1100" y="120" fontFamily="Arial" fontSize="16" textAnchor="middle" className="fill-secondary-600 dark:fill-secondary-400">S</text>
                <text x="1080" y="103" fontFamily="Arial" fontSize="16" textAnchor="middle" className="fill-secondary-600 dark:fill-secondary-400">W</text>
                <text x="1120" y="103" fontFamily="Arial" fontSize="16" textAnchor="middle" className="fill-secondary-600 dark:fill-secondary-400">E</text>
                <path d="M1100,70 L1100,90" className="stroke-secondary-600 dark:stroke-secondary-400" strokeWidth="2" />
                <path d="M1100,110 L1100,130" className="stroke-secondary-600 dark:stroke-secondary-400" strokeWidth="2" />
                <path d="M1070,100 L1090,100" className="stroke-secondary-600 dark:stroke-secondary-400" strokeWidth="2" />
                <path d="M1110,100 L1130,100" className="stroke-secondary-600 dark:stroke-secondary-400" strokeWidth="2" />
              </svg>
              
              {/* Overlay to darken the map in dark mode */}
              <div className="absolute inset-0 bg-white/0 dark:bg-secondary-900/20"></div>
              
              {/* Business Bay marker */}
              <div 
                className="absolute animate-bounce-subtle"
                style={{
                  // Position marker at Business Bay (adjust as needed)
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="p-1.5 rounded-full bg-primary-500 text-white shadow-lg">
                    <MapPin className="h-8 w-8" />
                  </div>
                  
                  <div className="mt-2 px-4 py-2 bg-white dark:bg-secondary-800 rounded-lg shadow-lg whitespace-nowrap">
                    <h3 className="font-medium text-secondary-900 dark:text-white text-sm">
                      4MATIC Rental
                    </h3>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      Business Bay
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Location highlight circle */}
              <div 
                className="absolute rounded-full bg-primary-500/20 animate-pulse"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100px',
                  height: '100px'
                }}
              ></div>
            </div>
            
            {/* Information overlay */}
            <div className="absolute bottom-0 left-0 right-0 md:right-auto md:w-80 bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm p-4 rounded-t-lg md:rounded-tr-none md:rounded-tl-lg shadow-lg m-4">
              <div className="space-y-3">
                <h3 className="font-bold text-secondary-900 dark:text-white flex items-center">
                  <MapPin className="h-4 w-4 text-primary-500 mr-2" />
                  {location.name}
                </h3>
                
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  {location.address}
                </p>
                
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  {location.hours}
                </p>
                
                <div className="flex justify-between pt-1">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=4MATIC+Rental+Business+Bay+Dubai`}
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

      {/* Map attribution - Always include attribution for maps */}
      <div className="absolute bottom-0 right-0 text-xs text-secondary-500 dark:text-secondary-400 p-1 bg-white/80 dark:bg-secondary-800/80 rounded-tl-md">
        Map data © {new Date().getFullYear()}
      </div>
    </div>
  );
}

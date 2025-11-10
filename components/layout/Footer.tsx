import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Our Fleet", href: "/vehicles" },
    { name: "Locations", href: "/locations" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const vehicleTypes = [
    { name: "Luxury Cars", href: "/vehicles?category=luxury" },
    { name: "Family Cars", href: "/vehicles?category=family" },
  ];

  const brands = [
    { name: "Mercedes-Benz", href: "/vehicles?brand=mercedes" },
    { name: "Bentley", href: "/vehicles?brand=bentley" },
    { name: "Rolls-Royce", href: "/vehicles?brand=rolls-royce" },
    { name: "Range Rover", href: "/vehicles?brand=range-rover" },
    { name: "Lamborghini", href: "/vehicles?brand=lamborghini" },
  ];

  return (
    <footer className="bg-footer border-t border-black/10">
      {/* Main footer content */}
      <div className="container-default py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Dream Drives Logo"
                  width={200}
                  height={200}
                  className="h-20 w-auto"
                />
              </div>
            </div>
            <p className="footer-text mb-6">
              Discover Dubai in style with our curated fleet of luxury vehicles.
              Enjoy world-class service, exclusive brands, and seamless rentals
              for a truly unforgettable driving experience.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 footer-text mt-0.5 mr-3 flex-shrink-0" />
                <Link href="tel:+971545555402" className="footer-link">
                  +971 54 555 5402
                </Link>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 footer-text mt-0.5 mr-3 flex-shrink-0" />
                <Link
                  href="mailto:info@dreamdrives.com"
                  className="footer-link"
                >
                  info@dreamdrives.com
                </Link>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 footer-text mt-0.5 mr-3 flex-shrink-0" />
                <span className="footer-text">Dubai, United Arab Emirates</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicle Types */}
          <div>
            <h3 className="footer-heading">Vehicle Types</h3>
            <ul className="space-y-3">
              {vehicleTypes.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="footer-heading">Premium Brands</h3>
            <ul className="space-y-3">
              {brands.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-8">
        <div className="container-default flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/dreamdrivesdxb"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/dreamdrives_/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.tiktok.com/@dreamdrivesdxb"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="TikTok"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>

          {/* Design Credit - Center */}
          <div className="footer-social text-xs text-center">
            Designed by{" "}
            <a
              href="https://xma.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
            >
              XMA
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-center md:text-right">
            © {currentYear} Dream Drives. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

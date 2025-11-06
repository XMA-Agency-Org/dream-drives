import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  CarFront,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Our Fleet", href: "/vehicles" },
    { name: "Locations", href: "/locations" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const vehicleTypes = [
    { name: "Luxury Sedans", href: "/vehicles?category=luxury" },
    { name: "Premium SUVs", href: "/vehicles?category=suv" },
    { name: "Sports Cars", href: "/vehicles?category=sports" },
    { name: "Minivans", href: "/vehicles?category=minivan" },
    { name: "Economy Cars", href: "/vehicles?category=economy" },
  ];

  const brands = [
    { name: "Mercedes-Benz", href: "/vehicles?brand=mercedes" },
    { name: "Bentley", href: "/vehicles?brand=bentley" },
    { name: "Rolls-Royce", href: "/vehicles?brand=rolls-royce" },
    { name: "Range Rover", href: "/vehicles?brand=range-rover" },
    { name: "Lamborghini", href: "/vehicles?brand=lamborghini" },
  ];

  return (
    <footer className="bg-footer text-inverse">
      {/* Main footer content */}
      <div className="container-default py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <CarFront className="h-8 w-8 md:h-10 md:w-10 text-inverse" />
              <span className="text-2xl md:text-3xl font-bold text-inverse">
                Dream Drives
              </span>
            </div>
            <p className="footer-text mb-6">
              Experience the epitome of luxury and performance with our premium
              vehicle collection. Offering exceptional service and attention to
              detail for discerning clients worldwide.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 footer-text mt-0.5 mr-3 flex-shrink-0" />
                <Link
                  href="tel:+971563626000"
                  className="footer-text hover:text-white transition-colors"
                >
                  +971 56 362 6000
                </Link>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 footer-text mt-0.5 mr-3 flex-shrink-0" />
                <Link
                  href="mailto:info@dreamdrives.com"
                  className="footer-text hover:text-white transition-colors"
                >
                  info@dreamdrives.com
                </Link>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 footer-text mt-0.5 mr-3 flex-shrink-0" />
                <span className="footer-text">
                  Business Bay Marquise Square Tower Shop 04, Dubai
                </span>
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
      <div className="border-t border-white/10 py-8">
        <div className="container-default flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/dreamdrives/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/dreamdrives"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/dreamdrives/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/dreamdrives"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.pinterest.com/dreamdrives"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Pinterest"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
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
              className="text-accent-400 hover:text-accent-300 transition-colors font-medium"
            >
              XMA
            </a>
          </div>

          {/* Copyright */}
          <p className="footer-social text-sm text-center md:text-right">
            © {currentYear} Dream Drives. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

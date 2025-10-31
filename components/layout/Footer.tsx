// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  ArrowRight,
  Award,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Our Fleet", href: "/vehicles" },
    { name: "Locations", href: "/locations" },
    // { name: "About Us", href: "/about-us" },
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
    <footer className="bg-white dark:bg-secondary-950 border-t border-secondary-200 dark:border-secondary-800">
      {/* Trust badges section */}
      <div className="border-b border-secondary-200 dark:border-secondary-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 dark:bg-primary-900/40 p-3 rounded-full">
                <Award className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-medium text-secondary-900 dark:text-white">
                  Luxury Experience
                </h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  Premium service guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Image
                src="/4MAticlogo.png"
                alt="4MATIC Logo"
                width={200}
                height={200}
                className="logo-image"
              />
            </div>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              Experience the epitome of luxury and performance with our premium
              vehicle collection. Offering exceptional service and attention to
              detail for discerning clients worldwide.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3" />
                <Link href="tel:+971563626000">
                  <span className="text-secondary-600 dark:text-secondary-400">
                    +971 56 362 6000
                  </span>
                </Link>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3" />
                <Link href="mailto:info@4maticrental.com">
                  <span className="text-secondary-600 dark:text-secondary-400">
                    info@4maticrental.com
                  </span>
                </Link>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3" />
                <span className="text-secondary-600 dark:text-secondary-400">
                  Business Bay Marquise Square Tower Shop 04, Dubai
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center"
                  >
                    <ArrowRight className="w-3.5 h-3.5 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicle Types */}
          <div>
            <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-6">
              Vehicle Types
            </h3>
            <ul className="space-y-3">
              {vehicleTypes.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center"
                  >
                    <ArrowRight className="w-3.5 h-3.5 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-6">
              Premium Brands
            </h3>
            <ul className="space-y-3">
              {brands.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center"
                  >
                    <ArrowRight className="w-3.5 h-3.5 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Form Section (Replacing Newsletter) */}
        <div className="mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">
                Visit Our Showroom
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 mb-0">
                Business Bay Marquise Square Tower Shop 04, Dubai, UAE
              </p>
            </div>

            <div className="ml-auto">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition-colors"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-secondary-50 dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4 md:mb-0">
            © {currentYear} 4MATIC Luxury Car Rentals. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/4maticrental/"
              className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/4maticrental/"
              className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

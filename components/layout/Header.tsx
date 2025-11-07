"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone, CarFront } from "lucide-react";
import Button from "../ui/Button";
import {
  MBIcon,
  BentleyIcon,
  RollsRoyceIcon,
  LandroverIcon,
  LamborghiniIcon,
  FerrariLogo,
  AudiIcon,
  PorscheIcon,
  ToyotaIcon,
  KiaIcon,
  HyundaiIcon,
  NissanLogo,
  MitsubishiIcon,
  ChevroletLogo,
  CadillacIcon,
  FiatIcon,
  MiniIcon,
  MazdaIcon,
  GMCLogo,
} from "@cardog-icons/react";
import BMW from "@/public/brands/light-mode/BMW-logo-lm.png";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);
  const [brands, setBrands] = useState<Array<{ id: string; label: string }>>(
    []
  );
  const [categories, setCategories] = useState<
    Array<{ id: string; label: string }>
  >([]);

  // Build navigation items dynamically based on fetched data
  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Our Fleet",
      href: "#",
      children: [
        { label: "Browse All", href: "/vehicles" },
        ...categories
          .filter((cat) => cat.id !== "all")
          .map((cat) => ({
            label: cat.label,
            href: `/vehicles?category=${cat.id}`,
          })),
      ],
    },
    {
      label: "Brands",
      href: "#",
      children: brands.map((brand) => ({
        label: brand.label,
        href: brand.id === "all" ? "/brands" : `/vehicles?brand=${brand.id}`,
      })),
    },
    { label: "Contact Us", href: "/contact-us" },
  ];

  // Fetch brands and categories on mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands");
        const brandsData = await response.json();
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrands([{ id: "all", label: "All Brands" }]);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([{ id: "all", label: "All Vehicles" }]);
      }
    };

    fetchBrands();
    fetchCategories();
  }, []);

  // Toggle mobile dropdown
  const toggleMobileDropdown = (label: string) => {
    setActiveMobileDropdown(activeMobileDropdown === label ? null : label);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-base-950 py-4 border-b border-base-200 dark:border-base-800">
      <div className="container-default">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <div className="flex items-center gap-2">
              {/* TODO: Replace the logo image file /4MAticlogo.png with the new Dream Drives logo */}
              {/* <Image
                src="/4MAticlogo.png"
                alt="Dream Drives Logo"
                width={100}
                height={100}
                className="h-14 w-auto"
              /> */}
              <CarFront className="h-6 w-6 md:h-7 md:w-7 text-accent-600 dark:text-accent-400" />
              <span className="text-xl md:text-2xl font-bold text-base-900 dark:text-white">
                Dream Drives
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <button
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors flex items-center cursor-pointer
                      text-base-900 dark:text-white
                      hover:text-accent-600 dark:hover:text-accent-400`}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors
                      text-base-900 dark:text-white
                      hover:text-accent-600 dark:hover:text-accent-400`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown for desktop */}
                {item.children && item.label === "Brands" && (
                  <div className="absolute left-0 mt-1 w-80 origin-top-right rounded-md shadow-lg overflow-hidden bg-white dark:bg-base-900 ring-1 ring-base-200 dark:ring-base-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50">
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-3">
                        {item.children.map((child) => {
                          const isAllBrands = child.label === "All Brands";
                          const brandIcon = getBrandIcon(
                            child.href.split("brand=")[1]
                          );
                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              className={`flex flex-col items-center justify-center p-3 text-xs text-base-900 dark:text-white hover:bg-base-100 dark:hover:bg-base-800 rounded-md transition-colors ${
                                isAllBrands ? "min-h-[80px]" : ""
                              }`}
                            >
                              {brandIcon && (
                                <div className="mb-1">{brandIcon}</div>
                              )}
                              <span
                                className={`text-center leading-tight w-full ${
                                  isAllBrands ? "font-bold" : ""
                                }`}
                              >
                                {child.label}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                {/* Regular dropdown for other items */}
                {item.children && item.label !== "Brands" && (
                  <div className="absolute left-0 mt-1 w-56 origin-top-right rounded-md shadow-lg overflow-hidden bg-white dark:bg-base-900 ring-1 ring-base-200 dark:ring-base-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50">
                    <div className="py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-base-900 dark:text-white hover:bg-base-100 dark:hover:bg-base-800"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Button - Desktop */}
          <div className="hidden md:flex items-center">
            <Button
              variant="primary"
              size="sm"
              icon={<Phone className="h-4 w-4" />}
              asLink
              href="tel:+971545555402"
            >
              +971 54 555 5402
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-10 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className={`h-6 w-6 text-base-900 dark:text-white`} />
            ) : (
              <Menu className={`h-6 w-6 text-base-900 dark:text-white`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-base-800/95 backdrop-blur-sm z-40 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button - Fixed at top right */}
        <button
          onClick={closeMobileMenu}
          className="absolute top-6 right-6 p-2 text-white hover:text-white/80 transition-colors"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col h-full pt-20 pb-6 px-6 overflow-auto">
          <nav className="space-y-1 mb-8">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-white/60">
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleMobileDropdown(item.label)}
                      className="flex items-center justify-between w-full py-4 text-white font-semibold"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform text-white ${
                          activeMobileDropdown === item.label
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {activeMobileDropdown === item.label && (
                      <div className="ml-4 mb-4 border-l border-white/60 pl-4 space-y-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-center py-2 text-white hover:text-white/90 text-sm"
                            onClick={closeMobileMenu}
                          >
                            {getBrandIcon(child.href.split("brand=")[1])}
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-4 text-white font-semibold"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Button - Mobile */}
          <div className="mt-auto">
            <Button
              variant="primary"
              fullWidth
              icon={<Phone className="h-5 w-5" />}
              asLink
              href="tel:+971563626000"
            >
              +971 56 362 6000
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Helper function to get brand icons for dropdown
function getBrandIcon(brandId: string) {
  const baseClassName = "mr-2 md:mr-0 text-3xl";

  const brandIconMap: Record<string, React.ReactElement> = {
    mercedes: <MBIcon className={baseClassName} />,
    "mercedes-benz": <MBIcon className={baseClassName} />,
    bentley: <BentleyIcon className={baseClassName} />,
    "rolls-royce": <RollsRoyceIcon className={baseClassName} />,
    "land-rover": <LandroverIcon className={baseClassName} />,
    "range-rover": <LandroverIcon className={baseClassName} />,
    lamborghini: <LamborghiniIcon className={baseClassName} />,
    ferrari: <FerrariLogo className={baseClassName} />,
    audi: <AudiIcon className={baseClassName} />,
    bmw: (
      <Image
        src={BMW}
        width={20}
        height={50}
        alt="BMW"
        className={baseClassName}
      />
    ),
    porsche: <PorscheIcon className={baseClassName} />,
    toyota: <ToyotaIcon className={baseClassName} />,
    kia: <KiaIcon className={baseClassName} />,
    hyundai: <HyundaiIcon className={baseClassName} />,
    nissan: <NissanLogo className={baseClassName} />,
    mitsubishi: <MitsubishiIcon className={baseClassName} />,
    chevrolet: <ChevroletLogo className={baseClassName} />,
    cadillac: <CadillacIcon className={baseClassName} />,
    gmc: <GMCLogo className={baseClassName} />,
    fiat: <FiatIcon className={baseClassName} />,
    mini: <MiniIcon className={baseClassName} />,
    mazda: <MazdaIcon className={baseClassName} />,
  };

  return brandIconMap[brandId] || null;
}

export default Header;

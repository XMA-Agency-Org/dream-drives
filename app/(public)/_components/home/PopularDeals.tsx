// app/(public)/_components/home/PopularDeals.tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import CarCard from "@/components/cars/CarCard";
import Button from "@/components/ui/Button";
import { Car } from "@/types/car";
import ScrollReveal from "@/lib/animations/ScrollReveal";

type CategoryType =
  | "all"
  | "luxury"
  | "family"
  | "suv"
  | "sports"
  | "economy"
  | "minivan";

interface PopularDealsProps {
  category?: "luxury" | "family";
}

export default function PopularDeals({ category }: PopularDealsProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(
    category || "all"
  );
  const [popularCars, setPopularCars] = useState<Car[]>([]);
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(popularCars.length / itemsPerPage);

  // Categories for the filter buttons
  const categories = [
    { id: "all", label: "All Vehicles" },
    { id: "luxury", label: "Luxury" },
    { id: "suv", label: "SUVs" },
    { id: "sports", label: "Sports" },
    { id: "economy", label: "Economy" },
  ];

  // Initial load of cars from API
  useEffect(() => {
    async function loadCars() {
      setLoading(true);
      try {
        const [featuredRes, allRes] = await Promise.all([
          fetch("/api/vehicles?type=featured"),
          fetch("/api/vehicles"),
        ]);

        const [featured, all] = await Promise.all([
          featuredRes.json(),
          allRes.json(),
        ]);

        // Use featured cars if available, otherwise use top-rated cars from all
        setAllCars(all);
        if (featured.length > 0) {
          setPopularCars(featured.slice(0, 8));
        } else {
          // Fallback to highest rated cars
          setPopularCars(
            all.sort((a: Car, b: Car) => b.rating - a.rating).slice(0, 8)
          );
        }
      } catch (error) {
        console.error("Error loading cars:", error);
        setPopularCars([]);
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, []);

  // Effect to filter cars based on selected category
  useEffect(() => {
    if (allCars.length === 0) return;

    let filtered = allCars;

    // If category prop is provided, use it; otherwise use activeCategory
    const filterCategory = category || activeCategory;

    if (filterCategory !== "all") {
      filtered = allCars.filter((car) => car.category === filterCategory);
    }

    // Sort by rating and limit to 8 cars
    setPopularCars(filtered.sort((a, b) => b.rating - a.rating).slice(0, 8));
    setCurrentPage(0); // Reset to first page when category changes
  }, [activeCategory, allCars, category]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const currentCars = popularCars.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Only render if category is luxury or family
  if (category && category !== "luxury" && category !== "family") {
    return null;
  }

  // Category-specific content
  const categoryContent = {
    luxury: {
      subtitle: "Luxury Collection",
      title: "Premium Luxury Vehicles",
      description:
        "Indulge in the finest luxury vehicles with unparalleled comfort, advanced technology, and exquisite craftsmanship",
    },
    family: {
      subtitle: "Family Vehicles",
      title: "Perfect for Family Adventures",
      description:
        "Spacious, safe, and reliable vehicles designed to make every family journey comfortable and memorable",
    },
    default: {
      subtitle: "Featured Vehicles",
      title: "Our Premium Fleet Selection",
      description:
        "Experience the epitome of luxury and performance with our carefully curated vehicle collection",
    },
  };

  const content =
    category && categoryContent[category]
      ? categoryContent[category]
      : categoryContent.default;

  // Button text and href based on category
  const getButtonContent = () => {
    if (category === "luxury") {
      return {
        text: "Explore Luxury Cars",
        href: "/vehicles?category=luxury",
      };
    }
    if (category === "family") {
      return {
        text: "Explore Family Cars",
        href: "/vehicles?category=family",
      };
    }
    return {
      text: "Explore Complete Fleet",
      href: "/vehicles",
    };
  };

  const buttonContent = getButtonContent();

  return (
    <section className="section bg-white dark:bg-base-950">
      <div className="container-default">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp">
          <div className="section-header-left">
            <div className="subtitle mb-4">{content.subtitle}</div>
            <h2 className="title-section mb-4">{content.title}</h2>
            <p className="text-body max-w-2xl">{content.description}</p>
          </div>
        </ScrollReveal>

        {/* Category Filters - Only show if no category prop is provided */}
        {!category && (
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as CategoryType)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-primary-50 dark:bg-primary-900/30 border-2 border-base-700 text-primary-700 dark:text-primary-300 shadow-sm"
                      : "bg-base-50 dark:bg-base-800 border-2 border-transparent hover:border-base-300 dark:hover:border-base-600 text-body"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Car Cards Grid with Pagination */}
        <div className="relative mb-16">
          {/* Left Pagination Button */}
          <button
            onClick={handlePrevPage}
            disabled={totalPages <= 1}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-600 shadow-xl border-2 border-primary-600 dark:border-primary-600 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110 hover:bg-primary-700 dark:hover:bg-primary-700 transition-all duration-200 text-white"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Car Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-surface p-4 rounded-3xl">
                  <div className="skeleton h-48 rounded-lg mb-4"></div>
                  <div className="skeleton h-4 rounded mb-2"></div>
                  <div className="skeleton h-4 rounded w-3/4"></div>
                </div>
              ))
            ) : currentCars.length > 0 ? (
              currentCars.map((car) => <CarCard key={car.id} car={car} />)
            ) : (
              <div className="col-span-full text-center text-body py-12">
                No vehicles found for this category.
              </div>
            )}
          </div>

          {/* Right Pagination Button */}
          <button
            onClick={handleNextPage}
            disabled={totalPages <= 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-600 shadow-xl border-2 border-primary-600 dark:border-primary-600 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110 hover:bg-primary-700 dark:hover:bg-primary-700 transition-all duration-200 text-white"
            aria-label="Next page"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>

        {/* Controls and CTA */}
        <div className="flex justify-center items-center">
          {/* View all button */}
          <div>
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight />}
              iconPosition="right"
              asLink
              href={buttonContent.href}
            >
              {buttonContent.text}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

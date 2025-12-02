// app/(public)/vehicles/_components/FilterModal.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/Slider";
import {
  ChevronDown,
  ChevronUp,
  X,
  SlidersHorizontal,
  FilterX,
  Check,
} from "lucide-react";
import Button from "@/components/ui/Button";

// Categories and brands will be fetched from Contentful

const passengerOptions = [
  { value: "2", label: "2 Passengers" },
  { value: "4", label: "4 Passengers" },
  { value: "5", label: "5 Passengers" },
  { value: "6", label: "6+ Passengers" },
];

// Default bounds (will be overridden by CMS data)
const DEFAULT_BOUNDS = {
  minPrice: 0,
  maxPrice: 10000,
  minYear: 2020,
  maxYear: new Date().getFullYear() + 1,
};

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FilterSection = ({
  title,
  isOpen,
  onToggle,
  children,
}: FilterSectionProps) => (
  <div className="border-b border-base-200 dark:border-base-700 py-4">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left font-semibold text-base-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
    >
      {title}
      {isOpen ? (
        <ChevronUp className="h-5 w-5 text-muted" />
      ) : (
        <ChevronDown className="h-5 w-5 text-muted" />
      )}
    </button>
    {isOpen && <div className="mt-4">{children}</div>}
  </div>
);

export default function FilterModal() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for modal visibility
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Dynamic filter bounds from CMS
  const [filterBounds, setFilterBounds] = useState(DEFAULT_BOUNDS);

  // Track which filter sections are open
  const [openSections, setOpenSections] = useState({
    category: true,
    brand: true,
    price: true,
    year: true,
    passengers: true,
  });

  // Get current filter values from URL (using dynamic bounds as defaults)
  const currentCategory = searchParams.get("category") || "all";
  const currentBrand = searchParams.get("brand") || "all";
  const currentMinPrice = Number(searchParams.get("minPrice") || filterBounds.minPrice.toString());
  const currentMaxPrice = Number(searchParams.get("maxPrice") || filterBounds.maxPrice.toString());
  const currentMinYear = Number(searchParams.get("minYear") || filterBounds.minYear.toString());
  const currentMaxYear = Number(searchParams.get("maxYear") || filterBounds.maxYear.toString());
  const currentPassengers = searchParams.get("passengers") || "";

  // State for price range slider
  const [priceRange, setPriceRange] = useState([
    currentMinPrice,
    currentMaxPrice,
  ]);
  // State for year range slider
  const [yearRange, setYearRange] = useState([currentMinYear, currentMaxYear]);

  // Brands state
  const [brands, setBrands] = useState([{ id: "all", label: "All Brands" }]);

  // Categories state
  const [categories, setCategories] = useState([
    { id: "all", label: "All Vehicles" },
  ]);

  // State for temporary filter values (before applying)
  const [tempFilters, setTempFilters] = useState({
    category: currentCategory,
    brand: currentBrand,
    priceRange: [currentMinPrice, currentMaxPrice],
    yearRange: [currentMinYear, currentMaxYear],
    passengers: currentPassengers,
  });

  // Fetch filter bounds from CMS
  useEffect(() => {
    const fetchBounds = async () => {
      try {
        const response = await fetch("/api/filter-bounds");
        const bounds = await response.json();
        setFilterBounds(bounds);
        // Update price and year ranges to use actual bounds if no URL params
        if (!searchParams.get("minPrice") && !searchParams.get("maxPrice")) {
          setPriceRange([bounds.minPrice, bounds.maxPrice]);
          setTempFilters(prev => ({
            ...prev,
            priceRange: [bounds.minPrice, bounds.maxPrice],
          }));
        }
        if (!searchParams.get("minYear") && !searchParams.get("maxYear")) {
          setYearRange([bounds.minYear, bounds.maxYear]);
          setTempFilters(prev => ({
            ...prev,
            yearRange: [bounds.minYear, bounds.maxYear],
          }));
        }
      } catch (error) {
        console.error("Error fetching filter bounds:", error);
      }
    };

    fetchBounds();
  }, [searchParams]);

  // Reset temp filters whenever the modal opens
  useEffect(() => {
    if (isFilterModalOpen) {
      const minPrice = searchParams.get("minPrice") ? currentMinPrice : filterBounds.minPrice;
      const maxPrice = searchParams.get("maxPrice") ? currentMaxPrice : filterBounds.maxPrice;
      const minYear = searchParams.get("minYear") ? currentMinYear : filterBounds.minYear;
      const maxYear = searchParams.get("maxYear") ? currentMaxYear : filterBounds.maxYear;
      
      setTempFilters({
        category: currentCategory,
        brand: currentBrand,
        priceRange: [minPrice, maxPrice],
        yearRange: [minYear, maxYear],
        passengers: currentPassengers,
      });

      setPriceRange([minPrice, maxPrice]);
      setYearRange([minYear, maxYear]);
    }
  }, [
    isFilterModalOpen,
    currentCategory,
    currentBrand,
    currentMinPrice,
    currentMaxPrice,
    currentMinYear,
    currentMaxYear,
    currentPassengers,
    filterBounds,
    searchParams,
  ]);

  // Fetch brands via API route
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands");
        const fetchedBrands = await response.json();
        setBrands(fetchedBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  // Fetch categories via API route
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const fetchedCategories = await response.json();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle outside clicks to close modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isFilterModalOpen &&
        !target.closest(".filter-modal-content") &&
        !target.closest(".filter-toggle-btn")
      ) {
        setIsFilterModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Prevent scrolling when modal is open
    if (isFilterModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isFilterModalOpen]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  // Update URL with new filter params
  const applyFilters = () => {
    // Create new URLSearchParams object from current params
    const params = new URLSearchParams(searchParams.toString());

    // Category
    if (tempFilters.category === "all") {
      params.delete("category");
    } else {
      params.set("category", tempFilters.category);
    }

    // Brand
    if (tempFilters.brand === "all") {
      params.delete("brand");
    } else {
      params.set("brand", tempFilters.brand);
    }

    // Price Range - use dynamic bounds
    if (tempFilters.priceRange[0] === filterBounds.minPrice) {
      params.delete("minPrice");
    } else {
      params.set("minPrice", tempFilters.priceRange[0].toString());
    }

    if (tempFilters.priceRange[1] === filterBounds.maxPrice) {
      params.delete("maxPrice");
    } else {
      params.set("maxPrice", tempFilters.priceRange[1].toString());
    }

    // Year Range - use dynamic bounds
    if (tempFilters.yearRange[0] === filterBounds.minYear) {
      params.delete("minYear");
    } else {
      params.set("minYear", tempFilters.yearRange[0].toString());
    }

    if (tempFilters.yearRange[1] === filterBounds.maxYear) {
      params.delete("maxYear");
    } else {
      params.set("maxYear", tempFilters.yearRange[1].toString());
    }

    // Passengers
    if (!tempFilters.passengers) {
      params.delete("passengers");
    } else {
      params.set("passengers", tempFilters.passengers);
    }

    // Reset to page 1 when filtering
    params.delete("page");

    // Navigate to new URL
    router.push(`/vehicles?${params.toString()}`);

    // Close modal after applying filters
    setIsFilterModalOpen(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setTempFilters({
      category: "all",
      brand: "all",
      priceRange: [filterBounds.minPrice, filterBounds.maxPrice],
      yearRange: [filterBounds.minYear, filterBounds.maxYear],
      passengers: "",
    });

    setPriceRange([filterBounds.minPrice, filterBounds.maxPrice]);
    setYearRange([filterBounds.minYear, filterBounds.maxYear]);
  };

  // Apply clear filters on button click and close modal
  const applyClearFilters = () => {
    router.push("/vehicles");
    setIsFilterModalOpen(false);
  };

  // Handler for category selection
  const handleCategoryChange = (category: string) => {
    setTempFilters((prev) => ({
      ...prev,
      category,
    }));
  };

  // Handler for brand selection
  const handleBrandChange = (brand: string) => {
    setTempFilters((prev) => ({
      ...prev,
      brand,
    }));
  };

  // Handler for price range change
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    setTempFilters((prev) => ({
      ...prev,
      priceRange: values,
    }));
  };

  // Handler for year range change
  const handleYearChange = (values: number[]) => {
    console.log("Year range changed to:", values);
    setYearRange(values);
    setTempFilters((prev) => ({
      ...prev,
      yearRange: values,
    }));
  };

  // Handler for passenger selection
  const handlePassengerChange = (passengers: string) => {
    setTempFilters((prev) => ({
      ...prev,
      passengers,
    }));
  };

  // Helper function to format price with AED
  const formatPrice = (price: number): string => {
    return `AED ${price}`;
  };

  // Count active filters
  const countActiveFilters = (): number => {
    let count = 0;

    if (currentCategory !== "all") count++;
    if (currentBrand !== "all") count++;
    // Use dynamic bounds for price check
    if (searchParams.get("minPrice") || searchParams.get("maxPrice")) count++;
    // Use dynamic bounds for year check
    if (searchParams.get("minYear") || searchParams.get("maxYear")) count++;
    if (currentPassengers) count++;

    return count;
  };

  const activeFilterCount = countActiveFilters();

  return (
    <>
      {/* Filter Toggle Button */}
      <Button
        variant="ghost-accent"
        size="sm"
        leftIcon={<SlidersHorizontal className="h-4 w-4" />}
        onClick={toggleFilterModal}
        className="filter-toggle-btn"
      >
        Filters
        {activeFilterCount > 0 && (
          <span className="ml-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </Button>

      {/* Show "Clear Filters" button if any filters are applied */}
      {activeFilterCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<FilterX className="h-4 w-4" />}
          onClick={applyClearFilters}
          className="ml-2"
        >
          Clear Filters
        </Button>
      )}

      {/* Filter Modal Overlay */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-base-900/60 z-50 backdrop-blur-sm flex items-center justify-center p-4">
          {/* Modal Content */}
          <div className="bg-surface filter-modal-content w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto rounded-3xl">
            <div className="sticky top-0 z-10 bg-white dark:bg-base-900 p-4 border-b border-base-200 dark:border-base-700 flex justify-between items-center">
              <h2 className="font-bold text-xl text-base-900 dark:text-white">
                Filters
              </h2>
              <button
                onClick={toggleFilterModal}
                className="p-2 rounded-md hover:bg-base-100 dark:hover:bg-base-800"
                aria-label="Close filters"
              >
                <X className="h-5 w-5 text-base-500" />
              </button>
            </div>

            <div className="p-4">
              <FilterSection
                title="Vehicle Type"
                isOpen={openSections.category}
                onToggle={() => toggleSection("category")}
              >
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`cursor-pointer border rounded-lg p-3 transition-colors ${
                        tempFilters.category === category.id
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                          : "border-base-200 dark:border-base-700 hover:bg-base-50 dark:hover:bg-base-800"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base-900 dark:text-white">
                          {category.label}
                        </span>
                        {tempFilters.category === category.id && (
                          <Check className="h-4 w-4 text-primary-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </FilterSection>

              <FilterSection
                title="Brand"
                isOpen={openSections.brand}
                onToggle={() => toggleSection("brand")}
              >
                <div className="relative pt-1">
                  {/* Top fade effect to indicate scrollable content */}
                  <div className="absolute top-0 left-0 right-2 h-8 bg-gradient-to-b from-white dark:from-base-900 to-transparent z-10 pointer-events-none"></div>

                  {/* Bottom fade effect to indicate scrollable content */}
                  <div className="absolute bottom-0 left-0 right-2 h-8 bg-gradient-to-t from-white dark:from-base-900 to-transparent z-10 pointer-events-none"></div>

                  <div className="max-h-48 overflow-y-auto pr-2 pt-2 pb-2 scrollbar-thin scrollbar-thumb-base-300 dark:scrollbar-thumb-base-700 scrollbar-track-transparent scrollbar-thumb-rounded-full">
                    {brands.map((brand) => (
                      <div
                        key={brand.id}
                        onClick={() => handleBrandChange(brand.id)}
                        className={`cursor-pointer border rounded-lg p-3 mb-2 transition-colors ${
                          tempFilters.brand === brand.id
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                            : "border-base-200 dark:border-base-700 hover:bg-base-50 dark:hover:bg-base-800"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base-900 dark:text-white">
                            {brand.label}
                          </span>
                          {tempFilters.brand === brand.id && (
                            <Check className="h-4 w-4 text-primary-500" />
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Bottom space to ensure last items can be scrolled fully into view */}
                    <div className="h-2"></div>
                  </div>
                </div>
              </FilterSection>

              <FilterSection
                title="Price Range (per day)"
                isOpen={openSections.price}
                onToggle={() => toggleSection("price")}
              >
                <div className="px-2 pt-6 pb-2 relative z-10">
                  <Slider
                    min={filterBounds.minPrice}
                    max={filterBounds.maxPrice}
                    step={100}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-base-600 dark:text-base-400">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </FilterSection>

              <FilterSection
                title="Year Range"
                isOpen={openSections.year}
                onToggle={() => toggleSection("year")}
              >
                <div className="px-2 pt-6 pb-2 relative z-10">
                  <Slider
                    min={filterBounds.minYear}
                    max={filterBounds.maxYear}
                    step={1}
                    value={yearRange}
                    onValueChange={handleYearChange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-base-600 dark:text-base-400">
                    <span>{yearRange[0]}</span>
                    <span>{yearRange[1]}</span>
                  </div>
                </div>
              </FilterSection>

              <FilterSection
                title="Passengers"
                isOpen={openSections.passengers}
                onToggle={() => toggleSection("passengers")}
              >
                <div className="grid grid-cols-2 gap-2">
                  {passengerOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() =>
                        handlePassengerChange(
                          tempFilters.passengers === option.value
                            ? ""
                            : option.value
                        )
                      }
                      className={`cursor-pointer border-2 rounded-lg p-3 transition-all ${
                        tempFilters.passengers === option.value
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium"
                          : "border-base-200 dark:border-base-700 hover:bg-base-50 dark:hover:bg-base-800"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-base-900 dark:text-white">
                          {option.label}
                        </span>
                        {tempFilters.passengers === option.value && (
                          <Check className="h-4 w-4 text-primary-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </FilterSection>

              <div className="mt-6 flex space-x-3 pt-4 border-t border-base-200 dark:border-base-700">
                <Button
                  variant="ghost-accent"
                  size="lg"
                  fullWidth
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
                <Button
                  variant="accent"
                  size="lg"
                  fullWidth
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

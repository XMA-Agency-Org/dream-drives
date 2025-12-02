// app/(public)/vehicles/_components/FilterSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/Slider";
import { 
  ChevronDown, 
  ChevronUp, 
  X,
  SlidersHorizontal,
  FilterX
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

const FilterSection = ({ title, isOpen, onToggle, children }: FilterSectionProps) => (
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
    {isOpen && <div className="mt-4 space-y-2">{children}</div>}
  </div>
);

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Dynamic filter bounds from CMS
  const [filterBounds, setFilterBounds] = useState(DEFAULT_BOUNDS);
  
  // Track which filter sections are open
  const [openSections, setOpenSections] = useState({
    category: false,
    brand: false,
    price: false,
    year: false,
    passengers: false,
  });
  
  // For mobile filter visibility
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  
  // Brands state
  const [brands, setBrands] = useState([{ id: "all", label: "All Brands" }]);
  
  // Categories state
  const [categories, setCategories] = useState([{ id: "all", label: "All Vehicles" }]);
  
  // Get current filter values from URL (using dynamic bounds as defaults)
  const currentCategory = searchParams.get("category") || "all";
  const currentBrand = searchParams.get("brand") || "all";
  const currentMinPrice = Number(searchParams.get("minPrice") || filterBounds.minPrice.toString());
  const currentMaxPrice = Number(searchParams.get("maxPrice") || filterBounds.maxPrice.toString());
  const currentMinYear = Number(searchParams.get("minYear") || filterBounds.minYear.toString());
  const currentMaxYear = Number(searchParams.get("maxYear") || filterBounds.maxYear.toString());
  const currentPassengers = searchParams.get("passengers") || "";
  
  // State for price range slider
  const [priceRange, setPriceRange] = useState([currentMinPrice, currentMaxPrice]);
  // State for year range slider
  const [yearRange, setYearRange] = useState([currentMinYear, currentMaxYear]);

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
        }
        if (!searchParams.get("minYear") && !searchParams.get("maxYear")) {
          setYearRange([bounds.minYear, bounds.maxYear]);
        }
      } catch (error) {
        console.error("Error fetching filter bounds:", error);
      }
    };

    fetchBounds();
  }, [searchParams]);

  // Fetch brands via API route
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/brands');
        const fetchedBrands = await response.json();
        setBrands(fetchedBrands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    
    fetchBrands();
  }, []);

  // Fetch categories via API route
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const fetchedCategories = await response.json();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterVisible(!isMobileFilterVisible);
  };

  // Update URL with new filter params
  const applyFilters = (newParams: Record<string, string | null>) => {
    // Create new URLSearchParams object from current params
    const params = new URLSearchParams(searchParams.toString());
    
    // Update or delete params based on new values
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === 'all') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    
    // Reset to page 1 when filtering
    params.delete('page');
    
    // Navigate to new URL
    router.push(`/vehicles?${params.toString()}`);
  };

  // Clear all filters
  const clearFilters = () => {
    router.push('/vehicles');
    setPriceRange([filterBounds.minPrice, filterBounds.maxPrice]);
    setYearRange([filterBounds.minYear, filterBounds.maxYear]);
  };

  // Handler for category selection
  const handleCategoryChange = (category: string) => {
    applyFilters({ category: category === "all" ? null : category });
  };

  // Handler for brand selection
  const handleBrandChange = (brand: string) => {
    applyFilters({ brand: brand === "all" ? null : brand });
  };

  // Handler for price range change
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  // Apply price filter on slider change end
  const handlePriceChangeEnd = (values: number[]) => {
    applyFilters({
      minPrice: values[0] === filterBounds.minPrice ? null : values[0].toString(),
      maxPrice: values[1] === filterBounds.maxPrice ? null : values[1].toString(),
    });
  };

  // Handler for year range change
  const handleYearChange = (values: number[]) => {
    setYearRange(values);
  };

  // Apply year filter on slider change end
  const handleYearChangeEnd = (values: number[]) => {
    applyFilters({
      minYear: values[0] === filterBounds.minYear ? null : values[0].toString(),
      maxYear: values[1] === filterBounds.maxYear ? null : values[1].toString(),
    });
  };

  // Handler for passenger selection
  const handlePassengerChange = (passengers: string) => {
    applyFilters({ passengers: passengers || null });
  };

  // Helper function to format price with AED
  const formatPrice = (price: number): string => {
    return `AED ${price}`;
  };

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-6 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<SlidersHorizontal className="h-4 w-4" />}
          onClick={toggleMobileFilter}
        >
          Filters
        </Button>
        
        {/* Show "Clear Filters" button on mobile if any filters are applied */}
        {(currentCategory !== "all" || 
          currentBrand !== "all" || 
          searchParams.get("minPrice") || 
          searchParams.get("maxPrice") || 
          searchParams.get("minYear") || 
          searchParams.get("maxYear") || 
          currentPassengers) && (
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<FilterX className="h-4 w-4" />}
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Mobile Filter Sidebar (Overlay) */}
      <div
        className={`lg:hidden fixed inset-0 bg-base-900/80 z-50 transition-opacity duration-300 ${
          isMobileFilterVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileFilter}
      />

      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white dark:bg-base-900 shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileFilterVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="sticky top-0 z-10 bg-white dark:bg-base-900 p-4 border-b border-base-200 dark:border-base-700 flex justify-between items-center">
          <h2 className="font-bold text-lg text-base-900 dark:text-white">Filters</h2>
          <button
            onClick={toggleMobileFilter}
            className="p-2 rounded-md hover:bg-base-100 dark:hover:bg-base-800"
          >
            <X className="h-5 w-5 text-base-500" />
          </button>
        </div>

        <div className="p-4">
          {/* Mobile Filter Content - Same as desktop but with mobile-specific UI */}
          <FilterSection
            title="Vehicle Type"
            isOpen={openSections.category}
            onToggle={() => toggleSection("category")}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                  currentCategory === category.id
                    ? "bg-primary-50 dark:bg-primary-900/30 border-2 border-primary-500 text-primary-700 dark:text-primary-300 font-medium"
                    : "bg-base-50 dark:bg-base-800 border-2 border-transparent hover:border-base-300 dark:hover:border-base-600 text-body"
                }`}
              >
                {category.label}
              </button>
            ))}
          </FilterSection>

          <FilterSection
            title="Brand"
            isOpen={openSections.brand}
            onToggle={() => toggleSection("brand")}
          >
            <div className="max-h-60 overflow-y-auto pr-1 space-y-2">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => handleBrandChange(brand.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                    currentBrand === brand.id
                      ? "bg-primary-50 dark:bg-primary-900/30 border-2 border-primary-500 text-primary-700 dark:text-primary-300 font-medium"
                      : "bg-base-50 dark:bg-base-800 border-2 border-transparent hover:border-base-300 dark:hover:border-base-600 text-body"
                  }`}
                >
                  {brand.label}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            title="Price Range (per day)"
            isOpen={openSections.price}
            onToggle={() => toggleSection("price")}
          >
            <div className="px-2 pt-6 pb-2">
              <Slider
                min={filterBounds.minPrice}
                max={filterBounds.maxPrice}
                step={100}
                value={priceRange}
                onValueChange={handlePriceChange}
                onValueCommit={handlePriceChangeEnd}
              />
              <div className="flex justify-between mt-2 text-sm text-base-600 dark:text-base-400">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}+</span>
              </div>
            </div>
          </FilterSection>

          <FilterSection
            title="Year Range"
            isOpen={openSections.year}
            onToggle={() => toggleSection("year")}
          >
            <div className="px-2 pt-6 pb-2">
              <Slider
                min={filterBounds.minYear}
                max={filterBounds.maxYear}
                step={1}
                value={yearRange}
                onValueChange={handleYearChange}
                onValueCommit={handleYearChangeEnd}
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
            {passengerOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handlePassengerChange(option.value)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                  currentPassengers === option.value
                    ? "bg-primary-50 dark:bg-primary-900/30 border-2 border-primary-500 text-primary-700 dark:text-primary-300 font-medium"
                    : "bg-base-50 dark:bg-base-800 border-2 border-transparent hover:border-base-300 dark:hover:border-base-600 text-body"
                }`}
              >
                {option.label}
              </button>
            ))}
          </FilterSection>

          <div className="mt-6 flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={clearFilters}
            >
              Clear All
            </Button>
            <Button
              variant="accent"
              size="sm"
              fullWidth
              onClick={toggleMobileFilter}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block sticky top-24 bg-surface rounded-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg text-base-900 dark:text-white">Filters</h2>
          {/* Show clear button if any filters are applied */}
          {(currentCategory !== "all" || 
            currentBrand !== "all" || 
            searchParams.get("minPrice") || 
            searchParams.get("maxPrice") || 
            searchParams.get("minYear") || 
            searchParams.get("maxYear") || 
            currentPassengers) && (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<FilterX className="h-4 w-4" />}
              onClick={clearFilters}
            >
              Clear All
            </Button>
          )}
        </div>

        <FilterSection
          title="Vehicle Type"
          isOpen={openSections.category}
          onToggle={() => toggleSection("category")}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                currentCategory === category.id
                  ? "bg-primary-50 dark:bg-primary-900/30 border-2 border-primary-500 text-primary-700 dark:text-primary-300 font-medium"
                  : "bg-base-50 dark:bg-base-800 border-2 border-transparent hover:border-base-300 dark:hover:border-base-600 text-body"
              }`}
            >
              {category.label}
            </button>
          ))}
        </FilterSection>

        <FilterSection
          title="Brand"
          isOpen={openSections.brand}
          onToggle={() => toggleSection("brand")}
        >
          <div className="max-h-60 overflow-y-auto pr-1 space-y-2">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleBrandChange(brand.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                  currentBrand === brand.id
                    ? "bg-primary-50 dark:bg-primary-900/30 border-2 border-primary-500 text-primary-700 dark:text-primary-300 font-medium"
                    : "bg-base-50 dark:bg-base-800 border-2 border-transparent hover:border-base-300 dark:hover:border-base-600 text-body"
                }`}
              >
                {brand.label}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Price Range (per day)"
          isOpen={openSections.price}
          onToggle={() => toggleSection("price")}
        >
          <div className="px-2 pt-6 pb-2">
            <Slider
              min={filterBounds.minPrice}
              max={filterBounds.maxPrice}
              step={100}
              value={priceRange}
              onValueChange={handlePriceChange}
              onValueCommit={handlePriceChangeEnd}
            />
            <div className="flex justify-between mt-2 text-sm text-base-600 dark:text-base-400">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}+</span>
            </div>
          </div>
        </FilterSection>

        <FilterSection
          title="Year Range"
          isOpen={openSections.year}
          onToggle={() => toggleSection("year")}
        >
          <div className="px-2 pt-6 pb-2">
            <Slider
              min={filterBounds.minYear}
              max={filterBounds.maxYear}
              step={1}
              value={yearRange}
              onValueChange={handleYearChange}
              onValueCommit={handleYearChangeEnd}
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
          {passengerOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handlePassengerChange(option.value)}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                currentPassengers === option.value
                  ? "bg-primary-50 dark:bg-primary-900/30 border-2 border-primary-500 text-primary-700 dark:text-primary-300 font-medium"
                  : "bg-base-50 dark:bg-base-800 border-2 border-transparent hover:border-base-300 dark:hover:border-base-600 text-body"
              }`}
            >
              {option.label}
            </button>
          ))}
        </FilterSection>
      </div>
    </>
  );
}

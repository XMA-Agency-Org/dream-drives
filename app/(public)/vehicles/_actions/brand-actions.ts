import { contentfulClient } from "@/lib/contentful";
import { carsDatabase } from "./car-database";
import { DATA_SOURCE } from "@/lib/data-source-config";

// Mock function to get brands from local car database
function getMockBrands() {
  // Extract unique brands from carsDatabase
  const uniqueBrands = Array.from(
    new Set(carsDatabase.map((car) => car.brand))
  ).filter(Boolean);

  // Create brand objects with proper formatting
  const brandObjects = uniqueBrands.map((brandSlug) => {
    // Convert slug to proper label (e.g., "mercedes" -> "Mercedes-Benz")
    const brandLabels: Record<string, string> = {
      mercedes: "Mercedes-Benz",
      bmw: "BMW",
      audi: "Audi",
      porsche: "Porsche",
      lamborghini: "Lamborghini",
      "rolls-royce": "Rolls-Royce",
      "range-rover": "Range Rover",
      chevrolet: "Chevrolet",
      gmc: "GMC",
      cadillac: "Cadillac",
      nissan: "Nissan",
      toyota: "Toyota",
      kia: "Kia",
      mitsubishi: "Mitsubishi",
      fiat: "Fiat",
      mini: "Mini",
    };

    return {
      id: brandSlug,
      label:
        brandLabels[brandSlug] ||
        brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1),
    };
  });

  // Sort brands alphabetically by label
  brandObjects.sort((a, b) => a.label.localeCompare(b.label));

  return [{ id: "all", label: "All Brands" }, ...brandObjects];
}

export async function getBrands() {
  // Use mock data or Contentful based on DATA_SOURCE
  if (DATA_SOURCE === "mock") {
    return getMockBrands();
  }

  // Use Contentful CMS data
  try {
    const response = await contentfulClient.getEntries({
      content_type: "carRentalBrand",
    });

    const brands = response.items.map((item: any) => ({
      id: item.fields.urlSlug,
      label: item.fields.brandName,
    }));

    // Sort brands alphabetically by label
    brands.sort((a, b) => a.label.localeCompare(b.label));

    return [{ id: "all", label: "All Brands" }, ...brands];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [{ id: "all", label: "All Brands" }];
  }
}

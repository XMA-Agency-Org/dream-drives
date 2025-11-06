import { contentfulClient } from "@/lib/contentful";
import { carsDatabase } from "./car-database";
import { DATA_SOURCE } from "@/lib/data-source-config";

// Mock function to get categories from local car database
function getMockCategories() {
  // Extract unique categories from carsDatabase
  const uniqueCategories = Array.from(
    new Set(carsDatabase.map((car) => car.category))
  ).filter(Boolean);

  // Create category objects with proper formatting
  const categoryObjects = uniqueCategories.map((categorySlug) => {
    // Convert slug to proper label
    const categoryLabels: Record<string, string> = {
      luxury: "Luxury",
      suv: "SUVs",
      sports: "Sports",
      economy: "Economy",
      minivan: "Minivans",
    };

    return {
      id: categorySlug,
      label:
        categoryLabels[categorySlug] ||
        categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
    };
  });

  // Sort categories in a specific order
  const order = ["luxury", "suv", "sports", "economy", "minivan"];
  categoryObjects.sort((a, b) => {
    const indexA = order.indexOf(a.id);
    const indexB = order.indexOf(b.id);
    if (indexA === -1 && indexB === -1) return a.label.localeCompare(b.label);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return [{ id: "all", label: "All Vehicles" }, ...categoryObjects];
}

export async function getCategories() {
  // Use mock data or Contentful based on DATA_SOURCE
  if (DATA_SOURCE === "mock") {
    return getMockCategories();
  }

  // Use Contentful CMS data
  try {
    const response = await contentfulClient.getEntries({
      content_type: "vehicleCategory",
    });

    const categories = response.items.map((item: any) => ({
      id: item.fields.urlSlug,
      label: item.fields.categoryName,
    }));

    // Sort categories in a specific order
    const order = ["luxury", "suv", "sports", "economy", "minivan"];
    categories.sort((a, b) => {
      const indexA = order.indexOf(a.id);
      const indexB = order.indexOf(b.id);
      if (indexA === -1 && indexB === -1) return a.label.localeCompare(b.label);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    return [{ id: "all", label: "All Vehicles" }, ...categories];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [{ id: "all", label: "All Vehicles" }];
  }
}

// app/(public)/vehicles/_actions/car-actions.ts
"use server";

import { getFilteredVehicles, getVehicleBySlug, getAllVehicles } from "@/lib/contentful-api";
import { MAX_PRICE } from "./car-config";
import { DATA_SOURCE } from "@/lib/data-source-config";
import { carsDatabase } from "./car-database";
import { Car } from "@/types/car";

interface GetCarsParams {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  passengers?: number;
  minYear?: number;
  maxYear?: number;
  sort?: string;
  page?: number;
  pageSize?: number;
  search?: string;
}

// Mock function to get filtered cars from local database
function getMockFilteredCars(params: GetCarsParams) {
  const {
    category,
    brand,
    minPrice = 0,
    maxPrice = MAX_PRICE,
    passengers,
    minYear,
    maxYear,
    sort = "recommended",
    page = 1,
    pageSize = 9,
    search,
  } = params;

  let filtered = [...carsDatabase];

  // Apply text search filter (search in name, brand, and category)
  if (search && search.trim()) {
    const searchLower = search.toLowerCase().trim();
    filtered = filtered.filter((car) => {
      const nameMatch = car.name.toLowerCase().includes(searchLower);
      const brandMatch = car.brand.toLowerCase().includes(searchLower);
      const categoryMatch = car.category.toLowerCase().includes(searchLower);
      return nameMatch || brandMatch || categoryMatch;
    });
  }

  // Apply filters
  if (category && category !== "all") {
    filtered = filtered.filter((car) => car.category === category);
  }
  if (brand && brand !== "all") {
    filtered = filtered.filter((car) => car.brand === brand);
  }
  if (minPrice !== undefined) {
    filtered = filtered.filter((car) => car.price >= minPrice);
  }
  if (maxPrice !== undefined) {
    filtered = filtered.filter((car) => car.price <= maxPrice);
  }
  if (passengers !== undefined) {
    if (passengers === 6) {
      filtered = filtered.filter((car) => car.passengers >= 6);
    } else {
      filtered = filtered.filter((car) => car.passengers === passengers);
    }
  }
  if (minYear !== undefined) {
    filtered = filtered.filter((car) => car.year && car.year >= minYear);
  }
  if (maxYear !== undefined) {
    filtered = filtered.filter((car) => car.year && car.year <= maxYear);
  }

  // Apply sorting
  filtered.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating-desc":
        return b.rating - a.rating;
      default:
        // Recommended sort
        return (
          b.rating * 0.7 +
          (1 - b.price / maxPrice) * 0.3 -
          (a.rating * 0.7 + (1 - a.price / maxPrice) * 0.3)
        );
    }
  });

  const totalCars = filtered.length;

  // Apply pagination
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedCars = filtered.slice(start, end);

  return {
    cars: paginatedCars,
    totalCars,
  };
}

export async function getCars(params: GetCarsParams) {
  const {
    category,
    brand,
    minPrice = 0,
    maxPrice = MAX_PRICE,
    passengers,
    minYear,
    maxYear,
    sort = "recommended",
    page = 1,
    pageSize = 9,
    search,
  } = params;

  // Use mock data or Contentful based on DATA_SOURCE
  if (DATA_SOURCE === "mock") {
    return getMockFilteredCars(params);
  }

  // Use Contentful API with filtering
  return await getFilteredVehicles({
    category,
    brand,
    minPrice,
    maxPrice: maxPrice,
    passengers,
    minYear,
    maxYear,
    sort,
    page,
    pageSize,
    search,
  });
}

// Get a specific car by ID (slug)
export async function getCar(id: string) {
  // Use mock data or Contentful based on DATA_SOURCE
  if (DATA_SOURCE === "mock") {
    return carsDatabase.find((car) => car.id === id) || null;
  }

  return await getVehicleBySlug(id);
}

// Get related cars based on category
export async function getRelatedCars(
  currentCarId: string,
  category: string,
  limit: number = 4
) {
  // Use mock data or Contentful based on DATA_SOURCE
  if (DATA_SOURCE === "mock") {
    // Find cars in the same category, excluding the current car
    const relatedCars = carsDatabase
      .filter((car) => car.category === category && car.id !== currentCarId)
      .sort(() => Math.random() - 0.5) // Simple random sorting
      .slice(0, limit);

    return relatedCars;
  }

  // Get all vehicles from Contentful and filter client-side for related cars
  const allVehicles = await getAllVehicles();

  // Find cars in the same category, excluding the current car
  const relatedCars = allVehicles
    .filter((car) => car.category === category && car.id !== currentCarId)
    .sort(() => Math.random() - 0.5) // Simple random sorting
    .slice(0, limit);

  return relatedCars;
}

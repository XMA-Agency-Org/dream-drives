import { NextRequest, NextResponse } from "next/server";
import {
  getAllVehicles,
  getFeaturedVehicles,
  getFilteredVehicles,
} from "@/lib/contentful-api";
import { carsDatabase } from "@/app/(public)/vehicles/_actions/car-database";
import { Car } from "@/types/car";
import { DATA_SOURCE } from "@/lib/data-source-config";

// Mock data functions that mirror Contentful API
function getMockFeaturedVehicles(): Car[] {
  return carsDatabase
    .filter((car) => car.rating >= 4.5) // Featured = high rated
    .slice(0, 8);
}

function getMockAllVehicles(): Car[] {
  return carsDatabase;
}

function getMockFilteredVehicles(params: {
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
}): Car[] {
  let filtered = [...carsDatabase];

  // Apply filters
  if (params.category) {
    filtered = filtered.filter((car) => car.category === params.category);
  }
  if (params.brand) {
    filtered = filtered.filter((car) => car.brand === params.brand);
  }
  if (params.minPrice !== undefined) {
    filtered = filtered.filter((car) => car.price >= params.minPrice!);
  }
  if (params.maxPrice !== undefined) {
    filtered = filtered.filter((car) => car.price <= params.maxPrice!);
  }
  if (params.passengers !== undefined) {
    filtered = filtered.filter((car) => car.passengers >= params.passengers!);
  }
  if (params.minYear !== undefined) {
    filtered = filtered.filter(
      (car) => car.year && car.year >= params.minYear!
    );
  }
  if (params.maxYear !== undefined) {
    filtered = filtered.filter(
      (car) => car.year && car.year <= params.maxYear!
    );
  }

  // Apply sorting
  if (params.sort) {
    switch (params.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  // Apply pagination
  if (params.page !== undefined && params.pageSize !== undefined) {
    const start = params.page * params.pageSize;
    filtered = filtered.slice(start, start + params.pageSize);
  }

  return filtered;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const passengers = searchParams.get("passengers");
    const minYear = searchParams.get("minYear");
    const maxYear = searchParams.get("maxYear");
    const sort = searchParams.get("sort");
    const page = searchParams.get("page");
    const pageSize = searchParams.get("pageSize");

    let result;

    // Use mock data or Contentful based on DATA_SOURCE toggle
    if (DATA_SOURCE === "mock") {
      // Use local mock data
      if (type === "featured") {
        result = getMockFeaturedVehicles();
      } else if (type === "filtered") {
        const params = {
          category: category || undefined,
          brand: brand || undefined,
          minPrice: minPrice ? parseInt(minPrice) : undefined,
          maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
          passengers: passengers ? parseInt(passengers) : undefined,
          minYear: minYear ? parseInt(minYear) : undefined,
          maxYear: maxYear ? parseInt(maxYear) : undefined,
          sort: sort || undefined,
          page: page ? parseInt(page) : undefined,
          pageSize: pageSize ? parseInt(pageSize) : undefined,
        };
        result = getMockFilteredVehicles(params);
      } else {
        result = getMockAllVehicles();
      }
    } else {
      // Use Contentful CMS data
      if (type === "featured") {
        result = await getFeaturedVehicles();
      } else if (type === "filtered") {
        const params = {
          category: category || undefined,
          brand: brand || undefined,
          minPrice: minPrice ? parseInt(minPrice) : undefined,
          maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
          passengers: passengers ? parseInt(passengers) : undefined,
          minYear: minYear ? parseInt(minYear) : undefined,
          maxYear: maxYear ? parseInt(maxYear) : undefined,
          sort: sort || undefined,
          page: page ? parseInt(page) : undefined,
          pageSize: pageSize ? parseInt(pageSize) : undefined,
        };
        result = await getFilteredVehicles(params);
      } else {
        result = await getAllVehicles();
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}

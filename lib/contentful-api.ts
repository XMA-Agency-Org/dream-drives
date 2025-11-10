import { contentfulClient } from './contentful'
import { Car, CarSpecs } from '@/types/car'
import { Entry } from 'contentful'

// Contentful field interfaces matching the actual content types
interface ContentfulRichText {
  content?: Array<{
    nodeType?: string;
    content?: Array<{
      value?: string;
    }>;
  }>;
}

interface ContentfulRentalVehicle {
  vehicleName: string;
  urlSlug: string;
  description?: ContentfulRichText;
  dailyPrice: number;
  brand?: {
    fields: {
      brandName: string;
      urlSlug: string;
    }
  };
  category?: {
    fields: {
      categoryName: string;
      urlSlug: string;
    }
  };
  accelerationTime?: string;
  fuelConsumption?: string;
  features?: string;
  passengerCount?: number;
  doorCount?: number;
  transmissionType?: string;
  airConditioning?: boolean;
  rating?: number;
  reviewCount?: number;
  mainImage?: {
    fields?: {
      file?: {
        url?: string;
      };
    };
  };
  imageGallery?: Array<{
    fields?: {
      file?: {
        url?: string;
      };
    };
  }>;
  featuredFlag?: boolean;
  availabilityStatus?: boolean;
}

// Extract year from vehicle name
function extractYearFromName(name: string): number | undefined {
  const yearMatch = name.match(/\b(19|20)\d{2}\b/)
  return yearMatch ? parseInt(yearMatch[0]) : undefined
}

// Transform Contentful vehicle data to legacy Car interface
function transformVehicleToLegacyCar(vehicle: Entry): Car {
  const fields = vehicle.fields as unknown as ContentfulRentalVehicle;
  
  // Get car data for fallback images
  const carData = getCarDataBySlug(fields.urlSlug)
  
  return {
    id: fields.urlSlug,
    name: fields.vehicleName,
    image: fields.mainImage?.fields?.file?.url ? `https:${fields.mainImage.fields.file.url}` : carData?.image || '',
    images: fields.imageGallery?.map(img => img?.fields?.file?.url ? `https:${img.fields.file.url}` : '').filter(Boolean) || carData?.images || [],
    rating: fields.rating || 0,
    reviews: fields.reviewCount || 0,
    passengers: fields.passengerCount || 0,
    airConditioning: fields.airConditioning || false,
    doors: fields.doorCount || 0,
    transmission: fields.transmissionType || '',
    price: fields.dailyPrice,
    category: fields.category?.fields.urlSlug || '',
    brand: fields.brand?.fields.urlSlug || '',
    description: extractTextFromRichText(fields.description) || '',
    year: extractYearFromName(fields.vehicleName),
    specs: {
      acceleration: fields.accelerationTime || '',
      fuelConsumption: fields.fuelConsumption || '',
      features: Array.isArray(fields.features) ? fields.features : (fields.features?.split('\n') || [])
    } as CarSpecs
  }
}

// Helper to get car data for fallback images
function getCarDataBySlug(slug: string) {
  // Import car database dynamically to avoid circular dependency
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { carsDatabase } = require('../app/(public)/vehicles/_actions/car-database')
    return carsDatabase.find((car: Car) => car.id === slug)
  } catch {
    return null
  }
}

// Helper function to extract text from Contentful rich text
function extractTextFromRichText(richText: ContentfulRichText | undefined): string {
  if (!richText || !richText.content) return ''
  
  return richText.content
    .map((node) => {
      if (node.nodeType === 'paragraph' && node.content) {
        return node.content
          .map((textNode) => textNode.value || '')
          .join('')
      }
      return ''
    })
    .join('\n')
}

export async function getAllVehicles(): Promise<Car[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'rentalVehicle',
      include: 2, // Include linked entries (brand, category, specs)
    })
    
    return response.items.map((item) => transformVehicleToLegacyCar(item as Entry))
  } catch (error) {
    console.error('Error fetching vehicles from Contentful:', error)
    return []
  }
}

export async function getVehicleBySlug(slug: string): Promise<Car | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'rentalVehicle',
      'fields.urlSlug': slug,
      include: 2,
      limit: 1,
    })
    
    if (response.items.length === 0) {
      return null
    }
    
    return transformVehicleToLegacyCar(response.items[0] as Entry)
  } catch (error) {
    console.error('Error fetching vehicle by slug:', error)
    return null
  }
}

export async function getFeaturedVehicles(): Promise<Car[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'rentalVehicle',
      'fields.featuredFlag': true,
      include: 2,
    })
    
    return response.items.map((item) => transformVehicleToLegacyCar(item as Entry))
  } catch (error) {
    console.error('Error fetching featured vehicles:', error)
    return []
  }
}

// Get vehicles with filtering and pagination (for car-actions.ts)
interface ContentfulQuery {
  content_type: string;
  include: number;
  'fields.category.fields.urlSlug'?: string;
  'fields.category.sys.contentType.sys.id'?: string;
  'fields.brand.fields.urlSlug'?: string;
  'fields.brand.sys.contentType.sys.id'?: string;
  'fields.dailyPrice[gte]'?: number;
  'fields.dailyPrice[lte]'?: number;
  'fields.passengerCount[gte]'?: number;
  'fields.passengerCount'?: number;
}

export async function getFilteredVehicles(params: {
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
}): Promise<{ cars: Car[], totalCars: number }> {
  try {
    // Build Contentful query
    const query: ContentfulQuery = {
      content_type: 'rentalVehicle',
      include: 2,
    }

    // Add category filter
    if (params.category && params.category !== 'all') {
      query['fields.category.fields.urlSlug'] = params.category
      query['fields.category.sys.contentType.sys.id'] = 'vehicleCategory'
    }

    // Add brand filter  
    if (params.brand && params.brand !== 'all') {
      query['fields.brand.fields.urlSlug'] = params.brand
      query['fields.brand.sys.contentType.sys.id'] = 'carRentalBrand'
    }

    // Add price range filter
    if (params.minPrice !== undefined) {
      query['fields.dailyPrice[gte]'] = params.minPrice
    }
    if (params.maxPrice !== undefined) {
      query['fields.dailyPrice[lte]'] = params.maxPrice
    }

    // Add passenger filter
    if (params.passengers) {
      if (params.passengers === 6) {
        query['fields.passengerCount[gte]'] = 6
      } else {
        query['fields.passengerCount'] = params.passengers
      }
    }

    // Get all matching vehicles first
    const response = await contentfulClient.getEntries(query)
    let cars = response.items.map((item) => transformVehicleToLegacyCar(item as Entry))

    // Apply text search filter (search in name, brand, and category)
    if (params.search && params.search.trim()) {
      const searchLower = params.search.toLowerCase().trim();
      cars = cars.filter((car) => {
        const nameMatch = car.name.toLowerCase().includes(searchLower);
        const brandMatch = car.brand.toLowerCase().includes(searchLower);
        const categoryMatch = car.category.toLowerCase().includes(searchLower);
        return nameMatch || brandMatch || categoryMatch;
      });
    }

    // Apply year filtering (client-side since we extract year from names)
    if (params.minYear !== undefined) {
      cars = cars.filter(car => car.year && car.year >= params.minYear!)
    }
    if (params.maxYear !== undefined) {
      cars = cars.filter(car => car.year && car.year <= params.maxYear!)
    }

    // Apply sorting (client-side since Contentful sorting is limited)
    const { sort = 'recommended', page = 1, pageSize = 9, maxPrice = 10000 } = params
    
    cars.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating-desc':
          return b.rating - a.rating
        default:
          // Recommended sort
          return b.rating * 0.7 + (1 - b.price / maxPrice) * 0.3 - (a.rating * 0.7 + (1 - a.price / maxPrice) * 0.3)
      }
    })

    const totalCars = cars.length

    // Apply pagination
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedCars = cars.slice(start, end)

    return {
      cars: paginatedCars,
      totalCars
    }
  } catch (error) {
    console.error('Error fetching filtered vehicles:', error)
    return { cars: [], totalCars: 0 }
  }
}
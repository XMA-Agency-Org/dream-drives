// app/(public)/vehicles/_actions/car-config.ts

// Fallback maximum price for car rentals (in AED)
// Note: The frontend now dynamically fetches actual bounds from CMS via /api/filter-bounds
// This is only used as a fallback in car-actions.ts when no maxPrice is specified
export const MAX_PRICE = 100000; // High fallback to ensure no vehicles are filtered out

// Currency code
export const CURRENCY_CODE = 'AED';

// Helper function to format price with currency
export const formatPrice = (price: number, showPlus = false): string => {
  return `${CURRENCY_CODE} ${price}${showPlus ? '+' : ''}`;
};

// Function to convert USD to AED (or any other price conversion)
export const convertToAED = (usdPrice: number): number => {
  return Math.round(usdPrice/10 * 2) * 10;
};

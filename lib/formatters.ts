// lib/formatters.ts

/**
 * Formats the brand name for display
 */
export function formatBrandName(brand: string): string {
  switch (brand) {
    case "mercedes":
      return "Mercedes-Benz";
    case "range-rover":
      return "Range Rover";
    case "rolls-royce":
      return "Rolls-Royce";
    case "bmw":
      return "BMW";
    case "mini":
      return "MINI";
    case "gmc":
      return "GMC";
    default:
      return brand.charAt(0).toUpperCase() + brand.slice(1);
  }
}

/**
 * Gets the brand logo path for a given brand
 * Only returns logos that actually exist in /public/brands/
 */
export function getBrandLogo(brand: string): string | null {
  // Map brands to their logo file paths (only logos that actually exist)
  switch (brand) {
    case "mercedes":
      return "/brands/Mercedes-Benz-logo-2009-1920x1080.png";
    case "bmw":
      return "/brands/bmw-logo-2020-white-download.png";
    case "audi":
      return "/brands/audi-logo-2016-download.png";
    case "bentley":
      return "/brands/bentley-logo-2002-download.png";
    case "rolls-royce":
      return "/brands/Rolls-Royce-RR-logo-1920x1080.png";
    case "porsche":
      return "/brands/porsche-logo-2014-download.png";
    case "ferrari":
      return "/brands/ferrari-logo-2002-download.png";
    case "lamborghini":
      return "/brands/lamborghini.svg";
    case "toyota":
      return "/brands/toyota.png";
    // Brands without logos will show text badge fallback:
    // mini, gmc, range-rover, chevrolet, cadillac, nissan, kia, mitsubishi, fiat
    default:
      return null;
  }
}

/**
 * Gets the CSS classes for brand badge styling
 * Using design system badge classes for consistency
 * @deprecated - Use getBrandLogo() instead for displaying brand images
 */
export function getBrandStyle(brand: string): string {
  // Map brands to design system badge classes
  switch (brand) {
    case "mercedes":
    case "bmw":
    case "audi":
    case "cadillac":
      return "badge badge-secondary";
    case "bentley":
    case "range-rover":
      return "badge badge-success";
    case "rolls-royce":
      return "badge badge-primary";
    case "porsche":
    case "ferrari":
    case "mini":
      return "badge badge-error";
    case "lamborghini":
      return "badge badge-warning";
    case "gmc":
      return "badge badge-accent";
    default:
      return "badge badge-secondary";
  }
}

/**
 * Formats currency value
 */
export function formatCurrency(
  amount: number,
  currency: string = "AED",
  showDecimal: boolean = false,
): string {
  const formatter = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: showDecimal ? 2 : 0,
    maximumFractionDigits: showDecimal ? 2 : 0,
  });

  return formatter.format(amount);
}

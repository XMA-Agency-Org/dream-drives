import { createClient } from "contentful-management";
import { carsDatabase } from "../../app/(public)/vehicles/_actions/car-database";
import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";
import FormData from "form-data";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Define brands with proper names
const brands = [
  { slug: "mercedes", name: "Mercedes-Benz" },
  { slug: "bmw", name: "BMW" },
  { slug: "audi", name: "Audi" },
  { slug: "porsche", name: "Porsche" },
  { slug: "lamborghini", name: "Lamborghini" },
  { slug: "rolls-royce", name: "Rolls-Royce" },
  { slug: "range-rover", name: "Range Rover" },
  { slug: "chevrolet", name: "Chevrolet" },
  { slug: "gmc", name: "GMC" },
  { slug: "cadillac", name: "Cadillac" },
  { slug: "nissan", name: "Nissan" },
  { slug: "toyota", name: "Toyota" },
  { slug: "kia", name: "Kia" },
  { slug: "mitsubishi", name: "Mitsubishi" },
  { slug: "fiat", name: "Fiat" },
  { slug: "mini", name: "Mini" },
];

// Define categories
const categories = [
  { slug: "luxury", name: "Luxury", description: "Premium luxury vehicles" },
  { slug: "suv", name: "SUV", description: "Sport utility vehicles" },
  {
    slug: "sports",
    name: "Sports",
    description: "High-performance sports cars",
  },
  { slug: "economy", name: "Economy", description: "Budget-friendly vehicles" },
  { slug: "minivan", name: "Minivan", description: "Family-friendly minivans" },
];

/**
 * Uploads an image file to Contentful and returns the asset ID
 * Uses Contentful's upload API for file handling
 */
async function uploadImage(
  client: any,
  space: any,
  environment: any,
  filePath: string,
  fileName: string
): Promise<string | null> {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠️  Image not found: ${filePath}`);
      return null;
    }

    // Read file buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Determine content type
    const contentType = fileName.toLowerCase().endsWith(".png")
      ? "image/png"
      : fileName.toLowerCase().endsWith(".jpg") ||
        fileName.toLowerCase().endsWith(".jpeg")
      ? "image/jpeg"
      : "image/jpeg"; // default

    // Create upload using Contentful's upload API endpoint
    // Contentful requires Content-Type: application/octet-stream
    // Send the file buffer directly (not as FormData)
    const uploadResponse = await fetch(
      `https://upload.contentful.com/spaces/${space.sys.id}/uploads`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_TOKEN}`,
          "Content-Type": "application/octet-stream",
        },
        body: fileBuffer,
      }
    );

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(
        `Upload failed (${uploadResponse.status}): ${errorText.substring(
          0,
          200
        )}`
      );
    }

    const upload = await uploadResponse.json();

    // Create asset with upload reference
    const asset = await environment.createAsset({
      fields: {
        title: {
          "en-US": fileName.replace(/\.[^/.]+$/, ""), // Remove extension for title
        },
        description: {
          "en-US": `Image for ${fileName}`,
        },
        file: {
          "en-US": {
            contentType: contentType,
            fileName: fileName,
            uploadFrom: {
              sys: {
                type: "Link",
                linkType: "Upload",
                id: upload.sys.id,
              },
            },
          },
        },
      },
    });

    // Wait for asset to be processed
    await asset.processForAllLocales();

    // Publish the asset
    await asset.publish();

    return asset.sys.id;
  } catch (error: any) {
    console.warn(`  ⚠️  Failed to upload image ${fileName}: ${error.message}`);
    // Log more details in development
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return null;
  }
}

/**
 * Uploads all data to Contentful including images.
 * This script is idempotent - safe to run multiple times.
 */
async function uploadData() {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
  });

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!);
  const environment = await space.getEnvironment("master");

  console.log("Starting data upload...\n");

  // Store created entry IDs for reference linking
  const brandEntryIds: Record<string, string> = {};
  const categoryEntryIds: Record<string, string> = {};

  // 1. Upload Brands
  console.log("📦 Uploading brands...");
  for (const brand of brands) {
    try {
      const entry = await environment.createEntry("carRentalBrand", {
        fields: {
          brandName: { "en-US": brand.name },
          urlSlug: { "en-US": brand.slug },
        },
      });
      await entry.publish();
      brandEntryIds[brand.slug] = entry.sys.id;
      console.log(`  ✅ ${brand.name}`);
    } catch (error: any) {
      console.log(`  ⏭️  ${brand.name} (already exists or error)`);
    }
  }

  // 2. Upload Categories
  console.log("\n📂 Uploading categories...");
  for (const category of categories) {
    try {
      const entry = await environment.createEntry("vehicleCategory", {
        fields: {
          categoryName: { "en-US": category.name },
          urlSlug: { "en-US": category.slug },
          description: { "en-US": category.description },
        },
      });
      await entry.publish();
      categoryEntryIds[category.slug] = entry.sys.id;
      console.log(`  ✅ ${category.name}`);
    } catch (error: any) {
      console.log(`  ⏭️  ${category.name} (already exists or error)`);
    }
  }

  // If entries already exist, fetch them
  if (Object.keys(brandEntryIds).length === 0) {
    console.log("\n🔍 Fetching existing brands...");
    const brandsResponse = await environment.getEntries({
      content_type: "carRentalBrand",
    });
    brandsResponse.items.forEach((item: any) => {
      brandEntryIds[item.fields.urlSlug["en-US"]] = item.sys.id;
    });
  }

  if (Object.keys(categoryEntryIds).length === 0) {
    console.log("🔍 Fetching existing categories...");
    const categoriesResponse = await environment.getEntries({
      content_type: "vehicleCategory",
    });
    categoriesResponse.items.forEach((item: any) => {
      categoryEntryIds[item.fields.urlSlug["en-US"]] = item.sys.id;
    });
  }

  // 3. Upload Vehicles with Images
  console.log("\n🚗 Uploading vehicles...");
  let successCount = 0;
  let skipCount = 0;
  let imageCount = 0;

  for (const car of carsDatabase) {
    try {
      const fields: any = {
        vehicleName: { "en-US": car.name },
        urlSlug: { "en-US": car.id },
        dailyPrice: { "en-US": car.price },
        passengerCount: { "en-US": car.passengers },
        doorCount: { "en-US": car.doors },
        transmissionType: { "en-US": car.transmission },
        airConditioning: { "en-US": car.airConditioning },
        rating: { "en-US": car.rating },
        reviewCount: { "en-US": car.reviews },
        featuredFlag: { "en-US": car.rating >= 4.5 },
        availabilityStatus: { "en-US": true },
      };

      // Add description as rich text
      if (car.description) {
        fields.description = {
          "en-US": {
            nodeType: "document",
            data: {},
            content: [
              {
                nodeType: "paragraph",
                data: {},
                content: [
                  {
                    nodeType: "text",
                    value: car.description,
                    marks: [],
                    data: {},
                  },
                ],
              },
            ],
          },
        };
      }

      // Link brand
      if (car.brand && brandEntryIds[car.brand]) {
        fields.brand = {
          "en-US": {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: brandEntryIds[car.brand],
            },
          },
        };
      }

      // Link category
      if (car.category && categoryEntryIds[car.category]) {
        fields.category = {
          "en-US": {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: categoryEntryIds[car.category],
            },
          },
        };
      }

      // Upload and link images (optional - can be done manually via Contentful UI)
      // Note: Image upload via API is currently disabled due to API complexity
      // You can upload images manually in Contentful web app and link them to entries
      if (
        process.env.ENABLE_IMAGE_UPLOAD === "true" &&
        (car.image || car.images)
      ) {
        const imagePaths =
          car.images && car.images.length > 0
            ? car.images
            : car.image
            ? [car.image]
            : [];

        const imageAssetIds: string[] = [];

        for (const imagePath of imagePaths) {
          // Convert /car-real/filename.JPG to public/car-real/filename.JPG
          const publicPath = imagePath.startsWith("/")
            ? path.join(process.cwd(), "public", imagePath)
            : path.join(process.cwd(), "public", imagePath);

          const fileName = path.basename(imagePath);
          const assetId = await uploadImage(
            client,
            space,
            environment,
            publicPath,
            fileName
          );

          if (assetId) {
            imageAssetIds.push(assetId);
            imageCount++;
          }
        }

        // Link main image (first image)
        if (imageAssetIds.length > 0) {
          fields.mainImage = {
            "en-US": {
              sys: {
                type: "Link",
                linkType: "Asset",
                id: imageAssetIds[0],
              },
            },
          };

          // Link gallery images (all images)
          if (imageAssetIds.length > 1) {
            fields.imageGallery = {
              "en-US": imageAssetIds.slice(1).map((assetId) => ({
                sys: {
                  type: "Link",
                  linkType: "Asset",
                  id: assetId,
                },
              })),
            };
          }
        }
      }

      // Add specs
      if (car.specs) {
        if (car.specs.acceleration) {
          fields.accelerationTime = { "en-US": car.specs.acceleration };
        }
        if (car.specs.fuelConsumption) {
          fields.fuelConsumption = { "en-US": car.specs.fuelConsumption };
        }
        if (car.specs.features && car.specs.features.length > 0) {
          fields.features = { "en-US": car.specs.features.join("\n") };
        }
      }

      const entry = await environment.createEntry("rentalVehicle", { fields });
      await entry.publish();
      successCount++;
      console.log(`  ✅ ${car.name}`);
    } catch (error: any) {
      skipCount++;
      console.log(
        `  ⏭️  ${car.name} (${
          error.message.includes("already exists") ? "already exists" : "error"
        })`
      );
    }
  }

  console.log(`\n🎉 Upload complete!`);
  console.log(`   ✅ Successfully uploaded: ${successCount} vehicles`);
  console.log(`   🖼️  Images uploaded: ${imageCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount} vehicles`);
}

uploadData().catch(console.error);

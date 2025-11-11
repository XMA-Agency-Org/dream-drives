import { createClient } from "contentful-management";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

/**
 * Creates all Contentful content types (schemas) required for the application.
 * This script is idempotent - safe to run multiple times.
 */
async function createContentTypes() {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
  });

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!);
  const environment = await space.getEnvironment("master");

  console.log("Creating content types...\n");

  // 1. Create Brand Content Type
  try {
    const brandType = await environment.createContentTypeWithId(
      "carRentalBrand",
      {
        name: "Car Rental Brand",
        displayField: "brandName",
        fields: [
          {
            id: "brandName",
            name: "Brand Name",
            type: "Symbol",
            required: true,
            localized: false,
          },
          {
            id: "urlSlug",
            name: "URL Slug",
            type: "Symbol",
            required: true,
            localized: false,
            validations: [{ unique: true }],
          },
          {
            id: "logo",
            name: "Logo",
            type: "Link",
            linkType: "Asset",
            required: false,
            localized: false,
          },
          {
            id: "description",
            name: "Description",
            type: "Text",
            required: false,
            localized: false,
          },
        ],
      }
    );
    await brandType.publish();
    console.log("✅ Created: Car Rental Brand");
  } catch (error: any) {
    if (error.message.includes("already exists")) {
      console.log("⏭️  Car Rental Brand already exists");
    } else {
      console.error("❌ Error creating Brand:", error.message);
    }
  }

  // 2. Create Category Content Type
  try {
    const categoryType = await environment.createContentTypeWithId(
      "vehicleCategory",
      {
        name: "Vehicle Category",
        displayField: "categoryName",
        fields: [
          {
            id: "categoryName",
            name: "Category Name",
            type: "Symbol",
            required: true,
            localized: false,
          },
          {
            id: "urlSlug",
            name: "URL Slug",
            type: "Symbol",
            required: true,
            localized: false,
            validations: [{ unique: true }],
          },
          {
            id: "description",
            name: "Description",
            type: "Text",
            required: false,
            localized: false,
          },
        ],
      }
    );
    await categoryType.publish();
    console.log("✅ Created: Vehicle Category");
  } catch (error: any) {
    if (error.message.includes("already exists")) {
      console.log("⏭️  Vehicle Category already exists");
    } else {
      console.error("❌ Error creating Category:", error.message);
    }
  }

  // 3. Create Rental Vehicle Content Type
  try {
    const vehicleType = await environment.createContentTypeWithId(
      "rentalVehicle",
      {
        name: "Rental Vehicle",
        displayField: "vehicleName",
        fields: [
          {
            id: "vehicleName",
            name: "Vehicle Name",
            type: "Symbol",
            required: true,
            localized: false,
          },
          {
            id: "urlSlug",
            name: "URL Slug",
            type: "Symbol",
            required: true,
            localized: false,
            validations: [{ unique: true }],
          },
          {
            id: "description",
            name: "Description",
            type: "RichText",
            required: false,
            localized: false,
          },
          {
            id: "dailyPrice",
            name: "Daily Price",
            type: "Integer",
            required: true,
            localized: false,
          },
          {
            id: "brand",
            name: "Brand",
            type: "Link",
            linkType: "Entry",
            required: false,
            localized: false,
            validations: [
              {
                linkContentType: ["carRentalBrand"],
              },
            ],
          },
          {
            id: "category",
            name: "Category",
            type: "Link",
            linkType: "Entry",
            required: false,
            localized: false,
            validations: [
              {
                linkContentType: ["vehicleCategory"],
              },
            ],
          },
          {
            id: "passengerCount",
            name: "Passenger Count",
            type: "Integer",
            required: false,
            localized: false,
          },
          {
            id: "doorCount",
            name: "Door Count",
            type: "Integer",
            required: false,
            localized: false,
          },
          {
            id: "transmissionType",
            name: "Transmission Type",
            type: "Symbol",
            required: false,
            localized: false,
          },
          {
            id: "airConditioning",
            name: "Air Conditioning",
            type: "Boolean",
            required: false,
            localized: false,
          },
          {
            id: "accelerationTime",
            name: "Acceleration Time",
            type: "Symbol",
            required: false,
            localized: false,
          },
          {
            id: "fuelConsumption",
            name: "Fuel Consumption",
            type: "Symbol",
            required: false,
            localized: false,
          },
          {
            id: "features",
            name: "Features",
            type: "Text",
            required: false,
            localized: false,
          },
          {
            id: "rating",
            name: "Rating",
            type: "Number",
            required: false,
            localized: false,
          },
          {
            id: "reviewCount",
            name: "Review Count",
            type: "Integer",
            required: false,
            localized: false,
          },
          {
            id: "mainImage",
            name: "Main Image",
            type: "Link",
            linkType: "Asset",
            required: false,
            localized: false,
          },
          {
            id: "imageGallery",
            name: "Image Gallery",
            type: "Array",
            required: false,
            localized: false,
            items: {
              type: "Link",
              linkType: "Asset",
            },
          },
          {
            id: "featuredFlag",
            name: "Featured Flag",
            type: "Boolean",
            required: false,
            localized: false,
          },
          {
            id: "availabilityStatus",
            name: "Availability Status",
            type: "Boolean",
            required: false,
            localized: false,
          },
        ],
      }
    );
    await vehicleType.publish();
    console.log("✅ Created: Rental Vehicle");
  } catch (error: any) {
    if (error.message.includes("already exists")) {
      console.log("⏭️  Rental Vehicle already exists");
    } else {
      console.error("❌ Error creating Vehicle:", error.message);
    }
  }

  console.log("\n🎉 Content types setup complete!");
}

createContentTypes().catch(console.error);

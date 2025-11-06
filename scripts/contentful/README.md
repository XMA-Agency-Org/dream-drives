# Contentful Migration Scripts

Automated scripts to set up Contentful CMS and migrate data for your Next.js applications. Create content types, upload data, and manage content programmatically.

## 🚀 Quick Start

**Step 1: Get Your Tokens** - Go to [app.contentful.com](https://app.contentful.com), select your space, then:
- **Settings → API keys** → Copy Space ID, Content delivery token, and Content preview token
- **Settings → Personal access tokens** → Generate and copy Management token

**Step 2: Create `.env.local`** in your project root:
```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
```

**Step 3: Install Dependencies** - `npm install contentful-management tsx dotenv`

**Step 4: Add Scripts to package.json**:
```json
{
  "scripts": {
    "contentful:schema": "tsx scripts/contentful/create-schema.ts",
    "contentful:upload": "tsx scripts/contentful/upload-data.ts",
    "contentful:reset": "tsx scripts/contentful/reset-content.ts",
    "contentful:reset-slate": "tsx scripts/contentful/reset-slate.ts",
    "contentful:setup": "npm run contentful:schema && npm run contentful:upload"
  }
}
```

**Step 5: Run Migration** - `npm run contentful:setup` (creates schemas and uploads all data)

## 📋 Available Commands

- `npm run contentful:schema` - Create content types (schemas) only
- `npm run contentful:upload` - Upload data only (brands, categories, vehicles)
- `npm run contentful:setup` - Do both (recommended for first-time setup)
- `npm run contentful:reset` - Delete all entries/assets but keep content types
- `npm run contentful:reset-slate` - Delete EVERYTHING including content types (complete clean slate)

**⚠️ Warning:** Reset commands are destructive and cannot be undone!

## 📁 File Structure

```
scripts/contentful/
├── README.md              # This guide
├── create-schema.ts       # Creates content types
├── upload-data.ts         # Uploads data and images
├── reset-content.ts       # Resets content only (keeps schemas)
└── reset-slate.ts         # Complete clean slate
```

## 🔧 Customization for New Projects

**Update `create-schema.ts`** - Modify content type definitions to match your data model. Change content type IDs, field names, and types (Symbol, Text, Integer, Boolean, Link, etc.).

**Update `upload-data.ts`** - Change the data source import path, update brands/categories arrays, modify field mappings in the upload loop, and adjust image path mappings if needed.

## 🖼️ Image Upload

Image upload via API is disabled by default. **Option 1 (Recommended):** Upload images manually in Contentful web app (Assets → Add asset) and link them to entries. **Option 2 (Experimental):** Set `ENABLE_IMAGE_UPLOAD=true` in `.env.local` to enable automatic image uploads from your `public` folder. Supported formats: JPEG/JPG, PNG.

## 📊 Content Types

This script creates three content types: **`carRentalBrand`** (brandName, urlSlug, logo, description), **`vehicleCategory`** (categoryName, urlSlug, description), and **`rentalVehicle`** (vehicleName, urlSlug, description, dailyPrice, brand, category, specs, images, and more). All fields are customizable in `create-schema.ts`.

## 🔄 Idempotent Operations

All scripts are safe to run multiple times - they skip existing content types and entries, preventing duplicates. If you modify the script and re-run, it will handle updates appropriately.

## 🐛 Troubleshooting

**"Expected parameter accessToken"** - Verify `.env.local` exists in project root with all 4 variables set correctly.

**"Image not found"** - Check image paths in database match actual files in `public/` folder, verify file extensions match exactly.

**"already exists"** - This is normal! Scripts skip existing entries. To re-upload, delete the entry in Contentful first, or use reset commands.

**Images not uploading** - If using API upload, check file size (Contentful has limits), verify format is JPEG/PNG, and ensure Management token has proper permissions.

## 💡 Best Practices

1. Always run `contentful:schema` before `contentful:upload` on first setup
2. Test with one entry first by commenting out most of your data
3. Use unique slugs for `urlSlug` fields to avoid conflicts
4. Compress images before upload for faster processing
5. Export your Contentful space before major changes as backup
6. Never commit `.env.local` or Management tokens to git
7. Use different tokens for dev/staging/production environments

## 📚 Resources

- [Contentful Management API Docs](https://www.contentful.com/developers/docs/references/content-management-api/)
- [Contentful TypeScript SDK](https://github.com/contentful/contentful-management.js)
- [Contentful Web App](https://app.contentful.com)

---

**Happy migrating! 🚀**

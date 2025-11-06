import { createClient } from "contentful-management";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

/**
 * Complete clean slate reset - Deletes EVERYTHING:
 * - All entries (vehicles, brands, categories)
 * - All assets (images)
 * - All content types (schemas)
 * 
 * WARNING: This is the most destructive option!
 * Use this when you want to start completely fresh.
 * This action cannot be undone!
 */
async function resetSlate() {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
  });

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!);
  const environment = await space.getEnvironment("master");

  console.log("⚠️  ⚠️  ⚠️  WARNING: COMPLETE CLEAN SLATE RESET ⚠️  ⚠️  ⚠️");
  console.log("⚠️  This will delete EVERYTHING:");
  console.log("⚠️  - All entries (vehicles, brands, categories)");
  console.log("⚠️  - All assets (images)");
  console.log("⚠️  - All content types (schemas)");
  console.log("⚠️  This action CANNOT be undone!\n");

  console.log("Starting complete clean slate reset...\n");

  // 1. Delete all entries first
  console.log("🗑️  Deleting all entries...");
  
  let entryCount = 0;
  let hasMore = true;
  
  while (hasMore) {
    const entries = await environment.getEntries({ limit: 100 });
    
    if (entries.items.length === 0) {
      hasMore = false;
      break;
    }

    for (const entry of entries.items) {
      try {
        // Unpublish first if published
        if (entry.isPublished()) {
          await entry.unpublish();
        }
        // Delete the entry
        await entry.delete();
        entryCount++;
      } catch (error: any) {
        console.warn(`  ⚠️  Failed to delete entry ${entry.sys.id}: ${error.message}`);
      }
    }
    
    if (entries.items.length < 100) {
      hasMore = false;
    }
  }

  console.log(`  ✅ Deleted ${entryCount} entries\n`);

  // 2. Delete all assets
  console.log("🖼️  Deleting all assets...");
  
  let assetCount = 0;
  hasMore = true;
  
  while (hasMore) {
    const assets = await environment.getAssets({ limit: 100 });
    
    if (assets.items.length === 0) {
      hasMore = false;
      break;
    }

    for (const asset of assets.items) {
      try {
        // Unpublish first if published
        if (asset.isPublished()) {
          await asset.unpublish();
        }
        // Delete the asset
        await asset.delete();
        assetCount++;
      } catch (error: any) {
        console.warn(`  ⚠️  Failed to delete asset ${asset.sys.id}: ${error.message}`);
      }
    }
    
    if (assets.items.length < 100) {
      hasMore = false;
    }
  }

  console.log(`  ✅ Deleted ${assetCount} assets\n`);

  // 3. Delete all content types (schemas)
  console.log("📋 Deleting all content types...");
  
  let contentTypeCount = 0;
  hasMore = true;
  
  while (hasMore) {
    const contentTypes = await environment.getContentTypes({ limit: 100 });
    
    if (contentTypes.items.length === 0) {
      hasMore = false;
      break;
    }

    for (const contentType of contentTypes.items) {
      try {
        // Unpublish first if published
        if (contentType.isPublished()) {
          await contentType.unpublish();
        }
        // Delete the content type
        await contentType.delete();
        contentTypeCount++;
      } catch (error: any) {
        console.warn(`  ⚠️  Failed to delete content type ${contentType.sys.id}: ${error.message}`);
      }
    }
    
    if (contentTypes.items.length < 100) {
      hasMore = false;
    }
  }

  console.log(`  ✅ Deleted ${contentTypeCount} content types\n`);

  console.log("🎉 Complete clean slate reset finished!");
  console.log(`   🗑️  Entries deleted: ${entryCount}`);
  console.log(`   🖼️  Assets deleted: ${assetCount}`);
  console.log(`   📋 Content types deleted: ${contentTypeCount}`);
  console.log("\n✅ Your Contentful space is now completely clean!");
  console.log("   Run 'npm run contentful:setup' to start fresh.");
}

resetSlate().catch(console.error);


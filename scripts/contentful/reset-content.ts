import { createClient } from "contentful-management";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

/**
 * Resets all content in Contentful by deleting:
 * - All entries (vehicles, brands, categories)
 * - All assets (images)
 * 
 * NOTE: This preserves content types (schemas)
 * For a complete clean slate, use reset-slate.ts
 * 
 * WARNING: This is destructive and cannot be undone!
 */
async function resetContent() {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
  });

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!);
  const environment = await space.getEnvironment("master");

  console.log("⚠️  WARNING: This will delete ALL entries and assets in Contentful!");
  console.log("⚠️  Content types (schemas) will be preserved.");
  console.log("⚠️  This action cannot be undone!\n");

  console.log("Starting content reset...\n");

  // 1. Delete all entries (vehicles, brands, categories)
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
    
    // If we got less than 100, we're done
    if (entries.items.length < 100) {
      hasMore = false;
    }
  }

  console.log(`  ✅ Deleted ${entryCount} entries\n`);

  // 2. Delete all assets (images)
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
    
    // If we got less than 100, we're done
    if (assets.items.length < 100) {
      hasMore = false;
    }
  }

  console.log(`  ✅ Deleted ${assetCount} assets\n`);

  console.log("🎉 Content reset complete!");
  console.log(`   🗑️  Entries deleted: ${entryCount}`);
  console.log(`   🖼️  Assets deleted: ${assetCount}`);
  console.log("   ✅ Content types (schemas) preserved");
  console.log("\n✅ Your Contentful space is now clean and ready for fresh content!");
  console.log("   Run 'npm run contentful:upload' to upload data again.");
}

resetContent().catch(console.error);

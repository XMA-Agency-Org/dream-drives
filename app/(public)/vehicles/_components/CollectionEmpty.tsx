// app/(public)/vehicles/_components/CollectionEmpty.tsx
import Link from "next/link";
import { Car, SearchX, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CollectionEmpty() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <div className="bg-secondary-100 dark:bg-secondary-800 rounded-full p-6 mb-6">
        <SearchX className="h-12 w-12 text-secondary-500 dark:text-secondary-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-3">
        No vehicles found
      </h3>
      
      <p className="text-secondary-600 dark:text-secondary-400 max-w-md mb-8">
        We couldn't find any vehicles matching your current filter criteria. Try adjusting your filters or browse our complete collection.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          leftIcon={<RefreshCw className="h-4 w-4" />}
          asLink
          href="/vehicles"
        >
          Clear All Filters
        </Button>
        
        <Button
          variant="primary"
          leftIcon={<Car className="h-4 w-4" />}
          asLink
          href="/"
        >
          Back to Homepage
        </Button>
      </div>
    </div>
  );
}

// app/(public)/vehicles/_components/Loading.tsx
import { Loader2 } from "lucide-react";

export default function Loading() {
  // Create a grid of skeleton loaders for cars
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-32 bg-secondary-200 dark:bg-secondary-800 rounded-md animate-pulse"></div>
        <div className="h-10 w-48 bg-secondary-200 dark:bg-secondary-800 rounded-md animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-secondary-800 rounded-xl overflow-hidden shadow-sm h-96 animate-pulse"
          >
            {/* Image skeleton */}
            <div className="h-48 bg-secondary-200 dark:bg-secondary-700"></div>
            
            {/* Content skeleton */}
            <div className="p-5">
              <div className="h-6 w-3/4 bg-secondary-200 dark:bg-secondary-700 rounded mb-4"></div>
              
              {/* Features skeleton */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-3 mb-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-secondary-200 dark:bg-secondary-700 mr-2"></div>
                    <div className="h-4 w-16 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
                  </div>
                ))}
              </div>
              
              {/* Price and action skeleton */}
              <div className="flex justify-between items-center pt-4 mt-2 border-t border-secondary-200 dark:border-secondary-800">
                <div>
                  <div className="h-6 w-16 bg-secondary-200 dark:bg-secondary-700 rounded mb-2"></div>
                  <div className="h-4 w-12 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
                </div>
                <div className="h-10 w-28 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600 dark:text-primary-400" />
      </div>
    </div>
  );
}

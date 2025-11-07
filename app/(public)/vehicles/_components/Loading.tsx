// app/(public)/vehicles/_components/Loading.tsx
import { Loader2 } from "lucide-react";

export default function Loading() {
  // Create a grid of skeleton loaders for cars
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-32 bg-base-200 dark:bg-base-800 rounded-md animate-pulse"></div>
        <div className="h-10 w-48 bg-base-200 dark:bg-base-800 rounded-md animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div 
            key={index} 
            className="card card-shadow overflow-hidden h-96 animate-pulse"
          >
            {/* Image skeleton */}
            <div className="h-48 bg-base-200 dark:bg-base-700"></div>
            
            {/* Content skeleton */}
            <div className="p-5">
              <div className="h-6 w-3/4 bg-base-200 dark:bg-base-700 rounded mb-4"></div>
              
              {/* Features skeleton */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-3 mb-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-base-200 dark:bg-base-700 mr-2"></div>
                    <div className="h-4 w-16 bg-base-200 dark:bg-base-700 rounded"></div>
                  </div>
                ))}
              </div>
              
              {/* Price and action skeleton */}
              <div className="flex justify-between items-center pt-4 mt-2 border-t border-base-200 dark:border-base-800">
                <div>
                  <div className="h-6 w-16 bg-base-200 dark:bg-base-700 rounded mb-2"></div>
                  <div className="h-4 w-12 bg-base-200 dark:bg-base-700 rounded"></div>
                </div>
                <div className="h-10 w-28 bg-base-200 dark:bg-base-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Loader2 className="h-8 w-8 animate-spin text-accent-600 dark:text-accent-400" />
      </div>
    </div>
  );
}

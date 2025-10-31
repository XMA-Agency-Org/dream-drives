// app/(public)/vehicles/[id]/loading.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2 } from "lucide-react";

export default function VehicleDetailLoading() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-secondary-950">
      <Header />
      
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          {/* Breadcrumbs skeleton */}
          <div className="h-6 w-60 bg-secondary-200 dark:bg-secondary-800 rounded animate-pulse mb-8"></div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image Carousel skeleton */}
            <div className="lg:col-span-2">
              <div className="h-96 md:h-[500px] bg-secondary-200 dark:bg-secondary-800 rounded-lg animate-pulse"></div>
              
              {/* Thumbnails skeleton */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, index) => (
                  <div 
                    key={index} 
                    className="aspect-video bg-secondary-200 dark:bg-secondary-800 rounded-md animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Car Info skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-secondary-900 rounded-xl shadow-sm p-6 border border-secondary-200 dark:border-secondary-800">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2">
                    <div className="h-7 w-48 bg-secondary-200 dark:bg-secondary-800 rounded animate-pulse"></div>
                    <div className="h-5 w-36 bg-secondary-200 dark:bg-secondary-800 rounded animate-pulse"></div>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-secondary-200 dark:bg-secondary-800 animate-pulse"></div>
                </div>
                
                {/* Quick Info skeleton */}
                <div className="border-t border-b border-secondary-200 dark:border-secondary-800 py-4 my-4 grid grid-cols-2 gap-y-3">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-secondary-200 dark:bg-secondary-800 animate-pulse mr-2"></div>
                      <div className="h-5 w-24 bg-secondary-200 dark:bg-secondary-800 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
                
                {/* Pricing and Booking skeleton */}
                <div className="mb-6">
                  <div className="flex items-end justify-between mb-4">
                    <div className="h-8 w-32 bg-secondary-200 dark:bg-secondary-800 rounded animate-pulse"></div>
                    <div className="h-5 w-24 bg-secondary-200 dark:bg-secondary-800 rounded animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <div className="h-12 w-full bg-secondary-200 dark:bg-secondary-800 rounded-md animate-pulse"></div>
                    <div className="h-10 w-full bg-secondary-200 dark:bg-secondary-800 rounded-md animate-pulse"></div>
                  </div>
                </div>
                
                {/* Benefits skeleton */}
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-secondary-200 dark:bg-secondary-800 animate-pulse mr-2 mt-1"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-5 w-36 bg-secondary-200 dark:bg-secondary-800 rounded animate-pulse"></div>
                        <div className="h-3 w-full bg-secondary-200 dark:bg-secondary-800 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs skeleton */}
          <div className="mt-10">
            <div className="border-b border-secondary-200 dark:border-secondary-800">
              <div className="flex space-x-8 mb-1">
                <div className="h-5 w-24 bg-secondary-200 dark:bg-secondary-800 rounded animate-pulse"></div>
                <div className="h-5 w-24 bg-secondary-200 dark:bg-secondary-800 rounded animate-pulse"></div>
              </div>
            </div>
            
            {/* Tab Content skeleton */}
            <div className="py-8">
              <div className="h-7 w-48 bg-secondary-200 dark:bg-secondary-800 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                <div className="h-5 w-full bg-secondary-200 dark:bg-secondary-800 rounded animate-pulse"></div>
                <div className="h-5 w-full bg-secondary-200 dark:bg-secondary-800 rounded animate-pulse"></div>
                <div className="h-5 w-3/4 bg-secondary-200 dark:bg-secondary-800 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Loading indicator */}
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
            <span className="ml-3 text-secondary-600 dark:text-secondary-400">Loading vehicle details...</span>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

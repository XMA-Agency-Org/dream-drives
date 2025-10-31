// app/(public)/vehicles/_components/vehicle-details/Breadcrumbs.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  carName: string;
}

export default function Breadcrumbs({ carName }: BreadcrumbsProps) {
  return (
    <nav className="mb-6 text-sm text-secondary-600 dark:text-secondary-400">
      <ol className="flex items-center flex-wrap">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-1" />
        </li>
        <li className="flex items-center">
          <Link 
            href="/vehicles" 
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            Vehicles
          </Link>
          <ChevronRight className="w-4 h-4 mx-1" />
        </li>
        <li className="text-secondary-900 dark:text-white font-medium truncate">
          {carName}
        </li>
      </ol>
    </nav>
  );
}

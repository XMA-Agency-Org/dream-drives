import { getBrands } from "@/app/(public)/vehicles/_actions/brand-actions";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import React from "react";
import {
  MBIcon,
  BentleyIcon,
  RollsRoyceIcon,
  LandroverIcon,
  LamborghiniIcon,
  FerrariLogo,
  AudiIcon,
  PorscheIcon,
  ToyotaIcon,
  KiaIcon,
  HyundaiIcon,
  NissanLogo,
  MitsubishiIcon,
  ChevroletLogo,
  CadillacIcon,
  FiatIcon,
  MiniIcon,
  MazdaIcon,
  GMCLogo,
} from "@cardog-icons/react";
import Image from "next/image";
import BMW from "@/public/brands/light-mode/BMW-logo-lm.png"

interface Brand {
  id: string;
  label: string;
}

export default async function BrandsPage() {
  const brands = await getBrands();
  // Filter out "All Brands" option for the display page
  const displayBrands = brands.filter((brand) => brand.id !== "all");

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-secondary-950 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
              Our Premium Brands
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
              Discover our collection of luxury and premium automotive brands,
              each offering exceptional quality and performance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayBrands.map((brand: Brand) => (
              <Link
                key={brand.id}
                href={`/vehicles?brand=${brand.id}`}
                className="group bg-white dark:bg-secondary-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-secondary-100 dark:border-secondary-800 hover:border-primary-200 dark:hover:border-primary-700"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center">
                    {getBrandIcon(brand.id)}
                  </div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {brand.label}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Helper function to map brand IDs to cardog icons
function getBrandIcon(brandId: string) {
  const baseClassName =
    "group-hover:scale-110 text-[100px] transition-transform duration-300";

  const brandIconMap: Record<string, React.ReactElement> = {
    mercedes: <MBIcon className={baseClassName} />,
    "mercedes-benz": <MBIcon className={baseClassName} />,
    bentley: <BentleyIcon className={baseClassName} />,
    "rolls-royce": (
      <RollsRoyceIcon className={baseClassName} />
    ),
    "land-rover": <LandroverIcon className={baseClassName} />,
    "range-rover": <LandroverIcon className={baseClassName} />,
    lamborghini: <LamborghiniIcon className={baseClassName} />,
    ferrari: <FerrariLogo className={baseClassName} />,
    audi: <AudiIcon className={baseClassName} />,
    bmw: <Image src={BMW} alt="BMW" className={baseClassName} />,
    porsche: <PorscheIcon className={baseClassName} />,
    toyota: <ToyotaIcon className={baseClassName} />,
    kia: <KiaIcon className={baseClassName} />,
    hyundai: <HyundaiIcon className={baseClassName} />,
    nissan: <NissanLogo className={baseClassName} />,
    mitsubishi: <MitsubishiIcon className={baseClassName} />,
    chevrolet: <ChevroletLogo className={baseClassName} />,
    cadillac: <CadillacIcon className={baseClassName} />,
    gmc: <GMCLogo className={baseClassName} />,
    fiat: <FiatIcon className={baseClassName} />,
    mini: <MiniIcon className={baseClassName} />,
    mazda: <MazdaIcon className={baseClassName} />,
  };

  return brandIconMap[brandId] || null;
}


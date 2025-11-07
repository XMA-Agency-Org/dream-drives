"use client";

import Image from "next/image";
import Mercedes from "@/public/brands/light-mode/mercedes-lm.png";
import Bentley from "@/public/brands/bentley-logo-2002-download.png";
import Rollsroyce from "@/public/brands/light-mode/rolls-royce-lm.png";
import Bmw from "@/public/brands/light-mode/BMW-logo-lm.png";
import Lamborghini from "@/public/brands/lamborghini.svg";
import Porsche from "@/public/brands/porsche-logo-2014-download.png";
import Audi from "@/public/brands/audi-logo-2016-download.png";
import Ferrari from "@/public/brands/ferrari-logo-2002-download.png";
import StaggerContainer, {
  StaggerItem,
  staggerItemFadeVariants,
} from "@/lib/animations/StaggerContainer";

const brands = [
  { name: "Mercedes-Benz", icon: Mercedes },
  { name: "Bentley", icon: Bentley },
  { name: "Rolls-Royce", icon: Rollsroyce },
  { name: "BMW", icon: Bmw },
  { name: "Lamborghini", icon: Lamborghini },
  { name: "Porsche", icon: Porsche },
  { name: "Audi", icon: Audi },
  { name: "Ferrari", icon: Ferrari },
];

export default function Logos() {
  return (
    <section className="relative section-sm bg-white border-b border-base-300 dark:border-base-700 z-10">
      <div className="container-default">
        <StaggerContainer
          staggerDelay={0.08}
          className="flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-20"
        >
          {brands.map((brand) => (
            <StaggerItem key={brand.name} variants={staggerItemFadeVariants}>
              <div className="group flex items-center justify-center w-10 h-8 md:w-12 md:h-10 lg:w-16 lg:h-12">
                <Image
                  src={brand.icon}
                  alt={brand.name}
                  width={40}
                  height={20}
                  className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

import Image from "next/image";
import Mercedes from "@/public/brands/light-mode/mercedes-lm.png";
import Bentley from "@/public/brands/bentley-logo-2002-download.png";
import Rollsroyce from "@/public/brands/light-mode/rolls-royce-lm.png";
import Bmw from "@/public/brands/light-mode/BMW-logo-lm.png";
import Lamborghini from "@/public/brands/lamborghini.svg";
import Porsche from "@/public/brands/porsche-logo-2014-download.png";
import Audi from "@/public/brands/audi-logo-2016-download.png";
import Ferrari from "@/public/brands/ferrari-logo-2002-download.png";
import Toyota from "@/public/brands/toyota.png";

const brands = [
  { name: "Mercedes-Benz", icon: Mercedes },
  { name: "Bentley", icon: Bentley },
  { name: "Rolls-Royce", icon: Rollsroyce },
  { name: "BMW", icon: Bmw },
  { name: "Lamborghini", icon: Lamborghini },
  { name: "Porsche", icon: Porsche },
  { name: "Audi", icon: Audi },
  { name: "Ferrari", icon: Ferrari },
  { name: "Toyota", icon: Toyota },
];

export default function Logos() {
  return (
    <div
      className="bg-white dark:bg-secondary-900 py-8 px-4 border-b-[1.5px]"
      style={{ borderColor: "#CCCADA" }}
    >
      <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-20">
        {brands.map((brand) => (
          <div key={brand.name} className="group cursor-pointer">
            <Image
              src={brand.icon}
              alt={brand.name}
              width={40}
              height={20}
              className="w-8 h-auto md:w-10 lg:w-12 object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

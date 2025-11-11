// lib/brand-icons.tsx
import React from "react";
import Image from "next/image";
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
import BMW from "@/public/brands/light-mode/BMW-logo-lm.png";

/**
 * Gets the brand icon component for a given brand
 * Uses the same icon system as the navigation header for consistency
 */
export function getBrandIcon(brandId: string, className?: string): React.ReactElement | null {
  const baseClassName = className || "w-full h-full";

  const brandIconMap: Record<string, React.ReactElement> = {
    mercedes: <MBIcon className={baseClassName} />,
    "mercedes-benz": <MBIcon className={baseClassName} />,
    bentley: <BentleyIcon className={baseClassName} />,
    "rolls-royce": <RollsRoyceIcon className={baseClassName} />,
    "land-rover": <LandroverIcon className={baseClassName} />,
    "range-rover": <LandroverIcon className={baseClassName} />,
    lamborghini: <LamborghiniIcon className={baseClassName} />,
    ferrari: <FerrariLogo className={baseClassName} />,
    audi: <AudiIcon className={baseClassName} />,
    bmw: (
      <Image
        src={BMW}
        width={56}
        height={56}
        alt="BMW"
        className={baseClassName}
      />
    ),
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


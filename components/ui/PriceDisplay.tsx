// components/ui/PriceDisplay.tsx
import { useMemo } from "react";
import { formatCurrency } from "@/lib/formatters";

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  period?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showDecimal?: boolean;
  className?: string;
}

export default function PriceDisplay({
  amount,
  currency = "AED",
  period,
  size = "md",
  showDecimal = false,
  className = "",
}: PriceDisplayProps) {
  // Format the price using our formatter utility
  const formattedPrice = useMemo(() => {
    return formatCurrency(amount, currency, showDecimal);
  }, [amount, currency, showDecimal]);

  // Size variants
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  return (
    <div className={`font-bold ${sizes[size]} ${className}`}>
      <span>{formattedPrice}</span>
      {period && (
        <span className="text-secondary-400 text-sm font-normal ml-1">
          /{period}
        </span>
      )}
    </div>
  );
}

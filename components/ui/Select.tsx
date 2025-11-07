import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Select variants using CVA with Tailwind utilities and design system tokens
export const selectVariants = cva(
  // Base styles
  "w-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer border",
  {
    variants: {
      variant: {
        default:
          "bg-surface border-default focus:border-focus focus:ring-2 focus:ring-accent text-default",
        filled:
          "bg-base border-default focus:border-focus focus:ring-2 focus:ring-accent text-default",
      },
      size: {
        sm: "px-3 py-2 text-sm rounded-lg",
        md: "px-4 py-3 text-base rounded-xl",
        lg: "px-6 py-4 text-lg rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Select props
export interface SelectProps
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  children: ReactNode;
}

// Select Component
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, variant, size, label, error, helperText, id, children, ...props },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-base mb-2"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(selectVariants({ variant, size }), "pr-12", className)}
            {...props}
          >
            {children}
          </select>

          {/* Dropdown arrow */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {(error || helperText) && (
          <p
            className={cn("mt-2 text-sm", {
              "text-error": error,
              "text-muted": !error && helperText,
            })}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;

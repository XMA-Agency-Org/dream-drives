import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Input variants using CVA with Tailwind utilities and design system tokens
export const inputVariants = cva(
  // Base styles
  "w-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border",
  {
    variants: {
      variant: {
        default:
          "bg-surface border-default focus:border-focus focus:ring-2 focus:ring-accent text-default placeholder:text-muted",
        filled:
          "bg-base border-default focus:border-focus focus:ring-2 focus:ring-accent text-default placeholder:text-muted",
        error:
          "bg-surface border-error focus:border-error focus:ring-2 focus:ring-error text-default placeholder:text-muted",
        success:
          "bg-surface border-success focus:border-success focus:ring-2 focus:ring-success text-default placeholder:text-muted",
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

// Input props
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// Input Component
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const effectiveVariant = error ? "error" : variant;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-base mb-2"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant: effectiveVariant, size }),
              {
                "pl-12": leftIcon,
                "pr-12": rightIcon,
              },
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
              {rightIcon}
            </div>
          )}
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

Input.displayName = "Input";

export default Input;

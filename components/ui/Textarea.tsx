import { InputHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Textarea variants using CVA with Tailwind utilities and design system tokens
export const textareaVariants = cva(
  // Base styles
  "w-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-none border",
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
        borderless:
          "bg-base-50/30 border-0 focus:ring-2 focus:ring-accent text-default placeholder:text-default",
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

// Textarea props
export interface TextareaProps
  extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  rows?: number;
}

// Textarea Component
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      helperText,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const effectiveVariant = error ? "error" : variant;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-base mb-2"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            textareaVariants({ variant: effectiveVariant, size }),
            className
          )}
          {...props}
        />

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

Textarea.displayName = "Textarea";

export default Textarea;

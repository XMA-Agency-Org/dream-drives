import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

// Radio props
export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

// Radio Component
const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const radioId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={cn(
            "w-5 h-5 rounded-full transition-colors cursor-pointer",
            "bg-transparent border border-default text-primary",
            "focus:outline-none focus:ring-2 focus:ring-accent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={radioId}
            className="text-sm font-medium cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;

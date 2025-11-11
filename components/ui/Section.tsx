import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const sectionVariants = cva("", {
  variants: {
    size: {
      sm: "py-8",
      default: "py-16",
      lg: "py-24",
    },
    background: {
      page: "bg-page",
      base: "bg-base",
      subtle: "bg-subtle",
      transparent: "bg-transparent",
    },
    overflow: {
      visible: "overflow-visible",
      hidden: "overflow-hidden",
    },
    position: {
      relative: "relative",
      static: "static",
    },
  },
  defaultVariants: {
    size: "default",
    background: "page",
    overflow: "visible",
    position: "relative",
  },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: "section" | "div";
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      size,
      background,
      overflow,
      position,
      as: Component = "section",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as never}
        className={cn(
          sectionVariants({ size, background, overflow, position }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = "Section";

export default Section;
export { sectionVariants };

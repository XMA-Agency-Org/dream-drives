import {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Base button properties - mapped to design system classes
interface BaseButtonProps {
  variant?:
    | "primary"
    | "base"
    | "accent"
    | "outline"
    | "ghost"
    | "ghost-accent"
    | "black"
    | "white";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

// Button as a regular button element
type ButtonAsButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asLink?: false;
    href?: never;
  };

// Button as an anchor link element
type ButtonAsLinkProps = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    asLink: true;
    href: string;
  };

// Combined button props type
type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      isDisabled = false,
      leftIcon,
      rightIcon,
      icon,
      iconPosition = "left",
      fullWidth = false,
      asLink,
      href,
      ...props
    },
    ref
  ) => {
    // Map to design system classes from design-system/components/
    const baseClass = "btn";

    // Size variations - use design system btn-* classes
    const sizeClass =
      size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "btn-md";

    // Variant styles - use design system btn-* classes
    const variantClass =
      variant === "primary"
        ? "btn-primary"
        : variant === "base"
        ? "btn-base"
        : variant === "accent"
        ? "btn-accent"
        : variant === "black"
        ? "btn-black"
        : variant === "white"
        ? "btn-white"
        : variant === "outline"
        ? "btn-outline"
        : variant === "ghost"
        ? "btn-ghost"
        : variant === "ghost-accent"
        ? "btn-ghost-accent"
        : "btn-primary";

    const buttonStyles = cn(
      baseClass,
      sizeClass,
      variantClass,
      {
        "w-full": fullWidth,
        "opacity-60 pointer-events-none": isLoading || isDisabled,
      },
      className
    );

    // Content to be displayed inside the button
    const content = (
      <>
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2 inline-flex">{leftIcon}</span>
        )}
        {!isLoading && icon && iconPosition === "left" && (
          <span className="mr-2 inline-flex">{icon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="ml-2 inline-flex">{rightIcon}</span>
        )}
        {!isLoading && icon && iconPosition === "right" && (
          <span className="ml-2 inline-flex">{icon}</span>
        )}
      </>
    );

    // Render as link or button based on props
    if (asLink && href) {
      return (
        <a
          className={buttonStyles}
          href={href}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        className={buttonStyles}
        disabled={isDisabled || isLoading}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export { type ButtonProps, type BaseButtonProps };
export default Button;

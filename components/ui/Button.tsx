import {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Button variants using CVA with Tailwind utilities and design system tokens
const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-inverse hover:bg-primary-hover active:bg-primary-active focus-visible:ring-accent focus-visible:ring-offset-page",
        base:
          "bg-base text-default hover:bg-subtle active:bg-muted focus-visible:ring-base focus-visible:ring-offset-page",
        accent:
          "bg-accent text-inverse hover:bg-accent-hover active:bg-accent-active focus-visible:ring-accent focus-visible:ring-offset-page",
        black:
          "bg-dark-button text-inverse hover:bg-dark-button-hover active:bg-dark-button-active focus-visible:ring-white focus-visible:ring-offset-page",
        white:
          "bg-page text-default border border-default hover:bg-base active:bg-subtle focus-visible:ring-base focus-visible:ring-offset-page",
        outline:
          "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-inverse hover:border-primary-hover active:bg-primary-active active:border-primary-active focus-visible:ring-primary focus-visible:ring-offset-page",
        ghost:
          "bg-transparent text-base hover:bg-surface-hover hover:text-primary-hover active:bg-surface-active active:text-primary-active focus-visible:ring-base focus-visible:ring-offset-page",
        "ghost-accent":
          "bg-transparent text-accent hover:bg-accent-subtle hover:text-accent-hover active:bg-accent-subtle active:text-accent-active active:opacity-80 focus-visible:ring-accent focus-visible:ring-offset-page",
      },
      size: {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-3 text-base rounded-xl",
        lg: "px-8 py-4 text-lg rounded-xl",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// Base button properties
interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
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
      variant,
      size,
      fullWidth,
      isLoading = false,
      isDisabled = false,
      leftIcon,
      rightIcon,
      icon,
      iconPosition = "left",
      asLink,
      href,
      ...props
    },
    ref
  ) => {
    const buttonStyles = cn(
      buttonVariants({ variant, size, fullWidth }),
      {
        "opacity-60 pointer-events-none": isLoading || isDisabled,
      },
      className
    );

    // Content to be displayed inside the button
    const content = (
      <>
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {!isLoading && leftIcon && (
          <span className="inline-flex">{leftIcon}</span>
        )}
        {!isLoading && icon && iconPosition === "left" && (
          <span className="inline-flex">{icon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="inline-flex">{rightIcon}</span>
        )}
        {!isLoading && icon && iconPosition === "right" && (
          <span className="inline-flex">{icon}</span>
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

export { buttonVariants, type ButtonProps, type BaseButtonProps };
export default Button;

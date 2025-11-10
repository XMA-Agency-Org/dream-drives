// lib/animations/StaggerContainer.tsx
"use client";

import { motion } from "motion/react";
import { ReactNode, useRef, useEffect, useState } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number; // Delay between each child animation
  threshold?: number; // How much of container must be visible (0-1)
  className?: string;
}

/**
 * StaggerContainer Component
 *
 * Animates children in sequence with a stagger effect
 * Use with StaggerItem for individual child animations
 * Handles cases where element is already in view on mount (e.g., during navigation)
 *
 * @example
 * ```tsx
 * <StaggerContainer staggerDelay={0.15}>
 *   <StaggerItem>
 *     <Card>Item 1</Card>
 *   </StaggerItem>
 *   <StaggerItem>
 *     <Card>Item 2</Card>
 *   </StaggerItem>
 * </StaggerContainer>
 * ```
 */
export default function StaggerContainer({
  children,
  staggerDelay = 0.1,
  threshold = 0.1,
  className,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(ref.current);

    // Check immediately if already in view (for in-site navigation)
    const checkImmediately = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        const elementVisible = rect.top < windowHeight && rect.bottom > 0;

        if (elementVisible) {
          setIsVisible(true);
          observer.disconnect();
        }
      }
    };

    // Check after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(checkImmediately, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : undefined}
      whileInView={!isVisible ? "visible" : undefined}
      viewport={{ once: true, amount: threshold }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem Component
 *
 * Individual item to be animated within StaggerContainer
 * Must be a direct child of StaggerContainer
 */
export const StaggerItem = motion.div;

// Pre-configured variants for StaggerItem
export const staggerItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export const staggerItemFadeVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export const staggerItemSlideVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

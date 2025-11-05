// lib/animations/StaggerContainer.tsx
"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

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
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
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
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

export const staggerItemFadeVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

export const staggerItemSlideVariants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};


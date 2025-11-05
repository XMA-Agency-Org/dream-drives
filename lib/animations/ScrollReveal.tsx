// lib/animations/ScrollReveal.tsx
"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import {
  fadeUpVariant,
  fadeInVariant,
  slideLeftVariant,
  slideRightVariant,
  scaleVariant,
  slideUpVariant,
  slideDownVariant,
} from "./variants";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale" | "slideUp" | "slideDown";
  delay?: number;
  duration?: number;
  threshold?: number; // How much of element must be visible before animating (0-1)
  className?: string;
}

const variantMap = {
  fadeUp: fadeUpVariant,
  fadeIn: fadeInVariant,
  slideLeft: slideLeftVariant,
  slideRight: slideRightVariant,
  scale: scaleVariant,
  slideUp: slideUpVariant,
  slideDown: slideDownVariant,
};

/**
 * ScrollReveal Component
 * 
 * Animates children when they scroll into view
 * 
 * @example
 * ```tsx
 * <ScrollReveal variant="fadeUp" delay={0.2}>
 *   <h2>Your Content</h2>
 * </ScrollReveal>
 * ```
 */
export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // Custom ease for smooth animation
      }}
      variants={variantMap[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}


"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  const lightGradient = "repeating-linear-gradient(100deg, #ffffff 0%, #ffffff 7%, transparent 10%, transparent 12%, #ffffff 16%)";
  const darkGradient = "repeating-linear-gradient(100deg, #000000 0%, #000000 7%, transparent 10%, transparent 12%, #000000 16%)";
  const auroraGradient = "repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #c4b5fd 25%, #60a5fa 30%)";

  return (
    <>
      <style>{`
        @keyframes aurora-animation {
          from {
            background-position: 50% 50%, 50% 50%;
          }
          to {
            background-position: 350% 50%, 350% 50%;
          }
        }
        .aurora-base {
          background-size: 300%, 200%;
          background-position: 50% 50%, 50% 50%;
          background-image: ${lightGradient}, ${auroraGradient};
        }
        .dark .aurora-base {
          background-image: ${darkGradient}, ${auroraGradient};
        }
        .aurora-after {
          background-size: 200%, 100%;
          background-attachment: fixed;
          mix-blend-mode: difference;
          background-image: ${lightGradient}, ${auroraGradient};
          animation: aurora-animation 60s linear infinite;
        }
        .dark .aurora-after {
          background-image: ${darkGradient}, ${auroraGradient};
        }
      `}</style>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-base-50 dark:bg-base-950 text-default transition-colors",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden z-0">
          <div
            className={cn(
              "aurora-base pointer-events-none absolute -inset-[10px] opacity-70 will-change-transform",
              "filter blur-[10px] invert dark:invert-0",
              showRadialGradient &&
                "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
            )}
          >
            <div className="aurora-after absolute inset-0 dark:invert" />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};
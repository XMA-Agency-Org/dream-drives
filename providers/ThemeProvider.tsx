"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  forcedTheme = "dark",
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  forcedTheme?: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Always use the forced theme if provided
  const currentTheme = forcedTheme || theme;

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(currentTheme);
  }, [currentTheme]);

  const value = {
    theme: currentTheme,
    setTheme: (newTheme: Theme) => {
      // Only allow theme changes if not forced
      if (!forcedTheme) {
        setTheme(newTheme);
      }
    },
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

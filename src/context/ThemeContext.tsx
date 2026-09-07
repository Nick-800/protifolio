/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";

export type CrtTheme = "green" | "amber" | "cyan" | "rose";

export const AVAILABLE_CRT_THEMES: CrtTheme[] = ["green", "amber", "cyan", "rose"];

const STORAGE_KEY = "portfolio-theme";

interface ThemeContextType {
  theme: CrtTheme;
  setTheme: (theme: CrtTheme) => void;
  availableThemes: CrtTheme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyThemeToDocument = (theme: CrtTheme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("theme-amber", "theme-cyan", "theme-rose");
  if (theme !== "green") {
    root.classList.add(`theme-${theme}`);
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<CrtTheme>(() => {
    if (typeof window === "undefined") return "green";
    const saved = localStorage.getItem(STORAGE_KEY) as CrtTheme | null;
    if (saved && AVAILABLE_CRT_THEMES.includes(saved)) {
      return saved;
    }
    return "green";
  });

  useEffect(() => {
    applyThemeToDocument(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore localStorage write failures (e.g. incognito/sandboxed)
    }
  }, [theme]);

  const setTheme = (newTheme: CrtTheme) => {
    if (AVAILABLE_CRT_THEMES.includes(newTheme)) {
      setThemeState(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes: AVAILABLE_CRT_THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useCrtTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useCrtTheme must be used within a ThemeProvider");
  }
  return context;
};

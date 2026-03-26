/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { THEMES } from "../themes/config";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("google-club-theme");
    if (saved && Object.values(THEMES).includes(saved)) return saved;
    return THEMES.BASIC;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextTheme, setNextTheme] = useState(null);

  useEffect(() => {
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("google-club-theme", theme);
  }, [theme]);

  const setThemeWithTransition = (t) => {
    if (t === theme) return;
    setNextTheme(t);
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(t);
      setTimeout(() => {
        setIsTransitioning(false);
        setNextTheme(null);
      }, 300);
    }, 300);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        setThemeWithTransition,
        isTransitioning,
        nextTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

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

    useEffect(() => {
        // Remove all previous theme attributes
        document.documentElement.removeAttribute("data-theme");

        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("google-club-theme", theme);
    }, [theme]);

    // Specific sound effects manager could go here for Arcade theme
    useEffect(() => {
        if (theme === THEMES.ARCADE) {
            // Placeholder: Play arcade boot sound?
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

import { createContext, useContext, useEffect, useState } from "react";
import { THEMES } from "../themes/config";

const ThemeContext = createContext();

export { THEMES as themes };

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("google-club-theme") || THEMES.BASIC;
    });

    useEffect(() => {
        // Remove all previous theme attributes
        document.documentElement.removeAttribute("data-theme");

        // Apply new theme
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

import { BackgroundParticles } from "../components/BackgroundParticles";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { ThemeEffects } from "../components/ThemeEffects";
import { Navbar } from "../components/Navbar";

export function Layout({ children }) {
    return (
        <div className="min-h-screen text-foreground flex flex-col font-sans relative overflow-x-hidden transition-colors duration-500">
            <ThemeEffects />
            <BackgroundParticles />
            <Navbar />
            <main id="main-content" className="flex-grow pt-16 relative z-10">
                {children}
            </main>
            <ThemeSwitcher />
            <footer className="py-4 text-center text-muted-foreground text-sm border-t border-border relative z-10">
                <p>&copy; {new Date().getFullYear()} Google Club. Built by Students.</p>
            </footer>
        </div>
    );
}
export default Layout;

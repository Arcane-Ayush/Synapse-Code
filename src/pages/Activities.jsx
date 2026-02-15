// import { activities } from "../data/mockData"; // 🗑️ Deleted direct import
import { useData } from "../hooks/useData"; // 🆕 Generated Hook
import { useTheme } from "../context/ThemeContext";
import { THEMES as themes } from "../themes/config";
import SpaceActivityPass from "../themes/basic/SpaceActivityPass";
import ArcadeActivityCard from "../themes/arcade/ArcadeActivityCard";
import AnimeActivityCard from "../themes/anime/AnimeActivityCard";
import SEO from "../components/SEO";

export function Activities() {
    const { theme } = useTheme();
    const { activities, loading } = useData(); // 🎣 Hook usage

    // Auto-update status based on date
    const processedActivities = activities.map(activity => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today to midnight
        const activityDate = new Date(activity.date);

        // If date has passed, force status to Completed
        if (activityDate < today) {
            return { ...activity, status: "Completed" };
        }
        return activity;
    });

    // Sort: Active/Upcoming first (sorted by date asc), Completed last (sorted by date desc)
    const sortedActivities = [...processedActivities].sort((a, b) => {
        // First priority: Status (Completed goes to bottom)
        //didn't know we could do like this
        const isACompleted = a.status === "Completed";
        const isBCompleted = b.status === "Completed";

        if (isACompleted && !isBCompleted) return 1;
        if (!isACompleted && isBCompleted) return -1;

        // Now Dates-
        // If both are completed, show most recent first (Desc)
        // If both are upcoming, show soonest first (Asc)
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (isACompleted && isBCompleted) {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });

    return (
        <div className="container mx-auto px-4 py-12">
            <SEO
                title="Upcoming Events & Workshops — Google Club CU"
                description="Explore upcoming activities, workshops, and study jams at Google Club CU."
                image={import.meta.env.VITE_SITE_URL ? `${import.meta.env.VITE_SITE_URL}/og-activities.png` : undefined}
                url={import.meta.env.VITE_SITE_URL ? `${import.meta.env.VITE_SITE_URL}/activities` : undefined}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "Event",
                    "name": "Google Club CU Activities",
                    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
                    "eventStatus": "https://schema.org/EventScheduled",
                    "organizer": {
                        "@type": "Organization",
                        "name": "Google Club CU"
                    },
                    "url": import.meta.env.VITE_SITE_URL ? `${import.meta.env.VITE_SITE_URL}/activities` : ""
                }}
            />
            <div className="text-center mb-16">
                <h2 className={`text-5xl md:text-6xl font-black mb-4 ${theme === themes.ANIME ? "text-slate-800 drop-shadow-sm font-serif italic" :
                    theme === themes.ARCADE ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 uppercase tracking-tighter" :
                        "text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-500"
                    }`}>
                    {theme === themes.ANIME ? "Notice Board" : theme === themes.ARCADE ? "HIGH SCORES" : "MISSION_LOG"}
                </h2>
                <p className={`max-w-2xl mx-auto text-lg ${theme === themes.ANIME ? "text-slate-500 font-serif italic" :
                    theme === themes.ARCADE ? "text-pink-400 font-mono" :
                        "text-cyan-400/60"
                    }`}>
                    {theme === themes.ANIME ? "Choose your quest, adventurer!" :
                        theme === themes.ARCADE ? "SELECT LEVEL TO START" :
                            "Upcoming operations and deployment schedules."}
                </p>
            </div>

            <div className="space-y-6">
                {loading && (
                    <div className="grid md:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 animate-pulse h-40" />
                        ))}
                    </div>
                )}
                {sortedActivities.map((activity, index) => (
                    theme === themes.ANIME ? <AnimeActivityCard key={activity.id} activity={activity} index={index} /> :
                        theme === themes.ARCADE ? <ArcadeActivityCard key={activity.id} activity={activity} index={index} /> :
                            <SpaceActivityPass key={activity.id} activity={activity} index={index} />
                ))}
            </div>
        </div>
    );
}
export default Activities;

// import { activities } from "../data/mockData"; // 🗑️ Deleted direct import
import { useData } from "../hooks/useData"; // 🆕 Generated Hook
import { useTheme, themes } from "../context/ThemeContext";
import { SpaceActivityPass } from "../themes/basic/SpaceActivityPass";
import { ArcadeActivityCard } from "../themes/arcade/ArcadeActivityCard";
import { AnimeActivityCard } from "../themes/anime/AnimeActivityCard";

export function Activities() {
    const { theme } = useTheme();
    const { activities } = useData(); // 🎣 Hook usage

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
                {sortedActivities.map((activity, index) => (
                    theme === themes.ANIME ? <AnimeActivityCard key={activity.id} activity={activity} index={index} /> :
                        theme === themes.ARCADE ? <ArcadeActivityCard key={activity.id} activity={activity} index={index} /> :
                            <SpaceActivityPass key={activity.id} activity={activity} index={index} />
                ))}
            </div>
        </div>
    );
}

import { activities } from "../data/mockData";
import { useTheme, themes } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, QrCode, Ticket, ScanLine, Tag, Gamepad2, Sparkles } from "lucide-react";

// Helper to format ISO date to "MMM DD, YYYY"
const formatDate = (isoDate) => {
    try {
        return new Date(isoDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch (e) {
        return isoDate;
    }
};

// --- SPACE THEME: Holographic Boarding Pass ---
function SpaceActivityPass({ activity, index }) {
    const isCompleted = activity.status === "Completed";

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className={`relative w-full max-w-4xl mx-auto mb-8 flex flex-col md:flex-row bg-black/40 border backdrop-blur-md overflow-hidden group transition-all duration-300 ${isCompleted
                ? "border-slate-800/50 grayscale opacity-60"
                : "border-cyan-500/30 hover:border-cyan-400/60"
                }`}
        >
            {/* Holographic Overlay - disabled if completed */}
            {!isCompleted && (
                <>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine pointer-events-none"></div>
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50"></div>
                </>
            )}

            <div className={`flex-1 p-6 md:p-8 relative ${isCompleted && "text-slate-500"}`}>
                <div className={`absolute top-2 left-2 w-3 h-3 border-t border-l ${isCompleted ? "border-slate-700" : "border-cyan-500/50"}`}></div>
                <div className={`absolute bottom-2 left-2 w-3 h-3 border-b border-l ${isCompleted ? "border-slate-700" : "border-cyan-500/50"}`}></div>

                <div className="flex items-center gap-3 mb-6">
                    <div className={`border px-3 py-1 text-xs font-mono flex items-center gap-2 ${isCompleted ? "bg-slate-900 border-slate-700 text-slate-500" : "bg-cyan-950/50 border-cyan-500/30 text-cyan-400"
                        }`}>
                        <ScanLine size={12} />
                        PASS_ID // {activity.id.toString().padStart(4, '0')}
                    </div>
                    <div className={`text-xs font-bold uppercase tracking-wider px-2 py-1 border ${isCompleted ? "text-slate-500 border-slate-700" :
                        activity.status === "Upcoming" ? "text-green-400 bg-green-950/30 border-green-500/30" : "text-gray-500 border-gray-500/30"
                        }`}>
                        [{activity.status}]
                    </div>
                </div>

                <h3 className={`text-2xl md:text-3xl font-black mb-4 tracking-tight ${isCompleted ? "text-slate-600 uppercase" : "text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-blue-200"
                    }`}>
                    {activity.title}
                </h3>

                <div className={`grid grid-cols-2 gap-4 text-sm font-mono mb-6 ${isCompleted ? "text-slate-600" : "text-cyan-300/80"}`}>
                    <div className="flex items-center gap-2">
                        <Calendar size={14} className={isCompleted ? "text-slate-600" : "text-cyan-500"} />
                        <span>DATE: {formatDate(activity.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={14} className={isCompleted ? "text-slate-600" : "text-cyan-500"} />
                        <span>TIME: {activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                        <MapPin size={14} className={isCompleted ? "text-slate-600" : "text-cyan-500"} />
                        <span>SECTOR: {activity.location}</span>
                    </div>
                </div>

                <p className={`text-sm leading-relaxed font-light border-l-2 pl-4 ${isCompleted ? "text-slate-600 border-slate-700" : "text-cyan-100/60 border-cyan-500/20"
                    }`}>
                    {activity.description}
                </p>
            </div>

            <div className={`relative w-full md:w-px h-px md:h-auto ${isCompleted ? "bg-slate-800" : "bg-cyan-900/50"}`}>
                <div className="absolute inset-0 flex md:flex-col justify-between items-center overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-1 h-1 md:w-1.5 md:h-1.5 bg-black rounded-full my-1 mx-1"></div>
                    ))}
                </div>
            </div>

            <div className={`w-full md:w-64 p-6 flex flex-col items-center justify-center relative border-l ${isCompleted ? "bg-slate-900/50 border-slate-800" : "bg-cyan-950/20 border-cyan-500/20"
                }`}>
                <div className="text-center space-y-4">
                    <div className={`w-24 h-24 rounded-lg border flex items-center justify-center ${isCompleted ? "bg-slate-900 border-slate-700" : "bg-white/10 border-cyan-500/30"
                        }`}>
                        <QrCode size={48} className={`opacity-80 ${isCompleted ? "text-slate-700" : "text-cyan-400"}`} />
                    </div>
                    <div className={`font-mono text-[10px] text-center tracking-widest opacity-70 ${isCompleted ? "text-slate-600" : "text-cyan-500"}`}>
                        {isCompleted ? "EXPIRED_PASS" : "SCAN_FOR_ENTRY"}
                    </div>

                    {isCompleted ? (
                        <button disabled className="w-full flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 text-slate-500 text-xs font-bold uppercase py-2 px-4 rounded cursor-not-allowed">
                            <Ticket size={14} /> EXPIRED
                        </button>
                    ) : activity.status === "Planned" ? (
                        <button disabled className="w-full flex items-center justify-center gap-2 bg-cyan-950/30 border border-cyan-500/10 text-cyan-500/50 text-xs font-bold uppercase py-2 px-4 rounded cursor-not-allowed">
                            <Ticket size={14} /> TBA_SOON
                        </button>
                    ) : (
                        <a href={activity.link || "#"} target="_blank" rel="noopener noreferrer" className="block w-full">
                            <button className="w-full flex items-center justify-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-xs font-bold uppercase py-2 px-4 rounded transition-all">
                                <Ticket size={14} /> RSVP_NOW
                            </button>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// --- ARCADE THEME: Retro Game Ticket ---
function ArcadeActivityCard({ activity, index }) {
    const isCompleted = activity.status === "Completed";

    return (
        <motion.div
            initial={{ opacity: 0, x: -50, rotate: isCompleted ? 0 : -1 }}
            animate={{ opacity: 1, x: 0, rotate: isCompleted ? 0 : 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={!isCompleted ? { scale: 1.02, rotate: 1 } : {}}
            className={`relative w-full max-w-4xl mx-auto mb-8 flex flex-col md:flex-row border-2 border-dashed shadow-[4px_4px_0px_rgba(0,0,0,1)] overflow-hidden group font-mono ${isCompleted
                ? "bg-slate-800 border-slate-600 grayscale opacity-80"
                : "bg-slate-900 border-pink-500 shadow-[4px_4px_0px_rgba(236,72,153,1)]"
                }`}
        >
            {/* Left Stub */}
            <div className={`hidden md:flex w-16 items-center justify-center border-r-2 border-dashed relative ${isCompleted ? "bg-slate-700 border-slate-600" : "bg-pink-500 border-slate-900"
                }`}>
                <span className={`transform -rotate-90 font-black tracking-[0.2em] whitespace-nowrap text-xl ${isCompleted ? "text-slate-500" : "text-slate-900"
                    }`}>
                    {isCompleted ? "USED" : "ADMIT ONE"}
                </span>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 relative">
                <div className={`absolute top-2 right-2 text-[10px] font-bold border px-2 rounded ${isCompleted ? "text-slate-500 border-slate-500" : "text-pink-500 border-pink-500"
                    }`}>
                    CREDITS: {isCompleted ? "0" : "FREE"}
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <Gamepad2 className={isCompleted ? "text-slate-600" : "text-yellow-400 animate-bounce"} size={24} />
                    <span className={`font-bold text-sm tracking-widest ${isCompleted ? "text-slate-500" : "text-green-400"}`}>
                        LEVEL {activity.id}
                    </span>
                </div>

                <h3 className={`text-2xl md:text-4xl font-black mb-4 uppercase tracking-tighter ${isCompleted ? "text-slate-500 line-through decoration-2" : "text-white"
                    }`} style={!isCompleted ? { textShadow: "2px 2px 0px #ec4899" } : {}}>
                    {activity.title}
                </h3>

                <div className={`flex flex-wrap gap-4 text-sm mb-6 font-bold ${isCompleted ? "text-slate-600" : "text-cyan-300"}`}>
                    <span className="bg-slate-800/50 px-2 py-1">📅 {formatDate(activity.date)}</span>
                    <span className="bg-slate-800/50 px-2 py-1">⏰ {activity.time}</span>
                </div>

                {isCompleted ? (
                    <div className="font-black text-3xl text-slate-700 uppercase tracking-widest border-4 border-slate-700 inline-block px-4 py-2 transform -rotate-6 mask-image-grunge">
                        GAME OVER
                    </div>
                ) : (
                    <div className="flex gap-2">
                        {activity.tags?.map(tag => (
                            <span key={tag} className="text-xs text-pink-500 border border-pink-500/50 px-2 py-1 rounded hover:bg-pink-500 hover:text-white transition-colors cursor-pointer">
                                #{tag.toUpperCase()}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Action */}
            <div className={`w-full md:w-32 border-l-2 border-dashed flex items-center justify-center p-4 ${isCompleted ? "bg-slate-800 border-slate-600" : "bg-slate-800 border-pink-500"
                }`}>
                {isCompleted ? (
                    <button disabled className="w-full h-full border-2 border-slate-600 text-slate-600 font-black uppercase text-xl cursor-not-allowed">
                        DONE
                    </button>
                ) : activity.status === "Planned" ? (
                    <button disabled className="w-full h-full border-2 border-slate-700 text-slate-500 font-black uppercase text-xl cursor-not-allowed opacity-50">
                        LOCKED
                    </button>
                ) : (
                    <a href={activity.link || "#"} target="_blank" rel="noopener noreferrer" className="w-full h-full block">
                        <button className="w-full h-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-slate-900 font-black uppercase text-xl transition-all shadow-[0_0_10px_rgba(34,197,94,0.5)] hover:shadow-[0_0_20px_rgba(34,197,94,1)]">
                            JOIN
                        </button>
                    </a>
                )}
            </div>
        </motion.div>
    );
}

// --- ANIME THEME: Guild Quest Card ---
function AnimeActivityCard({ activity, index }) {
    const isCompleted = activity.status === "Completed";
    const colors = [
        "border-pink-300", "border-blue-300", "border-purple-300", "border-yellow-300", "border-green-300"
    ];
    const borderColor = isCompleted ? "border-slate-300" : colors[activity.id % colors.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative w-full max-w-4xl mx-auto mb-8 rounded-xl shadow-md border-l-8 ${borderColor} p-6 md:p-8 flex flex-col md:flex-row gap-6 transition-all group ${isCompleted
                ? "bg-slate-100 opacity-75 shadow-none"
                : "bg-white hover:shadow-xl"
                }`}
        >
            {/* "Stamp" Effect */}
            <div className="absolute top-4 right-6 transform rotate-12 opacity-80 pointer-events-none z-10">
                <div className={`border-4 border-dashed rounded-full px-4 py-1 font-black text-xl uppercase tracking-widest ${isCompleted
                    ? "border-slate-400 text-slate-500 opacity-50"
                    : activity.status === "Upcoming" ? "border-green-400 text-green-500" : "border-slate-300 text-slate-400"
                    }`}>
                    {isCompleted ? "CLOSED" : activity.status === "Upcoming" ? "OPEN" : "CLOSED"}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={16} className={isCompleted ? "text-slate-400" : "text-yellow-400"} />
                    <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Quest Rank B</span>
                </div>

                <h3 className={`text-3xl font-black mb-4 font-serif transition-colors ${isCompleted ? "text-slate-500 line-through decoration-slate-400" : "text-slate-800 group-hover:text-pink-600"
                    }`}>
                    {activity.title}
                </h3>

                <p className={`mb-6 p-4 rounded-lg italic border-l-2 ${isCompleted ? "bg-slate-200/50 text-slate-400 border-slate-300" : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}>
                    "{activity.description}"
                </p>

                <div className={`flex flex-wrap gap-x-8 gap-y-2 text-sm font-bold ${isCompleted ? "text-slate-400" : "text-slate-500"}`}>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className={isCompleted ? "text-slate-400" : "text-pink-400"} /> {formatDate(activity.date)}
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-col justify-end">
                {isCompleted ? (
                    <button disabled className="bg-slate-300 text-slate-500 font-bold py-3 px-8 rounded-lg cursor-not-allowed">
                        Completed
                    </button>
                ) : activity.status === "Planned" ? (
                    <button disabled className="bg-slate-100 text-slate-400 font-bold py-3 px-8 rounded-lg cursor-not-allowed">
                        Coming Soon
                    </button>
                ) : (
                    <a href={activity.link || "#"} target="_blank" rel="noopener noreferrer">
                        <button className="bg-slate-800 text-white font-bold py-3 px-8 rounded-lg shadow hover:bg-pink-500 hover:shadow-lg hover:-translate-y-1 transition-all w-full md:w-auto">
                            Accept Quest
                        </button>
                    </a>
                )}
            </div>
        </motion.div>
    );
}

export function Activities() {
    const { theme } = useTheme();

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

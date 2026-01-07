import { leaderboard, currentSprint } from "../data/mockData";
import { Trophy, CheckCircle, Circle, Clock, Skull, Crosshair, Award, Activity, Signal, Cpu, Target, Radar } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme, themes } from "../context/ThemeContext";

function ArcadeKanban({ tasks }) {
    const columns = [
        { id: "Todo", title: "WANTED", icon: Skull, color: "text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]", border: "border-red-500/50", bg: "bg-red-950/40" },
        { id: "In Progress", title: "IN PURSUIT", icon: Crosshair, color: "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]", border: "border-yellow-400/50", bg: "bg-yellow-950/40" },
        { id: "Done", title: "CAPTURED", icon: Award, color: "text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]", border: "border-green-400/50", bg: "bg-green-950/40" }
    ];

    return (
        <div className="mt-8 font-mono">
            <div className="relative mb-8 text-center">
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 animate-pulse tracking-widest uppercase" style={{ textShadow: "0 0 20px rgba(0,255,100,0.5)" }}>
                    BOUNTY BOARD
                </h2>
                <div className="absolute top-1/2 left-0 w-full h-px bg-green-500/30 -z-10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {columns.map((col) => {
                    const colTasks = tasks.filter(t => t.status === col.id);
                    const ColIcon = col.icon;
                    return (
                        <div key={col.id} className={`p-4 rounded-lg border-2 border-dashed ${col.border} ${col.bg} relative overflow-hidden group`}>
                            {/* Scanline Effect - Reduced opacity for visibility */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-10"></div>

                            <div className="flex items-center justify-between mb-4 border-b border-inherit pb-2">
                                <h3 className={`text-xl font-bold flex items-center gap-2 ${col.color}`}>
                                    <ColIcon className="w-6 h-6" /> {col.title}
                                </h3>
                                <span className="text-xs bg-black/50 px-2 py-1 rounded border border-inherit text-inherit text-white font-bold">
                                    {colTasks.length}
                                </span>
                            </div>

                            <div className="space-y-4">
                                {colTasks.map((task) => (
                                    <motion.div
                                        key={task.id}
                                        whileHover={{ scale: 1.02, rotate: 1 }}
                                        className={`bg-black/90 border ${col.border} p-4 relative shadow-[0_0_20px_rgba(0,0,0,0.6)]`}
                                    >
                                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-inherit border border-inherit transform rotate-45"></div>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">REWARD</span>
                                            <span className={`text-lg font-black ${col.color}`}>{task.points}</span>
                                        </div>
                                        <h4 className="font-bold text-white text-lg mb-2 leading-tight tracking-wide">{task.title}</h4>
                                        <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-800 pt-2 mt-2 font-mono">
                                            <span className="text-gray-300">TARGET: {task.assignedTo}</span>
                                            <span className="opacity-50">ID: #{task.id.toString().padStart(4, '0')}</span>
                                        </div>
                                    </motion.div>
                                ))}
                                {colTasks.length === 0 && (
                                    <div className="text-center py-8 text-gray-600 font-bold italic opacity-50">
                                        NO TARGETS
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function AnimePodium({ leaderboard }) {
    const sorted = [...leaderboard].sort((a, b) => b.points - a.points);
    const top3 = [sorted[1], sorted[0], sorted[2]].filter(Boolean);
    const others = sorted.slice(3);

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="flex justify-center items-end gap-4 md:gap-8 h-[450px] mb-12">
                {top3.map((team, index) => {
                    const isFirst = index === 1;
                    const isSecond = index === 0;
                    const isThird = index === 2;
                    let height = isFirst ? "h-72 md:h-96" : isSecond ? "h-56 md:h-72" : "h-40 md:h-56";
                    let color = isFirst ? "bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-400 border-yellow-200"
                        : isSecond ? "bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-slate-200"
                            : "bg-gradient-to-b from-orange-300 via-orange-400 to-red-400 border-orange-200";
                    let glow = isFirst ? "shadow-[0_20px_50px_rgba(250,204,21,0.4)]" : "shadow-xl";
                    let delay = isFirst ? 0.4 : isSecond ? 0.2 : 0.6;
                    let rankColor = isFirst ? "text-yellow-600" : isSecond ? "text-slate-600" : "text-orange-700";

                    return (
                        <motion.div
                            key={team.name}
                            initial={{ y: 200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay, type: "spring", stiffness: 80, damping: 15 }}
                            className={`relative flex flex-col items-center justify-end w-1/3 max-w-[200px] rounded-t-3xl border-t-4 border-x border-white/40 ${height} ${color} ${glow} group`}
                        >
                            <motion.div
                                initial={{ y: 20 }}
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: delay }}
                                className="absolute -top-20 flex flex-col items-center w-full"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50"></div>
                                    <img src={team.avatar} alt={team.name} className="relative w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg object-cover bg-white" />
                                    <div className={`absolute -bottom-3 -right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-xl shadow-lg ${rankColor}`}>
                                        {team.rank}
                                    </div>
                                </div>
                                <h3 className="mt-3 text-sm md:text-lg font-bold text-slate-800 bg-white/90 px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                                    {team.name}
                                </h3>
                            </motion.div>
                            <div className="mb-8 text-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 mx-4 w-3/4">
                                <span className="block text-2xl md:text-4xl font-black text-white drop-shadow-md">{team.points}</span>
                                <span className="text-xs uppercase tracking-widest text-white/90 font-bold">Points</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 mb-16">
                <h4 className="text-xl font-bold mb-6 text-slate-700 flex items-center gap-2">
                    <span className="bg-slate-100 p-2 rounded-lg">🎖️</span> Honorable Mentions
                </h4>
                <div className="flex gap-6 overflow-x-auto pb-4 px-2 no-scrollbar">
                    {others.map((team, i) => (
                        <motion.div
                            key={team.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + (i * 0.1) }}
                            className="flex-shrink-0 w-72 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-pink-200 hover:shadow-lg transition-all flex items-center gap-4 group cursor-pointer"
                        >
                            <span className="font-black text-3xl text-slate-200 group-hover:text-pink-400 transition-colors">#{team.rank}</span>
                            <img src={team.avatar} alt={team.name} className="w-12 h-12 rounded-full bg-white shadow-sm" />
                            <div>
                                <p className="font-bold text-slate-700 text-lg">{team.name}</p>
                                <p className="text-sm text-slate-500 font-medium">{team.points} pts</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SpaceTelemetry({ leaderboard, currentSprint }) {
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.points - a.points);
    const maxPoints = sortedLeaderboard[0]?.points || 1;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-mono text-cyan-500">
            {/* Fleet Status (Leaderboard) */}
            <div className="border border-cyan-900/50 rounded-md bg-black/60 backdrop-blur-sm p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-[10px] text-cyan-700 border-l border-b border-cyan-900/50">SYSTEM_MONITOR_V2</div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-cyan-400">
                    <Radar className="animate-spin-slow" /> FLEET_STATUS
                </h2>

                <div className="space-y-4">
                    {sortedLeaderboard.map((team, index) => (
                        <motion.div
                            key={team.name}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "100%", opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative border-b border-cyan-900/30 pb-2"
                        >
                            <div className="flex items-center justify-between mb-1 z-10 relative">
                                <div className="flex items-center gap-3">
                                    <span className="text-cyan-600 font-bold text-sm">[{String(index + 1).padStart(2, '0')}]</span>
                                    <span className="text-cyan-100 font-bold">{team.name}</span>
                                </div>
                                <span className="text-cyan-400">{team.points} SU</span>
                            </div>
                            {/* Signal Bar Visual */}
                            <div className="h-1 bg-cyan-950 w-full mt-1 relative overflow-hidden">
                                <motion.div
                                    className="h-full bg-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(team.points / maxPoints) * 100}%` }}
                                    transition={{ duration: 1, ease: "circOut" }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Mission Relay (Current Sprint) */}
            <div className="border border-cyan-900/50 rounded-md bg-black/60 backdrop-blur-sm p-6 relative">
                <div className="flex justify-between items-start mb-6 border-b border-cyan-900/50 pb-4">
                    <div>
                        <div className="text-[10px] text-cyan-600 tracking-widest mb-1">MISSION_OBJECTIVE</div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Target size={18} className="text-red-500" /> {currentSprint.title}
                        </h3>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-cyan-600 tracking-widest mb-1">T-MINUS</div>
                        <span className="text-cyan-300 font-bold border border-cyan-500/30 px-2 py-1 bg-cyan-950/30">{currentSprint.deadline}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {currentSprint.tasks.map((task, i) => (
                        <div key={task.id} className="bg-cyan-950/10 border border-cyan-900/30 p-3 flex items-center justify-between group hover:border-cyan-500/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-black border border-cyan-900/50 text-cyan-400">
                                    {task.status === "Done" ? <Activity size={16} className="text-green-500" />
                                        : task.status === "In Progress" ? <Cpu size={16} className="text-cyan-400 animate-pulse" />
                                            : <Signal size={16} className="text-gray-500" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 border ${task.status === "Done" ? "border-green-500/50 text-green-400" :
                                            task.status === "In Progress" ? "border-cyan-500/50 text-cyan-400" :
                                                "border-gray-500/50 text-gray-400"
                                            }`}>
                                            {task.status === "Done" ? "OPTIMAL" : task.status === "In Progress" ? "PROCESSING" : "STANDBY"}
                                        </span>
                                        <span className="text-xs text-cyan-800">ID: {task.id}</span>
                                    </div>
                                    <h4 className="text-sm font-medium text-cyan-100">{task.title}</h4>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-cyan-700">PAYLOAD</div>
                                <div className="text-cyan-300 font-bold">{task.points}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function Sprints() {
    const { theme } = useTheme();

    return (
        <div className="container mx-auto px-4 py-12">

            {/* Conditional Rendering */}
            {theme === themes.ARCADE ? (
                <div className="space-y-12">
                    {/* Arcade Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl font-black text-green-400 tracking-tighter drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]">
                            SPRINT_LOG_V.0.4
                        </h1>
                        <p className="text-green-400 font-mono text-sm max-w-2xl mx-auto border-l-2 border-r-2 border-green-500/50 px-4 bg-green-950/30 py-2">
                            CURRENT OBJECTIVE: <span className="text-white font-bold">{currentSprint.title}</span>
                            <br />
                            DEADLINE: <span className="text-white font-bold">{currentSprint.deadline}</span>
                        </p>
                    </div>

                    <ArcadeKanban tasks={currentSprint.tasks} />

                    {/* Arcade Leaderboard */}
                    <div className="max-w-4xl mx-auto border-4 border-double border-purple-500/50 p-6 bg-black/90 relative shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black px-6 py-1 text-purple-400 font-bold tracking-widest border border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                            TOP PLAYERS
                        </div>
                        <div className="space-y-3 font-mono mt-2">
                            {leaderboard.map((team, index) => (
                                <div key={team.name} className="flex items-center justify-between border-b border-purple-900/30 pb-2 hover:bg-purple-900/20 transition px-2 rounded">
                                    <div className="flex items-center gap-4">
                                        <span className={`text-xl font-bold ${index === 0 ? "text-yellow-400 drop-shadow-md" : "text-gray-500"}`}>
                                            #{team.rank}
                                        </span>
                                        <span className="text-gray-300 font-bold">{team.name}</span>
                                    </div>
                                    <span className="text-purple-400 font-bold tracking-wider">{team.points} <span className="text-xs opacity-50 text-white">XP</span></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : theme === themes.ANIME ? (
                <div className="space-y-16">
                    {/* Anime Header */}
                    <div className="text-center">
                        <span className="inline-block px-5 py-1.5 rounded-full bg-pink-100 text-pink-600 text-sm font-bold tracking-widest mb-6 border border-pink-200 shadow-sm">
                            LEADERBOARD
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-800 drop-shadow-sm mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                            Hall of Fame <span className="inline-block animate-bounce">👑</span>
                        </h2>
                        <p className="text-slate-500 font-medium text-lg">Celebrate our top achievers!</p>
                    </div>

                    <AnimePodium leaderboard={leaderboard} />

                    {/* Current Quest */}
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-6 mb-10">
                            <h3 className="text-3xl font-black text-slate-800">Current Quest</h3>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full"></div>
                            <span className="text-sm font-bold bg-white px-4 py-2 rounded-full text-pink-500 shadow-sm border border-slate-100">
                                📅 Deadline: {currentSprint.deadline}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {currentSprint.tasks.map((task, i) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 group"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${task.status === "Done" ? "bg-green-100 text-green-700" :
                                            task.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                                                "bg-slate-100 text-slate-600"
                                            }`}>
                                            {task.status}
                                        </span>
                                        <span className="font-black text-2xl text-slate-200 group-hover:text-pink-200 transition-colors">#{task.id}</span>
                                    </div>
                                    <h4 className="font-bold text-xl text-slate-800 mb-3 leading-snug">{task.title}</h4>
                                    <p className="text-sm text-slate-500 mb-6 font-medium">Assigned to <span className="font-bold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-md">{task.assignedTo}</span></p>

                                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Reward</span>
                                        <div className="flex items-center gap-2 font-black text-yellow-500 text-lg bg-yellow-50 px-3 py-1 rounded-lg">
                                            <Trophy size={16} /> {task.points}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <SpaceTelemetry leaderboard={leaderboard} currentSprint={currentSprint} />
            )}
        </div>
    );
}

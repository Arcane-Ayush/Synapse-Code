import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

export function AnimeQuestBoard({ currentSprint }) {
    return (
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
    )
}

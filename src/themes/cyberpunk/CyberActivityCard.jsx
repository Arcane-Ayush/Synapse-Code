import CyberCard from "./CyberCard";
import GlitchText from "./GlitchText";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";

export default function CyberActivityCard({ activity }) {
  const isUpcoming = activity.status === "Upcoming";

  return (
    <Link to={`/activities/${activity.id}`} className="block">
      <CyberCard
        className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center cursor-pointer"
        glowColor={isUpcoming ? "#ffff00" : "#0ea5e9"}
      >
        {/* Date Box */}
        <div className="flex-shrink-0 w-full md:w-24 text-center border border-white/20 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Date
          </div>
          <div className="text-lg font-bold font-mono text-cyan-300">
            {activity.date}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start gap-4">
            <GlitchText
              text={activity.title}
              as="h3"
              className="text-xl text-white font-bold"
            />

            <span
              className={cn(
                "px-3 py-1 text-xs font-bold uppercase tracking-wider border rounded-full shadow-[0_0_10px_inset]",
                isUpcoming
                  ? "border-yellow-400 text-yellow-400 bg-yellow-400/10 shadow-yellow-400/20"
                  : "border-cyan-500 text-cyan-400 bg-cyan-500/10 shadow-cyan-500/20",
              )}
            >
              {activity.status}
            </span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
            {activity.description}
          </p>

          <div className="flex gap-2 mt-3">
            {activity.tags?.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </CyberCard>
    </Link>
  );
}

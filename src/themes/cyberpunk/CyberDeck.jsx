/* eslint-disable no-unused-vars */
import CyberCard from "./CyberCard";
import { motion } from "framer-motion";

export default function CyberDeck({ projects }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {projects.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <CyberCard className="h-full flex flex-col group">
            <div className="relative h-48 overflow-hidden rounded-t-xl">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />

              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-lg font-bold text-white font-[Orbitron] tracking-wide truncate">
                  {p.title}
                </h3>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <p className="text-sm text-gray-300 mb-4 line-clamp-2 font-mono">
                {p.description}
              </p>

              <div className="mt-auto flex gap-2 flex-wrap">
                {p.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase px-2 py-1 border border-cyan-500/30 text-cyan-400 rounded bg-cyan-950/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </CyberCard>
        </motion.div>
      ))}
    </div>
  );
}

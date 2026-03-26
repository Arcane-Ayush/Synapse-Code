import { useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { THEMES as themes } from "../themes/config";
import matter from "gray-matter";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

// Fetch all markdown files from src/content/blog
const modules = import.meta.glob("../content/blog/*.md", {
  as: "raw",
  eager: true,
});

const parsedPosts = Object.entries(modules).map(([path, content]) => {
  const { data } = matter(content);
  const slug = path.split("/").pop().replace(".md", "");
  return { ...data, slug };
});

// Sort by date descending
parsedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

export default function Blog() {
  const { theme } = useTheme();
  const [filter, setFilter] = useState("All");
  const posts = parsedPosts;

  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const filteredPosts =
    filter === "All" ? posts : posts.filter((p) => p.category === filter);

  const getStyles = () => {
    switch (theme) {
      case themes.ARCADE:
        return {
          container: "bg-black min-h-screen text-[#00ff00] font-mono p-8 pt-24",
          header:
            "text-4xl md:text-6xl text-center mb-12 uppercase tracking-widest text-[#df00ff] drop-shadow-[0_0_10px_#df00ff]",
          filterBtn: (active) =>
            `px-4 py-2 border-2 border-[#df00ff] mr-4 mb-4 uppercase hover:bg-[#df00ff] hover:text-black transition-colors ${active ? "bg-[#df00ff] text-black" : "bg-transparent text-[#df00ff]"}`,
          card: "bg-black border-4 border-[#00ff00] p-6 relative hover:shadow-[0_0_20px_#00ff00] transition-shadow",
          cardTitle: "text-xl font-bold text-[#df00ff] mb-2 uppercase",
          cardMeta: "text-xs text-[#00ff00]/70 mb-4 flex gap-4 uppercase",
          readMore:
            "inline-flex items-center gap-2 text-[#df00ff] hover:text-white uppercase font-bold mt-4",
        };
      case themes.BASIC:
        return {
          container:
            "bg-neutral-950 min-h-screen text-white font-sans p-8 pt-24",
          header:
            "text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight",
          filterBtn: (active) =>
            `px-5 py-2 rounded-full mr-3 mb-4 text-sm font-medium transition-all ${active ? "bg-white text-black" : "bg-neutral-900 text-neutral-400 hover:text-white border border-white/10"}`,
          card: "group bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1",
          cardTitle:
            "text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors",
          cardMeta: "text-sm text-neutral-400 mb-4 flex gap-4",
          readMore:
            "inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium mt-4",
        };
      default: // Anime / Sakura
        return {
          container: "bg-slate-900 min-h-screen text-white font-sans p-8 pt-24",
          header:
            "text-5xl md:text-7xl text-center mb-16 font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 transform -skew-x-6",
          filterBtn: (active) =>
            `px-6 py-2 rounded-lg mr-4 mb-4 font-bold italic transform skew-x-12 transition-all ${active ? "bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg" : "bg-white/10 text-pink-200 hover:bg-white/20"}`,
          card: "bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]",
          cardTitle: "text-2xl font-bold text-pink-200 mb-2 italic",
          cardMeta: "text-sm text-violet-200 mb-4 flex gap-4",
          readMore:
            "inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 font-bold italic mt-4",
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={styles.container}>
      <div className="max-w-6xl mx-auto">
        <Motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.header}
        >
          {theme === themes.ARCADE ? "NEWS FEED" : "Blog & Updates"}
        </Motion.h1>

        {/* Categories */}
        <div className="flex flex-wrap justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={styles.filterBtn(filter === cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <Motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`} className="block h-full">
                <article className={`h-full flex flex-col ${styles.card}`}>
                  {post.image && (
                    <div className="aspect-video w-full overflow-hidden mb-4 rounded-lg bg-gray-800">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-4 pt-0">
                    <div className={styles.cardMeta}>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {post.readingTime}
                      </span>
                    </div>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <p className="opacity-70 line-clamp-3 mb-4 text-sm leading-relaxed">
                      {post.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs opacity-60">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <span className={styles.readMore}>
                        Read <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

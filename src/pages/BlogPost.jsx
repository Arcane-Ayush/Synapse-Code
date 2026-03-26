import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { THEMES as themes } from "../themes/config";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ArrowLeft, Calendar, Clock, User, Share2, Copy } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();
  const { theme } = useTheme();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        // In Vite, we can't dynamic import with variable easily for markdown as raw
        // So we glob all and find match
        const modules = import.meta.glob("../content/blog/*.md", {
          as: "raw",
          eager: true,
        });

        // Find file that ends with /slug.md
        const match = Object.entries(modules).find(([path]) =>
          path.endsWith(`/${slug}.md`),
        );

        if (match) {
          const fileContent = match[1];
          const { data, content } = matter(fileContent);
          setPost(data);
          setContent(content);
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Post not found
      </div>
    );

  const getStyles = () => {
    // Base styles for markdown content
    const markdownBase = "prose prose-lg max-w-none mb-16";

    switch (theme) {
      case themes.ARCADE:
        return {
          container: "bg-black min-h-screen text-[#00ff00] font-mono p-8 pt-24",
          header:
            "text-4xl md:text-5xl font-bold mb-8 uppercase text-[#df00ff] drop-shadow-[0_0_5px_#df00ff]",
          meta: "flex flex-wrap gap-6 text-sm mb-12 border-b-2 border-[#00ff00] pb-8 text-[#00ff00]",
          markdown: `${markdownBase} prose-headings:text-[#df00ff] prose-p:text-[#00ff00] prose-strong:text-[#df00ff] prose-a:text-yellow-400 prose-code:text-yellow-400 prose-pre:border-2 prose-pre:border-[#00ff00]`,
          backBtn:
            "inline-flex items-center gap-2 text-[#df00ff] hover:text-white mb-8 uppercase font-bold",
        };
      case themes.BASIC:
        return {
          container:
            "bg-neutral-950 min-h-screen text-white font-sans p-8 pt-24",
          header: "text-4xl md:text-5xl font-bold mb-8 tracking-tight",
          meta: "flex flex-wrap gap-6 text-sm mb-12 border-b border-white/10 pb-8 text-neutral-400",
          markdown: `${markdownBase} prose-invert prose-headings:text-white prose-a:text-blue-400 prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-white/10`,
          backBtn:
            "inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors",
        };
      default: // Anime
        return {
          container: "bg-slate-900 min-h-screen text-white font-sans p-8 pt-24",
          header:
            "text-5xl md:text-6xl font-black italic mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500",
          meta: "flex flex-wrap gap-6 text-sm mb-12 border-b-2 border-pink-500/20 pb-8 text-pink-200 italic",
          markdown: `${markdownBase} prose-invert prose-headings:text-pink-300 prose-headings:italic prose-a:text-pink-400 prose-strong:text-violet-300 prose-blockquote:border-l-pink-500`,
          backBtn:
            "inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 mb-8 font-bold italic",
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={styles.container}>
      <article className="max-w-4xl mx-auto">
        <Link to="/blog" className={styles.backBtn}>
          <ArrowLeft size={20} /> Back to Blog
        </Link>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {post.image && (
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-gray-800">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className={styles.header}>{post.title}</h1>

          <div className={styles.meta}>
            <span className="flex items-center gap-2">
              <Calendar size={16} /> {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} /> {post.readingTime} read
            </span>
            <span className="flex items-center gap-2">
              <User size={16} /> {post.author}
            </span>
            <div className="ml-auto flex gap-4">
              <button
                onClick={copyLink}
                className="hover:text-white transition-colors"
                title="Copy Link"
              >
                <Copy size={18} />
              </button>
              <button
                className="hover:text-white transition-colors"
                title="Share"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          <div className={styles.markdown}>
            <ReactMarkdown
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      style={dracula}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </Motion.div>
      </article>
    </div>
  );
}

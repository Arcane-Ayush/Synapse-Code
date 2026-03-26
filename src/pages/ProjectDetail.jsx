import { useParams, Link } from "react-router-dom";
import { useData } from "../hooks/useData";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";
import { useEffect, useMemo, useState } from "react";

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects } = useData();
  const project = projects.find((p) => String(p.id) === String(id));

  const repoPath = useMemo(() => {
    if (!project?.githubUrl) return null;
    try {
      const url = new URL(project.githubUrl);
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
      return null;
    } catch {
      return null;
    }
  }, [project]);

  const [repoStats, setRepoStats] = useState(null);
  useEffect(() => {
    let active = true;
    if (!repoPath) return;
    const load = async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repoPath}`);
        if (!res.ok) throw new Error("GitHub API error");
        const json = await res.json();
        if (active)
          setRepoStats({
            stars: json.stargazers_count,
            forks: json.forks_count,
            updated: json.pushed_at
              ? new Date(json.pushed_at).toLocaleDateString()
              : null,
          });
      } catch {
        if (active) setRepoStats(null);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [repoPath]);

  const renderedDescription = useMemo(() => {
    const md = project?.fullDescription || project?.description || "";
    const html = md
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-2">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
      .replace(/\*(.*)\*/gim, "<i>$1</i>")
      .replace(/\n/g, "<br/>");
    return { __html: html };
  }, [project]);

  if (!project)
    return <div className="container mx-auto px-4 py-12">Not found</div>;
  return (
    <div className="container mx-auto px-4 py-12 space-y-6">
      <SEO
        title={`${project.title} — Google Club CU`}
        description={project.description}
        image={project.image}
        url={
          import.meta.env.VITE_SITE_URL
            ? `${import.meta.env.VITE_SITE_URL}/projects/${project.id}`
            : undefined
        }
      />
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Projects", to: "/projects" },
          { label: project.title },
        ]}
      />
      <div className="rounded-2xl overflow-hidden border border-white/10">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold">{project.title}</h1>
      <div
        className="prose prose-invert max-w-none text-sm"
        dangerouslySetInnerHTML={renderedDescription}
      />
      {Array.isArray(project.teamMembers) && project.teamMembers.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Team</h2>
          <div className="flex items-center gap-4 flex-wrap">
            {project.teamMembers.map((m) => (
              <div key={m} className="flex items-center gap-2">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(m)}`}
                  alt={m}
                  className="w-8 h-8 rounded-full border border-white/20"
                />
                <span className="text-sm">{m}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {!project.teamMembers && project.team && (
        <div className="text-sm">By {project.team}</div>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        {project.tags?.map((t) => {
          const key = String(t).toLowerCase();
          const logos = {
            react: "https://simpleicons.org/icons/react.svg",
            "node.js": "https://simpleicons.org/icons/nodedotjs.svg",
            node: "https://simpleicons.org/icons/nodedotjs.svg",
            openai: "https://simpleicons.org/icons/openai.svg",
            python: "https://simpleicons.org/icons/python.svg",
            whisper: "https://simpleicons.org/icons/openai.svg",
            firebase: "https://simpleicons.org/icons/firebase.svg",
            tailwind: "https://simpleicons.org/icons/tailwindcss.svg",
            "three.js": "https://simpleicons.org/icons/threedotjs.svg",
            webgl: "https://simpleicons.org/icons/webgl.svg",
            flutter: "https://simpleicons.org/icons/flutter.svg",
            dart: "https://simpleicons.org/icons/dart.svg",
            socket: "https://simpleicons.org/icons/socketdotio.svg",
            "socket.io": "https://simpleicons.org/icons/socketdotio.svg",
            express: "https://simpleicons.org/icons/express.svg",
            graphql: "https://simpleicons.org/icons/graphql.svg",
          };
          const src = logos[key];
          return (
            <span
              key={t}
              className="px-2 py-1 text-xs rounded-full border border-white/20 inline-flex items-center gap-2"
            >
              {src && <img src={src} alt="" className="w-4 h-4" />}
              {t}
            </span>
          );
        })}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 overflow-hidden">
          {project.demoUrl?.includes("youtube.com") ||
          project.demoUrl?.includes("vimeo.com") ? (
            <iframe
              src={project.demoUrl}
              title="Project Demo"
              className="w-full h-64"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : project.demoUrl ? (
            <img
              src={project.demoUrl}
              alt="Project Demo"
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center text-muted-foreground">
              No demo available
            </div>
          )}
        </div>
        <div className="rounded-xl border border-white/10 p-4">
          <h3 className="font-bold mb-2">Repository</h3>
          {repoPath ? (
            <>
              <a
                href={`https://github.com/${repoPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline"
              >
                {repoPath}
              </a>
              {repoStats && (
                <div className="mt-2 text-sm flex gap-4">
                  <span>⭐ {repoStats.stars}</span>
                  <span>🍴 {repoStats.forks}</span>
                  {repoStats.updated && (
                    <span>Updated {repoStats.updated}</span>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-sm text-muted-foreground">
              No repository linked
            </div>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-3">Other projects</h2>
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 12)
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="min-w-[220px] snap-start rounded-xl border border-white/10 overflow-hidden"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-28 object-cover"
                  />
                  <div className="p-2 text-sm">{p.title}</div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

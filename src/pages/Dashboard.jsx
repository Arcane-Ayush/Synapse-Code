import { useMemo } from "react";
import { useAuth } from "../context/auth";
import { useData } from "../hooks/useData";

export default function Dashboard() {
  const { user, isAdmin, logout } = useAuth();
  const { projects, activities, currentSprint, teamMembers } =
    useData();

  const myTeam = useMemo(() => {
    // naive mapping by first found team member with same name part or fallback
    const email = user?.email || "";
    const first = email.split("@")[0];
    const match =
      teamMembers.find((m) =>
        m.name.toLowerCase().includes(first.toLowerCase()),
      ) || teamMembers.find((m) => m.name.toLowerCase() === "ayush");
    return match?.team?.startsWith("Team") ? match.team : "Team Alpha";
  }, [user, teamMembers]);

  const myProjects = useMemo(
    () => projects.filter((p) => p.team === myTeam),
    [projects, myTeam],
  );

  const myPoints = useMemo(() => {
    const tasks = currentSprint?.tasks || [];
    return tasks
      .filter((t) => t.assignedTo === myTeam || (Array.isArray(t.assignedTo) && t.assignedTo.includes(myTeam)) || t.assignedTo === "All")
      .reduce((sum, t) => sum + (t.points || 0), 0);
  }, [currentSprint, myTeam]);

  const upcomingRSVPs = useMemo(
    () => activities.filter((a) => a.status === "Upcoming").slice(0, 5),
    [activities],
  );

  const badges = useMemo(() => {
    const b = [];
    if (myPoints >= 1000) b.push("Legend");
    if (myPoints >= 300) b.push("Pro");
    if (myProjects.length >= 2) b.push("Builder");
    return b;
  }, [myPoints, myProjects.length]);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.user_metadata?.full_name || user?.email}</h1>
          <p className="text-sm text-muted-foreground">Team: {myTeam}</p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-xs font-bold">
              Admin
            </span>
          )}
          <button
            className="px-3 py-2 rounded-xl border border-white/20 text-white"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <section className="p-4 rounded-2xl border border-white/10">
          <h2 className="font-bold mb-2">Contribution Stats</h2>
          <p className="text-sm">Points: {myPoints}</p>
          <p className="text-sm">Tasks in Sprint: {currentSprint?.tasks?.length || 0}</p>
          <div className="mt-2">
            <h3 className="text-sm font-semibold mb-1">Badges</h3>
            <div className="flex gap-2 flex-wrap">
              {badges.length ? (
                badges.map((b) => (
                  <span
                    key={b}
                    className="px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs"
                  >
                    {b}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">No badges yet</span>
              )}
            </div>
          </div>
        </section>

        <section className="p-4 rounded-2xl border border-white/10">
          <h2 className="font-bold mb-2">Upcoming RSVPs</h2>
          <ul className="space-y-2">
            {upcomingRSVPs.map((a) => (
              <li key={a.id} className="text-sm">
                {a.title} — {a.date} {isAdmin && <button className="ml-2 text-xs underline">Edit</button>}
              </li>
            ))}
          </ul>
        </section>

        <section className="p-4 rounded-2xl border border-white/10">
          <h2 className="font-bold mb-2">Projects</h2>
          <ul className="space-y-2">
            {myProjects.map((p) => (
              <li key={p.id} className="text-sm">
                {p.title} {isAdmin && <button className="ml-2 text-xs underline">Edit</button>}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

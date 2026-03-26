import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";

export default function Profile() {
  const { id } = useParams();
  const { teamMembers, projects, currentSprint } = useData();
  const member = teamMembers.find((m) => String(m.id) === String(id));
  if (!member) {
    return (
      <div className="p-8 text-center text-muted-foreground">Member not found</div>
    );
  }
  const myProjects = projects.filter((p) => p.team === member.team);
  const myPoints = (currentSprint?.tasks || [])
    .filter(
      (t) =>
        t.assignedTo === member.team ||
        (Array.isArray(t.assignedTo) && t.assignedTo.includes(member.team)) ||
        t.assignedTo === "All",
    )
    .reduce((sum, t) => sum + (t.points || 0), 0);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-16 h-16 rounded-full border border-white/10"
        />
        <div>
          <h1 className="text-2xl font-bold">{member.name}</h1>
          <p className="text-sm text-muted-foreground">
            {member.role} • {member.team}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="p-4 rounded-2xl border border-white/10">
          <h2 className="font-bold mb-2">Contributions</h2>
          <p className="text-sm">Sprint points: {myPoints}</p>
        </section>
        <section className="p-4 rounded-2xl border border-white/10">
          <h2 className="font-bold mb-2">Projects</h2>
          <ul className="space-y-2">
            {myProjects.map((p) => (
              <li key={p.id} className="text-sm">
                {p.title}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

import { motion as Motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { THEMES as themes } from "../themes/config";
import { teamMembers } from "../data/mockData";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Team() {
  const { theme } = useTheme();

  // Group members
  const leadership = teamMembers.filter((m) => m.team === "Leadership");
  const alumni = teamMembers.filter((m) => m.team === "Alumni");
  const coreMembers = teamMembers.filter(
    (m) => m.team !== "Leadership" && m.team !== "Alumni",
  );

  // Group core members by team
  const teams = [...new Set(coreMembers.map((m) => m.team))];
  const membersByTeam = teams.reduce((acc, teamName) => {
    acc[teamName] = coreMembers.filter((m) => m.team === teamName);
    return acc;
  }, {});

  const getStyles = () => {
    switch (theme) {
      case themes.ARCADE:
        return {
          container: "bg-black min-h-screen text-[#00ff00] font-mono p-8 pt-24",
          header:
            "text-4xl md:text-6xl text-center mb-12 uppercase tracking-widest text-[#df00ff] drop-shadow-[0_0_10px_#df00ff]",
          sectionTitle:
            "text-2xl mb-6 text-[#00ff00] border-b-4 border-[#00ff00] inline-block uppercase",
          card: "bg-black border-4 border-[#df00ff] p-4 relative group hover:bg-[#df00ff]/10 transition-colors",
          cardImage:
            "w-32 h-32 mx-auto mb-4 border-2 border-[#00ff00] rounded-none bg-[#00ff00]/20 grayscale group-hover:grayscale-0 transition-all",
          name: "text-xl text-center text-[#00ff00] font-bold uppercase",
          role: "text-sm text-center text-[#df00ff] mt-1",
          social: "flex justify-center gap-4 mt-4 text-[#00ff00]",
          badge:
            "absolute top-2 right-2 bg-[#df00ff] text-black text-xs px-2 py-0.5 font-bold uppercase",
        };
      case themes.BASIC:
        return {
          container:
            "bg-neutral-950 min-h-screen text-white font-sans p-8 pt-24",
          header:
            "text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight",
          sectionTitle:
            "text-2xl font-semibold mb-8 text-neutral-400 border-l-4 border-white pl-4",
          card: "bg-neutral-900/50 border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1",
          cardImage:
            "w-24 h-24 mx-auto mb-4 rounded-full border-2 border-white/10 object-cover",
          name: "text-lg text-center font-medium text-white",
          role: "text-sm text-center text-neutral-400 mt-1",
          social:
            "flex justify-center gap-3 mt-4 text-neutral-500 hover:text-white transition-colors",
          badge: "hidden",
        };
      case themes.CYBER: // Assuming Cyber/Space share similar vibes or explicit Cyber theme
        return {
          container:
            "bg-[#0a0a12] min-h-screen text-cyan-400 font-mono p-8 pt-24 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]",
          header:
            "text-5xl text-center mb-16 font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600",
          sectionTitle:
            "text-xl mb-8 text-purple-400 flex items-center gap-2 before:content-['//'] before:text-cyan-400",
          card: "bg-[#111] border border-cyan-900/50 p-6 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-cyan-500/5 before:to-transparent hover:border-cyan-500/50 transition-colors",
          cardImage:
            "w-24 h-24 mx-auto mb-4 rounded-sm border border-cyan-500/30",
          name: "text-lg text-center text-cyan-300 font-bold tracking-wide",
          role: "text-xs text-center text-purple-400 mt-1 uppercase tracking-widest",
          social:
            "flex justify-center gap-4 mt-4 text-cyan-700 hover:text-cyan-400",
          badge:
            "absolute top-0 left-0 bg-cyan-900/80 text-cyan-300 text-[10px] px-2 py-1 uppercase tracking-wider",
        };
      default: // Anime / Sakura
        return {
          container: "bg-slate-900 min-h-screen text-white font-sans p-8 pt-24",
          header:
            "text-5xl md:text-7xl text-center mb-16 font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 transform -skew-x-6",
          sectionTitle:
            "text-3xl mb-8 font-bold text-pink-400 italic border-b-2 border-pink-500/30 inline-block pr-8",
          card: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:-rotate-1",
          cardImage:
            "w-28 h-28 mx-auto mb-4 rounded-full border-4 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]",
          name: "text-xl text-center font-bold text-pink-200",
          role: "text-sm text-center text-violet-300 mt-1 font-medium",
          social: "flex justify-center gap-3 mt-4 text-pink-400",
          badge:
            "absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg transform rotate-12",
        };
    }
  };

  const styles = getStyles();

  // eslint-disable-next-line no-unused-vars
  const SocialLink = ({ href, icon: Icon }) => (
    <a
      href={href}
      className="hover:scale-110 transition-transform"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={18} />
    </a>
  );

  const MemberCard = ({ member }) => (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={styles.card}
    >
      {member.team !== "Leadership" && member.team !== "Alumni" && (
        <div className={styles.badge}>{member.team}</div>
      )}
      <img src={member.avatar} alt={member.name} className={styles.cardImage} />
      <h3 className={styles.name}>{member.name}</h3>
      <p className={styles.role}>{member.role}</p>
      <div className={styles.social}>
        {member.social?.github && (
          <SocialLink href={member.social.github} icon={Github} />
        )}
        {member.social?.linkedin && (
          <SocialLink href={member.social.linkedin} icon={Linkedin} />
        )}
        {member.social?.twitter && (
          <SocialLink href={member.social.twitter} icon={Twitter} />
        )}
        {!member.social && (
          <>
            <SocialLink href="#" icon={Github} />
            <SocialLink href="#" icon={Linkedin} />
          </>
        )}
      </div>
    </Motion.div>
  );

  return (
    <div className={styles.container}>
      <div className="max-w-7xl mx-auto">
        <Motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.header}
        >
          {theme === themes.ARCADE ? "PLAYER SELECT" : "Our Team"}
        </Motion.h1>

        {/* Leadership Section */}
        <section className="mb-20">
          <h2 className={styles.sectionTitle}>
            {theme === themes.ARCADE ? "BOSS STAGE" : "Leadership"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {leadership.map((member) => (
              <div key={member.id} className="w-full max-w-sm">
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        </section>

        {/* Active Members by Team */}
        {Object.entries(membersByTeam).map(([teamName, members]) => (
          <section key={teamName} className="mb-16">
            <h2 className={styles.sectionTitle}>{teamName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        ))}

        {/* Alumni Section */}
        {alumni.length > 0 && (
          <section className="mb-20 opacity-80">
            <h2 className={styles.sectionTitle}>
              {theme === themes.ARCADE ? "HIGH SCORES" : "Alumni"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {alumni.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}

        {/* Join Us CTA */}
        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center p-12 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent"
        >
          <h2 className="text-3xl font-bold mb-4 text-inherit">
            Want to join the club?
          </h2>
          <p className="mb-8 opacity-70">
            We are always looking for new members to join our ranks.
          </p>
          <button className="px-8 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform">
            Apply Now
          </button>
        </Motion.div>
      </div>
    </div>
  );
}

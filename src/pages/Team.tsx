import TeamSection from "@/components/TeamSection";
import { coreTeam, websiteTeam, graphicsTeam } from "@/data/teamData";

const C = {
  pink:   "#E84FAA",
  cyan:   "#6CB4EE",
  purple: "#6B3FA0",
  white:  "#FFFFFF",
} as const;

export default function TeamPage() {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg, #2a1a3d 0%, #1a0f2e 40%, #0a0515 100%)",
      }}
    >
      {/* ── Page hero ── */}
      <div className="text-center pt-16 pb-4 px-4">
        <p
          className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-3"
          style={{ color: "#D4A574" }}
        >
          ISTE SVIT
        </p>
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[0.08em] uppercase"
          style={{
            fontFamily: "Orbitron, sans-serif",
            background: `linear-gradient(135deg, ${C.white} 0%, #F1B5A2 45%, ${C.pink} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          OUR TEAM
        </h1>
        <p
          className="mt-3 max-w-lg mx-auto text-sm md:text-base"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          The brilliant minds behind Prakarsh '26
        </p>
      </div>

      {/* ── Quick-jump nav ── */}
      <nav className="sticky top-0 z-30 flex justify-center gap-3 py-3 px-4"
        style={{
          background: "rgba(10,5,21,0.75)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(107,63,160,0.25)",
        }}
      >
        {[
          { label: "Core Team", href: "#core", count: coreTeam.length },
          { label: "Website Team", href: "#website", count: websiteTeam.length },
          { label: "Graphics Team", href: "#graphics", count: graphicsTeam.length },
        ].map(({ label, href, count }) => (
          <a
            key={href}
            href={href}
            className="px-3 py-1.5 rounded-full text-[11px] md:text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-200 hover:scale-105"
            style={{
              background: "rgba(107,63,160,0.2)",
              border: `1px solid rgba(107,63,160,0.35)`,
              color: C.cyan,
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(107,63,160,0.45)";
              (e.currentTarget as HTMLElement).style.borderColor = `${C.pink}70`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(107,63,160,0.2)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(107,63,160,0.35)";
            }}
          >
            {label}
            <span className="ml-1.5 opacity-60">({count})</span>
          </a>
        ))}
      </nav>

      {/* Subtle grid pattern overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="w-full h-full opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(107,63,160,1) 1px, transparent 1px), linear-gradient(90deg, rgba(107,63,160,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Sections ── */}
      <div className="relative z-10">
        <div id="core">
          <TeamSection
            title="Core Team"
            tagline="The leadership driving Prakarsh '26 forward."
            members={coreTeam}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-0 px-8 md:px-16 opacity-30">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.pink})` }} />
          <div className="w-2 h-2 rounded-full mx-2" style={{ background: C.pink }} />
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${C.pink}, transparent)` }} />
        </div>

        <div id="website">
          <TeamSection
            title="Website Team"
            tagline="Engineers and designers powering the digital experience."
            members={websiteTeam}
          />
        </div>

        <div className="flex items-center gap-0 px-8 md:px-16 opacity-30">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.cyan})` }} />
          <div className="w-2 h-2 rounded-full mx-2" style={{ background: C.cyan }} />
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${C.cyan}, transparent)` }} />
        </div>

        <div id="graphics">
          <TeamSection
            title="Graphics Team"
            tagline="The creative minds shaping Prakarsh's visual identity."
            members={graphicsTeam}
          />
        </div>
      </div>

      {/* Footer strip */}
      <footer
        className="text-center py-8 text-[11px] tracking-[0.2em] uppercase"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        Prakarsh '26 · ISTE SVIT
      </footer>
    </div>
  );
}

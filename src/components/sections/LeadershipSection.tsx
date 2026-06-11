"use client";

import { useEffect, useRef } from "react";

const roles = [
  {
    title: "Student Representative",
    org: "OWU AI Workforce",
    period: "Dec 2025 – Present",
    tag: "AI Policy & Governance",
    stats: [
      { value: "3+", label: "departments" },
      { value: "AI", label: "policy formation" },
    ],
    bullets: [
      "Lead communications between IFC, Panhellenic Council and the OWU community",
      "Collaborate with faculty and administrators to support inclusive AI policy formation",
    ],
  },
  {
    title: "Founding President",
    org: "Debate Club — OWU",
    period: "Dec 2025 – Present",
    tag: "Founding · Leadership",
    stats: [
      { value: "20+", label: "active members" },
      { value: "5+", label: "campus events led" },
    ],
    bullets: [
      "Founded the university Debate Club from scratch in the first semester",
      "Organized 5+ events, coordinating logistics, scheduling, and inter-org collaboration",
    ],
  },
  {
    title: "President",
    org: "Robotics Club — OWU",
    period: "Dec 2025 – Present",
    tag: "Engineering · Hardware",
    stats: [
      { value: "15+", label: "active members" },
      { value: "2+", label: "sessions per week" },
    ],
    bullets: [
      "Oversee inter-competition prep and run 2+ weekly sessions",
      "Designed and built a fully functional flying drone hands-on",
    ],
  },
];

export default function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const trigger = { trigger: sectionRef.current, start: "top 80%", once: true };

        // Header clip reveal
        const headSpan = headRef.current?.querySelector<HTMLElement>(".hl");
        if (headSpan) {
          gsap.set(headSpan, { y: "105%" });
          gsap.to(headSpan, { y: "0%", duration: 1.05, ease: "power3.out", scrollTrigger: trigger });
        }

        // Cards stagger
        const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
        gsap.set(cards, { opacity: 0, y: 55, scale: 0.96 });
        cards.forEach((el, i) => {
          gsap.to(el, {
            opacity: 1, y: 0, scale: 1,
            duration: 0.88, ease: "power3.out",
            delay: 0.1 + i * 0.12,
            scrollTrigger: trigger,
          });

          el.addEventListener("mouseenter", () =>
            gsap.to(el, { y: -10, scale: 1.02, duration: 0.36, ease: "power2.out" })
          );
          el.addEventListener("mouseleave", () =>
            gsap.to(el, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" })
          );
        });
      });
    };

    init();
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{
        background: "#f7ede6",
        padding: "clamp(48px, 7vw, 110px) clamp(14px, 1.8vw, 28px) clamp(60px, 8vw, 120px)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "clamp(32px, 4.5vw, 64px)" }}>
        <p style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
          fontSize: "clamp(11px, 0.9vw, 14px)",
          color: "#7a7068",
          opacity: 0.5,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: "clamp(8px, 1vw, 14px)",
        }}>
          Campus Involvement
        </p>
        <div style={{ overflow: "hidden" }} ref={headRef}>
          <span
            className="hl"
            style={{
              display: "block",
              fontFamily: "var(--font-inter)",
              fontWeight: 800,
              fontSize: "clamp(40px, 6.5vw, 104px)",
              color: "#7a7068",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
            }}
          >
            Leadership
          </span>
        </div>
      </div>

      {/* Cards */}
      <div
        className="flex items-stretch"
        style={{ gap: "clamp(8px, 0.9vw, 14px)" }}
      >
        {roles.map((r, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="flex-1 cursor-pointer overflow-hidden"
            style={{
              borderRadius: "clamp(12px, 1.2vw, 20px)",
              background: "rgba(255,255,255,0.62)",
              border: "1px solid rgba(122,112,104,0.12)",
              minWidth: 0,
              opacity: 0,
              willChange: "transform",
              padding: "clamp(18px, 2.2vw, 36px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "clamp(16px, 2vw, 28px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
            }}
          >
            {/* Top */}
            <div>
              {/* Tag */}
              <p style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                fontSize: "clamp(8px, 0.65vw, 10px)",
                color: "#7a7068",
                opacity: 0.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: "0 0 clamp(10px, 1.2vw, 16px)",
              }}>
                {r.tag}
              </p>

              {/* Role */}
              <h3 style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 800,
                fontSize: "clamp(16px, 1.6vw, 26px)",
                color: "#7a7068",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                margin: "0 0 clamp(4px, 0.5vw, 7px)",
              }}>
                {r.title}
              </h3>

              {/* Org + period */}
              <p style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: "clamp(10px, 0.85vw, 13px)",
                color: "#7a7068",
                opacity: 0.6,
                margin: 0,
              }}>
                {r.org}
              </p>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                fontSize: "clamp(9px, 0.7vw, 11px)",
                color: "#7a7068",
                opacity: 0.35,
                margin: "3px 0 0",
              }}>
                {r.period}
              </p>

              {/* Divider */}
              <div style={{
                height: "1px",
                background: "rgba(122,112,104,0.12)",
                margin: "clamp(12px, 1.4vw, 20px) 0",
              }} />

              {/* Stats */}
              <div style={{ display: "flex", gap: "clamp(14px, 1.8vw, 28px)" }}>
                {r.stats.map((s) => (
                  <div key={s.label}>
                    <p style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 800,
                      fontSize: "clamp(18px, 1.8vw, 28px)",
                      color: "#7a7068",
                      margin: 0,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}>
                      {s.value}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 400,
                      fontSize: "clamp(7px, 0.6vw, 9px)",
                      color: "#7a7068",
                      opacity: 0.45,
                      margin: "3px 0 0",
                      lineHeight: 1.3,
                    }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: bullets */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(6px, 0.8vw, 11px)",
              borderTop: "1px solid rgba(122,112,104,0.1)",
              paddingTop: "clamp(12px, 1.4vw, 20px)",
            }}>
              {r.bullets.map((b) => (
                <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{
                    color: "#7a7068",
                    opacity: 0.35,
                    fontSize: "clamp(8px, 0.7vw, 11px)",
                    marginTop: "0.18em",
                    flexShrink: 0,
                  }}>
                    ▸
                  </span>
                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                    fontSize: "clamp(9px, 0.75vw, 12px)",
                    color: "#7a7068",
                    opacity: 0.55,
                    margin: 0,
                    lineHeight: 1.55,
                  }}>
                    {b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

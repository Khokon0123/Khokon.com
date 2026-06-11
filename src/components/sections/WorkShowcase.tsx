"use client";

import { useEffect, useRef } from "react";

const jobs = [
  {
    role: "IT Support Technician",
    company: "Ohio Wesleyan University",
    period: "Jan 2025 – Present",
    bg: "linear-gradient(145deg, #1a1208 0%, #2a1e10 60%, #1e1608 100%)",
    accent: "#f5c9a0",
    tag: "IT & Systems",
    stats: [
      { value: "50+", label: "support requests / week" },
      { value: "95%+", label: "service availability" },
      { value: "15+", label: "events / semester" },
    ],
    bullets: [
      "Real-time technical support for 100–300 students & faculty per event",
      "Device checks across 10+ labs and 25+ classrooms",
      "Reduced recurring service interruptions by ~20%",
    ],
  },
  {
    role: "Tech Intern",
    company: "Calico Tabbycat",
    period: "Dec 2023 – Dec 2025",
    bg: "linear-gradient(145deg, #1a0e06 0%, #2e1a08 55%, #1e1206 100%)",
    accent: "#f0a060",
    tag: "Remote · 2 Years",
    stats: [
      { value: "1,000+", label: "tournaments managed" },
      { value: "~30%", label: "fewer tabulation errors" },
      { value: "25%", label: "faster processing" },
    ],
    bullets: [
      "100% scoring accuracy across 50+ national-level events",
      "Optimized templates & streamlined data workflows",
      "Resolved 10+ system inconsistencies platform-wide",
    ],
  },
  {
    role: "Founding Team & Lead Developer",
    company: "OnlySwap",
    period: "Dec 2025 – Present",
    bg: "linear-gradient(145deg, #081a0e 0%, #0d2a14 55%, #081808 100%)",
    accent: "#6abf7a",
    tag: "Startup · Hackathon",
    stats: [
      { value: "245+", label: "users in 2 weeks" },
      { value: "25+", label: "trades at launch" },
      { value: "$2K", label: "Princeton prize" },
    ],
    bullets: [
      "Founded student-only trading app for iOS & Android",
      "Built with React Native, Node.js, and Firebase",
      "2nd Place — Princeton University Hackathon",
    ],
  },
];

export default function WorkShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);

        gsap.set(cards, { opacity: 0, y: 60, scale: 0.96 });

        cards.forEach((el, i) => {
          gsap.to(el, {
            opacity: 1, y: 0, scale: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              once: true,
            },
          });

          el.addEventListener("mouseenter", () =>
            gsap.to(el, { y: -10, scale: 1.02, duration: 0.38, ease: "power2.out" })
          );
          el.addEventListener("mouseleave", () =>
            gsap.to(el, { y: 0, scale: 1, duration: 0.42, ease: "power2.out" })
          );
        });
      });
    };

    init();
    return () => ctx?.revert();
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
      <div
        className="flex items-stretch"
        style={{ gap: "clamp(8px, 0.9vw, 14px)" }}
      >
        {jobs.map((job, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="flex-1 cursor-pointer overflow-hidden"
            style={{
              borderRadius: "clamp(12px, 1.2vw, 20px)",
              background: job.bg,
              minWidth: 0,
              opacity: 0,
              willChange: "transform",
              padding: "clamp(18px, 2.2vw, 36px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "clamp(16px, 2vw, 30px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
            }}
          >
            {/* Top */}
            <div>
              {/* Tag */}
              <span style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                fontSize: "clamp(8px, 0.65vw, 10px)",
                color: job.accent,
                opacity: 0.6,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>
                {job.tag}
              </span>

              {/* Role */}
              <h3 style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 800,
                fontSize: "clamp(15px, 1.5vw, 24px)",
                color: job.accent,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                margin: "clamp(6px, 0.8vw, 12px) 0 clamp(3px, 0.4vw, 6px)",
              }}>
                {job.role}
              </h3>

              {/* Company + period */}
              <p style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                fontSize: "clamp(10px, 0.85vw, 13px)",
                color: job.accent,
                opacity: 0.55,
                margin: 0,
                lineHeight: 1.4,
              }}>
                {job.company}
              </p>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                fontSize: "clamp(9px, 0.7vw, 11px)",
                color: job.accent,
                opacity: 0.35,
                margin: "2px 0 0",
              }}>
                {job.period}
              </p>

              {/* Divider */}
              <div style={{
                height: "1px",
                background: `${job.accent}22`,
                margin: "clamp(12px, 1.4vw, 20px) 0",
              }} />

              {/* Stats row */}
              <div style={{
                display: "flex",
                gap: "clamp(8px, 1vw, 16px)",
              }}>
                {job.stats.map((s) => (
                  <div key={s.label}>
                    <p style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 800,
                      fontSize: "clamp(14px, 1.4vw, 22px)",
                      color: job.accent,
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
                      color: job.accent,
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

            {/* Bottom: bullet points */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(6px, 0.7vw, 10px)",
              borderTop: `1px solid ${job.accent}18`,
              paddingTop: "clamp(12px, 1.4vw, 20px)",
            }}>
              {job.bullets.map((b) => (
                <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{
                    color: job.accent,
                    opacity: 0.4,
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
                    color: job.accent,
                    opacity: 0.5,
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

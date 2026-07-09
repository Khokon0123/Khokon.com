"use client";

import { useEffect, useRef } from "react";

const milestones = [
  {
    year: "Bangladesh",
    label: "The Beginning",
    desc: "Grew up in a small village with a big curiosity — spent hours tinkering with any device I could find, dreaming of what technology could do.",
  },
  {
    year: "2023",
    label: "Landed in America",
    desc: "Moved to the United States alone, enrolled at Ohio Wesleyan University on a full scholarship, and started building from zero in a new country.",
  },
  {
    year: "2024",
    label: "First Real Build",
    desc: "Shipped my first full-stack project, landed an IT role on campus, and placed 2nd at the Princeton Hackathon with OnlySwap — all in the same year.",
  },
  {
    year: "2025",
    label: "Founder & Leader",
    desc: "Founded the OWU Debate Club from scratch, became President of Robotics, joined the AI Workforce board, and launched Calico Tabbycat as CEO.",
  },
];

export default function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const subRef      = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef     = useRef<HTMLDivElement>(null);

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
        const trigger = { trigger: sectionRef.current, start: "top 75%", once: true };

        // Heading clip reveal
        const headSpan = headRef.current?.querySelector<HTMLElement>(".ab-head");
        if (headSpan) {
          gsap.set(headSpan, { y: "105%" });
          gsap.to(headSpan, { y: "0%", duration: 1.1, ease: "power3.out", scrollTrigger: trigger });
        }

        // Subtext fade up
        if (subRef.current) {
          gsap.set(subRef.current, { opacity: 0, y: 24 });
          gsap.to(subRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.2, scrollTrigger: trigger });
        }

        // Timeline line grow
        if (lineRef.current) {
          gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });
          gsap.to(lineRef.current, { scaleY: 1, duration: 1.2, ease: "power2.inOut", delay: 0.3, scrollTrigger: trigger });
        }

        // Cards stagger
        const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
        gsap.set(cards, { opacity: 0, x: -30 });
        cards.forEach((el, i) => {
          gsap.to(el, {
            opacity: 1, x: 0,
            duration: 0.82, ease: "power3.out",
            delay: 0.15 + i * 0.13,
            scrollTrigger: trigger,
          });
        });
      });
    };

    init();
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: "#1a1208",
        padding: "clamp(72px, 10vw, 140px) clamp(20px, 6vw, 100px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient warm glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "40%",
          background: "radial-gradient(ellipse, rgba(245,201,160,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(48px, 7vw, 96px)" }}>
          <p style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: "clamp(10px, 0.8vw, 13px)",
            color: "var(--peach)",
            opacity: 0.35,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "clamp(10px, 1.2vw, 18px)",
          }}>
            The Journey
          </p>

          <div style={{ overflow: "hidden" }} ref={headRef}>
            <span
              className="ab-head"
              style={{
                display: "block",
                fontFamily: "var(--font-inter)",
                fontWeight: 800,
                fontSize: "clamp(48px, 8vw, 128px)",
                color: "var(--peach)",
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
              }}
            >
              Village to<br />Silicon.
            </span>
          </div>

          <div ref={subRef} style={{ marginTop: "clamp(20px, 2.5vw, 36px)", maxWidth: "560px" }}>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: "clamp(14px, 1.2vw, 18px)",
              color: "var(--peach)",
              opacity: 0.55,
              lineHeight: 1.7,
              margin: 0,
            }}>
              I grew up in a small village in Bangladesh with no roadmap — just curiosity and the
              belief that technology could change everything. I moved to the United States alone,
              enrolled at Ohio Wesleyan University, and started building. No playbook. No safety net.
              Just work.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ display: "flex", gap: "clamp(24px, 4vw, 60px)", alignItems: "flex-start" }}>

          {/* Vertical line */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "6px", flexShrink: 0 }}>
            <div
              ref={lineRef}
              style={{
                width: "1px",
                height: `${milestones.length * 140}px`,
                background: "linear-gradient(to bottom, rgba(245,201,160,0.4), rgba(245,201,160,0.05))",
              }}
            />
          </div>

          {/* Milestone cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(28px, 4vw, 48px)", flex: 1 }}>
            {milestones.map((m, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                style={{
                  position: "relative",
                  padding: "clamp(20px, 2.5vw, 32px) clamp(20px, 2.5vw, 36px)",
                  borderRadius: "clamp(12px, 1.2vw, 18px)",
                  background: "rgba(245,201,160,0.04)",
                  border: "1px solid rgba(245,201,160,0.08)",
                  willChange: "transform",
                  cursor: "default",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(245,201,160,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(245,201,160,0.04)";
                }}
              >
                {/* Dot connector */}
                <div style={{
                  position: "absolute",
                  left: "clamp(-36px, -4.5vw, -52px)",
                  top: "clamp(22px, 2.8vw, 34px)",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--peach)",
                  opacity: 0.5,
                  transform: "translateX(-3px)",
                }} />

                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: "clamp(9px, 0.7vw, 11px)",
                  color: "var(--peach)",
                  opacity: 0.35,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  margin: "0 0 clamp(6px, 0.8vw, 10px)",
                }}>
                  {m.year}
                </p>

                <h3 style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 800,
                  fontSize: "clamp(18px, 1.8vw, 28px)",
                  color: "var(--peach)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  margin: "0 0 clamp(8px, 1vw, 14px)",
                }}>
                  {m.label}
                </h3>

                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 1vw, 15px)",
                  color: "var(--peach)",
                  opacity: 0.5,
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div style={{
          marginTop: "clamp(56px, 8vw, 110px)",
          paddingTop: "clamp(32px, 4vw, 56px)",
          borderTop: "1px solid rgba(245,201,160,0.08)",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: "clamp(20px, 2.4vw, 38px)",
            color: "var(--peach)",
            opacity: 0.75,
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
            margin: 0,
          }}>
            "I didn't have connections.<br />I had code."
          </p>
        </div>

      </div>
    </section>
  );
}

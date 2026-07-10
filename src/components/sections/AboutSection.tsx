"use client";

import { useEffect, useRef, useState } from "react";

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
  const [visible, setVisible] = useState(false);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const headRef     = useRef<HTMLDivElement>(null);
  const subRef      = useRef<HTMLDivElement>(null);

  // Open when navbar dispatches the event
  useEffect(() => {
    const open = () => setVisible(true);
    document.addEventListener("open-about", open);
    return () => document.removeEventListener("open-about", open);
  }, []);

  // Animate in / out whenever visible changes
  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    let ctx: { revert: () => void } | undefined;

    const run = async () => {
      const gsap = (await import("gsap")).default;

      ctx = gsap.context(() => {
        if (visible) {
          // Show overlay
          gsap.set(overlayRef.current, { display: "flex" });
          gsap.fromTo(overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "power2.out" }
          );
          gsap.fromTo(contentRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.1 }
          );

          // Heading
          const headSpan = headRef.current?.querySelector<HTMLElement>(".ab-head");
          if (headSpan) {
            gsap.fromTo(headSpan, { y: "105%" }, { y: "0%", duration: 0.9, ease: "power3.out", delay: 0.2 });
          }
          // Subtext
          if (subRef.current) {
            gsap.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.3 });
          }
          // Cards
          const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
          gsap.fromTo(cards,
            { opacity: 0, x: -24 },
            { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.35 }
          );
        } else {
          // Hide overlay
          gsap.to(overlayRef.current, {
            opacity: 0, duration: 0.35, ease: "power2.in",
            onComplete: () => {
              if (overlayRef.current) overlayRef.current.style.display = "none";
            },
          });
        }
      });
    };

    run();
    return () => ctx?.revert();
  }, [visible]);

  return (
    <div
      ref={overlayRef}
      style={{
        display: "none",
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(18, 10, 4, 0.97)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        overflowY: "auto",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "clamp(32px, 5vw, 72px) clamp(20px, 6vw, 100px)",
      }}
    >
      {/* Close button */}
      <button
        onClick={() => setVisible(false)}
        aria-label="Close about"
        style={{
          position: "fixed",
          top: "22px",
          right: "36px",
          zIndex: 201,
          background: "rgba(245,201,160,0.08)",
          border: "1px solid rgba(245,201,160,0.14)",
          borderRadius: "50%",
          width: "42px",
          height: "42px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--peach)",
          fontSize: "18px",
          lineHeight: 1,
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,201,160,0.16)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(245,201,160,0.08)")}
      >
        ✕
      </button>

      <div
        ref={contentRef}
        style={{ maxWidth: "860px", width: "100%", paddingTop: "clamp(24px, 3vw, 48px)" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "clamp(40px, 6vw, 80px)" }}>
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
                fontSize: "clamp(44px, 7vw, 110px)",
                color: "var(--peach)",
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                transform: "translateY(105%)",
              }}
            >
              Village to<br />Silicon.
            </span>
          </div>

          <div ref={subRef} style={{ marginTop: "clamp(18px, 2.2vw, 32px)", maxWidth: "520px", opacity: 0 }}>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: "clamp(14px, 1.15vw, 17px)",
              color: "var(--peach)",
              opacity: 0.55,
              lineHeight: 1.72,
              margin: 0,
            }}>
              I grew up in a small village in Bangladesh with no roadmap — just curiosity and the
              belief that technology could change everything. I moved to the United States alone,
              enrolled at Ohio Wesleyan University, and started building. No playbook. No safety
              net. Just work.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ display: "flex", gap: "clamp(24px, 4vw, 56px)", alignItems: "flex-start" }}>
          {/* Vertical line */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "8px", flexShrink: 0 }}>
            <div style={{
              width: "1px",
              height: `${milestones.length * 136}px`,
              background: "linear-gradient(to bottom, rgba(245,201,160,0.35), rgba(245,201,160,0.04))",
            }} />
          </div>

          {/* Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 3vw, 36px)", flex: 1 }}>
            {milestones.map((m, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                style={{
                  position: "relative",
                  padding: "clamp(18px, 2.2vw, 28px) clamp(18px, 2.2vw, 30px)",
                  borderRadius: "clamp(10px, 1vw, 16px)",
                  background: "rgba(245,201,160,0.04)",
                  border: "1px solid rgba(245,201,160,0.08)",
                  opacity: 0,
                  transition: "background 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(245,201,160,0.07)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(245,201,160,0.04)"; }}
              >
                {/* Dot */}
                <div style={{
                  position: "absolute",
                  left: "clamp(-34px, -4.2vw, -48px)",
                  top: "clamp(20px, 2.6vw, 30px)",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--peach)",
                  opacity: 0.45,
                  transform: "translateX(-3px)",
                }} />

                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: "clamp(9px, 0.68vw, 11px)",
                  color: "var(--peach)",
                  opacity: 0.3,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  margin: "0 0 clamp(5px, 0.7vw, 9px)",
                }}>
                  {m.year}
                </p>

                <h3 style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 800,
                  fontSize: "clamp(17px, 1.7vw, 26px)",
                  color: "var(--peach)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  margin: "0 0 clamp(7px, 0.9vw, 12px)",
                }}>
                  {m.label}
                </h3>

                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 0.95vw, 14px)",
                  color: "var(--peach)",
                  opacity: 0.48,
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div style={{
          marginTop: "clamp(48px, 7vw, 96px)",
          paddingTop: "clamp(28px, 3.5vw, 48px)",
          borderTop: "1px solid rgba(245,201,160,0.08)",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: "clamp(18px, 2.2vw, 34px)",
            color: "var(--peach)",
            opacity: 0.7,
            letterSpacing: "-0.02em",
            lineHeight: 1.35,
            margin: 0,
          }}>
            "I didn't have connections.<br />I had code."
          </p>
        </div>
      </div>
    </div>
  );
}

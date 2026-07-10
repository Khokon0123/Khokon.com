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
    desc: "Founded the OWU Debate Club, became President of Robotics, joined the AI Workforce board, and launched Calico Tabbycat as CEO.",
  },
];

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const headRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__openAbout = () => setVisible(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => { delete (window as any).__openAbout; };
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;
    let ctx: { revert: () => void } | undefined;

    const run = async () => {
      const gsap = (await import("gsap")).default;
      ctx = gsap.context(() => {
        if (visible) {
          gsap.set(overlayRef.current, { display: "flex" });
          gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });

          // Photo slides in from right
          gsap.fromTo(photoRef.current,
            { x: 60, opacity: 0, rotate: 3 },
            { x: 0, opacity: 1, rotate: 2, duration: 0.85, ease: "power3.out", delay: 0.15 }
          );

          // Text content slides up
          gsap.fromTo(contentRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", delay: 0.1 }
          );

          const headSpan = headRef.current?.querySelector<HTMLElement>(".ab-head");
          if (headSpan) {
            gsap.fromTo(headSpan, { y: "105%" }, { y: "0%", duration: 0.9, ease: "power3.out", delay: 0.22 });
          }
          if (subRef.current) {
            gsap.fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.32 });
          }

          const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
          gsap.fromTo(cards,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.65, ease: "power3.out", stagger: 0.09, delay: 0.38 }
          );
        } else {
          gsap.to(overlayRef.current, {
            opacity: 0, duration: 0.3, ease: "power2.in",
            onComplete: () => { if (overlayRef.current) overlayRef.current.style.display = "none"; },
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
        background: "rgba(14, 8, 3, 0.97)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        overflowY: "auto",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "clamp(28px, 4vw, 60px) clamp(20px, 5vw, 80px)",
      }}
    >
      {/* Close */}
      <button
        onClick={() => setVisible(false)}
        aria-label="Close about"
        style={{
          position: "fixed",
          top: "20px",
          right: "32px",
          zIndex: 201,
          background: "rgba(245,201,160,0.08)",
          border: "1px solid rgba(245,201,160,0.14)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--peach)",
          fontSize: "16px",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,201,160,0.16)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(245,201,160,0.08)")}
      >
        ✕
      </button>

      {/* Two-column layout */}
      <div style={{
        width: "100%",
        maxWidth: "1180px",
        display: "grid",
        gridTemplateColumns: "1fr clamp(220px, 28vw, 380px)",
        gap: "clamp(32px, 5vw, 80px)",
        alignItems: "start",
        paddingTop: "clamp(16px, 2vw, 32px)",
      }}>

        {/* LEFT — text + timeline */}
        <div ref={contentRef}>
          {/* Label */}
          <p style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: "clamp(10px, 0.75vw, 12px)",
            color: "var(--peach)",
            opacity: 0.32,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "clamp(10px, 1.1vw, 16px)",
          }}>
            The Journey
          </p>

          {/* Headline */}
          <div style={{ overflow: "hidden", marginBottom: "clamp(16px, 2vw, 28px)" }} ref={headRef}>
            <span
              className="ab-head"
              style={{
                display: "block",
                fontFamily: "var(--font-inter)",
                fontWeight: 800,
                fontSize: "clamp(40px, 6.5vw, 100px)",
                color: "var(--peach)",
                letterSpacing: "-0.03em",
                lineHeight: 0.94,
                transform: "translateY(105%)",
              }}
            >
              Village to<br />Silicon.
            </span>
          </div>

          {/* Subtext */}
          <div ref={subRef} style={{ maxWidth: "480px", marginBottom: "clamp(28px, 4vw, 52px)", opacity: 0 }}>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.05vw, 16px)",
              color: "var(--peach)",
              opacity: 0.52,
              lineHeight: 1.72,
              margin: 0,
            }}>
              I grew up in a small village in Bangladesh with no roadmap — just curiosity and the
              belief that technology could change everything. I moved to the United States alone,
              enrolled at Ohio Wesleyan University, and started building. No playbook. No safety net.
              Just work.
            </p>
          </div>

          {/* Timeline */}
          <div style={{ display: "flex", gap: "clamp(20px, 3vw, 44px)" }}>
            {/* Line */}
            <div style={{ paddingTop: "8px", flexShrink: 0 }}>
              <div style={{
                width: "1px",
                height: `${milestones.length * 120}px`,
                background: "linear-gradient(to bottom, rgba(245,201,160,0.35), rgba(245,201,160,0.03))",
              }} />
            </div>

            {/* Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vw, 24px)", flex: 1 }}>
              {milestones.map((m, i) => (
                <div
                  key={i}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  style={{
                    position: "relative",
                    padding: "clamp(14px, 1.8vw, 22px) clamp(16px, 2vw, 26px)",
                    borderRadius: "clamp(10px, 1vw, 14px)",
                    background: "rgba(245,201,160,0.04)",
                    border: "1px solid rgba(245,201,160,0.07)",
                    opacity: 0,
                    transition: "background 0.3s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(245,201,160,0.08)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(245,201,160,0.04)"; }}
                >
                  <div style={{
                    position: "absolute",
                    left: "clamp(-30px, -3.6vw, -44px)",
                    top: "clamp(16px, 2vw, 24px)",
                    width: "6px", height: "6px",
                    borderRadius: "50%",
                    background: "var(--peach)", opacity: 0.4,
                    transform: "translateX(-3px)",
                  }} />

                  <p style={{
                    fontFamily: "var(--font-inter)", fontWeight: 700,
                    fontSize: "clamp(8px, 0.62vw, 10px)", color: "var(--peach)", opacity: 0.28,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    margin: "0 0 clamp(4px, 0.5vw, 7px)",
                  }}>{m.year}</p>

                  <h3 style={{
                    fontFamily: "var(--font-inter)", fontWeight: 800,
                    fontSize: "clamp(15px, 1.5vw, 22px)", color: "var(--peach)",
                    letterSpacing: "-0.02em", lineHeight: 1.1,
                    margin: "0 0 clamp(5px, 0.7vw, 9px)",
                  }}>{m.label}</h3>

                  <p style={{
                    fontFamily: "var(--font-inter)", fontWeight: 400,
                    fontSize: "clamp(11px, 0.88vw, 13px)", color: "var(--peach)", opacity: 0.45,
                    lineHeight: 1.62, margin: 0,
                  }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div style={{
            marginTop: "clamp(32px, 5vw, 64px)",
            paddingTop: "clamp(22px, 2.8vw, 38px)",
            borderTop: "1px solid rgba(245,201,160,0.07)",
          }}>
            <p style={{
              fontFamily: "var(--font-inter)", fontWeight: 700,
              fontSize: "clamp(16px, 1.9vw, 28px)", color: "var(--peach)", opacity: 0.65,
              letterSpacing: "-0.02em", lineHeight: 1.35, margin: 0,
            }}>
              "I didn't have connections.<br />I had code."
            </p>
          </div>
        </div>

        {/* RIGHT — photo */}
        <div
          ref={photoRef}
          style={{
            position: "sticky",
            top: "clamp(28px, 4vw, 56px)",
            opacity: 0,
            willChange: "transform",
          }}
        >
          <div style={{
            borderRadius: "clamp(16px, 1.8vw, 24px)",
            overflow: "hidden",
            border: "1px solid rgba(245,201,160,0.1)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
            aspectRatio: "3/4",
            position: "relative",
          }}>
            {/* Photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/khokon.jpg"
              alt="Khokon Barua"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                filter: "brightness(0.88) contrast(1.05) saturate(0.8) sepia(0.18)",
                display: "block",
              }}
            />

            {/* Warm peach overlay to match site palette */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(18,10,4,0.08) 0%, rgba(245,201,160,0.06) 60%, rgba(18,10,4,0.4) 100%)",
            }} />

            {/* Name tag bottom */}
            <div style={{
              position: "absolute",
              bottom: "clamp(14px, 1.8vw, 22px)",
              left: "clamp(14px, 1.8vw, 22px)",
            }}>
              <p style={{
                fontFamily: "var(--font-inter)", fontWeight: 800,
                fontSize: "clamp(13px, 1.2vw, 18px)", color: "var(--peach)",
                margin: 0, letterSpacing: "-0.01em",
              }}>Khokon Barua</p>
              <p style={{
                fontFamily: "var(--font-inter)", fontWeight: 400,
                fontSize: "clamp(10px, 0.8vw, 12px)", color: "var(--peach)", opacity: 0.5,
                margin: "2px 0 0", letterSpacing: "0.04em",
              }}>OWU · Delaware, Ohio</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

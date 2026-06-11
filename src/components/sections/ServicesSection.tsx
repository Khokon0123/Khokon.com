"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    line1: "Web Applications &",
    line2: "Full-Stack Platforms",
    desc: "Building scalable web applications using React, Node.js, and Firebase — from zero to production.",
  },
  {
    line1: "Mobile Apps &",
    line2: "Cross-Platform Products",
    desc: "Cross-platform mobile apps built with React Native — like OnlySwap, 245+ users in two weeks.",
  },
  {
    line1: "SaaS Platforms &",
    line2: "Software Products",
    desc: "End-to-end platforms built for real users — hackathon-proven and production-ready.",
  },
  {
    line1: "APIs &",
    line2: "Backend Systems",
    desc: "Robust backend systems and REST APIs using Node.js and Firebase, built for scale and reliability.",
  },
];

export default function ServicesSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const line1WrapRef = useRef<HTMLDivElement>(null);
  const line2WrapRef = useRef<HTMLDivElement>(null);

  // ── Cycling state — pure React, zero GSAP conflict ────────────────
  const [active, setActive] = useState(0);
  const [prev,   setPrev]   = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((cur) => {
        setPrev(cur);
        return (cur + 1) % services.length;
      });
    }, 3600);
    return () => clearInterval(id);
  }, []);

  // ── GSAP: header clip-reveal only ─────────────────────────────────
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
        const line1 = line1WrapRef.current?.querySelector<HTMLElement>(".hl");
        const line2 = line2WrapRef.current?.querySelector<HTMLElement>(".hl");
        if (!line1 || !line2) return;

        gsap.set([line1, line2], { y: "105%" });
        gsap.to([line1, line2], {
          y: "0%",
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });
      });
    };

    init();
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  const headerStyle: React.CSSProperties = {
    fontFamily: "var(--font-inter)",
    fontWeight: 800,
    fontSize: "clamp(52px, 9.2vw, 148px)",
    lineHeight: 0.95,
    color: "#7a7068",
    letterSpacing: "-0.025em",
    display: "block",
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        background: "#f7ede6",
        minHeight: "100vh",
        padding: "clamp(48px, 6vw, 90px) clamp(28px, 4vw, 72px) clamp(80px, 10vw, 140px)",
      }}
    >
      {/* Tag */}
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
          fontSize: "clamp(11px, 0.9vw, 14px)",
          color: "#7a7068",
          opacity: 0.55,
          marginBottom: "clamp(28px, 4vw, 56px)",
          letterSpacing: "0.02em",
        }}
      >
        Software.Engineer
      </p>

      {/* Header — two lines, clip reveal via GSAP */}
      <div style={{ marginBottom: "clamp(64px, 11vw, 160px)" }}>
        <div ref={line1WrapRef} style={{ overflow: "hidden" }}>
          <span className="hl" style={headerStyle}>I help companies to</span>
        </div>
        <div ref={line2WrapRef} style={{ overflow: "hidden" }}>
          <span className="hl" style={headerStyle}>succeed on projects like:</span>
        </div>
      </div>

      {/* Service cycling — CSS grid stack, CSS transitions, no GSAP */}
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: "100%",
          minHeight: "clamp(180px, 22vw, 300px)",
        }}
      >
        {services.map((svc, i) => {
          const isActive = i === active;
          const isPrev   = i === prev;

          return (
            <div
              key={i}
              style={{
                gridArea: "1 / 1",
                textAlign: "center",
                // Each item is visible only when active; prev fades + slides up
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? "translateY(0)"
                  : isPrev
                    ? "translateY(-18px)"
                    : "translateY(20px)",
                transition: isActive
                  ? "opacity 0.52s ease, transform 0.52s ease"
                  : "opacity 0.42s ease, transform 0.42s ease",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 800,
                  fontSize: "clamp(34px, 5.2vw, 84px)",
                  lineHeight: 1.1,
                  color: "#7a7068",
                  letterSpacing: "-0.02em",
                  display: "block",
                }}
              >
                {svc.line1}
              </span>

              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 800,
                  fontSize: "clamp(34px, 5.2vw, 84px)",
                  lineHeight: 1.1,
                  color: "#e8a87c",
                  letterSpacing: "-0.02em",
                  display: "block",
                }}
              >
                {svc.line2}
              </span>

              <p
                style={{
                  marginTop: "clamp(14px, 1.8vw, 26px)",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 1vw, 15px)",
                  color: "#7a7068",
                  opacity: 0.6,
                  maxWidth: "300px",
                  lineHeight: 1.65,
                  textAlign: "center",
                  margin: "clamp(14px, 1.8vw, 26px) auto 0",
                }}
              >
                {svc.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

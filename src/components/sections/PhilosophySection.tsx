"use client";

import { useEffect, useRef } from "react";

const statements = [
  "I build production-ready platforms — from React Native mobile apps to full-stack web systems.",
  "I care about the craft: clean architecture, robust APIs, and a deployment that actually holds up.",
  "I move fast without breaking things — proven at Princeton Hackathon and in live IT systems serving 1,000+ users.",
  "I align your goals with the right technical decisions to ship something people actually use.",
];

// Each word is a separate span so they can appear one-by-one on scroll
const subtitleWords = ["and", "working", "with", "me", "saves", "it"];

export default function PhilosophySection() {
  const outerRef  = useRef<HTMLElement>(null);
  const line1Ref  = useRef<HTMLDivElement>(null);
  const line2Ref  = useRef<HTMLDivElement>(null);
  const sub2Ref   = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);
  const panel4Ref = useRef<HTMLDivElement>(null);

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
        // ── Initial states ───────────────────────────
        // Line 1: shift slightly left so "G" is barely cut off at start
        gsap.set(line1Ref.current, { x: "-5vw" });
        // Line 2: starts at its natural position (paddingLeft offset handles the indent)
        gsap.set(line2Ref.current, { x: "0vw" });

        // Subtitle words hidden initially
        const words = sub2Ref.current?.querySelectorAll<HTMLElement>(".w");
        if (words) gsap.set(words, { opacity: 0, y: 10 });

        gsap.set([panel3Ref.current, panel4Ref.current], { opacity: 0 });

        // ── Scrubbed timeline (start top top → end bottom bottom) ──
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });

        // Diverging horizontal motion: line 1 slides left, line 2 slides right
        // Both move from t=0 to t=7 (linear, scrubbed to scroll)
        tl.to(line1Ref.current, { x: "-22vw", ease: "none", duration: 7 }, 0)
          .to(line2Ref.current, { x: "14vw",  ease: "none", duration: 7 }, 0)

          // Big lines fade out at t=4.5→6
          .to([line1Ref.current, line2Ref.current],
            { opacity: 0, duration: 1.5, ease: "power2.in" }, 4.5)

          // Subtitle words appear one-by-one at t=2.5 (while big text still visible)
          .to(words ?? [],
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.32, ease: "power2.out" }, 2.5)
          // Subtitle fades out at t=6.2
          .to(words ?? [],
            { opacity: 0, y: -10, duration: 0.4, stagger: 0.1, ease: "power2.in" }, 6.2)

          // Panel 3: "perspective + sharp instincts" fades in t=6.8, out t=8
          .to(panel3Ref.current, { opacity: 1, duration: 1.2, ease: "power2.out" }, 6.8)
          .to(panel3Ref.current, { opacity: 0, duration: 1.0, ease: "power2.in" }, 8.0)

          // Panel 4: four statements fade in t=8.5, stay until end
          .to(panel4Ref.current, { opacity: 1, duration: 1.0, ease: "power2.out" }, 8.5)

          // End padding
          .to({}, { duration: 1 }, 9.5);
      });
    };

    init();
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  const peach = "var(--peach)";

  const bigLine: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    fontFamily: "var(--font-inter)",
    fontWeight: 800,
    fontSize: "clamp(90px, 16vw, 250px)",
    color: peach,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    zIndex: 1,
  };

  const panelBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    padding: "clamp(40px, 6vw, 96px)",
  };

  return (
    /* Outer: tall enough for 4 panels of content (~450vh effective scroll) */
    <section ref={outerRef} style={{ position: "relative", height: "550vh" }}>

      {/* Sticky inner — photo + all panels live here */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Background photo */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('/images/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "60% 25%",
            filter: "brightness(0.55) contrast(1.1) saturate(0.7) sepia(0.25)",
          }}
        />

        {/* Warm cinematic overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            background:
              "linear-gradient(to bottom, rgba(14,8,2,0.35) 0%, rgba(10,5,1,0.18) 50%, rgba(14,8,2,0.52) 100%)",
          }}
        />

        {/* ── Line 1: "Good software" — centered (overflows both sides), slides left ── */}
        <div
          ref={line1Ref}
          style={{
            ...bigLine,
            top: "26%",
            textAlign: "center",
          }}
        >
          Good software
        </div>

        {/* ── Line 2: "takes time" — indented right, slides right ── */}
        {/*   paddingLeft pushes the center-point rightward so it naturally overflows right */}
        <div
          ref={line2Ref}
          style={{
            ...bigLine,
            top: "46%",
            paddingLeft: "22vw",
            textAlign: "center",
          }}
        >
          takes time
        </div>

        {/* ── Subtitle: "and working with me saves it" ── */}
        {/* Appears word-by-word at the bottom while big text is still fading */}
        <div
          ref={sub2Ref}
          style={{
            position: "absolute",
            bottom: "clamp(48px, 8vh, 100px)",
            left: 0, right: 0,
            textAlign: "center",
            fontFamily: "var(--font-inter)",
            fontWeight: 600,
            fontSize: "clamp(18px, 2.4vw, 38px)",
            color: peach,
            letterSpacing: "-0.015em",
            zIndex: 5,
          }}
        >
          {subtitleWords.map((word, i) => (
            <span
              key={i}
              className="w"
              style={{
                display: "inline-block",
                marginRight: "0.3em",
                // "and" slightly dimmed, rest full peach — matching the reference
                opacity: i === 0 ? 0 : 0,
                color: i === 0 ? "rgba(245,201,160,0.55)" : peach,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* ── Panel 3: "perspective + sharp instincts" ── */}
        <div ref={panel3Ref} style={{ ...panelBase, opacity: 0, justifyContent: "center", zIndex: 3 }}>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: "clamp(11px, 1vw, 16px)",
              color: peach,
              opacity: 0.6,
              marginBottom: "clamp(10px, 1.2vw, 18px)",
              letterSpacing: "0.01em",
            }}
          >
            Companies partner with me because of my
          </p>

          <h2
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 800,
              fontSize: "clamp(52px, 9.5vw, 150px)",
              color: peach,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            perspective +<br />
            sharp instincts
          </h2>

          <div
            style={{
              height: "1px",
              background: "rgba(245,201,160,0.22)",
              margin: "clamp(20px, 3vw, 46px) 0",
            }}
          />

          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              fontSize: "clamp(15px, 1.6vw, 24px)",
              color: peach,
              opacity: 0.72,
              maxWidth: "520px",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            From RAG AI pipelines to trading platforms, I bring the right technical direction to make your product stand out.
          </p>
        </div>

        {/* ── Panel 4: Four "I…" statements ── */}
        <div ref={panel4Ref} style={{ ...panelBase, opacity: 0, justifyContent: "center", zIndex: 4 }}>
          {statements.map((stmt, i) => (
            <div key={i}>
              {i > 0 && (
                <div style={{ height: "1px", background: "rgba(245,201,160,0.14)" }} />
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "clamp(12px, 1.4vw, 20px)",
                  padding: "clamp(18px, 2.4vw, 36px) 0",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 300,
                    fontSize: "clamp(14px, 1.1vw, 17px)",
                    color: peach,
                    opacity: 0.35,
                    flexShrink: 0,
                    marginTop: "0.18em",
                    userSelect: "none",
                  }}
                >
                  /
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 600,
                    fontSize: "clamp(17px, 2vw, 32px)",
                    color: peach,
                    lineHeight: 1.35,
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stmt}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

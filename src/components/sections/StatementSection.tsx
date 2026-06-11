"use client";

import { useEffect, useRef } from "react";

function CursorIcon() {
  return (
    <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
      <path
        d="M1 1.5L11.5 8L7 9.2L5 14.5L1 1.5Z"
        fill="white"
        stroke="white"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BlinkingCaret() {
  return (
    <div className="flex items-center justify-center gap-1.5" style={{ height: "36px" }}>
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            width: "3px",
            height: "28px",
            borderRadius: "2px",
            background: "#e8a87c",
            animation: `caretBlink 1s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function StatementSection() {
  const pillRef     = useRef<HTMLSpanElement>(null);
  const tooltipRef  = useRef<HTMLDivElement>(null);
  const sectionRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !pillRef.current || !tooltipRef.current) return;
      const lines = sectionRef.current.querySelectorAll<HTMLElement>(".stmt-line");

      // Hide tooltip initially
      gsap.set(tooltipRef.current, { opacity: 0, y: 10, scale: 0.85, pointerEvents: "none" });

      ctx = gsap.context(() => {
        // Scroll reveal
        gsap.fromTo(
          lines,
          { y: 44, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.95, stagger: 0.11, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          }
        );

        // Pill pulse
        gsap.to(pillRef.current, {
          scale: 1.04, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1,
        });

        // Pure GSAP hover — no React state, fires immediately on mouseenter
        pillRef.current!.addEventListener("mouseenter", () => {
          gsap.killTweensOf(tooltipRef.current);
          gsap.to(tooltipRef.current, {
            opacity: 1, y: 0, scale: 1, duration: 0.32, ease: "back.out(1.6)",
          });
        });

        pillRef.current!.addEventListener("mouseleave", () => {
          gsap.killTweensOf(tooltipRef.current);
          gsap.to(tooltipRef.current, {
            opacity: 0, y: 8, scale: 0.85, duration: 0.2, ease: "power2.in",
          });
        });
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  const textStyle: React.CSSProperties = {
    fontFamily: "var(--font-inter)",
    fontWeight: 800,
    fontSize: "clamp(46px, 7.2vw, 108px)",
    lineHeight: 1.08,
    color: "#7a7068",           // warm gray — matches Juan's tone
  };

  const peachColor = "#e8a87c";

  return (
    <>
      {/* Blink keyframes */}
      <style>{`
        @keyframes caretBlink {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50%       { opacity: 0.3; transform: scaleY(0.6); }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ background: "#f7ede6", minHeight: "100vh", paddingTop: "120px", paddingBottom: "180px" }}
      >
        {/* Centered text block */}
        <div className="relative z-10 text-center px-6">

          {/* Line 1 */}
          <div className="stmt-line" style={{ opacity: 0 }}>
            <span style={textStyle}>2+ years</span>
          </div>

          {/* Line 2 */}
          <div className="stmt-line" style={{ opacity: 0 }}>
            <span style={textStyle}>making users</span>
          </div>

          {/* Line 3 — pill + "and scroll" */}
          <div
            className="stmt-line flex items-center justify-center flex-wrap"
            style={{ opacity: 0, gap: "clamp(8px, 1.5vw, 20px)" }}
          >
            {/* Pill wrapper — tooltip floats above via absolute */}
            <div className="relative inline-block">

              {/* Tooltip — anchored above the pill */}
              <div
                ref={tooltipRef}
                className="absolute flex flex-col items-center"
                style={{
                  bottom: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                  zIndex: 20,
                  whiteSpace: "nowrap",
                }}
              >
                <div
                  className="px-8 py-5 text-center"
                  style={{
                    background: "#6b6560",
                    borderRadius: "999px",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: "clamp(24px, 2.8vw, 42px)",
                    color: "#fff",
                    lineHeight: 1.25,
                    whiteSpace: "normal",
                    width: "max-content",
                    maxWidth: "480px",
                    textAlign: "center",
                  }}
                >
                  Who is a little<br />curious?
                </div>
                <BlinkingCaret />
              </div>

              {/* The click pill */}
              <span
                ref={pillRef}
                className="inline-flex items-center gap-2 px-7 cursor-pointer select-none"
                style={{
                  background: peachColor,
                  borderRadius: "999px",
                  height: "clamp(54px, 8vw, 116px)",
                  fontSize: "clamp(46px, 7.2vw, 108px)",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1,
                  display: "inline-flex",
                  transformOrigin: "center",
                }}
              >
                <CursorIcon />
                click
              </span>
            </div>

            <span style={textStyle}>&nbsp;and&nbsp;</span>
            <span style={{ ...textStyle, color: peachColor }}>scroll</span>
          </div>

          {/* Line 4 */}
          <div className="stmt-line" style={{ opacity: 0 }}>
            <span style={textStyle}>my products</span>
          </div>
        </div>

        {/* Orb — bottom left */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-110px",
            left: "-90px",
            width: "clamp(280px, 28vw, 460px)",
            height: "clamp(280px, 28vw, 460px)",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, #fde8d4 0%, #f5c9a0 45%, #d4845a 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Orb — bottom right */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-70px",
            width: "clamp(200px, 20vw, 320px)",
            height: "clamp(200px, 20vw, 320px)",
            borderRadius: "50%",
            background: "radial-gradient(circle at 38% 32%, #fde8d4 0%, #e8b090 45%, #c07050 100%)",
            pointerEvents: "none",
          }}
        />
      </section>
    </>
  );
}

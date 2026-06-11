"use client";

import { useEffect, useRef } from "react";

/* ── Folder icon (pure CSS) ──────────────────────── */
function FolderIcon() {
  return (
    <div style={{ position: "relative", width: "clamp(340px, 44vw, 680px)" }}>
      {/* Back tab */}
      <div style={{
        width: "44%",
        height: "clamp(32px, 3.8vw, 58px)",
        background: "#3040c8",
        borderRadius: "14px 14px 0 0",
        position: "relative", zIndex: 1,
      }} />

      {/* Body */}
      <div style={{
        width: "100%",
        aspectRatio: "4 / 3",
        background: "linear-gradient(150deg, #4a68f4 0%, #3045e0 52%, #2534c8 100%)",
        borderRadius: "0 20px 20px 20px",
        position: "relative", zIndex: 2,
        boxShadow:
          "0 48px 120px rgba(38,52,210,0.42), 0 12px 32px rgba(38,52,210,0.22)",
        overflow: "hidden",
      }}>
        {/* Highlight sheen */}
        <div style={{
          position: "absolute", inset: 0,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 52%)",
          pointerEvents: "none",
        }} />

        {/* Portfolio label */}
        <div style={{
          position: "absolute", top: "13%", left: "5.5%",
          background: "rgba(236,240,255,0.92)",
          borderRadius: "9px",
          padding: "clamp(4px,0.45vw,7px) clamp(10px,1.1vw,18px)",
          fontFamily: "var(--font-inter)",
          fontWeight: 600,
          fontSize: "clamp(10px, 0.95vw, 15px)",
          color: "#1a1a40",
          backdropFilter: "blur(6px)",
          letterSpacing: "0.01em",
        }}>
          Portfolio
        </div>

        {/* Vertical bar decorations */}
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            position: "absolute",
            bottom: "11%",
            left: `${28 + i * 14}%`,
            width: "8%",
            height: "40%",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "5px 5px 3px 3px",
          }} />
        ))}

        {/* Center dot */}
        <div style={{
          position: "absolute",
          top: "47%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "clamp(16px, 1.8vw, 28px)",
          height: "clamp(16px, 1.8vw, 28px)",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.18)",
        }} />
      </div>
    </div>
  );
}

/* ── Small icon for second frame ─────────────────── */
function NextIcon() {
  return (
    <div style={{
      width: "clamp(30px, 3.4vw, 52px)",
      height: "clamp(30px, 3.4vw, 52px)",
      background: "#0a0a0a",
      borderRadius: "9px",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <svg
        viewBox="0 0 24 24"
        fill="white"
        style={{ width: "60%", height: "60%" }}
      >
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C23.468 3.748 20.26.55 15.904.12c-.248-.026-1.381-.049-1.504-.049zm3.393 7.058a.475.475 0 01.238.392v.011l-.002 4.645-.002 4.645-.745-1.133-.748-1.134v-3.509a5220.984 5220.984 0 01.002-3.518c.005-.09.028-.173.067-.247a.47.47 0 01.406-.237c.311-.003.638.038.784.085z"/>
      </svg>
    </div>
  );
}

/* ── Frame wrapper ───────────────────────────────── */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      border: "1.5px solid rgba(122,112,104,0.22)",
      borderRadius: "14px",
      padding: "clamp(8px, 1.2vw, 18px) clamp(14px, 2.2vw, 32px)",
      background: "rgba(247,237,230,0.4)",
      backdropFilter: "blur(6px)",
    }}>
      {children}
    </div>
  );
}

/* ── Section ─────────────────────────────────────── */
export default function WorkCTA() {
  const sectionRef    = useRef<HTMLElement>(null);
  const bgTextRef     = useRef<HTMLDivElement>(null);
  const topRef        = useRef<HTMLDivElement>(null);
  const folderWrapRef = useRef<HTMLDivElement>(null);

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
        // "Work" watermark parallax — moves up slower than scroll
        gsap.to(bgTextRef.current, {
          y: "-18%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // Top content fade in
        gsap.fromTo(topRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 1.0, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
          }
        );

        // Folder entrance then float
        gsap.fromTo(folderWrapRef.current,
          { opacity: 0, y: 80 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
            onComplete: () => {
              gsap.to(folderWrapRef.current, {
                y: -18, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1,
              });
            },
          }
        );
      });
    };

    init();
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  const serviceText: React.CSSProperties = {
    fontFamily: "var(--font-inter)",
    fontWeight: 800,
    fontSize: "clamp(30px, 4.8vw, 78px)",
    color: "#7a7068",
    letterSpacing: "-0.025em",
    lineHeight: 1,
    display: "block",
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#f7ede6", minHeight: "110vh" }}
    >
      {/* ── Giant "Work" watermark ─────────────────── */}
      <div
        ref={bgTextRef}
        aria-hidden
        className="absolute inset-x-0 flex items-center justify-center select-none pointer-events-none"
        style={{ top: "10%" }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 900,
            fontSize: "clamp(180px, 40vw, 650px)",
            color: "rgba(205,155,110,0.13)",
            lineHeight: 1,
            whiteSpace: "nowrap",
            letterSpacing: "-0.04em",
          }}
        >
          Work
        </span>
      </div>

      {/* ── Top content ───────────────────────────── */}
      <div
        ref={topRef}
        className="relative z-10 flex flex-col items-center"
        style={{ paddingTop: "clamp(44px, 6.5vw, 100px)", opacity: 0 }}
      >
        {/* Frames stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
          {/* Frame 1 */}
          <Frame>
            <span style={serviceText}>React &amp;</span>
          </Frame>

          {/* Frame 2 + icon */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <NextIcon />
            <Frame>
              <span style={serviceText}>Next.js</span>
            </Frame>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            marginTop: "clamp(14px, 1.8vw, 26px)",
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: "clamp(12px, 1vw, 15px)",
            color: "#7a7068",
            opacity: 0.6,
            textAlign: "center",
            lineHeight: 1.75,
          }}
        >
          React Native · Node.js · Firebase · Python · SQL
          <br />
          from mobile apps to AI pipelines — shipped and in production.
        </p>

        {/* CTA */}
        <a
          href="#"
          style={{
            marginTop: "clamp(10px, 1.3vw, 18px)",
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            fontSize: "clamp(12px, 1vw, 15px)",
            color: "#7a7068",
            opacity: 0.55,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
        >
          Curious?… Check out →
        </a>
      </div>

      {/* ── Folder icon — centered inside "Work" text ─ */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -30%)",
        }}
      >
        <div ref={folderWrapRef} style={{ opacity: 0 }}>
          <FolderIcon />
        </div>
      </div>
    </section>
  );
}

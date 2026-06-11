"use client";

import { useEffect, useRef } from "react";

function BrowserChrome() {
  return (
    <div
      style={{
        background: "#ececec",
        padding: "10px 14px 0",
        borderRadius: "14px 14px 0 0",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* Traffic lights + URL bar row */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          {(["#ff5f57", "#ffbd2e", "#28c840"] as const).map((color, i) => (
            <div
              key={i}
              style={{ width: 12, height: 12, borderRadius: "50%", background: color }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: "#ddd",
            borderRadius: 6,
            padding: "4px 12px",
            fontFamily: "var(--font-inter)",
            fontSize: 12,
            color: "#666",
            textAlign: "center",
            letterSpacing: "0.01em",
          }}
        >
          onlyswap.app
        </div>
      </div>

      {/* Tab strip */}
      <div style={{ display: "flex", gap: 0 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "8px 8px 0 0",
            padding: "6px 20px",
            fontFamily: "var(--font-inter)",
            fontSize: 12,
            color: "#444",
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
        >
          OnlySwap — Trade Smart
        </div>
      </div>
    </div>
  );
}

export default function BrowserShowcase() {
  const sectionRef  = useRef<HTMLElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const browserRef  = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const tagsRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;
    let onMouseMove: ((e: MouseEvent) => void) | null = null;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // ── Initial states ──────────────────────────────────
        gsap.set(browserRef.current, {
          opacity: 0,
          y: 70,
          rotateX: 14,
          transformPerspective: 1100,
          transformOrigin: "50% 100%",
        });
        gsap.set([labelRef.current, tagsRef.current], { opacity: 0, y: 22 });

        const enterTrigger = {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        };

        // ── Entrance ────────────────────────────────────────
        gsap.to(browserRef.current, {
          opacity: 1, y: 0, rotateX: 0,
          duration: 1.25, ease: "power3.out",
          scrollTrigger: enterTrigger,
          onComplete: () => {
            // ── Cursor parallax tilt (after entrance) ──────
            const bX = gsap.quickTo(browserRef.current, "rotateY", { duration: 0.9, ease: "power3.out" });
            const bXT = gsap.quickTo(browserRef.current, "rotateX", { duration: 0.9, ease: "power3.out" });

            onMouseMove = (e: MouseEvent) => {
              const rect = wrapRef.current?.getBoundingClientRect();
              if (!rect) return;
              const cx = (e.clientX - rect.left) / rect.width  - 0.5;
              const cy = (e.clientY - rect.top)  / rect.height - 0.5;
              bX(cx  *  9);
              bXT(-cy * 6);
            };

            window.addEventListener("mousemove", onMouseMove);
          },
        });

        gsap.to(labelRef.current, {
          opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.15,
          scrollTrigger: enterTrigger,
        });
        gsap.to(tagsRef.current, {
          opacity: 1, y: 0, duration: 0.75, ease: "power3.out", delay: 0.32,
          scrollTrigger: enterTrigger,
        });

        // ── Scroll-scrubbed gentle tilt ─────────────────────
        gsap.to(browserRef.current, {
          rotateX: -5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom top",
            scrub: 2.5,
          },
        });
      });
    };

    init();
    return () => {
      cancelled = true;
      ctx?.revert();
      if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#f7ede6",
        padding: "clamp(70px, 10vw, 150px) clamp(20px, 4vw, 60px) clamp(80px, 11vw, 160px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* ── Project label ── */}
      <div
        ref={labelRef}
        style={{ opacity: 0, marginBottom: "clamp(28px, 4vw, 56px)", textAlign: "center" }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: "clamp(11px, 0.9vw, 14px)",
            color: "#7a7068",
            opacity: 0.5,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "clamp(6px, 0.8vw, 12px)",
          }}
        >
          Featured Project
        </p>
        <h2
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 800,
            fontSize: "clamp(44px, 7.5vw, 120px)",
            color: "#7a7068",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            margin: 0,
          }}
        >
          OnlySwap
        </h2>
      </div>

      {/* ── Browser mockup ── */}
      <div
        ref={wrapRef}
        style={{
          width: "min(980px, 92vw)",
          perspective: "1100px",
        }}
      >
        <div
          ref={browserRef}
          style={{
            borderRadius: 14,
            overflow: "hidden",
            boxShadow:
              "0 60px 120px rgba(0,0,0,0.18), 0 24px 48px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <BrowserChrome />

          {/* Content */}
          <div style={{ background: "#fff", lineHeight: 0 }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", display: "block" }}
            >
              <source src="/videos/onlyswap.mov" type="video/quicktime" />
              <source src="/videos/onlyswap.mov" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* ── Tags / stats row ── */}
      <div
        ref={tagsRef}
        style={{
          opacity: 0,
          marginTop: "clamp(20px, 2.8vw, 40px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(8px, 1vw, 14px)",
          justifyContent: "center",
        }}
      >
        {[
          "2nd Place · Princeton Hackathon",
          "$2,000 Prize",
          "245+ Users",
          "React Native · Node.js · Firebase",
          "iOS & Android",
        ].map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              fontSize: "clamp(11px, 0.85vw, 13px)",
              color: "#7a7068",
              opacity: 0.65,
              background: "rgba(122,112,104,0.09)",
              borderRadius: 999,
              padding: "clamp(5px, 0.5vw, 8px) clamp(12px, 1.2vw, 18px)",
              letterSpacing: "0.01em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

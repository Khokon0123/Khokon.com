"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";

export default function Hero() {
  const navRef       = useRef<HTMLElement>(null);
  const softwareRef  = useRef<HTMLParagraphElement>(null);
  const ceoRef       = useRef<HTMLParagraphElement>(null);
  const khokonWrapRef = useRef<HTMLDivElement>(null);
  const barauWrapRef  = useRef<HTMLDivElement>(null);
  const cardRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;
    let onMouseMove: ((e: MouseEvent) => void) | null = null;

    const init = async () => {
      const gsap = (await import("gsap")).default;

      const khokonText = khokonWrapRef.current?.querySelector<HTMLElement>(".name-text");
      const barauText  = barauWrapRef.current?.querySelector<HTMLElement>(".name-text");
      if (!khokonText || !barauText) return;

      // Lock initial states before first paint
      gsap.set(navRef.current,                          { y: -24, opacity: 0 });
      gsap.set([softwareRef.current, ceoRef.current],   { opacity: 0 });
      gsap.set(cardRef.current,                         { scale: 0.82, opacity: 0 });

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // ── Entrance sequence ──
        tl.to(navRef.current,   { y: 0, opacity: 1, duration: 0.55 }, 0.1);
        tl.fromTo(khokonText,   { y: "110%" }, { y: "0%", duration: 1.05 }, 0.2);
        tl.fromTo(barauText,    { y: "110%" }, { y: "0%", duration: 1.05 }, 0.32);
        tl.to(cardRef.current,  { scale: 1, opacity: 1, duration: 0.85, ease: "power2.out" }, 0.42);
        tl.to(
          [softwareRef.current, ceoRef.current],
          { opacity: 1, duration: 0.6, stagger: 0.08 },
          0.65
        );

        // ── After entrance: open clip masks + start animations ──
        tl.call(() => {
          // Open overflow so cursor parallax isn't clipped
          gsap.set([khokonWrapRef.current, barauWrapRef.current], { overflow: "visible" });

          // Card float (Y axis only — X is reserved for cursor parallax)
          gsap.to(cardRef.current, {
            y: -12,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          // ── Cursor parallax — quickTo for 60fps performance ──
          const kX = gsap.quickTo(khokonText,    "x", { duration: 0.9, ease: "power3.out" });
          const kY = gsap.quickTo(khokonText,    "y", { duration: 0.9, ease: "power3.out" });
          const bX = gsap.quickTo(barauText,     "x", { duration: 0.9, ease: "power3.out" });
          const bY = gsap.quickTo(barauText,     "y", { duration: 0.9, ease: "power3.out" });
          const cX = gsap.quickTo(cardRef.current, "x", { duration: 1.1, ease: "power3.out" });

          onMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth  - 0.5); // −0.5 → 0.5
            const y = (e.clientY / window.innerHeight - 0.5);

            // Both halves drift in the same direction — depth illusion
            kX(x * 38);
            kY(y * 18);
            bX(x * 38);
            bY(y * 18);

            // Card drifts a bit more — feels closer to the viewer
            cX(x * 58);
          };

          window.addEventListener("mousemove", onMouseMove);
        });

        // ── Hover letter-spacing on name halves ──
        const addHover = (el: HTMLElement) => {
          el.addEventListener("mouseenter", () =>
            gsap.to(el, { letterSpacing: "0.04em", opacity: 0.7, duration: 0.4, ease: "power2.out" })
          );
          el.addEventListener("mouseleave", () =>
            gsap.to(el, { letterSpacing: "normal",  opacity: 1,   duration: 0.4, ease: "power2.out" })
          );
        };
        addHover(khokonText);
        addHover(barauText);
      });
    };

    init();

    return () => {
      ctx?.revert();
      if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden" aria-label="Hero">
      {/* Background photo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "60% 18%",
          filter: "brightness(0.85) contrast(1.02) saturate(0.9) sepia(0.15)",
        }}
        aria-hidden="true"
      />

      {/* Warm gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(18,10,4,0.2) 0%, rgba(12,7,2,0.05) 40%, rgba(10,6,2,0.38) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Navbar */}
      <header ref={navRef} className="opacity-0">
        <Navbar />
      </header>

      {/* Title — middle left */}
      <p
        ref={softwareRef}
        className="absolute left-10 leading-tight opacity-0"
        style={{
          top: "24%",
          fontFamily: "var(--font-inter)",
          fontWeight: 700,
          fontSize: "clamp(24px, 2.6vw, 38px)",
          color: "var(--peach)",
          lineHeight: 1.15,
        }}
      >
        Software<br />Engineer
      </p>

      {/* ── Name row: Khokon | [card] | Barua + CEO ── */}
      {/*
       * pb-3 lifts content 12px off viewport bottom so CEO text isn't at the very edge.
       * Left column has a spacer matching CEO row height so Khokon and Barua baselines align.
       */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 pb-3">

        {/* Left column: Khokon + spacer (keeps baseline level with Barua) */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div ref={khokonWrapRef} className="overflow-hidden" style={{ lineHeight: 0.88 }}>
            <span
              className="name-text block font-black cursor-default select-none"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(72px, 13.5vw, 220px)",
                color: "var(--peach)",
                lineHeight: 0.88,
                transform: "translateY(110%)",
                display: "block",
                willChange: "transform, opacity, letter-spacing",
              }}
            >
              Khokon
            </span>
          </div>
          {/* Spacer matches CEO row height so both name baselines are identical */}
          <div style={{ height: "clamp(30px, 4vh, 48px)" }} />
        </div>

        {/* Floating project card */}
        <div
          ref={cardRef}
          className="relative flex-shrink-0 opacity-0"
          style={{
            width: "clamp(160px, 16vw, 280px)",
            marginBottom: "clamp(48px, 7vw, 110px)",
            willChange: "transform",
          }}
        >
          <div
            className="rounded-xl overflow-hidden"
            style={{
              aspectRatio: "4/3",
              background: "rgba(245, 201, 160, 0.07)",
              border: "1px solid rgba(245, 201, 160, 0.14)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="w-full h-full flex flex-col items-start justify-end p-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245,201,160,0.1) 0%, rgba(245,201,160,0.03) 100%)",
              }}
            >
              <div className="w-8 h-0.5 rounded-full mb-2" style={{ background: "var(--peach)", opacity: 0.45 }} />
              <p className="text-xs font-medium" style={{ fontFamily: "var(--font-inter)", color: "var(--peach)", opacity: 0.65 }}>
                Featured Project
              </p>
              <p className="text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)", color: "var(--peach)", opacity: 0.35 }}>
                Drop screenshot here →
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Barua on top, CEO label below */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div ref={barauWrapRef} className="overflow-hidden" style={{ lineHeight: 0.88, width: "max-content" }}>
            <span
              className="name-text block font-black text-right cursor-default select-none"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(72px, 13.5vw, 220px)",
                color: "var(--peach)",
                lineHeight: 0.88,
                transform: "translateY(110%)",
                display: "block",
                willChange: "transform, opacity, letter-spacing",
              }}
            >
              Barua
            </span>
          </div>
          <p
            ref={ceoRef}
            className="opacity-0 tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: "clamp(16px, 1.6vw, 26px)",
              fontWeight: 800,
              color: "var(--peach)",
              height: "clamp(30px, 4vh, 48px)",
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
            }}
          >
            Chief Executive Officer
          </p>
        </div>
      </div>
    </section>
  );
}

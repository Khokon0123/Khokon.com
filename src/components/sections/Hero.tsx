"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const softwareLine1Ref = useRef<HTMLSpanElement>(null);
  const softwareLine2Ref = useRef<HTMLSpanElement>(null);
  const ceoInnerRef      = useRef<HTMLSpanElement>(null);
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

      // Secondary text hidden; card starts small and scales up WITH the curtain slide
      gsap.set([softwareLine1Ref.current, softwareLine2Ref.current, ceoInnerRef.current], { y: "115%" });
      gsap.set(cardRef.current, { scale: 0.82 });

      ctx = gsap.context(() => {
        // Card scales up during the curtain slide (curtain starts at 1.87s, lasts 0.9s)
        gsap.delayedCall(1.87, () => {
          gsap.to(cardRef.current, { scale: 1, duration: 0.9, ease: "power2.inOut" });
        });

        // After loader is fully gone (~2.77s), start secondary reveals + idle animations
        gsap.delayedCall(2.8, () => {
          // Clip reveal: Software → Engineer → CEO, staggered
          gsap.to(softwareLine1Ref.current, { y: "0%", duration: 0.78, ease: "power3.out" });
          gsap.to(softwareLine2Ref.current, { y: "0%", duration: 0.78, ease: "power3.out", delay: 0.1 });
          gsap.to(ceoInnerRef.current,      { y: "0%", duration: 0.78, ease: "power3.out", delay: 0.18 });

          // Card float (Y only — X reserved for parallax)
          gsap.to(cardRef.current, {
            y: -12,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          // Cursor parallax — quickTo for 60fps smoothness
          const kX = gsap.quickTo(khokonText,      "x", { duration: 0.9, ease: "power3.out" });
          const kY = gsap.quickTo(khokonText,      "y", { duration: 0.9, ease: "power3.out" });
          const bX = gsap.quickTo(barauText,       "x", { duration: 0.9, ease: "power3.out" });
          const bY = gsap.quickTo(barauText,       "y", { duration: 0.9, ease: "power3.out" });
          const cX = gsap.quickTo(cardRef.current, "x", { duration: 1.1, ease: "power3.out" });

          onMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth  - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            kX(x * 38); kY(y * 18);
            bX(x * 38); bY(y * 18);
            cX(x * 58);
          };

          window.addEventListener("mousemove", onMouseMove);
        });

        // Hover letter-spacing (register immediately)
        const addHover = (el: HTMLElement) => {
          el.addEventListener("mouseenter", () =>
            gsap.to(el, { letterSpacing: "0.04em", opacity: 0.7, duration: 0.4, ease: "power2.out" })
          );
          el.addEventListener("mouseleave", () =>
            gsap.to(el, { letterSpacing: "normal", opacity: 1, duration: 0.4, ease: "power2.out" })
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

      {/* Title — top left, clip-reveal per line after loader */}
      <div
        className="absolute left-10"
        style={{ top: "24%", lineHeight: 1.15 }}
      >
        <div style={{ overflow: "hidden" }}>
          <span
            ref={softwareLine1Ref}
            style={{
              display: "block",
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: "clamp(24px, 2.6vw, 38px)",
              color: "var(--peach)",
              willChange: "transform",
            }}
          >
            Software
          </span>
        </div>
        <div style={{ overflow: "hidden" }}>
          <span
            ref={softwareLine2Ref}
            style={{
              display: "block",
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: "clamp(24px, 2.6vw, 38px)",
              color: "var(--peach)",
              willChange: "transform",
            }}
          >
            Engineer
          </span>
        </div>
      </div>

      {/* ── Name row: Khokon | [card] | Barua + CEO ── */}
      {/* Name + card are in final position from page load — revealed by the loader curtain sliding up */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 pb-3">

        {/* Left column: Khokon + spacer */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div ref={khokonWrapRef} style={{ lineHeight: 0.88, overflow: "visible" }}>
            <span
              className="name-text block font-black cursor-default select-none"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(72px, 13.5vw, 220px)",
                color: "var(--peach)",
                lineHeight: 0.88,
                display: "block",
                willChange: "transform, letter-spacing",
              }}
            >
              Khokon
            </span>
          </div>
          <div style={{ height: "clamp(30px, 4vh, 48px)" }} />
        </div>

        {/* Floating project card — in final position from load */}
        <div
          ref={cardRef}
          className="relative flex-shrink-0"
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
              backgroundImage: "url('/images/onlyswap.png')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
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
                OnlySwap
              </p>
              <p className="text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)", color: "var(--peach)", opacity: 0.35 }}>
                2nd Place · Princeton Hackathon
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Barua + CEO */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div ref={barauWrapRef} style={{ lineHeight: 0.88, width: "max-content", overflow: "visible" }}>
            <span
              className="name-text block font-black text-right cursor-default select-none"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(72px, 13.5vw, 220px)",
                color: "var(--peach)",
                lineHeight: 0.88,
                display: "block",
                willChange: "transform, letter-spacing",
              }}
            >
              Barua
            </span>
          </div>
          {/* CEO — clip reveal after loader */}
          <div
            className="tracking-widest uppercase"
            style={{
              height: "clamp(30px, 4vh, 48px)",
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              overflow: "hidden",
            }}
          >
            <span
              ref={ceoInnerRef}
              style={{
                display: "block",
                fontFamily: "var(--font-inter)",
                fontWeight: 800,
                fontSize: "clamp(16px, 1.6vw, 26px)",
                color: "var(--peach)",
                willChange: "transform",
              }}
            >
              Chief Executive Officer
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

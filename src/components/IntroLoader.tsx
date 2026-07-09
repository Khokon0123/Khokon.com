"use client";

import { useEffect, useRef } from "react";

export default function IntroLoader() {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const barRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    const init = async () => {
      const gsap = (await import("gsap")).default;

      ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // Progress bar fills 0 → 100%
        tl.fromTo(
          barRef.current,
          { width: "0%" },
          { width: "100%", duration: 1.4, ease: "power2.inOut" }
        );

        // Small pause at full
        tl.to({}, { duration: 0.15 });

        // Overlay color shifts from gray → peach (matches juanmora.co color flash)
        tl.to(overlayRef.current, {
          backgroundColor: "#f5c9a0",
          duration: 0.32,
          ease: "power2.inOut",
        });

        // Overlay slides up — curtain reveal
        tl.to(overlayRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power3.inOut",
          onComplete: () => {
            if (overlayRef.current) overlayRef.current.style.display = "none";
          },
        });
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#908880",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      {/* Thin progress bar — top edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "3px",
          background: "var(--peach)",
          width: "0%",
        }}
        ref={barRef}
      />

      {/* Centered name */}
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 600,
          fontSize: "clamp(13px, 1.1vw, 18px)",
          color: "var(--peach)",
          letterSpacing: "0.06em",
          margin: 0,
          userSelect: "none",
        }}
      >
        Khokon
        <span style={{ color: "var(--peach)", opacity: 0.6, margin: "0 6px" }}>•</span>
        Barua
      </p>
    </div>
  );
}

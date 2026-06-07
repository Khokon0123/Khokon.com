"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";

export default function Hero() {
  const navRef = useRef<HTMLElement>(null);
  const softwareRef = useRef<HTMLParagraphElement>(null);
  const ceoRef = useRef<HTMLParagraphElement>(null);
  const khokonWrapRef = useRef<HTMLDivElement>(null);
  const barauWrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    const init = async () => {
      const gsap = (await import("gsap")).default;

      const khokonText = khokonWrapRef.current?.querySelector<HTMLElement>(".name-text");
      const barauText = barauWrapRef.current?.querySelector<HTMLElement>(".name-text");

      if (!khokonText || !barauText) return;

      // Set initial states immediately (no flash)
      gsap.set(navRef.current, { y: -24, opacity: 0 });
      gsap.set([softwareRef.current, ceoRef.current], { opacity: 0 });
      gsap.set(cardRef.current, { scale: 0.82, opacity: 0 });

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Navbar slides down
        tl.to(navRef.current, { y: 0, opacity: 1, duration: 0.55 }, 0.1);

        // "Khokon" clip reveal
        tl.fromTo(khokonText, { y: "110%" }, { y: "0%", duration: 1.05 }, 0.2);

        // "Barua" clip reveal — slight stagger
        tl.fromTo(barauText, { y: "110%" }, { y: "0%", duration: 1.05 }, 0.32);

        // Floating card scales in
        tl.to(
          cardRef.current,
          { scale: 1, opacity: 1, duration: 0.85, ease: "power2.out" },
          0.42
        );

        // Titles fade in
        tl.to(
          [softwareRef.current, ceoRef.current],
          { opacity: 1, duration: 0.6, stagger: 0.08 },
          0.65
        );

        // Continuous card float
        tl.call(() => {
          gsap.to(cardRef.current, {
            y: -12,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

        // ── Hover animations on name halves ──
        const addHover = (el: HTMLElement | null) => {
          if (!el) return;
          el.addEventListener("mouseenter", () => {
            gsap.to(el, {
              letterSpacing: "0.04em",
              opacity: 0.7,
              duration: 0.4,
              ease: "power2.out",
            });
          });
          el.addEventListener("mouseleave", () => {
            gsap.to(el, {
              letterSpacing: "normal",
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          });
        };

        addHover(khokonText);
        addHover(barauText);
      });
    };

    init();

    return () => ctx?.revert();
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden" aria-label="Hero">
      {/* Background photo — cinematic dark + warm treatment */}
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

      {/* Warm dark gradient overlay — adds depth + matches Juan's amber mood */}
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

      {/* Left title — same structural position as Juan's "Brand & Web Design Specialist" */}
      <p
        ref={softwareRef}
        className="absolute left-10 font-medium leading-tight opacity-0"
        style={{
          top: "24%",
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(22px, 2.4vw, 34px)",
          color: "var(--peach)",
          lineHeight: 1.2,
        }}
      >
        Software<br />Engineer
      </p>

      {/* ── Name row: Khokon | [card] | Barua ── */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6">

        {/* Clip wrapper — Khokon */}
        <div
          ref={khokonWrapRef}
          className="overflow-hidden"
          style={{ lineHeight: 0.88 }}
        >
          <span
            className="name-text block font-black cursor-default select-none"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(72px, 13.5vw, 220px)",
              color: "var(--peach)",
              lineHeight: 0.88,
              transform: "translateY(110%)", // initial hidden state before GSAP
              display: "block",
              willChange: "transform, opacity, letter-spacing",
            }}
          >
            Khokon
          </span>
        </div>

        {/* Floating project card */}
        <div
          ref={cardRef}
          className="relative flex-shrink-0 opacity-0"
          style={{
            width: "clamp(160px, 16vw, 280px)",
            marginBottom: "clamp(48px, 7vw, 110px)",
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
              <div
                className="w-8 h-0.5 rounded-full mb-2"
                style={{ background: "var(--peach)", opacity: 0.45 }}
              />
              <p
                className="text-xs font-medium"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--peach)", opacity: 0.65 }}
              >
                Featured Project
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--peach)", opacity: 0.35 }}
              >
                Drop screenshot here →
              </p>
            </div>
          </div>
        </div>

        {/* Clip wrapper — Barua */}
        <div
          ref={barauWrapRef}
          className="overflow-hidden"
          style={{ lineHeight: 0.88 }}
        >
          <span
            className="name-text block font-black text-right cursor-default select-none"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(72px, 13.5vw, 220px)",
              color: "var(--peach)",
              lineHeight: 0.88,
              transform: "translateY(110%)", // initial hidden state before GSAP
              display: "block",
              willChange: "transform, opacity, letter-spacing",
            }}
          >
            Barua
          </span>
        </div>
      </div>

      {/* Bottom-right role */}
      <p
        ref={ceoRef}
        className="absolute bottom-6 right-8 text-sm font-medium tracking-widest uppercase opacity-0"
        style={{ fontFamily: "var(--font-dm-sans)", color: "var(--peach-dim)" }}
      >
        Chief Executive Officer
      </p>
    </section>
  );
}

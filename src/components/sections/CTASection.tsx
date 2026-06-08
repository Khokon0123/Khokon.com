"use client";

import { useEffect, useRef, useState } from "react";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);

  const [emailVisible, setEmailVisible] = useState(false);
  const [copied, setCopied]             = useState(false);

  // ── Scroll-in animation ───────────────────────────────────────────
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
        const trigger = { trigger: sectionRef.current, start: "top 85%", once: true };
        gsap.set([headingRef.current, subRef.current, bottomRef.current], { opacity: 0, y: 32 });
        gsap.to([headingRef.current, subRef.current, bottomRef.current], {
          opacity: 1, y: 0,
          duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.1,
          scrollTrigger: trigger,
        });
      });
    };

    init();
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("kbarua@owu.edu");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* silent */ }
  };

  // Small delay so moving mouse from "Let's talk" onto the card doesn't flicker
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showCard  = () => { if (hideTimer.current) clearTimeout(hideTimer.current); setEmailVisible(true); };
  const hideCard  = () => { hideTimer.current = setTimeout(() => setEmailVisible(false), 80); };

  const cardBg  = "#f0a878";
  const textClr = "rgba(120, 82, 58, 0.72)";
  const br      = "clamp(18px, 2.5vw, 36px)";

  const bigText: React.CSSProperties = {
    fontFamily: "var(--font-inter)",
    fontWeight: 800,
    fontSize: "clamp(48px, 8vw, 128px)",
    color: textClr,
    lineHeight: 1.0,
    letterSpacing: "-0.03em",
  };

  return (
    /*
     * overflow:hidden clips the email card while it slides up from below.
     * The card is position:absolute;bottom:0 inside this section.
     */
    <section
      ref={sectionRef}
      className="w-full"
      style={{
        position: "relative",
        overflow: "hidden",
        background: cardBg,
        borderRadius: `${br} ${br} 0 0`,
      }}
    >
      {/* ── Top — statement ── */}
      <div style={{ padding: "clamp(48px, 7vw, 110px) clamp(30px, 5vw, 80px) clamp(36px, 5vw, 72px)" }}>
        <h2 ref={headingRef} style={bigText}>
          Let&apos;s build<br />
          something people<br />
          remember
        </h2>

        <p
          ref={subRef}
          style={{
            marginTop: "clamp(14px, 1.8vw, 28px)",
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.4vw, 22px)",
            color: textClr,
          }}
        >
          from global tech companies to growing startups.
        </p>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: "1px", background: "rgba(0,0,0,0.1)" }} />

      {/* ── Bottom row — arrow + "Let's talk" hover trigger ── */}
      <div
        ref={bottomRef}
        onMouseEnter={showCard}
        onMouseLeave={hideCard}
        className="flex items-center justify-between"
        style={{ padding: "clamp(28px, 3.8vw, 58px) clamp(30px, 5vw, 80px)", cursor: "default" }}
      >
        <span style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
          fontSize: "clamp(38px, 6vw, 96px)",
          color: textClr,
          lineHeight: 1,
        }}>
          →
        </span>

        <a
          href="mailto:kbarua@owu.edu"
          style={{
            ...bigText,
            textDecoration: "none",
            transition: "opacity 0.25s ease",
            position: "relative",
            zIndex: 2,
          }}
        >
          Let&apos;s talk
        </a>
      </div>

      {/* ── Email reveal card ────────────────────────────────────────
           Sits at the bottom of the section (bottom:0).
           Starts below (translateY 100%) — clipped by overflow:hidden.
           Slides UP on hover to cover the bottom row.
      ── */}
      <div
        onMouseEnter={showCard}
        onMouseLeave={hideCard}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#524d49",
          padding: "clamp(36px, 5vw, 80px) clamp(30px, 5vw, 80px) clamp(44px, 6vw, 96px)",
          transform: emailVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.52s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 1,
        }}
      >
        {/* Email address */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 800,
            fontSize: "clamp(28px, 6vw, 104px)",
            color: "var(--peach)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            margin: 0,
          }}
        >
          kbarua@owu.edu
        </p>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          style={{
            marginTop: "clamp(20px, 2.5vw, 36px)",
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            fontSize: "clamp(11px, 0.9vw, 14px)",
            color: "#1a1208",
            background: copied ? "rgba(245,201,160,1)" : "rgba(245,201,160,0.75)",
            border: "none",
            borderRadius: "999px",
            padding: "clamp(7px, 0.65vw, 11px) clamp(18px, 1.8vw, 28px)",
            cursor: "pointer",
            letterSpacing: "0.01em",
            transition: "background 0.2s ease",
            display: "inline-block",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,201,160,1)")}
          onMouseLeave={(e) => { if (!copied) e.currentTarget.style.background = "rgba(245,201,160,0.75)"; }}
        >
          {copied ? "Copied ✓" : "Copy my Email"}
        </button>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";

export default function Navbar() {
  const wordmarkInnerRef = useRef<HTMLSpanElement>(null);
  const pillInnerRef     = useRef<HTMLDivElement>(null);
  const socialInnerRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    const init = async () => {
      const gsap = (await import("gsap")).default;

      // Each element starts below its clip container (same clip-reveal as the hero name)
      gsap.set([wordmarkInnerRef.current, pillInnerRef.current, socialInnerRef.current], {
        y: "110%",
      });

      ctx = gsap.context(() => {
        // Rise up in sync with the curtain slide-up (curtain starts 1.87s, lasts 0.9s)
        gsap.to(
          [wordmarkInnerRef.current, pillInnerRef.current, socialInnerRef.current],
          {
            y: "0%",
            duration: 0.9,
            ease: "power3.out",
            delay: 1.87,
            stagger: 0.06,
          }
        );
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <nav
      aria-label="Primary navigation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 36px",
        fontFamily: "var(--font-inter)",
        overflow: "hidden",
      }}
    >
      {/* Wordmark — left, clip container */}
      <div style={{ overflow: "hidden", lineHeight: 1 }}>
        <span
          ref={wordmarkInnerRef}
          style={{
            display: "block",
            fontWeight: 600,
            fontSize: "13px",
            letterSpacing: "0.01em",
            color: "var(--peach)",
            opacity: 0.9,
            willChange: "transform",
          }}
        >
          Khokon
          <span style={{ color: "#5b8cf6", margin: "0 2px" }}>•</span>
          Barua
        </span>
      </div>

      {/* Pill nav — center, clip container */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
          padding: "2px 0 6px",
        }}
      >
        <div
          ref={pillInnerRef}
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(16, 10, 5, 0.72)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "100px",
            padding: "5px 5px",
            gap: "2px",
            willChange: "transform",
          }}
        >
          <button
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={() => (window as any).__openAbout?.()}
            style={{
              padding: "8px 22px",
              fontSize: "13px",
              color: "var(--peach)",
              opacity: 0.8,
              borderRadius: "100px",
              transition: "opacity 0.2s",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-inter)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
          >
            About
          </button>

          {/* Center logo icon — opens resume */}
          <button
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={() => (window as any).__openResume?.()}
            aria-label="View Resume"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="3"  y1="17" x2="17" y2="3"  stroke="#3b5ef0" strokeWidth="2.4" strokeLinecap="round"/>
              <line x1="3"  y1="11" x2="11" y2="3"  stroke="#3b5ef0" strokeWidth="2.4" strokeLinecap="round"/>
              <line x1="9"  y1="17" x2="17" y2="9"  stroke="#3b5ef0" strokeWidth="2.4" strokeLinecap="round"/>
            </svg>
          </button>

          <a
            href="#work"
            style={{
              padding: "8px 22px",
              fontSize: "13px",
              color: "var(--peach)",
              opacity: 0.8,
              borderRadius: "100px",
              transition: "opacity 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
          >
            Work
          </a>
        </div>
      </div>

      {/* Social links — right, clip container */}
      <div style={{ overflow: "hidden", lineHeight: 1 }}>
        <div
          ref={socialInnerRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "13px",
            color: "var(--peach)",
            willChange: "transform",
          }}
        >
          {[
            { label: "Email",  href: "mailto:kbarua@owu.edu" },
            { label: "in",     href: "https://www.linkedin.com/in/khokon-barua/", external: true },
            { label: "x",      href: "#" },
            { label: "GitHub", href: "https://github.com/Khokon0123", external: true },
          ].map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              style={{ opacity: 0.65, transition: "opacity 0.2s", textDecoration: "none", color: "var(--peach)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.65")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

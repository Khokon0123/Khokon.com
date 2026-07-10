"use client";

import { useEffect, useRef, useState } from "react";

export default function ResumeModal() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__openResume = () => setVisible(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => { delete (window as any).__openResume; };
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;
    let ctx: { revert: () => void } | undefined;
    const run = async () => {
      const gsap = (await import("gsap")).default;
      ctx = gsap.context(() => {
        if (visible) {
          gsap.set(overlayRef.current, { display: "flex" });
          gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
        } else {
          gsap.to(overlayRef.current, {
            opacity: 0, duration: 0.28, ease: "power2.in",
            onComplete: () => { if (overlayRef.current) overlayRef.current.style.display = "none"; },
          });
        }
      });
    };
    run();
    return () => ctx?.revert();
  }, [visible]);

  return (
    <div
      ref={overlayRef}
      style={{
        display: "none",
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(10, 6, 2, 0.96)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "20px",
        gap: "16px",
      }}
    >
      {/* Top bar */}
      <div style={{
        width: "100%",
        maxWidth: "900px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <p style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 700,
          fontSize: "15px",
          color: "var(--peach)",
          margin: 0,
          opacity: 0.85,
        }}>
          Khokon Barua — Resume
        </p>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Open in new tab — fallback for browsers blocking embed */}
          <a
            href="/khokon.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 16px",
              background: "rgba(245,201,160,0.1)",
              border: "1px solid rgba(245,201,160,0.18)",
              borderRadius: "100px",
              fontFamily: "var(--font-inter)", fontWeight: 600,
              fontSize: "12px", color: "var(--peach)",
              textDecoration: "none", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,201,160,0.18)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(245,201,160,0.1)")}
          >
            ↗ Open
          </a>

          {/* Download */}
          <a
            href="/khokon.pdf"
            download="Khokon_Barua_Resume.pdf"
            style={{
              display: "flex", alignItems: "center", gap: "7px",
              padding: "9px 20px",
              background: "var(--peach)", color: "#1a1208",
              borderRadius: "100px",
              fontFamily: "var(--font-inter)", fontWeight: 700,
              fontSize: "13px", textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v7M4 5.5l2.5 2.5 2.5-2.5M1.5 11h10" stroke="#1a1208" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download
          </a>

          {/* Close */}
          <button
            onClick={() => setVisible(false)}
            aria-label="Close resume"
            style={{
              background: "rgba(245,201,160,0.08)",
              border: "1px solid rgba(245,201,160,0.14)",
              borderRadius: "50%",
              width: "38px", height: "38px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--peach)", fontSize: "15px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,201,160,0.16)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(245,201,160,0.08)")}
          >
            ✕
          </button>
        </div>
      </div>

      {/* PDF — only mounted when visible so it loads fresh each open */}
      <div style={{
        width: "100%", maxWidth: "900px",
        flex: 1, minHeight: 0,
        borderRadius: "14px", overflow: "hidden",
        border: "1px solid rgba(245,201,160,0.1)",
      }}>
        {visible && (
          <object
            data="/khokon.pdf"
            type="application/pdf"
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            {/* Fallback for browsers that can't embed PDF */}
            <div style={{
              width: "100%", height: "100%",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "16px", background: "rgba(245,201,160,0.04)",
            }}>
              <p style={{ fontFamily: "var(--font-inter)", color: "var(--peach)", opacity: 0.6, margin: 0, fontSize: "14px" }}>
                Your browser can&apos;t display the PDF inline.
              </p>
              <a
                href="/khokon.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "10px 24px", background: "var(--peach)", color: "#1a1208",
                  borderRadius: "100px", fontFamily: "var(--font-inter)", fontWeight: 700,
                  fontSize: "13px", textDecoration: "none",
                }}
              >
                Open PDF in new tab
              </a>
            </div>
          </object>
        )}
      </div>
    </div>
  );
}

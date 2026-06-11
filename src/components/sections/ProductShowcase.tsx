"use client";

import { useEffect, useRef } from "react";

const placeholderCards = [
  { bg: "linear-gradient(160deg, #080f18 0%, #0a2820 40%, #0d3a28 100%)" },
  { bg: "linear-gradient(160deg, #e8e4e0 0%, #d0cbc6 50%, #b8b3ae 100%)" },
  { bg: "linear-gradient(160deg, #0a0a40 0%, #1018a0 50%, #2030e0 100%)" },
];

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      fontFamily: "var(--font-inter)",
      fontWeight: 500,
      fontSize: "clamp(8px, 0.65vw, 11px)",
      color,
      border: `1px solid ${color}`,
      borderRadius: 999,
      padding: "2px 9px",
      letterSpacing: "0.01em",
      opacity: 0.8,
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

function RAGCard() {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(160deg, #080d1a 0%, #0d1a2e 50%, #0a1428 100%)",
      borderRadius: "inherit",
      padding: "clamp(16px, 1.8vw, 28px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute",
        top: "-20%", right: "-20%",
        width: "60%", height: "60%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Top: tag + title */}
      <div>
        <p style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 500,
          fontSize: "clamp(8px, 0.65vw, 10px)",
          color: "#a5b4fc",
          opacity: 0.7,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          margin: "0 0 clamp(8px, 1vw, 14px)",
        }}>
          Personal Project · May 2026
        </p>

        <h3 style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 800,
          fontSize: "clamp(14px, 1.4vw, 22px)",
          color: "#e0e7ff",
          lineHeight: 1.2,
          margin: "0 0 clamp(6px, 0.8vw, 12px)",
          letterSpacing: "-0.02em",
        }}>
          PDF Knowledge<br />Base
        </h3>

        <p style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
          fontSize: "clamp(9px, 0.75vw, 12px)",
          color: "#a5b4fc",
          opacity: 0.65,
          lineHeight: 1.6,
          margin: "0 0 clamp(10px, 1.2vw, 18px)",
        }}>
          End-to-end RAG pipeline for natural language Q&amp;A over PDFs with source attribution.
        </p>

        {/* Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(4px, 0.4vw, 6px)" }}>
          {["LangChain", "ChromaDB", "LLaMA 3.2", "Ollama", "Streamlit"].map((t) => (
            <Pill key={t} label={t} color="#a5b4fc" />
          ))}
        </div>
      </div>

      {/* Bottom: stats */}
      <div style={{
        borderTop: "1px solid rgba(165,180,252,0.12)",
        paddingTop: "clamp(10px, 1.2vw, 18px)",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(4px, 0.5vw, 8px)",
      }}>
        {[
          "Semantic search via Sentence Transformers",
          "Conversation memory + cited sources",
          "Zero API cost · full data privacy",
        ].map((line) => (
          <div key={line} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <span style={{ color: "#6366f1", fontSize: "clamp(8px, 0.7vw, 11px)", marginTop: "0.15em", flexShrink: 0 }}>▸</span>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: "clamp(8px, 0.7vw, 11px)",
              color: "#a5b4fc",
              opacity: 0.55,
              margin: 0,
              lineHeight: 1.5,
            }}>
              {line}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummarizerCard() {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(160deg, #0d0a1a 0%, #1a0d2e 50%, #140a24 100%)",
      borderRadius: "inherit",
      padding: "clamp(16px, 1.8vw, 28px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute",
        bottom: "-20%", left: "-10%",
        width: "55%", height: "55%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(167,139,250,0.16) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Top: tag + title */}
      <div>
        <p style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 500,
          fontSize: "clamp(8px, 0.65vw, 10px)",
          color: "#c4b5fd",
          opacity: 0.7,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          margin: "0 0 clamp(8px, 1vw, 14px)",
        }}>
          Personal Project · June 2026
        </p>

        <h3 style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 800,
          fontSize: "clamp(14px, 1.4vw, 22px)",
          color: "#ede9fe",
          lineHeight: 1.2,
          margin: "0 0 clamp(6px, 0.8vw, 12px)",
          letterSpacing: "-0.02em",
        }}>
          Meeting Notes<br />Summarizer
        </h3>

        <p style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
          fontSize: "clamp(9px, 0.75vw, 12px)",
          color: "#c4b5fd",
          opacity: 0.65,
          lineHeight: 1.6,
          margin: "0 0 clamp(10px, 1.2vw, 18px)",
        }}>
          AI summarizer that extracts action items, deadlines, and attendees from any meeting transcript.
        </p>

        {/* Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(4px, 0.4vw, 6px)" }}>
          {["BART-large-CNN", "HuggingFace", "Streamlit", "NLP"].map((t) => (
            <Pill key={t} label={t} color="#c4b5fd" />
          ))}
        </div>
      </div>

      {/* Bottom: stats */}
      <div style={{
        borderTop: "1px solid rgba(196,181,253,0.12)",
        paddingTop: "clamp(10px, 1.2vw, 18px)",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(4px, 0.5vw, 8px)",
      }}>
        {[
          "Smart chunking — handles long documents",
          "Auto-extracts action items & deadlines",
          ".txt upload + one-click download",
        ].map((line) => (
          <div key={line} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <span style={{ color: "#7c3aed", fontSize: "clamp(8px, 0.7vw, 11px)", marginTop: "0.15em", flexShrink: 0 }}>▸</span>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: "clamp(8px, 0.7vw, 11px)",
              color: "#c4b5fd",
              opacity: 0.55,
              margin: 0,
              lineHeight: 1.5,
            }}>
              {line}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  const sectionRef  = useRef<HTMLElement>(null);
  const title1Ref   = useRef<HTMLDivElement>(null);
  const title2Ref   = useRef<HTMLDivElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const trigger = { trigger: sectionRef.current, start: "top 80%", once: true };

        const line1 = title1Ref.current?.querySelector<HTMLElement>(".pl");
        const line2 = title2Ref.current?.querySelector<HTMLElement>(".pl");
        if (line1 && line2) {
          gsap.set([line1, line2], { y: "105%" });
          gsap.to([line1, line2], {
            y: "0%", duration: 1.05, stagger: 0.1, ease: "power3.out",
            scrollTrigger: trigger,
          });
        }

        gsap.fromTo(descRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3, scrollTrigger: trigger }
        );

        const validCards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
        validCards.forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 60, opacity: 0, scale: 0.95 },
            {
              y: 0, opacity: 1, scale: 1,
              duration: 0.88, ease: "power3.out",
              delay: 0.1 + i * 0.08,
              scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
            }
          );
        });

        validCards.forEach((el) => {
          el.addEventListener("mouseenter", () =>
            gsap.to(el, { y: -12, scale: 1.03, duration: 0.36, ease: "power2.out" })
          );
          el.addEventListener("mouseleave", () =>
            gsap.to(el, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" })
          );
        });
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  const titleStyle: React.CSSProperties = {
    fontFamily: "var(--font-inter)",
    fontWeight: 800,
    fontSize: "clamp(44px, 7vw, 112px)",
    color: "#7a7068",
    letterSpacing: "-0.028em",
    lineHeight: 1.0,
    display: "block",
  };

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{
        background: "#f7ede6",
        paddingTop: "clamp(56px, 8vw, 120px)",
        paddingBottom: "clamp(70px, 9vw, 130px)",
      }}
    >
      {/* Title */}
      <div className="text-center" style={{ marginBottom: "clamp(12px, 1.8vw, 24px)" }}>
        <div ref={title1Ref} style={{ overflow: "hidden" }}>
          <span className="pl" style={titleStyle}>AI &amp; ML</span>
        </div>
        <div ref={title2Ref} style={{ overflow: "hidden" }}>
          <span className="pl" style={titleStyle}>Projects</span>
        </div>
      </div>

      {/* Description */}
      <p
        ref={descRef}
        className="text-center"
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
          fontSize: "clamp(12px, 1vw, 15px)",
          color: "#7a7068",
          opacity: 0,
          lineHeight: 1.7,
          marginBottom: "clamp(36px, 5.5vw, 80px)",
        }}
      >
        RAG pipelines, NLP summarizers, and AI tooling —
        <br />
        built locally, zero API cost, production-ready.
      </p>

      {/* Cards */}
      <div
        className="flex items-stretch"
        style={{
          gap: "clamp(6px, 0.7vw, 12px)",
          paddingInline: "clamp(14px, 1.8vw, 28px)",
        }}
      >
        {/* Card 1 — RAG app */}
        <div
          ref={(el) => { cardRefs.current[0] = el; }}
          className="flex-1 cursor-pointer overflow-hidden"
          style={{
            aspectRatio: "3 / 4",
            borderRadius: "clamp(8px, 1vw, 14px)",
            minWidth: 0,
            opacity: 0,
            willChange: "transform",
          }}
        >
          <RAGCard />
        </div>

        {/* Card 2 — Meeting Summarizer */}
        <div
          ref={(el) => { cardRefs.current[1] = el; }}
          className="flex-1 cursor-pointer overflow-hidden"
          style={{
            aspectRatio: "3 / 4",
            borderRadius: "clamp(8px, 1vw, 14px)",
            minWidth: 0,
            opacity: 0,
            willChange: "transform",
          }}
        >
          <SummarizerCard />
        </div>

        {/* Cards 3–5 — placeholders */}
        {placeholderCards.map((c, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i + 2] = el; }}
            className="flex-1 cursor-pointer overflow-hidden"
            style={{
              aspectRatio: "3 / 4",
              borderRadius: "clamp(8px, 1vw, 14px)",
              background: c.bg,
              minWidth: 0,
              opacity: 0,
              willChange: "transform",
            }}
          />
        ))}
      </div>
    </section>
  );
}

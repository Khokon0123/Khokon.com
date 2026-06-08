"use client";

import { useEffect, useRef } from "react";

const cards = [
  { bg: "linear-gradient(160deg, #101010 0%, #1c1c1c 50%, #282828 100%)" },
  { bg: "linear-gradient(160deg, #f0e8e0 0%, #e8d0b8 50%, #d8b890 100%)" },
  { bg: "linear-gradient(160deg, #080f18 0%, #0a2820 40%, #0d3a28 100%)" },
  { bg: "linear-gradient(160deg, #e8e4e0 0%, #d0cbc6 50%, #b8b3ae 100%)" },
  { bg: "linear-gradient(160deg, #0a0a40 0%, #1018a0 50%, #2030e0 100%)" },
];

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

        // Title lines — clip reveal
        const line1 = title1Ref.current?.querySelector<HTMLElement>(".pl");
        const line2 = title2Ref.current?.querySelector<HTMLElement>(".pl");
        if (line1 && line2) {
          gsap.set([line1, line2], { y: "105%" });
          gsap.to([line1, line2], {
            y: "0%", duration: 1.05, stagger: 0.1, ease: "power3.out",
            scrollTrigger: trigger,
          });
        }

        // Description fade
        gsap.fromTo(descRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3,
            scrollTrigger: trigger }
        );

        // Cards — stagger up from below
        const validCards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
        validCards.forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 60, opacity: 0, scale: 0.95 },
            {
              y: 0, opacity: 1, scale: 1,
              duration: 0.88,
              ease: "power3.out",
              delay: 0.1 + i * 0.08,
              scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
            }
          );
        });

        // Hover lift
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
      {/* Two-line centered title */}
      <div className="text-center" style={{ marginBottom: "clamp(12px, 1.8vw, 24px)" }}>
        <div ref={title1Ref} style={{ overflow: "hidden" }}>
          <span className="pl" style={titleStyle}>Product Design</span>
        </div>
        <div ref={title2Ref} style={{ overflow: "hidden" }}>
          <span className="pl" style={titleStyle}>Enhancement</span>
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
        Bringing fresh ideas to turn complex products into
        <br />
        intuitive experiences with an elevated visual layer.
      </p>

      {/* Portrait cards — all same size */}
      <div
        className="flex items-stretch"
        style={{
          gap: "clamp(6px, 0.7vw, 12px)",
          paddingInline: "clamp(14px, 1.8vw, 28px)",
        }}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="flex-1 cursor-pointer overflow-hidden"
            style={{
              aspectRatio: "3 / 4",
              borderRadius: "clamp(8px, 1vw, 14px)",
              background: c.bg,
              backgroundSize: "cover",
              backgroundPosition: "center",
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

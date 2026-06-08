"use client";

import { useEffect, useRef } from "react";

// Replace bg with backgroundImage: "url('/images/projects/name.jpg')" + backgroundSize: "cover" when ready
const cards = [
  { bg: "linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)" },
  { bg: "linear-gradient(145deg, #3040d8 0%, #e04828 60%, #f07030 100%)" },
  { bg: "linear-gradient(145deg, #e86020 0%, #d04810 50%, #f08840 100%)" },
  { bg: "linear-gradient(145deg, #a8e040 0%, #30b870 40%, #60d8a0 100%)" },
  { bg: "linear-gradient(145deg, #f0c0e0 0%, #e0a0d0 35%, #c0c8f8 70%, #f8e0c0 100%)" },
];

export default function BrandShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Title clip-reveal
        gsap.set(titleRef.current, { y: "102%", opacity: 0 });
        gsap.to(titleRef.current, {
          y: "0%", opacity: 1, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        });

        // Description fade
        gsap.fromTo(descRef.current,
          { opacity: 0, y: 14 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2,
            scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
          }
        );

        // Cards: slide in from sides, center from below — stagger
        const validCards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
        const xOffsets   = [-80, -40, 0, 40, 80];

        validCards.forEach((el, i) => {
          gsap.fromTo(
            el,
            { x: xOffsets[i], y: i === 2 ? 40 : 20, opacity: 0, scale: 0.94 },
            {
              x: 0, y: 0, opacity: 1, scale: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                once: true,
              },
              delay: 0.08 + i * 0.07,
            }
          );
        });

        // Hover lift
        validCards.forEach((el) => {
          el.addEventListener("mouseenter", () =>
            gsap.to(el, { y: -10, scale: 1.03, duration: 0.35, ease: "power2.out" })
          );
          el.addEventListener("mouseleave", () =>
            gsap.to(el, { y: 0, scale: 1, duration: 0.38, ease: "power2.out" })
          );
        });
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{
        background: "#f7ede6",
        paddingTop: "clamp(48px, 7vw, 110px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
      }}
    >
      {/* Centered header */}
      <div className="text-center overflow-hidden" style={{ marginBottom: "clamp(10px, 1.5vw, 20px)" }}>
        <h2
          ref={titleRef}
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 800,
            fontSize: "clamp(40px, 6.5vw, 100px)",
            color: "#7a7068",
            letterSpacing: "-0.025em",
            lineHeight: 1.0,
            display: "inline-block",
          }}
        >
          SaaS &amp; Mobile
        </h2>
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
          marginBottom: "clamp(32px, 5vw, 72px)",
        }}
      >
        End-to-end products built for scale, speed,
        <br />
        and real user value.
      </p>

      {/* Square cards — all equal size */}
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
              aspectRatio: "1 / 1",
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

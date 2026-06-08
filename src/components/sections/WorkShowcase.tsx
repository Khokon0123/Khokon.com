"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    bg: "linear-gradient(148deg, #f5e050 0%, #eec020 35%, #f8f8f0 100%)",
    h: "clamp(300px, 30vw, 400px)",
    rotateY: -16, rotateZ: 1.5, scale: 0.88,
  },
  {
    bg: "linear-gradient(148deg, #d8e8c0 0%, #98c878 45%, #f0f5e8 100%)",
    h: "clamp(330px, 33vw, 430px)",
    rotateY: -9, rotateZ: 0.7, scale: 0.94,
  },
  {
    bg: "linear-gradient(148deg, #6888d8 0%, #c040a8 45%, #e85848 100%)",
    h: "clamp(365px, 36vw, 470px)",
    rotateY: 0, rotateZ: 0, scale: 1.06,
  },
  {
    bg: "linear-gradient(148deg, #f0ece8 0%, #d8d0c8 55%, #b8b0a8 100%)",
    h: "clamp(330px, 33vw, 430px)",
    rotateY: 9, rotateZ: -0.7, scale: 0.94,
  },
  {
    bg: "linear-gradient(148deg, #202040 0%, #401878 50%, #080810 100%)",
    h: "clamp(300px, 30vw, 400px)",
    rotateY: 16, rotateZ: -1.5, scale: 0.88,
  },
];

export default function WorkShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);

        // Start state: flat, lifted, invisible
        gsap.set(cards, {
          rotateY: 0,
          rotateZ: 0,
          scale: 0.86,
          opacity: 0,
          y: 90,
        });

        // Scrubbed timeline — plays as you scroll into the section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            end: "center 55%",
            scrub: 1.8,
          },
        });

        cards.forEach((el, i) => {
          const p = projects[i];
          tl.to(
            el,
            {
              rotateY: p.rotateY,
              rotateZ: p.rotateZ,
              scale: p.scale,
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 1,
            },
            0  // all cards animate simultaneously from position 0
          );
        });

        // Hover: card lifts and straightens toward viewer
        cards.forEach((el, i) => {
          const p = projects[i];
          el.addEventListener("mouseenter", () =>
            gsap.to(el, {
              rotateY: p.rotateY * 0.25,
              rotateZ: 0,
              scale: p.scale + 0.05,
              y: -12,
              duration: 0.45,
              ease: "power2.out",
            })
          );
          el.addEventListener("mouseleave", () =>
            gsap.to(el, {
              rotateY: p.rotateY,
              rotateZ: p.rotateZ,
              scale: p.scale,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            })
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
        paddingBlock: "clamp(20px, 3vw, 48px) clamp(80px, 10vw, 130px)",
        overflow: "visible",
      }}
    >
      {/* Perspective wrapper — makes rotateY look 3D */}
      <div style={{ perspective: "1100px", perspectiveOrigin: "50% 40%" }}>
        <div
          className="flex items-end justify-center"
          style={{
            gap: "clamp(8px, 0.9vw, 14px)",
            paddingInline: "clamp(14px, 1.8vw, 28px)",
          }}
        >
          {projects.map((p, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="flex-1 cursor-pointer overflow-hidden"
              style={{
                height: p.h,
                borderRadius: "clamp(8px, 1vw, 14px)",
                background: p.bg,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minWidth: 0,
                opacity: 0,
                transformOrigin: "center bottom",
                boxShadow: "0 24px 64px rgba(0,0,0,0.13)",
                willChange: "transform",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

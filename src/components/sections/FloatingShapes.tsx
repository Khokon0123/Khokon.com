"use client";

import { useEffect, useRef } from "react";

/* ── Icon helpers ─────────────────────────────────── */
function TriangleIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path
        d="M20 8L34 30H6L20 8Z"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4V28M4 16H28" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M4 14H24M16 6L24 14L16 22" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Shape data ───────────────────────────────────── */
const shapes = [
  // 0 — large sphere top-left (partially clipped)
  {
    style: {
      width: "clamp(260px, 28vw, 430px)", height: "clamp(260px, 28vw, 430px)",
      borderRadius: "50%",
      background: "radial-gradient(circle at 33% 28%, #fde8d8 0%, #eebbA0 42%, #c07858 100%)",
      top: "-100px", left: "-110px",
    },
    floatY: 22, dur: 5.0, delay: 0, pFactor: 0.025,
  },
  // 1 — circle outline
  {
    style: {
      width: "clamp(140px, 15vw, 220px)", height: "clamp(140px, 15vw, 220px)",
      borderRadius: "50%",
      background: "transparent",
      border: "1.5px solid rgba(180,120,90,0.3)",
      top: "8%", left: "19%",
    },
    floatY: -28, dur: 6.2, delay: 0.6, pFactor: 0.055,
  },
  // 2 — diagonal pill (center-left)
  {
    style: {
      width: "clamp(180px, 18vw, 280px)", height: "clamp(88px, 9vw, 138px)",
      borderRadius: "999px",
      background: "radial-gradient(ellipse at 33% 28%, #f5e0d0 0%, #c8a088 52%, #807060 100%)",
      top: "22%", left: "18%",
      transform: "rotate(-22deg)",
    },
    floatY: 18, dur: 4.2, delay: 1.1, pFactor: 0.07, rotate: -22,
  },
  // 3 — large center sphere
  {
    style: {
      width: "clamp(240px, 26vw, 390px)", height: "clamp(240px, 26vw, 390px)",
      borderRadius: "50%",
      background: "radial-gradient(circle at 36% 30%, #fde8d0 0%, #f0b890 50%, #c87050 100%)",
      top: "28%", left: "38%",
    },
    floatY: -20, dur: 5.5, delay: 0.35, pFactor: 0.038,
  },
  // 4 — squircle top-right with triangle
  {
    style: {
      width: "clamp(190px, 20vw, 295px)", height: "clamp(190px, 20vw, 295px)",
      borderRadius: "58px",
      background: "radial-gradient(circle at 35% 30%, #f5d8c0 0%, #e0a070 52%, #b86040 100%)",
      top: "4%", right: "4%",
    },
    floatY: 24, dur: 4.6, delay: 0.8, pFactor: 0.06, icon: "triangle", iconSize: 48,
  },
  // 5 — small sphere with + (right)
  {
    style: {
      width: "clamp(100px, 12vw, 175px)", height: "clamp(100px, 12vw, 175px)",
      borderRadius: "50%",
      background: "radial-gradient(circle at 36% 30%, #fdf0e8 0%, #e0c0a0 50%, #a08060 100%)",
      bottom: "18%", right: "7%",
    },
    floatY: -14, dur: 3.6, delay: 1.3, pFactor: 0.085, icon: "plus", iconSize: 34,
  },
  // 6 — rounded rect bottom-center with arrow
  {
    style: {
      width: "clamp(130px, 13vw, 200px)", height: "clamp(75px, 7.5vw, 115px)",
      borderRadius: "26px",
      background: "radial-gradient(ellipse at 30% 30%, #ede8e0 0%, #ccc0b0 50%, #989080 100%)",
      bottom: "7%", left: "28%",
    },
    floatY: 12, dur: 4.1, delay: 0.55, pFactor: 0.05, icon: "arrow", iconSize: 30,
  },
  // 7 — blue dot small left
  {
    style: {
      width: "20px", height: "20px",
      borderRadius: "50%", background: "#5b6cf6",
      top: "56%", left: "19%",
    },
    floatY: -10, dur: 2.6, delay: 1.6, pFactor: 0.12,
  },
  // 8 — blue pill accent top
  {
    style: {
      width: "48px", height: "21px",
      borderRadius: "999px", background: "#5b6cf6",
      top: "16%", right: "33%",
    },
    floatY: 14, dur: 3.1, delay: 0.45, pFactor: 0.095,
  },
  // 9 — blue tiny pentagon (small square rotated)
  {
    style: {
      width: "13px", height: "13px",
      borderRadius: "3px", background: "#5b6cf6",
      top: "63%", right: "27%",
      transform: "rotate(18deg)",
    },
    floatY: -9, dur: 2.9, delay: 2.1, pFactor: 0.115,
  },
];

export default function FloatingShapes() {
  const sectionRef = useRef<HTMLElement>(null);
  const shapeRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let onMouseMove: ((e: MouseEvent) => void) | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Entrance — all shapes fade + float up on scroll
        gsap.fromTo(
          shapeRefs.current.filter(Boolean),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1.0, stagger: 0.06, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          }
        );

        // Unique float loop per shape
        shapes.forEach((s, i) => {
          const el = shapeRefs.current[i];
          if (!el) return;

          gsap.to(el, {
            y: s.floatY,
            rotation: s.rotate !== undefined ? s.rotate + 3 : 3,
            duration: s.dur,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: s.delay,
          });
        });

        // Cursor parallax — each shape moves at its own factor
        const quickTos = shapeRefs.current.map((el) =>
          el
            ? {
                x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power2.out" }),
                y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power2.out" }),
              }
            : null
        );

        onMouseMove = (e: MouseEvent) => {
          const cx = e.clientX / window.innerWidth  - 0.5; // -0.5 → 0.5
          const cy = e.clientY / window.innerHeight - 0.5;

          shapes.forEach((s, i) => {
            const qt = quickTos[i];
            if (!qt) return;
            qt.x(cx * s.pFactor * window.innerWidth);
            qt.y(cy * s.pFactor * window.innerHeight + s.floatY * 0.5);
          });
        };

        window.addEventListener("mousemove", onMouseMove);
      });
    };

    init();
    return () => {
      ctx?.revert();
      if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#f7ede6", minHeight: "85vh" }}
      aria-hidden="true"
    >
      {shapes.map((s, i) => (
        <div
          key={i}
          ref={(el) => { shapeRefs.current[i] = el; }}
          className="absolute flex items-center justify-center"
          style={{ opacity: 0, ...s.style }}
        >
          {s.icon === "triangle" && <TriangleIcon size={s.iconSize ?? 44} />}
          {s.icon === "plus"     && <PlusIcon     size={s.iconSize ?? 34} />}
          {s.icon === "arrow"    && <ArrowIcon    size={s.iconSize ?? 30} />}
        </div>
      ))}
    </section>
  );
}

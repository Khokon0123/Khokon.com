"use client";

import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ibmPlexMono } from "@/lib/fonts";
import styles from "./WorkShowcase.module.css";

type Job = {
  role: string;
  company: string;
  period: string;
  badge: string;
  panelBg: string;
  photoSrc?: string;
  stats: { value: string; label: string }[];
  bullets: string[];
  link?: { label: string; href: string };
};

const jobs: Job[] = [
  {
    role: "Software Development Intern",
    company: "ByteWright LLC",
    period: "June 2026 – Present",
    badge: "BW",
    panelBg: "linear-gradient(145deg, #060d1a 0%, #0d1e2e 55%, #08141e 100%)",
    stats: [],
    bullets: [
      "Develop and maintain AI automation tools and client-facing web applications using React, Node.js, and LangChain-based pipelines",
      "Collaborate with cross-functional team members on product scoping, development cycles, and client delivery",
      "Contribute to backend architecture and AI feature integration across multiple active projects",
    ],
  },
  {
    role: "IT Support Technician",
    company: "Ohio Wesleyan University",
    period: "Jan 2025 – Present",
    badge: "OW",
    panelBg: "linear-gradient(145deg, #1a1208 0%, #2a1e10 60%, #1e1608 100%)",
    stats: [
      { value: "50+", label: "support requests / week" },
      { value: "95%+", label: "service availability" },
      { value: "15+", label: "events / semester" },
    ],
    bullets: [
      "Real-time technical support for 100–300 students & faculty per event",
      "Device checks across 10+ labs and 25+ classrooms",
      "Reduced recurring service interruptions by ~20%",
    ],
  },
  {
    role: "Tech Intern",
    company: "Calico Tabbycat",
    period: "Dec 2023 – Dec 2025",
    badge: "CT",
    panelBg: "linear-gradient(145deg, #1a0e06 0%, #2e1a08 55%, #1e1206 100%)",
    stats: [
      { value: "1,000+", label: "tournaments managed" },
      { value: "~30%", label: "fewer tabulation errors" },
      { value: "25%", label: "faster processing" },
    ],
    bullets: [
      "100% scoring accuracy across 50+ national-level events",
      "Optimized templates & streamlined data workflows",
      "Resolved 10+ system inconsistencies platform-wide",
    ],
  },
  {
    role: "Founding Team & Lead Developer",
    company: "OnlySwap",
    period: "Dec 2025 – Present",
    badge: "OS",
    panelBg: "linear-gradient(145deg, #081a0e 0%, #0d2a14 55%, #081808 100%)",
    photoSrc: "/images/onlyswap.png",
    stats: [
      { value: "245+", label: "users in 2 weeks" },
      { value: "25+", label: "trades at launch" },
      { value: "$2K", label: "Princeton prize" },
    ],
    bullets: [
      "Founded student-only trading app for iOS & Android",
      "Built with React Native, Node.js, and Firebase",
      "2nd Place — Princeton University Hackathon",
    ],
    link: { label: "View on GitHub", href: "https://github.com/Khokon0123" },
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

function ExperienceCard({
  job,
  index,
  decorative = false,
}: {
  job: Job;
  index: number;
  decorative?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, [open]);

  return (
    <motion.div
      ref={cardRef}
      tabIndex={decorative ? -1 : 0}
      aria-hidden={decorative || undefined}
      className={`${styles.card} ${open ? styles.isOpen : ""}`}
      onClick={() => {
        if (!hasHover) setOpen((o) => !o);
      }}
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.09 }}
    >
      <div
        className={styles.photo}
        style={{
          backgroundImage: job.photoSrc ? `url(${job.photoSrc})` : undefined,
          background: job.photoSrc ? undefined : job.panelBg,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span className={styles.badge}>{job.badge}</span>
      </div>

      <div className={styles.footer}>
        <p className={styles.role}>{job.role}</p>
        <p className={styles.org}>{job.company}</p>
        <p className={styles.period}>{job.period}</p>
      </div>

      <div className={styles.overlay}>
        <p className={styles.overlayRole}>{job.role}</p>
        <p className={styles.overlayMeta}>
          {job.company} · {job.period}
        </p>

        {job.stats.length > 0 && (
          <div className={styles.statsRow}>
            {job.stats.map((s) => (
              <span key={s.label}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </span>
            ))}
          </div>
        )}

        <ul className={styles.bullets}>
          {job.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        {job.link && (
          <a
            href={job.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} />
            {job.link.label}
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function WorkShowcase() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className={`${styles.section} ${ibmPlexMono.variable}`}>
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap" />
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600,700&display=swap" />

      <MotionConfig reducedMotion="user">
        <div className={styles.marqueeWrapper}>
          <div className={styles.track}>
            {jobs.map((job, i) => (
              <ExperienceCard key={job.role} job={job} index={i} />
            ))}
            {!prefersReducedMotion &&
              jobs.map((job, i) => (
                <ExperienceCard key={`${job.role}-dup`} job={job} index={i} decorative />
              ))}
          </div>
        </div>
      </MotionConfig>
    </section>
  );
}

"use client";

export default function Navbar() {
  return (
    <nav
      className="fixed top-5 left-0 right-0 z-50 flex items-center justify-between px-10 pr-28 py-8"
      aria-label="Primary navigation"
    >
      {/* Wordmark — left */}
      <span
        className="text-base font-bold tracking-wide"
        style={{ fontFamily: "var(--font-inter)", color: "var(--peach)" }}
      >
        Khokon
        <span style={{ color: "#5b6cf6", margin: "0 1px" }}>•</span>
        Barua
      </span>

      {/* Pill nav — center */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center rounded-full px-2 py-2"
        style={{
          background: "var(--pill-bg)",
          border: "1px solid var(--pill-border)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <a
          href="#about"
          className="px-5 py-2.5 text-base rounded-full transition-colors duration-200 hover:bg-white/10"
          style={{ fontFamily: "var(--font-inter)", color: "var(--peach)" }}
        >
          About
        </a>

        {/* Center logo icon */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold mx-0.5"
          style={{
            background: "rgba(91, 108, 246, 0.25)",
            border: "1px solid rgba(91, 108, 246, 0.4)",
            fontFamily: "var(--font-inter)",
            color: "#7b8cf8",
          }}
        >
          K
        </div>

        <a
          href="#work"
          className="px-5 py-2.5 text-base rounded-full transition-colors duration-200 hover:bg-white/10"
          style={{ fontFamily: "var(--font-inter)", color: "var(--peach)" }}
        >
          Work
        </a>
      </div>

      {/* Social links — right */}
      <div
        className="flex items-center gap-7 text-base"
        style={{ fontFamily: "var(--font-inter)", color: "var(--peach)" }}
      >
        <a
          href="mailto:"
          className="opacity-70 hover:opacity-100 transition-opacity duration-200"
        >
          Email
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 hover:opacity-100 transition-opacity duration-200"
        >
          in
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 hover:opacity-100 transition-opacity duration-200"
        >
          x
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 hover:opacity-100 transition-opacity duration-200"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}

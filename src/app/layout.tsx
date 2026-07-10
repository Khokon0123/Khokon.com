import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import IntroLoader from "@/components/IntroLoader";
import AboutSection from "@/components/sections/AboutSection";
import ResumeModal from "@/components/ResumeModal";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khokon Barua — Software Engineer & CEO",
  description: "Portfolio of Khokon Barua, Software Engineer and Chief Executive Officer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-peach" suppressHydrationWarning>
        <IntroLoader />
        <AboutSection />
        <ResumeModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

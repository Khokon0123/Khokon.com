import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
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
      <body className="min-h-full bg-bg text-peach" suppressHydrationWarning>{children}</body>
    </html>
  );
}

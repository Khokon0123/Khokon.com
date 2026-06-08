import Hero from "@/components/sections/Hero";
import StatementSection from "@/components/sections/StatementSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WorkShowcase from "@/components/sections/WorkShowcase";
import BrandShowcase from "@/components/sections/BrandShowcase";
import ProductShowcase from "@/components/sections/ProductShowcase";
import WorkCTA from "@/components/sections/WorkCTA";
import PhilosophySection from "@/components/sections/PhilosophySection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatementSection />
      <ServicesSection />
      <WorkShowcase />
      <BrandShowcase />
      <ProductShowcase />
      <WorkCTA />
      <PhilosophySection />
      <CTASection />
    </main>
  );
}

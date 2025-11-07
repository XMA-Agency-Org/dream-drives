// app/(public)/page.tsx
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Logos from "@/components/sections/Logos";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import PopularDeals from "./_components/home/PopularDeals";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Logos />
      <PopularDeals category="luxury" />
      <PopularDeals category="family" />
      <HowItWorksSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}

// app/(public)/page.tsx
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Logos from "@/components/sections/Logos";
import USP from "@/components/sections/USP";
import PopularDeals from "./_components/home/PopularDeals";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import Testimonials from "./_components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Logos />
      <PopularDeals category="luxury" />
      <PopularDeals category="economy" />
      <USP />
      <Testimonials />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}

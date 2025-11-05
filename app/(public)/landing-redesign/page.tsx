import Header from "@/components/layout/Header";
import HeroSection from "./components/HeroSection";
import Logos from "./components/Logos";
import HowItWorksSection from "./components/HowItWorksSection";
import BrandTeaser from "./components/BrandTeaser";
import PopularDeals from "../_components/home/PopularDeals";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function LandingRedesign() {
  return (
    <>
      <Header />
      <HeroSection />
      <Logos />
      <HowItWorksSection />
      <BrandTeaser />
      <PopularDeals />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}

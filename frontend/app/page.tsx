import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/app/_landing/HeroSection";
import FeatureShowcase from "@/app/_landing/FeatureShowcase";
import CTASection from "@/app/_landing/CTASection";
import Footer from "@/components/ui/Footer";
import MobileFeatures from "./_landing/MobileFeatures";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeatureShowcase />
      <MobileFeatures />
      <CTASection />
      <Footer />
    </div>
  );
}

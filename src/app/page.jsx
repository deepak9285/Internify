import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/features";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeroSection />
      <HowItWorks />
      <Features />
      <CTASection />
    </div>
  );
}

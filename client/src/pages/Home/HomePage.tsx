import HeroSection from "../../components/home/HeroSection";
import StatsSection from "../../components/home/StatsSection";
import FeaturesGrid from "../../components/home/FeaturesGrid";
import TestimonialsSection from "../../components/home/TestimonialsSection";
import UseCasesSection from "../../components/home/UseCasesSection";
import CTASection from "../../components/home/CTASection";
import Footer from "../../components/home/Footer";

export default function HomePage() {

  const isLoggedIn = false; // change based on your auth logic

  const onNavigate = (path: string) => {
    console.log("Navigate to:", path);
    // your navigation logic here (router.push or setView)
  };

  const onOpenLogin = () => {
    console.log("Open login modal");
    // your login modal logic here
  };

  return (
    <>
      <HeroSection
        isLoggedIn={isLoggedIn}
        onNavigate={onNavigate}
        onOpenLogin={onOpenLogin}
      />

      <StatsSection />

      <FeaturesGrid />

      <UseCasesSection
        onNavigate={onNavigate}
      />

      <TestimonialsSection />

      <CTASection
        isLoggedIn={isLoggedIn}
        onNavigate={onNavigate}
        onOpenLogin={onOpenLogin}
      />

      <Footer />
    </>
  );
}

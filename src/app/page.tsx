import HeroSection from "@/components/home/HeroSection";
import MainNewsGrid from "@/components/home/MainNewsGrid";
import FadeIn from "@/components/ui/FadeIn";

export default function Home() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <FadeIn>
        <HeroSection />
      </FadeIn>
      <FadeIn delay={0.2}>
        <MainNewsGrid />
      </FadeIn>
    </main>
  );
}

import { WelcomeBanner } from "./components/welcome-banner";
import { HomeIntro } from "./components/home-intro";
import { HeroSection } from "@/src/components/HeroSection";

export default function Home() {
  return (
    <>
      <WelcomeBanner />
      <HeroSection />
      <HomeIntro />
    </>
  );
}

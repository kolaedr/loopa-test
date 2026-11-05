import { WelcomeBanner } from "./components/welcome-banner";
import { HomeIntro } from "./components/home-intro";
import { HeroSection } from "@/src/components/HeroSection";
import { AutumnCards } from "@/src/components/AutumnCards";

export default function Home() {
  return (
    <>
      <WelcomeBanner />
      <HeroSection />
      <AutumnCards />
      <HomeIntro />
    </>
  );
}

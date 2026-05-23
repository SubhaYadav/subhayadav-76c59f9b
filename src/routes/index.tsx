import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Mission } from "@/components/portfolio/Mission";
import { WhoAmI } from "@/components/portfolio/WhoAmI";
import { Arsenal } from "@/components/portfolio/Arsenal";
import { Creations } from "@/components/portfolio/Creations";
import { ProofOfWork } from "@/components/portfolio/ProofOfWork";
import { Evolution } from "@/components/portfolio/Evolution";
import { Stats } from "@/components/portfolio/Stats";
import { Terminal } from "@/components/portfolio/Terminal";
import { Principles } from "@/components/portfolio/Principles";
import { Contact } from "@/components/portfolio/Contact";
import { Guestbook } from "@/components/portfolio/Guestbook";
import { Footer } from "@/components/portfolio/Footer";
import { EasterEgg } from "@/components/portfolio/EasterEgg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <LoadingScreen onDone={() => setBooted(true)} />
      {booted && (
        <>
          <SmoothScroll />
          <CursorGlow />
          <EasterEgg />
          <Nav />
          <main className="relative">
            {/* ambient background grid */}
            <div className="pointer-events-none fixed inset-0 -z-10 grid-bg opacity-[0.04]" />
            <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-background via-background to-background" />
            <Hero />
            <WhoAmI />
            <Mission />
            <Arsenal />
            <Creations />
            <ProofOfWork />
            <Evolution />
            <Stats />
            <Terminal />
            <Principles />
            <Contact />
            <Guestbook />
            <Footer />
          </main>
        </>
      )}
    </>
  );
}

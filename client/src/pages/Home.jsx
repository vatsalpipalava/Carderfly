import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

import { Navbar } from "@/components/modules/navbar/navbarHome";
import { HeroSection } from "@/components/modules/home/HeroSection";
import { HowItWorks } from "@/components/modules/home/HowItWorks";
import { Values } from "@/components/modules/home/Values";
import { Features } from "@/components/modules/home/Features";
import { SocialConnect } from "@/components/modules/home/SocialConnect";
import { CustomizeCard } from "@/components/modules/home/CustomizeCard";
import { Pricing } from "@/components/modules/home/Pricing";
import { GetInTouch } from "@/components/modules/home/GetInTouch";
import { Footer } from "@/components/modules/home/Footer";
import { Themes } from "@/components/modules/home/Themes";

export function Home() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.accessToken) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Navbar />
      <div className="bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.1] mx-auto flex h-full w-full max-w-[1280px] flex-col px-4 sm:px-6">
        {/* heroSection */}
        <section id="hero-section">
          <HeroSection />
        </section>
      </div>

      {/*Themes */}
      <section id="themes">
        <Themes />
      </section>

      <div className="bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.1] mx-auto flex h-full w-full max-w-[1280px] flex-col px-4 sm:px-6">
        {/*How it works */}
        <section id="how-it-works" className="bg-background py-20">
          <HowItWorks />
        </section>

        {/* Values */}
        <section id="values">
          <Values />
        </section>
      </div>

      {/* Feature */}
      <section id="feature">
        <Features />
      </section>

      {/* Social Connect */}
      <section id="social-connect">
        <SocialConnect />
      </section>

      {/* Customize card */}
      <section id="customize-card">
        <CustomizeCard />
      </section>

      {/* Pricing */}
      <section id="pricing">
        <Pricing />
      </section>

      {/* Get in touch */}
      <section id="get-in-touch">
        <GetInTouch />
      </section>

      <Footer />
    </main>
  );
}

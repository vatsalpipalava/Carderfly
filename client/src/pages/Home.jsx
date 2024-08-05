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

export function Home() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.accessToken) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.1] mx-auto flex h-full w-full max-w-[1280px] flex-col px-4 sm:px-6">
        {/* heroSection */}
        <section id="hero-section">
          <HeroSection />
        </section>

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

      {/* <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto grid h-full w-full max-w-[1280px] items-center justify-center gap-6 px-4 py-0 sm:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Download Your Digital Business Card
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Get your contact information in a convenient VCF file that you can
              easily share with others and import into your address book.
            </p>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Download VCF
            </Link>
          </div>
          <img
            src="/placeholder.svg"
            width="550"
            height="400"
            alt="Digital Business Card"
            className="mx-auto aspect-[11/8] overflow-hidden rounded-xl object-cover object-center sm:w-full"
          />
        </div>
      </section> */}

      {/* Pricing */}
      <section id="pricing">
        <Pricing />
      </section>

      {/* Get in touch */}
      <section id="get-in-touch">
        <GetInTouch />
      </section>

      <Footer />
    </>
  );
}

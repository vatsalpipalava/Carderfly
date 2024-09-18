import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { Building2, ChevronRightIcon, Earth } from "lucide-react";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
// import { Button } from "@/components/ui/button";

import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import BlurFade from "@/components/magicui/blur-fade";
import { FadeText } from "@/components/magicui/fade-text";
import GradualSpacing from "@/components/magicui/gradual-spacing";

import Background from "@/assets/images/background.avif";
import HomePageMobile from "@/assets/images/banner1.png";

export function HeroSection() {
  const parallaxRef = useRef(null);
  const [scrollSpeed, setScrollSpeed] = useState(0.8);

  useEffect(() => {
    const updateScrollSpeed = () => {
      if (window.innerWidth > 768) {
        setScrollSpeed(0.3);
      } else {
        setScrollSpeed(0.1);
      }
    };

    updateScrollSpeed();

    window.addEventListener("resize", updateScrollSpeed);
    return () => {
      window.removeEventListener("resize", updateScrollSpeed);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollTop * scrollSpeed}px)`;
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollSpeed]);
  return (
    <>
      <main className="flex h-full w-full flex-1 flex-col gap-4 md:gap-8">
        <div className="grid h-full min-h-[110vh] w-full grid-cols-1 gap-4 md:min-h-[60vh] md:grid-cols-2 md:gap-8 lg:h-full lg:min-h-[110vh]">
          <div className="mt-16 flex h-full w-full flex-col items-center justify-center md:!-mt-10 md:items-start">
            <GradualSpacing
              duration={0.3}
              className="font-display mb-0 text-left text-[28px] font-extrabold tracking-[-0.1em] text-black dark:text-white md:mb-3 md:text-3xl lg:text-5xl"
              text="Elevate Your Digital"
            />
            <GradualSpacing
              duration={1}
              className="font-display mb-0 text-left text-[28px] font-extrabold tracking-[-0.1em] text-black dark:text-white md:mb-8 md:text-3xl md:leading-[5rem] lg:text-5xl"
              text="Business Card Experience"
            />

            <BlurFade delay={0.25} inView>
              <p className="mb-12 text-center text-lg text-muted-foreground md:text-left md:text-xl">
                Craft elegant and professional digital business cards
                effortlessly with our intuitive digital card maker.
              </p>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <div className="flex justify-center gap-3 sm:justify-start">
                <Link to="/login">
                  <motion.button
                    className="relative flex w-auto cursor-pointer items-center justify-center rounded-full border-none bg-primary px-4 py-2 text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.span
                      key="reaction"
                      className="relative block font-semibold"
                      initial={{ x: 0 }}
                      exit={{ x: 50, transition: { duration: 0.1 } }}
                    >
                      <span className="group inline-flex items-center">
                        Get Started{" "}
                        <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </motion.span>
                  </motion.button>
                </Link>
                {/* <Button variant="outline" className="rounded-full">
                  Watch Video
                </Button> */}
              </div>
            </BlurFade>
          </div>
          <FadeText
            direction="right"
            framerProps={{
              show: { transition: { delay: 1 } },
            }}
            text={
              <div className="parallax-container h-full w-full items-center justify-center">
                <AspectRatio ratio={1 / 1}>
                  <div className="relative mt-10 flex h-full w-full items-center justify-center md:mt-16">
                    <img
                      src={HomePageMobile}
                      alt="Image"
                      sizes="261px"
                      className="parallax-foreground z-0 mt-10 h-full w-auto max-w-full overflow-hidden md:mt-28"
                    />
                    <div
                      className="parallax-background absolute -z-10"
                      ref={parallaxRef}
                    >
                      <img
                        sizes="calc(min(100vw, 1280px) - 48px)"
                        src={Background}
                        className="rounded-[2rem]"
                      />
                    </div>
                    <div className="absolute bottom-[15%] left-5 z-10 flex items-center gap-3 rounded-full border bg-background p-[6px]">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary sm:h-10 sm:w-10">
                        <Building2 className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                      </div>
                      <p className="mr-2 text-[14px] font-semibold sm:text-base">
                        Downloadable contact file
                      </p>
                    </div>
                    <div className="absolute right-5 top-[25%] z-10 flex items-center gap-3 rounded-full border bg-background p-[6px]">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary sm:h-10 sm:w-10">
                        <Earth className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                      </div>
                      <p className="mr-2 text-[14px] font-semibold sm:text-base">
                        Easy Share Globally

                      </p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            }
          />
        </div>
      </main>
      <AnimatedGridPattern
        numSquares={100}
        maxOpacity={0.1}
        duration={2}
        repeatDelay={1}
        className={cn(
          "-z-50 [mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-60%] h-[200%] skew-y-12"
        )}
      />
    </>
  );
}

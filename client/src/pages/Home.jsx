import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/modules/navbar/navbarHome";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import useAuth from "@/hooks/useAuth";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import BlurFade from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import HomePageMobile from "../assets/images/HomePageMobile.avif";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import { FadeText } from "@/components/magicui/fade-text";
import { Badge } from "@/components/ui/badge";

export function Home() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const parallaxRef = useRef(null);
  const [scrollSpeed, setScrollSpeed] = useState(0.8);

  useEffect(() => {
    if (auth.accessToken) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Navbar />
      <div className="bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.1] mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-4">
        <main className="flex h-full w-full flex-1 flex-col gap-4 md:gap-8">
          <div className="grid h-full min-h-[110vh] w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            <div className="mt-16 flex h-full w-full flex-col items-center justify-center sm:items-start md:mt-0">
              <GradualSpacing
                duration={0.3}
                className="font-display text-left text-[28px] font-extrabold tracking-[-0.1em] text-black dark:text-white md:text-5xl"
                text="Elevate Your Digital"
              />
              <GradualSpacing
                duration={1}
                className="font-display mb-6 text-left text-[28px] font-extrabold tracking-[-0.1em] text-black dark:text-white md:text-5xl md:leading-[5rem]"
                text="Business Card Experience"
              />

              <BlurFade delay={0.25} inView>
                <p className="mb-10 text-center text-xl text-muted-foreground sm:text-left">
                  Craft elegant and professional digital business cards
                  effortlessly with our intuitive digital card maker.
                </p>
              </BlurFade>

              <BlurFade delay={0.5} inView>
                <div className="flex justify-center gap-3 sm:justify-start">
                  <Button className="rounded-full">Get Started</Button>
                  <Button variant="outline" className="rounded-full">
                    Watch Video
                  </Button>
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
                          src="https://framerusercontent.com/images/LY9yRt1JUD7iYpPGvOwa82kINs.jpg?scale-down-to=1024"
                          className="rounded-[2rem]"
                        />
                      </div>
                      <div className="absolute bottom-[15%] left-5 z-10 flex items-center gap-3 rounded-full border bg-background p-[6px]">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary sm:h-10 sm:w-10">
                          <Building2 className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                        </div>
                        <p className="mr-2 text-[14px] font-semibold sm:text-[16px]">
                          Downloadable contact file
                        </p>
                      </div>
                      <div className="absolute right-5 top-[25%] z-10 flex items-center gap-3 rounded-full border bg-background p-[6px]">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary sm:h-10 sm:w-10">
                          <Building2 className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                        </div>
                        <p className="mr-2 text-[14px] font-semibold sm:text-[16px]">
                          Downloadable contact file
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
        <div className="h-full w-full bg-background">
          <div className="mt-20">
            <div className="mb-4 flex w-full items-center justify-center">
              <Badge variant="secondary" className="text-sm font-bold">
                HOW IT WORKS
              </Badge>
            </div>
            <h1 className="mb-24 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
              Invest in income-generating
              <br />
              real estate, easily.
            </h1>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
              <AspectRatio ratio={1 / 1}>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="https://framerusercontent.com/images/SRcDXc99y09VSLMjzz8FAAHIYME.jpg?scale-down-to=512"
                    className="h-auto w-full rounded-[2rem]"
                  />
                </div>
              </AspectRatio>
              <div className="">
                
              </div>
            </div>
          </div>
        </div>
        <footer></footer>
      </div>
    </>
  );
}

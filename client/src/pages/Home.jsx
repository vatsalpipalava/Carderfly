import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import "../App.css";

import {
  Brush,
  Building2,
  ChevronRightIcon,
  ShieldCheck,
  SquareArrowRight,
  SquareCheck,
  SquarePen,
} from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import BlurFade from "@/components/magicui/blur-fade";
import DotPattern from "@/components/magicui/dot-pattern";
import { FadeText } from "@/components/magicui/fade-text";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import GridPattern from "@/components/magicui/grid-pattern";
import { MagicCard } from "@/components/magicui/magic-card";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

import { Navbar } from "@/components/modules/navbar/navbarHome";
import SocialShareHome from "@/components/modules/SocialShareHome";
import useAuth from "@/hooks/useAuth";

import HomePageMobile from "../assets/images/HomePageMobile.avif";
import SocialShare from "../assets/svgs/social-share.png";
import FeatureContent from "../assets/svgs/feature-content.png";
import CompanyDetails from "../assets/svgs/company-details.png";
import Action from "../assets/svgs/action.png";
import QrCode from "../assets/svgs/qr-code.png";
import VCF from "../assets/svgs/vcf.png";

export function Home() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const parallaxRef = useRef(null);
  const [scrollSpeed, setScrollSpeed] = useState(0.8);
  const { theme } = useTheme();
  const flipCardInnerRef = useRef(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (flipCardInnerRef.current) {
        flipCardInnerRef.current.classList.toggle("flip");
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.1] mx-auto flex h-full w-full max-w-[1280px] flex-col px-4 sm:px-6">
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

        {/* Section 2 */}
        <div className="h-full w-full bg-background">
          <div className="my-20">
            <div className="mb-4 flex w-full items-center justify-center">
              <Badge variant="secondary" className="text-sm font-bold">
                How it works
              </Badge>
            </div>
            <h1 className="mb-24 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
              Invest in income-generating
              <br />
              real estate, easily.
            </h1>
            <div className="grid w-full grid-cols-1 gap-20 md:grid-cols-2">
              <AspectRatio ratio={1 / 1}>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="https://framerusercontent.com/images/SRcDXc99y09VSLMjzz8FAAHIYME.jpg?scale-down-to=512"
                    className="h-auto w-full rounded-[2rem]"
                  />
                </div>
              </AspectRatio>
              <div className="flex h-full w-full items-center">
                <div className="flex flex-col gap-10">
                  {/* 1 */}
                  <FadeText
                    className="text-4xl font-bold text-black dark:text-white"
                    direction="up"
                    framerProps={{
                      show: { transition: { delay: 0.6 } },
                    }}
                    text={
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary">
                          <span className="text-xl font-bold text-white">
                            1
                          </span>
                        </div>
                        <p className="text-xl font-semibold">
                          Create your profile in 2 minutes
                        </p>
                      </div>
                    }
                  />

                  {/* 2 */}
                  <FadeText
                    className="text-4xl font-bold text-black dark:text-white"
                    direction="up"
                    framerProps={{
                      show: { transition: { delay: 0.8 } },
                    }}
                    text={
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary">
                          <span className="text-xl font-bold text-white">
                            2
                          </span>
                        </div>
                        <p className="text-xl font-semibold">
                          Create your profile in 2 minutes
                        </p>
                      </div>
                    }
                  />

                  {/* 3 */}
                  <FadeText
                    className="text-4xl font-bold text-black dark:text-white"
                    direction="up"
                    framerProps={{
                      show: { transition: { delay: 1 } },
                    }}
                    text={
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary">
                          <span className="text-xl font-bold text-white">
                            3
                          </span>
                        </div>
                        <p className="text-xl font-semibold">
                          Create your profile in 2 minutes
                        </p>
                      </div>
                    }
                  />

                  {/* 4 */}
                  <FadeText
                    className="text-4xl font-bold text-black dark:text-white"
                    direction="up"
                    framerProps={{
                      show: { transition: { delay: 1.2 } },
                    }}
                    text={
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary">
                          <span className="text-xl font-bold text-white">
                            4
                          </span>
                        </div>
                        <p className="text-xl font-semibold">
                          Create your profile in 2 minutes
                        </p>
                      </div>
                    }
                  />

                  {/* Get Started */}
                  <FadeText
                    direction="up"
                    framerProps={{
                      show: { transition: { delay: 1.4 } },
                    }}
                    text={
                      <Link to="/login">
                        <motion.button
                          className="relative flex w-auto cursor-pointer items-center justify-center rounded-full border-none bg-primary p-[10px] px-6 text-white"
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
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="mb-20 mt-5 h-full w-full">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            <FadeText
              direction="down"
              framerProps={{
                show: { transition: { delay: 0.6 } },
              }}
              text={
                <MagicCard
                  className="group cursor-pointer hover:shadow-2xl"
                  gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                >
                  <CardHeader>
                    <SquarePen className="h-7 w-7 font-bold group-hover:text-primary" />
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
                      Creative Design
                    </h3>
                    <p className="font-medium text-muted-foreground">
                      Stand out with customizable designs. Classic or modern,
                      our templates ensure lasting impressions.
                    </p>
                  </CardContent>
                </MagicCard>
              }
            />

            <FadeText
              direction="down"
              framerProps={{
                show: { transition: { delay: 0.7 } },
              }}
              text={
                <MagicCard
                  className="group cursor-pointer hover:shadow-2xl"
                  gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                >
                  <CardHeader>
                    <SquareArrowRight className="h-7 w-7 font-bold group-hover:text-primary" />
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
                      Call to Action
                    </h3>
                    <p className="font-medium text-muted-foreground">
                      Consider adding a call-to-action button on each card that
                      directs users to learn more.
                    </p>
                  </CardContent>
                </MagicCard>
              }
            />

            <FadeText
              direction="down"
              framerProps={{
                show: { transition: { delay: 0.8 } },
              }}
              text={
                <MagicCard
                  className="group cursor-pointer hover:shadow-2xl"
                  gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                >
                  <CardHeader>
                    <Brush className="h-7 w-7 font-bold group-hover:text-primary" />
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
                      Customizable Colors
                    </h3>
                    <p className="font-medium text-muted-foreground">
                      Customize your card with our color options to match your
                      brand identity for a professional look.
                    </p>
                  </CardContent>
                </MagicCard>
              }
            />

            <FadeText
              direction="down"
              framerProps={{
                show: { transition: { delay: 0.9 } },
              }}
              text={
                <MagicCard
                  className="group cursor-pointer hover:shadow-2xl"
                  gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                >
                  <CardHeader>
                    <ShieldCheck className="h-7 w-7 font-bold group-hover:text-primary" />
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
                      Reliable Service
                    </h3>
                    <p className="font-medium text-muted-foreground">
                      Ensure your business card is always accessible with our
                      reliable, high-performance platform. Share confidently.
                    </p>
                  </CardContent>
                </MagicCard>
              }
            />
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="relative -z-20 h-full w-full bg-muted">
        <div className="z-10 mx-auto h-full w-full max-w-[1280px] px-4 py-20 sm:px-6">
          <div className="mb-4 flex w-full items-center justify-center">
            <FadeText
              direction="up"
              framerProps={{
                show: { transition: { delay: 0.2 } },
              }}
              text={
                <Badge
                  variant="outline"
                  className="border-foreground text-sm font-bold"
                >
                  Packed with features
                </Badge>
              }
            />
          </div>
          <FadeText
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.3 } },
            }}
            text={
              <h1 className="mb-24 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
                Build your dream site.
                <br />
                No compromises.
              </h1>
            }
          />
          <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-16 sm:grid-cols-2">
            {/* 1  Social Share */}

            <FadeText
              direction="left"
              framerProps={{
                show: { transition: { delay: 0.6 } },
              }}
              text={
                <div className="flex gap-6">
                  <div className="flex max-h-14 min-h-14 min-w-14 max-w-14 items-center justify-center rounded-lg bg-background">
                    <img
                      src={SocialShare}
                      alt="SocialShare"
                      className="h-9 w-9"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Social Share
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Collaborate with your team on Slack. Planner Easily
                      schedule and plan your workflow.
                    </p>
                  </div>
                </div>
              }
            />

            {/* 2 Easy Action */}
            <FadeText
              direction="right"
              framerProps={{
                show: { transition: { delay: 0.6 } },
              }}
              text={
                <div className="flex gap-6">
                  <div className="flex max-h-14 min-h-14 min-w-14 max-w-14 items-center justify-center rounded-lg bg-background">
                    <img src={Action} alt="Action" className="h-9 w-9" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Easy Action
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Collaborate with your team on Slack. Planner Easily
                      schedule and plan your workflow.
                    </p>
                  </div>
                </div>
              }
            />

            {/* 3 Feature Content */}
            <FadeText
              direction="left"
              framerProps={{
                show: { transition: { delay: 0.8 } },
              }}
              text={
                <div className="flex gap-6">
                  <div className="flex max-h-14 min-h-14 min-w-14 max-w-14 items-center justify-center rounded-lg bg-background">
                    <img
                      src={FeatureContent}
                      alt="FeatureContent"
                      className="h-9 w-9"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Feature Content
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Collaborate with your team on Slack. Planner Easily
                      schedule and plan your workflow.
                    </p>
                  </div>
                </div>
              }
            />

            {/* 4 Scan and Download QR Code */}
            <FadeText
              direction="right"
              framerProps={{
                show: { transition: { delay: 0.8 } },
              }}
              text={
                <div className="flex gap-6">
                  <div className="flex max-h-14 min-h-14 min-w-14 max-w-14 items-center justify-center rounded-lg bg-background">
                    <img src={QrCode} alt="QrCode" className="h-9 w-9" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Scan and Download QR Code
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Collaborate with your team on Slack. Planner Easily
                      schedule and plan your workflow.
                    </p>
                  </div>
                </div>
              }
            />

            {/* 5 Feature */}
            <FadeText
              direction="left"
              framerProps={{
                show: { transition: { delay: 1 } },
              }}
              text={
                <div className="flex gap-6">
                  <div className="flex max-h-14 min-h-14 min-w-14 max-w-14 items-center justify-center rounded-lg bg-background">
                    <img
                      src={CompanyDetails}
                      alt="SocialShare"
                      className="h-9 w-9"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Company Details
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Collaborate with your team on Slack. Planner Easily
                      schedule and plan your workflow.
                    </p>
                  </div>
                </div>
              }
            />

            {/* 6 Feature */}
            <FadeText
              direction="right"
              framerProps={{
                show: { transition: { delay: 1 } },
              }}
              text={
                <div className="flex gap-6">
                  <div className="flex max-h-14 min-h-14 min-w-14 max-w-14 items-center justify-center rounded-lg bg-background">
                    <img src={VCF} alt="VCF" className="h-8 w-8" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Downloadable VCF file
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Collaborate with your team on Slack. Planner Easily
                      schedule and plan your workflow.
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </div>
        <DotPattern
          width={10}
          height={10}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "-z-10 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
          )}
        />
      </div>

      {/* Easy social connect */}
      <div className="h-full w-full">
        <div className="mx-auto h-full w-full max-w-[1280px] px-4 py-24 sm:px-6">
          <div className="grid w-full grid-cols-1 gap-20 md:grid-cols-2 md:gap-8 lg:gap-20">
            <div className="flex h-full w-full flex-col items-start justify-center gap-10">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {" "}
                One Click Connects Client to Company Social Media Profiles
                Through Carderfly
              </h1>
              <p className="text-xl text-muted-foreground">
                With our Carderfly, your clients can easily connect with you on
                your social media platforms. One click takes clients to your
                Facebook, Instagram, LinkedIn, and more.
              </p>
              <Link to="/login">
                <motion.button
                  className="relative flex w-auto cursor-pointer items-center justify-center rounded-full border-none bg-primary p-[10px] px-6 text-white"
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
            </div>
            <AspectRatio ratio={1 / 1}>
              <div className="flex h-full w-full items-center justify-center">
                {/* <img
                  src="https://framerusercontent.com/images/SRcDXc99y09VSLMjzz8FAAHIYME.jpg?scale-down-to=512"
                  className="h-auto w-full rounded-[2rem]"
                /> */}
                <SocialShareHome />
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>

      {/* Customize card */}
      <section className="h-full w-full bg-muted py-20 lg:py-10">
        <div className="mx-auto h-full w-full max-w-[1280px] px-4 py-0 sm:px-6">
          <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-2 md:gap-8 lg:gap-20">
            <AspectRatio ratio={1 / 1} className="pb-20 md:pb-0">
              <div className="flex h-full w-full items-center justify-center">
                {/* Flip */}
                <div className="flip-card">
                  <div className="flip-card-inner" ref={flipCardInnerRef}>
                    <div className="flip-card-front">
                      {/* Front */}
                      <CardContainer className="inter-var">
                        <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-3 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] md:p-6">
                          <CardItem
                            translateZ="50"
                            className="pt-3 text-xl font-bold text-neutral-600 dark:text-white"
                          >
                            Products
                          </CardItem>
                          <Separator className="mb-6 mt-4" />
                          <CardItem
                            translateZ="100"
                            className="mt-4 grid w-full grid-cols-2 gap-2 sm:gap-6"
                          >
                            <div className="rounded-xl border">
                              <img
                                src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg"
                                alt="product"
                                className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                              />
                              <p className="px-4 py-3 font-medium">Camera</p>
                            </div>
                            <div className="rounded-xl border">
                              <img
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                                alt="product"
                                className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                              />
                              <p className="px-4 py-3 font-medium">Watch</p>
                            </div>
                          </CardItem>
                        </CardBody>
                      </CardContainer>
                    </div>
                    <div className="flip-card-back">
                      <CardContainer className="inter-var">
                        <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-3 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] md:p-6">
                          <CardItem
                            translateZ="50"
                            className="pt-3 text-xl font-bold text-neutral-600 dark:text-white"
                          >
                            Shops
                          </CardItem>
                          <Separator className="mb-6 mt-4" />
                          <CardItem
                            translateZ="100"
                            className="mt-4 grid w-full grid-cols-2 gap-2 sm:gap-6"
                          >
                            <div className="rounded-xl border">
                              <img
                                src="https://teetimeshop.in/cdn/shop/files/c2c9955c-e890-4c8e-8a08-a6a444aa8fe3.jpg?v=1702644878&width=1445"
                                alt="shop"
                                className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                              />
                              <p className="px-4 py-3 font-medium">
                                Price: $15
                              </p>
                            </div>
                            <div className="rounded-xl border">
                              <img
                                src="https://www.mumkins.in/cdn/shop/products/jogger-for-boys-bl06143-dark_green-2_1800x1800.jpg?v=1659426127"
                                alt="shop"
                                className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                              />
                              <p className="px-4 py-3 font-medium">
                                Price: $20
                              </p>
                            </div>
                          </CardItem>
                        </CardBody>
                      </CardContainer>
                    </div>
                  </div>
                </div>
              </div>
            </AspectRatio>

            <div className="flex h-full w-full flex-col items-start justify-center gap-10">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {" "}
                One Click Connects Client to Company Social Media Profiles
                Through Carderfly
              </h1>
              <p className="text-xl text-muted-foreground">
                With our Carderfly, your clients can easily connect with you on
                your social media platforms. One click takes clients to your
                Facebook, Instagram, LinkedIn, and more.
              </p>
              <Link to="/login">
                <motion.button
                  className="relative flex w-auto cursor-pointer items-center justify-center rounded-full border-none bg-primary p-[10px] px-6 text-white"
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
            </div>
          </div>
        </div>
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
      <section className="relative -z-10 w-full py-12 md:py-16 lg:py-20">
        <div className="container z-10 mx-auto h-full w-full max-w-[1280px] px-4 py-0 sm:px-6">
          <div className="z-10 mb-4 flex w-full items-center justify-center">
            <Badge
              variant="outline"
              className="border-foreground text-sm font-bold"
            >
              Pricing
            </Badge>
          </div>
          <h1 className="mb-10 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
            Explore our pricing
          </h1>
          <p className="mx-auto mb-24 max-w-[768px] text-center text-muted-foreground md:text-xl">
            Explore our range of pricing plans tailored to suit your needs.
            Select the perfect plan and start unlocking the full potential of
            your business card today.
          </p>
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <MagicCard
              className="z-20 cursor-pointer flex-col items-start justify-center shadow-2xl"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <CardHeader className="p-4 text-xl font-semibold sm:p-6">
                Starter Plan
              </CardHeader>
              <CardBody className="h-auto px-4 pb-4 sm:px-6 sm:pb-6">
                <h3 className="mb-6 scroll-m-20 text-4xl font-semibold tracking-tight">
                  ₹399 <span className="text-lg">/ 3 Months</span>
                </h3>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 w-5 text-primary" />
                    <p>Cancel at period end.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 w-5 text-primary" />
                    <p>Cancel at period end.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 w-5 text-primary" />
                    <p>Cancel at period end.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 w-5 text-primary" />
                    <p>Cancel at period end.</p>
                  </div>
                </div>
              </CardBody>
            </MagicCard>

            <MagicCard
              className="z-10 cursor-pointer flex-col items-start justify-center shadow-2xl"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <CardHeader className="p-4 text-xl font-semibold sm:p-6">
                Standard Plan
              </CardHeader>
              <CardBody className="h-auto px-4 pb-4 sm:px-6 sm:pb-6">
                <h3 className="mb-6 scroll-m-20 text-4xl font-semibold tracking-tight">
                  ₹599<span className="text-lg">/ 6 Months</span>
                </h3>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 w-5 text-primary" />
                    <p>Cancel at period end.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 w-5 text-primary" />
                    <p>Cancel at period end.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 w-5 text-primary" />
                    <p>Cancel at period end.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 w-5 text-primary" />
                    <p>Cancel at period end.</p>
                  </div>
                </div>
              </CardBody>
            </MagicCard>

            <MagicCard
              className="z-10 cursor-pointer flex-col items-start justify-center shadow-2xl"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <CardHeader className="p-4 text-xl font-semibold sm:p-6">
                Premium Plan
              </CardHeader>
              <CardBody className="h-auto px-4 pb-4 sm:px-6 sm:pb-6">
                <h3 className="mb-6 scroll-m-20 text-4xl font-semibold tracking-tight">
                  ₹999 <span className="text-lg">/ 12 Months</span>
                </h3>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 w-5 text-primary" />
                    <p>Cancel at period end.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 w-5 text-primary" />
                    <p>Cancel at period end.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 w-5 text-primary" />
                    <p>Cancel at period end.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 w-5 text-primary" />
                    <p>Cancel at period end.</p>
                  </div>
                </div>
              </CardBody>
            </MagicCard>
          </div>
        </div>

        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "-z-10 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />
      </section>

      {/* Get in touch */}
      <section className="w-full pb-10">
        <div className="mx-auto h-auto w-full max-w-[1280px] px-4 sm:px-6">
          <Card className="flex h-auto w-auto flex-col items-center justify-between rounded-2xl border-none bg-muted md:flex-row">
            <CardBody className="h-auto w-auto px-6 py-10 sm:px-10">
              <CardHeader className="mb-5 px-0 py-0">
                <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                  Still got questions?
                </h3>
              </CardHeader>
              <p className="max-w-[700px] text-xl text-muted-foreground">
                If you don&apos;t find an answer to your question, contact us,
                and our team will get in touch with you.
              </p>
            </CardBody>
            <CardFooter className="w-full pb-6 md:w-auto md:px-10 md:pb-0">
              <Button className="w-full rounded-full bg-black px-8 dark:bg-white dark:text-white md:w-auto">
                Email
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      <footer></footer>
    </>
  );
}

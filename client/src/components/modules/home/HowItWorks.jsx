import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { ChevronRightIcon } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

import { FadeText } from "@/components/magicui/fade-text";

import Banner2 from "@/assets/images/banner2.jpg";

export function HowItWorks() {
  return (
    <main className="h-full w-full bg-background">
      <div className="mb-4 flex w-full items-center justify-center">
        <Badge variant="secondary" className="text-sm font-bold">
          How it works
        </Badge>
      </div>
      <h1 className="mb-24 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Follow the Process with
        <br />4 Easy Steps
      </h1>
      <div className="grid w-full grid-cols-1 gap-20 md:grid-cols-2">
        <AspectRatio ratio={1 / 1}>
          <div className="flex h-full w-full items-center justify-center">
            <img
              src={Banner2}
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
                    <span className="text-xl font-bold text-white">1</span>
                  </div>
                  <p className="text-xl font-semibold">
                    Create your profile in few minutes
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
                    <span className="text-xl font-bold text-white">2</span>
                  </div>
                  <p className="text-xl font-semibold">
                    Browse & Choose Templates
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
                    <span className="text-xl font-bold text-white">3</span>
                  </div>
                  <p className="text-xl font-semibold">
                    Enter Details & Generate Your Card{" "}
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
                    <span className="text-xl font-bold text-white">4</span>
                  </div>
                  <p className="text-xl font-semibold">
                    Subscribe & Activate Sharing{" "}
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
    </main>
  );
}

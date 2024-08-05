import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { ChevronRightIcon } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import SocialShareHome from "./SocialShareHome";

export function SocialConnect() {
  return (
    <main className="h-full w-full">
      <div className="mx-auto h-full w-full max-w-[1280px] px-4 py-24 sm:px-6">
        <div className="grid w-full grid-cols-1 gap-20 md:grid-cols-2 md:gap-8 lg:gap-20">
          <div className="flex h-full w-full flex-col items-start justify-center gap-10">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {" "}
              One Click Connects Client to Company Social Media Profiles Through
              Carderfly
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
    </main>
  );
}

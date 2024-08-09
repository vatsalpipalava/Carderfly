import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "@/App.css";

import Pro1 from "@/assets/images/product-1.jpg";
import Pro2 from "@/assets/images/product-2.jpg";
import Pro3 from "@/assets/images/product-3.jpg";
import Pro4 from "@/assets/images/product-4.jpg";

import { ChevronRightIcon } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Separator } from "@/components/ui/separator";

export function CustomizeCard() {
  const flipCardInnerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flipCardInnerRef.current) {
        flipCardInnerRef.current.classList.toggle("flip");
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <main className="h-full w-full bg-muted py-20 lg:py-10">
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
                          Cards Theme
                        </CardItem>
                        <Separator className="mb-6 mt-4" />
                        <CardItem
                          translateZ="100"
                          className="mt-4 grid w-full grid-cols-2 gap-2 sm:gap-6"
                        >
                          <div className="rounded-xl border">
                            <img
                              src={Pro1}
                              alt="product1"
                              className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                            />
                            <p className="px-4 py-3 font-medium">Professional Edge</p>
                          </div>
                          <div className="rounded-xl border">
                            <img
                              src={Pro2}
                              alt="product2"
                              className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                            />
                            <p className="px-4 py-3 font-medium">Prestige Connect</p>
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
                          Cards Theme
                        </CardItem>
                        <Separator className="mb-6 mt-4" />
                        <CardItem
                          translateZ="100"
                          className="mt-4 grid w-full grid-cols-2 gap-2 sm:gap-6"
                        >
                          <div className="rounded-xl border">
                            <img
                              src={Pro3}
                              alt="product3"
                              className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                            />
                            <p className="px-4 py-3 font-medium">Prime Essentials</p>
                          </div>
                          <div className="rounded-xl border">
                            <img
                              src={Pro4}
                              alt="product4"
                              className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                            />
                            <p className="px-4 py-3 font-medium">Executive Design</p>
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
              Seamlessly Add and Highlight Your Products, Services, and Items to
              Attract and Inform Your Customers
            </h1>
            <p className="text-xl text-muted-foreground">
              Easily add and feature your products, services, and items to
              capture the attention of your customers. Craft concise yet
              compelling descriptions to boost visibility and engage your
              potential clients effectively.
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
    </main>
  );
}

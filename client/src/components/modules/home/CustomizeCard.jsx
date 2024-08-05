import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "@/App.css";

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
                            <p className="px-4 py-3 font-medium">Price: $15</p>
                          </div>
                          <div className="rounded-xl border">
                            <img
                              src="https://www.mumkins.in/cdn/shop/products/jogger-for-boys-bl06143-dark_green-2_1800x1800.jpg?v=1659426127"
                              alt="shop"
                              className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                            />
                            <p className="px-4 py-3 font-medium">Price: $20</p>
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
        </div>
      </div>
    </main>
  );
}

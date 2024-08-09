import { Link } from "react-router-dom";

import { Facebook, Instagram } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Carderfly from "@/assets/svgs/carderfly";
import { ModeToggle } from "@/components/dark-mode/mode-toggle";

export function Footer() {
  return (
    <footer className="w-full px-4 pb-6 sm:px-6">
      <div className="mx-auto max-w-[1235px] rounded-2xl bg-foreground px-4 py-6 dark:bg-muted sm:px-6">
        <div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2">
          <div className="">
            <Link to="/" className="flex items-center gap-4">
              <div className="group mb-4 flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-white bg-transparent text-lg font-semibold text-primary-foreground md:text-base">
                <Carderfly className="h-5 w-5 fill-white transition-all group-hover:scale-110" />
                <span className="sr-only">Carderfly</span>
              </div>
              <div className="mb-4 text-3xl text-white">Carderfly</div>
            </Link>

            <div className="text-sm text-white/70">
              Modernize networking with dynamic digital business cards. Elevate
              brand presence, streamline connections, and gain insights for
              strategic growth. Transforming business cards into indispensable
              tools.
            </div>

            <div className="mt-6 flex items-center gap-3">
              <p className="text-white">Follow Us</p>
              <Button
                variant="outline"
                size="icon"
                className="border-white bg-transparent hover:bg-white/15"
              >
                <Facebook className="h-5 w-5 text-white" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-white bg-transparent hover:bg-white/15"
              >
                <Instagram className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <Button
              asChild
              variant="link"
              className="text-base h-auto px-0 py-0 font-normal text-white hover:font-medium hover:text-primary sm:px-4"
            >
              <Link to="/">Home</Link>
            </Button>

            <Button
              asChild
              variant="link"
              className="text-base h-auto px-0 py-0 font-normal text-white hover:font-medium hover:text-primary sm:px-4"
            >
              <Link to="/#how-it-works">How it works</Link>
            </Button>

            <Button
              asChild
              variant="link"
              className="text-base h-auto px-0 py-0 font-normal text-white hover:font-medium hover:text-primary sm:px-4"
            >
              <Link to="/#feature">Feature</Link>
            </Button>

            <Button
              asChild
              variant="link"
              className="text-base h-auto px-0 py-0 font-normal text-white hover:font-medium hover:text-primary sm:px-4"
            >
              <Link to="/#pricing">Pricing</Link>
            </Button>
            <Button
              asChild
              variant="link"
              className="text-base h-auto px-0 py-0 font-normal text-white hover:font-medium hover:text-primary sm:px-4"
            >
              <Link to="/terms-of-service">Terms and condition</Link>
            </Button>
          </div>

          {/* <div className="flex flex-col items-start gap-3 sm:items-end">
            <Button
              asChild
              variant="link"
              className="text-base h-auto px-0 py-0 font-normal text-white hover:font-medium hover:text-primary sm:px-4"
            >
              <Link to="/terms-of-service">Terms and condition</Link>
            </Button>

            <Button
              asChild
              variant="link"
              className="text-base h-auto px-0 py-0 font-normal text-white hover:font-medium hover:text-primary sm:px-4"
            >
              <Link to="/">Privacy policy</Link>
            </Button>
          </div> */}
        </div>
        <Separator className="mt-4 bg-white" />
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 items-center gap-10">
            <div className="text-[12px] text-white">
              Copyright © All rights reserved
            </div>

            <div className="ml-auto">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { Box, House, Menu, Network, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import useAuth from "@/hooks/useAuth";
import Carderfly from "@/assets/svgs/carderfly";

export function Navbar() {
  const { auth } = useAuth();
  return (
    <div className="sticky top-0 h-full w-full z-50 bg-background/95 backdrop-blur-[0.5px] supports-[backdrop-filter]:bg-background/60">
      <header className="mx-auto flex h-auto max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <nav className="hidden items-center gap-6 font-medium md:flex">
          <Link
            to="/"
            end
            className="group flex items-center gap-2 font-semibold"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Carderfly className="h-[26px] w-[26px] fill-white" />
            </div>
            <span className="text-2xl font-bold">Carderfly</span>
          </Link>
          <Link
            to="/"
            className="ml-6 text-[16px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            to="/#how-it-works"
            className="text-[16px] text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </Link>
          <Link
            to="/#feature"
            className="text-[16px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Feature
          </Link>
          <Link
            to="/#pricing"
            className="text-[16px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
        </nav>

        <nav className="flex items-center justify-between gap-6 font-medium md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link to="/">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                    <Carderfly className="h-[26px] w-[26px] fill-white" />
                  </div>
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                >
                  <House className="h-6 w-6" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/#how-it-works"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                >
                  <Network className="h-6 w-6" /> <span>How it works</span>
                </Link>
                <Link
                  to="/#feature"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                >
                  <Box className="h-6 w-6" />
                  <span>Feature</span>
                </Link>
                <Link
                  to="/#pricing"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                >
                  <Tag className="h-6 w-6" />
                  <span>Pricing</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link
            to="/"
            end
            className="group flex items-center gap-2 font-semibold md:hidden"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Carderfly className="h-[26px] w-[26px] fill-white" />
            </div>
            <span className="text-lg font-bold">Carderfly</span>
          </Link>
        </nav>

        <div className="flex gap-4">
          {auth.accessToken ? (
            <>
              <div className="ml-auto hidden flex-initial md:block"></div>
              <Button
                variant="outline"
                className="border-primary text-primary hover:text-primary"
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <div className="ml-auto hidden flex-initial md:block">
                <Button asChild variant="ghost" className="text-[16px]">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
              <Button
                asChild
                className="ml-auto rounded-full px-6 text-[16px] md:ml-0"
              >
                <Link to="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </header>
      <Separator />
    </div>
  );
}

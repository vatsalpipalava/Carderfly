import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useAuth from "@/hooks/useAuth";
import Carderfly from "@/assets/svgs/carderfly";

export function Navbar() {
  const { auth } = useAuth();
  return (
    // <-------------------------------------- Navbar Main --------------------------------------->
    <header className="sticky top-0 flex h-16 items-center gap-4 bg-background">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          end
          className="group flex items-center gap-2 font-semibold"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Carderfly className="h-[26px] w-[26px] fill-white" />
          </div>
          <span className="font-bold">CARDERFLY</span>
        </Link>
        <Link
          to="/dashboard"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Profile
        </Link>
        <Link
          href="/create-card"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Create card
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Customers
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Settings
        </Link>
      </nav>
      <div className="flex w-full items-center justify-between gap-4 md:ml-auto md:gap-2 lg:gap-4">
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
              <Link
                to="/dashboard"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-muted-foreground hover:text-foreground"
              >
                Profile
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link
          to="/dashboard"
          end
          className="group flex items-center gap-2 font-semibold md:hidden"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Carderfly className="h-[26px] w-[26px] fill-white" />
          </div>
          {/* <span className="font-bold">CARDERFLY</span> */}
        </Link>

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
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
            </div>
            <Button asChild>
              <Link to="/register">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

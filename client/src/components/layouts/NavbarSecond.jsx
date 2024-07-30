import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Carderfly from "@/assets/svgs/carderfly";

function NavbarSecond() {
  return (
    // <-------------------------------------- Navbar Second --------------------------------------->
    <header className="sticky top-0 flex h-16 items-center gap-4 bg-background">
      <nav className="flex w-full flex-row items-center justify-between gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-6">
        <div className="hidden h-auto w-auto md:block">
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
        </div>

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
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
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
        <div className="block h-auto w-auto md:hidden">
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
        </div>
        <div className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Orders
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
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
        </div>
        <div className="flex h-auto w-auto">
          <Button
            asChild
            variant="ghost"
            className="mr-2 hidden md:block lg:mr-4"
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Sign up</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default NavbarSecond;

import { Link, useLocation } from "react-router-dom";

import { ChevronRight, Home, IdCard, Menu, Users } from "lucide-react";
import Carderfly from "@/assets/svgs/carderfly";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function SheetDashboard() {
  const location = useLocation();

  const isActiveRoute = (route) => {
    return location.pathname === route || location.pathname === `${route}/`;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            to="/"
            className="group mb-4 flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Carderfly className="h-[26px] w-[26px] fill-white transition-all group-hover:scale-110" />
            <span className="sr-only">Carderfly</span>
          </Link>
          <Link
            to="/"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${isActiveRoute("/") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:no-underline">
                <div className="flex items-center gap-4">
                  <IdCard className="h-5 w-5" />
                  Cards
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <Link
                  to="/"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-base ${isActiveRoute("/cards/subscription") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"}`}
                >
                  <ChevronRight className="h-5 w-5" />
                  Subscription
                </Link>
                <Link
                  to="/"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-base ${isActiveRoute("/cards/all") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"}`}
                >
                  <ChevronRight className="h-5 w-5" />
                  All
                </Link>
                <Link
                  to="/"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-base ${isActiveRoute("/cards/inactive") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"}`}
                >
                  <ChevronRight className="h-5 w-5" />
                  Inactive
                </Link>
                <Link
                  to="/"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-base ${isActiveRoute("/cards/blocked") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"}`}
                >
                  <ChevronRight className="h-5 w-5" />
                  Blocked
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link
            to="/customers"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${isActiveRoute("/customers") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            <Users className="h-5 w-5" />
            Customers
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default SheetDashboard;

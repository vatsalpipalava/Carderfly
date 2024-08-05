import { Link, useLocation } from "react-router-dom";

import {
  ArrowRightLeft,
  Home,
  LayoutTemplate,
  PanelLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TiBusinessCard } from "react-icons/ti";
import Carderfly from "@/assets/svgs/carderfly";
// import { TbFileInvoice } from "react-icons/tb";

function SheetDashboard() {
  const location = useLocation();

  const isActiveRoute = (route) => {
    return location.pathname === route || location.pathname === `${route}/`;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            to="/dashboard"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary text-lg font-semibold text-primary-foreground md:text-base ml-5 mb-4"
          >
            <Carderfly className="h-[26px] w-[26px] fill-white transition-all group-hover:scale-110" />
            <span className="sr-only">Carderfly</span>
          </Link>
          <Link
            to="/dashboard"
            className={`group flex items-center gap-4 px-5 py-2.5 rounded-full ${isActiveRoute("/dashboard") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            <Home className="h-5 w-5 transition-all group-hover:scale-110" />
            Dashboard
          </Link>
          <Link
            to="/dashboard/create-card"
            className={`group flex items-center gap-4 px-5 py-2.5 rounded-full ${isActiveRoute("/dashboard/create-card") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"}`}
            
          >
            <LayoutTemplate className="h-5 w-5 transition-all group-hover:scale-110 " />
            Create Card
          </Link>
          <Link
            to="/dashboard/my-cards"
            className={`group flex items-center gap-4 px-5 py-2.5 rounded-full ${isActiveRoute("/dashboard/my-cards") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            <TiBusinessCard className="h-5 w-5 transition-all group-hover:scale-110" />
            My Cards
          </Link>
          <Link
            to="/dashboard/transactions"
            className={`group flex items-center gap-4 px-5 py-2.5 rounded-full ${isActiveRoute("/dashboard/transactions") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            {/* <TbFileInvoice className="h-[22px] w-[22px] transition-all group-hover:scale-110" /> */}
            
            <ArrowRightLeft className="h-[22px] w-[22px] transition-all group-hover:scale-110" />
            Transactions
          </Link>
          {/* <Link
            href="#"
            className={`group flex items-center gap-4 px-5 py-2.5 rounded-full ${isActiveRoute("/dashboard/create-card") ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            <LineChart className="h-5 w-5 transition-all group-hover:scale-110" />
            Settings
          </Link> */}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default SheetDashboard;

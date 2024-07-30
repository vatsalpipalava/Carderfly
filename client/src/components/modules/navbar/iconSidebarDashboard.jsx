import { NavLink, useLocation } from "react-router-dom";

import {
  ArrowRightLeft,
  Home,
  // LineChart,
  LayoutTemplate,
} from "lucide-react";
import { TiBusinessCard } from "react-icons/ti";
// import { TbFileInvoice } from "react-icons/tb";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useStyle from "@/hooks/useStyle";
import Carderfly from "@/assets/svgs/carderfly";

function IconSidebarDashboard() {
  const location = useLocation();
  const { style } = useStyle();

  const isActiveRoute = (route) => {
    return location.pathname === route || location.pathname === `${route}/`;
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background ${style?.iconSidebarDisplay} sm:flex`}
    >
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavLink
          to="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Carderfly className="h-4 w-4 fill-white transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </NavLink>

        {/* Dashboard */}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink
                to="/dashboard"
                className={`group flex h-9 w-9 items-center justify-center rounded-md transition-colors md:h-8 md:w-8 ${isActiveRoute("/dashboard") ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"}`}
              >
                <Home className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Dashboard</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Create Card */}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink
                to="/dashboard/create-card"
                className={`group flex h-9 w-9 items-center justify-center rounded-md transition-colors md:h-8 md:w-8 ${isActiveRoute("/dashboard/create-card") ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"}`}
              >
                <LayoutTemplate className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Create Card</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Create Card</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* My Cards */}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink
                to="/dashboard/my-cards"
                className={`group flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors md:h-8 md:w-8 ${isActiveRoute("/dashboard/my-cards") ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"}`}
              >
                <TiBusinessCard className="h-[21px] w-[21px] transition-all group-hover:scale-110" />
                <span className="sr-only">My Cards</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">My Cards</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Transactions */}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink
                to="/dashboard/transactions"
                className={`group flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors md:h-8 md:w-8 ${isActiveRoute("/dashboard/transactions") ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"}`}
              >
                {/* <TbFileInvoice className="h-[22px] w-[22px] transition-all group-hover:scale-110" /> */}
                
                <ArrowRightLeft className="h-[22px] w-[22px] transition-all group-hover:scale-110" />
                <span className="sr-only">Transactions</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Transactions</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Analysis */}
        {/* <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink
                to="/dashboard/invoice"
                className={`group flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors md:h-8 md:w-8 ${isActiveRoute("/products") ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"}`}
              >
                <TbFileInvoice className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Analytics</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </TooltipProvider> */}
      </nav>
    </aside>
  );
}

export default IconSidebarDashboard;

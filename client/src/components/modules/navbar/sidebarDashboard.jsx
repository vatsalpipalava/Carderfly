import { NavLink, useLocation } from "react-router-dom";

import { ArrowRightLeft, Home, LayoutTemplate } from "lucide-react";
import { TiBusinessCard } from "react-icons/ti";
// import { TbFileInvoice } from "react-icons/tb";

import useStyle from "@/hooks/useStyle";
import Carderfly from "@/assets/svgs/carderfly";

function SidebarDashboard() {
  const location = useLocation();
  const { style } = useStyle();

  const isActiveRoute = (route) => {
    return location.pathname === route || location.pathname === `${route}/`;
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-10 hidden w-72 flex-col border-r bg-background ${style?.sidebarDisplay}`}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[65px] lg:px-6">
          <NavLink
            to="/dashboard"
            end
            className="group flex items-center gap-2 font-semibold"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-primary">
              <Carderfly className="h-[26px] w-[26px] fill-primary transition-all group-hover:scale-110" />
            </div>
            <span>CARDERFLY</span>
          </NavLink>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLink
              to="/dashboard"
              className={`flex items-center gap-3 rounded-md px-3 py-2 transition-all ${
                isActiveRoute("/dashboard")
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/create-card"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 transition-all ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-primary"
                }`
              }
            >
              <LayoutTemplate className="h-5 w-5" />
              Create Card
            </NavLink>
            <NavLink
              to="/dashboard/my-cards"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 transition-all ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-primary"
                }`
              }
            >
              <TiBusinessCard className="h-[21px] w-[21px]" />
              My Cards
            </NavLink>

            {/* Transactions */}
            <NavLink
              to="/dashboard/transactions"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 transition-all ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-primary"
                }`
              }
            >
              {/* <TbFileInvoice className="h-[22px] w-[22px]" /> */}
              <ArrowRightLeft className="h-[22px] w-[22px]" />
              Transactions
            </NavLink>
          </nav>
        </div>
      </div>
    </aside>
  );
}

export default SidebarDashboard;

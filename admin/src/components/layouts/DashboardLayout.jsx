import { NavLink, useLocation, Outlet } from "react-router-dom";

import { ChevronRight, CloudDownload, Home, IdCard, Users } from "lucide-react";
import Carderfly from "@/assets/svgs/carderfly";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DashboardLayout = () => {
  const location = useLocation();

  const isActiveRoute = (route) => {
    return location.pathname === route || location.pathname === `${route}/`;
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden border-r bg-background md:block md:w-52 lg:w-64">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <NavLink
            to="/"
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
                to="/"
                className={`group flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActiveRoute("/") ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"}`}
              >
                <Home className="h-4 w-4 transition-all group-hover:scale-110" />
                Dashboard
              </NavLink>
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="group flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline">
                    <div className="flex items-center gap-3">
                      <IdCard className="h-4 w-4 transition-all group-hover:scale-110" />
                      Cards
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <NavLink
                      to="/cards/subscription"
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-md px-3 py-2 transition-all ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-muted-foreground hover:text-primary"
                        }`
                      }
                    >
                      <ChevronRight className="h-4 w-4 transition-all group-hover:scale-110" />
                      Subscription
                    </NavLink>
                    <NavLink
                      to="/cards/all"
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-md px-3 py-2 transition-all ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-muted-foreground hover:text-primary"
                        }`
                      }
                    >
                      <ChevronRight className="h-4 w-4 transition-all group-hover:scale-110" />
                      All
                    </NavLink>
                    <NavLink
                      to="/cards/inactive"
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-md px-3 py-2 transition-all ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-muted-foreground hover:text-primary"
                        }`
                      }
                    >
                      <ChevronRight className="h-4 w-4 transition-all group-hover:scale-110" />
                      Inactive
                    </NavLink>
                    <NavLink
                      to="/cards/blocked"
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-md px-3 py-2 transition-all ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-muted-foreground hover:text-primary"
                        }`
                      }
                    >
                      <ChevronRight className="h-4 w-4 transition-all group-hover:scale-110" />
                      Blocked
                    </NavLink>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <NavLink
                to="/customers"
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-md px-3 py-2 transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                <Users className="h-4 w-4 transition-all group-hover:scale-110" />
                Customers
              </NavLink>
              <NavLink
                to="/backup"
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-md px-3 py-2 transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                <CloudDownload className="h-4 w-4 transition-all group-hover:scale-110" />
                Backup
              </NavLink>
            </nav>
          </div>
        </div>
      </aside>
      <div className="flex flex-col sm:gap-4 md:pl-52 lg:pl-64">
        <>
          <Outlet />
        </>
      </div>
    </div>
  );
};

export default DashboardLayout;

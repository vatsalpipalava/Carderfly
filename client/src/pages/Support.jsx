import LogoutDropdown from "@/components/modules/navbar/logoutDropdown";
import SheetDashboard from "@/components/modules/navbar/sheetDashboard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useStyle from "@/hooks/useStyle";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export function Support() {
  const { setStyle } = useStyle();

  useEffect(() => {
    setStyle({
      iconSidebarDisplay: "lg:hidden",
      sidebarDisplay: "lg:block",
      sidebarDashboardPadding: "lg:pl-72",
      iconSidebarDashboardPadding: "sm:pl-14",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 py-3 sm:h-auto">
        <SheetDashboard />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Support</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <LogoutDropdown />
      </header>
      <main className="flex flex-col h-32 w-full items-center justify-center p-4">
        <p>If you have any questions, feel free to send an email.</p>
        <Link
          to="mailto:info@carderfly.com"
          className="font-bold hover:text-primary mt-2"
        >
          Email: info@carderfly.com
        </Link>
      </main>
    </>
  );
}

import { Outlet } from "react-router-dom";

import useStyle from "@/hooks/useStyle";
import SidebarDashboard from "@/components/modules/navbar/sidebarDashboard";
import IconSidebarDashboard from "@/components/modules/navbar/iconSidebarDashboard";

const DashboardLayout = () => {
  const { style } = useStyle();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarDashboard />
      <IconSidebarDashboard />

      <div
        className={`flex flex-col sm:gap-4 ${style.sidebarDashboardPadding} ${style.iconSidebarDashboardPadding}`}
      >
        <>
          <Outlet />
        </>
      </div>
    </div>
  );
};

export default DashboardLayout;

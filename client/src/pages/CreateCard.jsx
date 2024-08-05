import { useEffect } from "react";

import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import useStyle from "@/hooks/useStyle";
import templates from "@/TemplatesData";
import SheetDashboard from "@/components/modules/navbar/sheetDashboard";
import LogoutDropdown from "@/components/modules/navbar/logoutDropdown";
import { Helmet } from "react-helmet";

function CreateCard() {
  const { setStyle } = useStyle();

  useEffect(() => {
    setStyle({
      iconSidebarDisplay: "lg:flex",
      sidebarDisplay: "lg:hidden",
      sidebarDashboardPadding: "",
      iconSidebarDashboardPadding: "sm:pl-14",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <Helmet>
        <title>Select Template</title>
      </Helmet>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 py-3 sm:h-auto">
        <SheetDashboard />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create Card</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <LogoutDropdown />
      </header>
      <div>
        <h2 className="scroll-m-20 p-4 pb-0 text-3xl font-semibold tracking-tight first:mt-0 sm:px-6 sm:py-0">
          Select Template
        </h2>
        <div className="p-4 sm:p-6 sm:px-6">
          <Separator />
        </div>
        <main className="grid flex-1 grid-cols-1 items-start gap-4 p-4 sm:grid-cols-2 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3">
          {templates.map((template) => (
            // <Card x-chunk="dashboard-05-chunk-1" key={template.id}>
            //   <CardHeader className="pb-2">
            //     <CardDescription>This Week</CardDescription>
            //     <CardTitle>{template.name}</CardTitle>
            //   </CardHeader>
            //   <CardContent>
            //     <img
            //       src={template.imageUrl}
            //       alt={template.name}
            //       className="h-96 w-full object-cover"
            //     />
            //   </CardContent>
            //   <Separator />
            //   <CardFooter>
            //     <div className="mt-4 h-full w-full">
            //       <Link
            //         to={`/dashboard/create-card/${template.id}/enter-details`}
            //       >
            //         <Button
            //           variant="outline"
            //           size="icon"
            //           className="h-11 w-11 rounded-full"
            //         >
            //           <IoMdCreate className="h-5 w-5" />
            //         </Button>
            //       </Link>
            //     </div>
            //   </CardFooter>
            // </Card>
            <Link
              key={template.id}
              to={`/dashboard/create-card/${template.id}/enter-details`}
            >
              <Card className="group w-full cursor-pointer rounded-3xl border-4 border-transparent bg-transparent p-1 hover:border-primary">
                <CardContent className="relative overflow-hidden p-0">
                  <img
                    src={template.imageUrl}
                    alt={template.name}
                    className="h-full w-full rounded-2xl object-cover transition-all duration-1000"
                  />
                  <div className="absolute inset-0 flex items-end rounded-2xl bg-gradient-to-t from-black/30 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <CardHeader className="p-0 text-lg font-semibold text-white">
                      {template.name}
                    </CardHeader>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </main>

        {/* <footer className="fixed bottom-0 right-0 ml-14 w-full bg-muted">
        <div className="ml-0 flex justify-between p-4 sm:ml-14 sm:px-6">
          <Button>Previous</Button>
          <Button>Next</Button>
        </div>
      </footer> */}
      </div>
    </>
  );
}

export default CreateCard;

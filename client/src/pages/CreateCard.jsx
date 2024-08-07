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
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import useStyle from "@/hooks/useStyle";
import templates from "@/TemplatesData";
import SheetDashboard from "@/components/modules/navbar/sheetDashboard";
import LogoutDropdown from "@/components/modules/navbar/logoutDropdown";
import { Helmet } from "react-helmet";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";

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
        <main className="mb-6 grid flex-1 grid-cols-1 items-start gap-4 p-4 sm:grid-cols-2 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="rounded-xl shadow-md hover:shadow-xl"
            >
              <CardContent className="p-0">
                <ScrollArea className="h-96 w-auto rounded-t-xl border-none">
                  <img
                    src={template.imageUrl}
                    alt={template.name}
                    className="h-full w-full object-cover"
                  />
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex items-center justify-between rounded-b-xl bg-muted p-4">
                <p className="text-lg font-semibold">{template.name}</p>
                <Button asChild variant="link">
                  <Link
                    to={`/dashboard/create-card/${template.id}/enter-details`}
                  >
                    <motion.button
                      className="relative flex w-auto cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.span
                        key="reaction"
                        className="relative block font-semibold"
                        initial={{ x: 0 }}
                        exit={{ x: 50, transition: { duration: 0.1 } }}
                      >
                        <span className="group inline-flex items-center">
                          Create{" "}
                          <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </motion.span>
                    </motion.button>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </main>
      </div>
    </>
  );
}

export default CreateCard;

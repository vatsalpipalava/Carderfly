import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import LogoutDropdown from "@/components/modules/navbar/logoutDropdown";
import SheetDashboard from "@/components/modules/navbar/sheetDashboard";
import useStyle from "@/hooks/useStyle";
import templates from "@/TemplatesData";
import { setTemplateId } from "@/slices/cardSlice";

import { HeaderAttachments } from "@/components/modules/userData/HeaderAttachments";
import { CardLink } from "@/components/modules/userData/Link";
import { ContactInfo } from "@/components/modules/userData/ContactInfo";
import { PrimaryAction } from "@/components/modules/userData/PrimaryAction";
import { SecondaryAction } from "@/components/modules/userData/SecondaryAction";
import { FeatureContent } from "@/components/modules/userData/FeatureContent";
import { Color } from "@/components/modules/userData/Color";
import { CreateCardButton } from "@/components/modules/userData/CreateCardButton";
import { Helmet } from "react-helmet";
import { useApplyTheme } from "@/components/modules/ApplyTheme";

function EnterDetails() {
  const dispatch = useDispatch();

  const { templateId } = useParams();
  const { setStyle } = useStyle();
  const applyTheme = useApplyTheme();

  useEffect(() => {
    setStyle({
      iconSidebarDisplay: "lg:flex",
      sidebarDisplay: "lg:hidden",
      sidebarDashboardPadding: "",
      iconSidebarDashboardPadding: "sm:pl-14",
      mobileRadius: "rounded-3xl",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardData = useSelector((state) => state.card);

  const selectedTemplate = templates.find(
    (template) => template.id === templateId
  );

  useEffect(() => {
    if (selectedTemplate) {
      dispatch(setTemplateId(selectedTemplate.id));
      applyTheme(selectedTemplate.id);
    } else {
      console.error("Theme not found");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Add Details</title>
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
              <BreadcrumbLink asChild>
                <Link to="/dashboard/create-card">Create Card</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Enter Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <LogoutDropdown />
      </header>
      <main className="flex flex-1 flex-col gap-4 overflow-hidden bg-transparent p-4 pb-0 sm:px-6 md:gap-8 lg:flex-row">
        <div className="w-full lg:w-1/5">
          <nav className="relative lg:fixed">
            <div className="flex flex-col gap-3">
              <div className="mb-2 grid w-full gap-2">
                <h1 className="text-3xl font-semibold">Enter Details</h1>
              </div>
              <a href="#header-attachments" className="font-semibold">
                Header Attachments
              </a>
              <a href="#contact-information" className="font-semibold">
                Contact Information
              </a>
              <a href="#primary-action" className="font-semibold">
                Primary Actions
              </a>
              <a href="#secondary-action" className="font-semibold">
                Secondary Actions
              </a>
              <a href="#feature-content" className="font-semibold">
                FeatureContent
              </a>
              <a href="#color" className="font-semibold">
                Color
              </a>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className="block lg:hidden" variant="outline">
                    Open Preview
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Preview</DrawerTitle>
                    </DrawerHeader>
                    <div className="relative h-[75vh] w-auto max-w-[24rem] rounded-3xl shadow-lg">
                      <selectedTemplate.templateComponents
                        cardData={cardData}
                      />
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </nav>
        </div>
        <div className="flex w-full lg:w-4/5">
          <div className="relative h-full w-full pr-0 lg:pr-[25rem]">
            <section id="card-link" className="mb-6">
              <CardLink />
            </section>
            <section id="header-attachments" className="mb-6">
              <HeaderAttachments />
            </section>
            <section id="contact-information" className="mb-6">
              <ContactInfo />
            </section>
            <div id="primary-action" className="mb-6">
              <PrimaryAction />
            </div>
            <section id="secondary-action" className="mb-6">
              <SecondaryAction />
            </section>
            <section id="feature-content" className="mb-6">
              <FeatureContent />
            </section>
            <section id="color" className="mb-6">
              <Color />
            </section>
            <section className="mb-6">
              <CreateCardButton />
            </section>
          </div>
          <div className="right-5 top-24 hidden lg:fixed lg:block">
            <div className="relative z-50 h-[84vh] w-full max-w-[24rem] rounded-3xl shadow-lg">
              <selectedTemplate.templateComponents cardData={cardData} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default EnterDetails;

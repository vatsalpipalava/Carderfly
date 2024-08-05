import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
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

import useStyle from "@/hooks/useStyle";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import templates from "@/TemplatesData";
import LogoutDropdown from "@/components/modules/navbar/logoutDropdown";
import SheetDashboard from "@/components/modules/navbar/sheetDashboard";
import NotFound from "./NotFound";
import Loader from "@/components/modules/loader/loader";

import { ChangeTemplate } from "@/components/modules/editData/ChangeTemplate";
// import { CardLink } from "@/components/modules/userData/Link";
import { HeaderAttachments } from "@/components/modules/editData/HeaderAttachments";
import { ContactInfo } from "@/components/modules/editData/ContactInfo";
import { PrimaryAction } from "@/components/modules/editData/PrimaryAction";
import { SecondaryAction } from "@/components/modules/editData/SecondaryAction";
import { FeatureContent } from "@/components/modules/editData/FeatureContent";
import { Color } from "@/components/modules/editData/Color";
import { EditCardButton } from "@/components/modules/editData/EditCardButton";

import { setCard } from "@/slices/editCardSlice";
import { Helmet } from "react-helmet";

function EditCard() {
  const dispatch = useDispatch();

  const { setStyle } = useStyle();
  const { cardId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [notFound, setNotFound] = useState(false);

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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCard = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(`/card/view-card/${cardId}`, {
          signal: controller.signal,
        });
        if (isMounted) {
          dispatch(setCard(response?.data?.data));
          setNotFound(false);
          setErrMsg("");
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        if (!err?.response) {
          setErrMsg("No Server Response.");
        } else if (err.response?.status === 400) {
          setNotFound(true);
        } else if (err.response?.status === 404) {
          setNotFound(true);
        } else {
          setErrMsg("Cards retrieved failed.");
        }
      }
    };

    getCard();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardData = useSelector((state) => state.editCard.card);

  if (notFound) {
    return <NotFound />;
  }

  if (loading) {
    return <Loader />;
  }

  if (!cardData) {
    return <Loader />;
  }

  const selectedTemplate = templates.find(
    (template) => template.id === cardData?.templateId
  );

  if (!selectedTemplate) {
    return <p>Template not found.</p>;
  }

  return (
    <>
    <Helmet>
        <title>Edit Card</title>
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
                <Link to="/dashboard/my-cards">My Cards</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Card</BreadcrumbPage>
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
                <h1 className="text-3xl font-semibold">Edit Details</h1>
              </div>
              <a href="#change-template" className="font-semibold">
                Change Template
              </a>
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
            {errMsg ? (
              <section className="mb-6">
                <Alert variant="destructive" className="w-full">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errMsg}</AlertDescription>
                </Alert>
              </section>
            ) : null}
            <section id="change-template" className="mb-6">
              <ChangeTemplate templateId={cardData?.templateId} />
            </section>
            <section id="card-link" className="mb-6">
              {/* <CardLink /> */}
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
              <EditCardButton cardId={cardId} />
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

export default EditCard;

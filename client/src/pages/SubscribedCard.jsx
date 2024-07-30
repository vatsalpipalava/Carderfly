import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/api/axios";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

import useStyle from "@/hooks/useStyle";

import templates from "@/TemplatesData";
import NotFound from "./NotFound";
import Loader from "@/components/modules/loader/loader";
import HelmetLayout from "@/components/layouts/HelmetLayout";

export function SubscribedCard() {
  const { publicLink } = useParams();

  const { setStyle } = useStyle();

  const [card, setCard] = useState();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setStyle({
      mobileRadius: "rounded-none",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getSubscribedCard = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/subscribe/subscribed/card/${publicLink}`
        );
        setCard(response?.data?.data);
        setNotFound(false);
        setErrMsg("");
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (!err?.response) {
          setErrMsg("No Server Response.");
        } else if (err.response?.status === 404) {
          setNotFound(true);
        } else if (err.response?.status === 410) {
          setNotFound(true);
        } else {
          setErrMsg("Cards retrieved failed.");
        }
      }
    };

    getSubscribedCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (notFound) {
    return <NotFound />;
  }

  if (loading) {
    return <Loader />;
  }

  if (!card) {
    return <Loader />;
  }

  const selectedTemplate = templates.find(
    (template) => template.id === card?.templateId
  );

  if (!selectedTemplate) {
    return <p>Template not found.</p>;
  }

  const TemplateComponent = selectedTemplate?.templateComponents;

  const dynamicTitle = `${card?.firstName} ${card?.lastName} | ${card?.jobTitle} | ${card?.businessName}`;
  const dynamicDescription = `${card?.businessDescription}`;
  const dynamicImageUrl = `${card?.logoImg}`;
  const dynamicPageUrl = `${import.meta.env.VITE_FRONTEND_URL}/${card?.publicLink}`;

  return (
    <HelmetLayout
      title={dynamicTitle}
      description={dynamicDescription}
      imageUrl={dynamicImageUrl}
      pageUrl={dynamicPageUrl}
    >
      <div className="px-4 sm:px-6">
        {/* Error Message */}
        {errMsg ? (
          <Alert variant="destructive" className="my-6 w-full">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errMsg}</AlertDescription>
          </Alert>
        ) : null}
      </div>

      <div className="relative mx-auto h-[100dvh] w-full max-w-[500px]">
        <TemplateComponent cardData={card} />
      </div>
    </HelmetLayout>
  );
}


{/* <HelmetLayout
      title={dynamicTitle}
      description={dynamicDescription}
      imageUrl={dynamicImageUrl}
      pageUrl={dynamicPageUrl}
    >
    <>
      {/* <HelmetLayout
        title={dynamicTitle}
        description={dynamicDescription}
        imageUrl={dynamicImageUrl}
        pageUrl={dynamicPageUrl}
      /> */}
    //   <div className="px-4 sm:px-6">
    //     {/* Error Message */}
    //     {errMsg ? (
    //       <Alert variant="destructive" className="my-6 w-full">
    //         <AlertCircle className="h-4 w-4" />
    //         <AlertDescription>{errMsg}</AlertDescription>
    //       </Alert>
    //     ) : null}
    //   </div>

    //   <div className="relative mx-auto h-[100dvh] w-full max-w-[500px]">
    //     <TemplateComponent cardData={card} />
    //   </div>
    // </>
    // </HelmetLayout> */}
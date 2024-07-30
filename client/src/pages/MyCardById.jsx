import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useStyle from "@/hooks/useStyle";

import templates from "@/TemplatesData";
import NotFound from "./NotFound";
import Loader from "@/components/modules/loader/loader";

function MyCardById() {
  const { cardId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

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
    return () => {
      // Check if the previous route was the card detail page
      if (location.pathname === `/${cardId}`) {
        navigate("/dashboard/my-cards");
      }
    };
  }, [location, cardId, navigate]);

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
          setCard(response?.data?.data);
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

  return (
    <>
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
    </>
  );
}

export default MyCardById;

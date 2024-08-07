/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { MdLocationOn, MdOutlineQrCode2, MdEmail } from "react-icons/md";
import { IoCallSharp, IoEarth } from "react-icons/io5";
import { ImShare2 } from "react-icons/im";
import { RiWhatsappFill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";

import useStyle from "@/hooks/useStyle";
import { PrimaryActionTemplate } from "@/components/modules/templateComponents/PrimaryActionTemplate";
import { SecondaryActionTemplate } from "@/components/modules/templateComponents/SecondaryActionTemplate";
import { FeatureContentTemplate } from "@/components/modules/templateComponents/FeatureContentTemplate";
import { QrCodeDrawerTemplate } from "@/components/modules/templateComponents/QrCodeDrawerTemplate";
import { HandleShareTemplate } from "@/components/modules/templateComponents/HandleShareTemplate";
import { DownloadVcfTemplate } from "@/components/modules/templateComponents/DownloadVcfTemplate";

import {
  reButtonBg,
  reBackground,
  reText,
  reButtonText,
  reCardBg,
  reCardText,
  // reCardSeparator,
  reCardIcon,
  reFeatureText,
  reFeatureSeparator,
  reFooterBg,
  reFooterIcon,
  reQrCode,
} from "@/slices/cardSlice";

function ProfessionalSuite({ cardData }) {
  const dispatch = useDispatch();

  const { style } = useStyle();

  const [qrDrawerOpen, setQrDrawerOpen] = useState(false);
  const handleOpenQrDrawer = () => {
    setQrDrawerOpen(true);
  };

  const mobile = cardData?.primaryActions.find(
    (action) => action._id === "mobile"
  );
  const email = cardData?.primaryActions.find(
    (action) => action?._id === "email"
  );
  const website = cardData?.primaryActions.find(
    (action) => action?._id === "website"
  );
  const whatsapp = cardData?.primaryActions.find(
    (action) => action?._id === "whatsapp"
  );

  useEffect(() => {
    dispatch(reButtonBg("#DC2626"));
    dispatch(reBackground("#FFFFFF"));
    dispatch(reText("#000000"));
    dispatch(reButtonText("#FFFFFF"));
    dispatch(reCardBg("#F1F1F1"));
    dispatch(reCardText("#000000"));
    // dispatch(reCardSeparator("#E5E5E5"));
    dispatch(reCardIcon("#000000"));
    dispatch(reFeatureText("#000000"));
    dispatch(reFeatureSeparator("#E5E5E5"));
    dispatch(reFooterBg("#4E4E4E"));
    dispatch(reFooterIcon("#E1E1E1"));
    dispatch(reQrCode("#4E4E4E"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`relative mx-auto flex h-full max-w-[500px] flex-col overflow-hidden ${style.mobileRadius}`}
      style={{
        backgroundColor: cardData?.colors?.background,
        color: cardData?.colors?.text,
      }}
    >
      <ScrollArea className="mb-10 flex-grow overflow-auto">
        <div className="relative mb-16">
          <img
            src={cardData?.backCoverImg}
            alt="Image"
            className="aspect-[13/6] object-cover"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
            <img
              src={cardData?.profileImg}
              alt="profile"
              className="aspect-square h-32 w-32 rounded-full object-cover"
            />
          </div>
        </div>
        <div className="w-full p-6">
          <div className="w-full">
            <h3 className="mb-1 scroll-m-20 text-center text-2xl font-semibold tracking-tight">
              {cardData?.firstName} {cardData?.lastName}
            </h3>
            <p className="mb-1 text-center italic">{cardData?.jobTitle}</p>
            <div className="mb-1 text-center text-lg font-semibold">
              {cardData?.businessName}
            </div>
            <p className="mb-6 text-center text-sm">
              {cardData?.businessDescription}
            </p>
          </div>

          {/* Primary Action */}
          <div className="mb-8 flex w-full flex-wrap justify-center gap-6">
            <PrimaryActionTemplate
              primaryActions={cardData?.primaryActions}
              propButtonBg={cardData?.colors?.buttonBg}
              propButtonText={cardData?.colors?.buttonText}
            />
          </div>

          <Card
            className="mb-6 border-none shadow-lg"
            style={{
              backgroundColor: cardData?.colors?.cardBg,
              color: cardData?.colors?.cardText,
            }}
          >
            <CardHeader className="flex items-center justify-center bg-transparent pb-4">
              <img
                src={cardData?.logoImg}
                alt="logo"
                className="h-auto max-w-[70%] rounded-md bg-transparent object-cover"
              />
            </CardHeader>

            <CardContent>
              {/* <Separator
                style={{ backgroundColor: cardData?.colors?.cardSeparator }}
                className="my-3"
              /> */}
              <div className="mt-3 flex w-full items-center gap-4">
                <MdLocationOn
                  className="h-5 w-5"
                  style={{ color: cardData?.colors?.cardIcon }}
                />
                <p className="w-full">{cardData?.businessAddress}</p>
              </div>

              {/* <Separator
                style={{ backgroundColor: cardData?.colors?.cardSeparator }}
                className="my-3"
              /> */}
              <div className="mt-3 flex w-full items-center gap-4">
                <IoCallSharp
                  className="h-5 w-5"
                  style={{ color: cardData?.colors?.cardIcon }}
                />
                <p className="w-full">{mobile?.value}</p>
              </div>

              {/* <Separator
                style={{ backgroundColor: cardData?.colors?.cardSeparator }}
                className="my-3"
              /> */}
              <div className="mt-3 flex w-full items-center gap-4">
                <MdEmail
                  className="h-5 w-5"
                  style={{ color: cardData?.colors?.cardIcon }}
                />
                <p className="w-full">{email?.value}</p>
              </div>

              {website?.value ? (
                <>
                  {/* <Separator
                    style={{ backgroundColor: cardData?.colors?.cardSeparator }}
                    className="my-3"
                  /> */}
                  <div className="mt-3 flex w-full items-center gap-4">
                    <IoEarth
                      className="h-5 w-5"
                      style={{ color: cardData?.colors?.cardIcon }}
                    />
                    <p className="w-full">{website?.value}</p>
                  </div>
                </>
              ) : null}
            </CardContent>
          </Card>

          {/* Secondary Actions */}
          <div className="mb-8 flex w-full flex-wrap justify-center gap-6">
            <SecondaryActionTemplate
              secondaryActions={cardData?.secondaryActions}
            />
          </div>

          {/* Feature Section */}
          <div>
            <FeatureContentTemplate
              sections={cardData?.sections}
              propText={cardData?.colors?.text}
              propFeatureText={cardData?.colors?.featureText}
              propFeatureSeparator={cardData?.colors?.featureSeparator}
            />
          </div>

          <div className="mb-4">
            <p
              className="text-center text-sm text-muted-foreground"
              style={{ color: cardData?.colors?.text }}
            >
              Powered by&nbsp;
              <Button
                variant="link"
                asChild
                className="h-6 p-0"
                style={{ color: cardData?.colors?.text }}
              >
                <Link to="https://carderfly.com" target="_blank">
                  Carderfly
                </Link>
              </Button>
            </p>
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <footer
        className="absolute bottom-3 left-0 right-0 z-50 mx-auto max-w-[90%] rounded-full py-2"
        style={{ backgroundColor: cardData?.colors?.footerBg }}
      >
        <div className="mx-auto grid h-full w-full grid-cols-5">
          {mobile && mobile?.value ? (
            <Link
              target="_blank"
              to={`tel:${mobile.value}`}
              className="inline-flex flex-col items-center justify-center px-5"
            >
              <IoCallSharp
                className="h-6 w-6"
                style={{ color: cardData?.colors?.footerIcon }}
              />
            </Link>
          ) : (
            <button className="inline-flex flex-col items-center justify-center px-5">
              <IoCallSharp
                className="h-6 w-6"
                style={{ color: cardData?.colors?.footerIcon }}
              />
            </button>
          )}

          {whatsapp && whatsapp.value ? (
            <Link
              target="_blank"
              to={`https://wa.me/${whatsapp.value}`}
              className="inline-flex flex-col items-center justify-center px-5"
            >
              <RiWhatsappFill
                className="h-6 w-6"
                style={{ color: cardData?.colors?.footerIcon }}
              />
            </Link>
          ) : (
            <button className="inline-flex flex-col items-center justify-center px-5">
              <RiWhatsappFill
                className="h-6 w-6"
                style={{ color: cardData?.colors?.footerIcon }}
              />
            </button>
          )}

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() =>
                DownloadVcfTemplate(cardData?._id, cardData?.publicLink)
              }
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: cardData?.colors?.buttonBg }}
            >
              <FiPlus
                className="h-6 w-6"
                style={{ color: cardData?.colors?.buttonText }}
              />
            </button>
          </div>

          {/* Qr Code Drawer */}
          <button
            type="button"
            onClick={handleOpenQrDrawer}
            className="group inline-flex flex-col items-center justify-center rounded-s-full px-5"
          >
            {/* <QrCode className="h-6 w-6" /> style={{color: cardData?.colors?.footerIcon}} */}
            <MdOutlineQrCode2
              className="h-6 w-6"
              style={{ color: cardData?.colors?.footerIcon }}
            />
          </button>
          <QrCodeDrawerTemplate
            qrDrawerOpenProp={qrDrawerOpen}
            setQrDrawerOpenProp={setQrDrawerOpen}
            publicLinkProp={cardData?.publicLink}
            logoImgProp={cardData?.logoImg}
            backgroundProp={cardData?.colors?.background}
            buttonBgProp={cardData?.colors?.buttonBg}
            buttonTextProp={cardData?.colors?.buttonText}
            textProp={cardData?.colors?.text}
            qrCodeProp={cardData?.colors?.qrCode}
          />

          <button
            onClick={() => HandleShareTemplate(cardData?.publicLink)}
            type="button"
            className="group inline-flex flex-col items-center justify-center rounded-e-full px-5"
          >
            <ImShare2
              className="mb-1 h-5 w-5"
              style={{ color: cardData?.colors?.footerIcon }}
            />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default ProfessionalSuite;

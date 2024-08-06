/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { MdLocationOn, MdEmail } from "react-icons/md";
import { IoCallSharp, IoEarth, IoShare } from "react-icons/io5";
import { RiWhatsappFill } from "react-icons/ri";
import { HiMiniPlusCircle } from "react-icons/hi2";

import { QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

import useStyle from "@/hooks/useStyle";
import { PrimaryActionTemplate } from "@/components/modules/templateComponents/PrimaryActionTemplate";
import { FeatureContentTemplate } from "@/components/modules/templateComponents/FeatureContentTemplate";
import { SecondaryActionTemplate } from "@/components/modules/templateComponents/SecondaryActionTemplate";
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

function CorporateElegance({ cardData }) {
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
    dispatch(reButtonBg("#004170"));
    dispatch(reBackground("#F9F9F9"));
    dispatch(reText("#000000"));
    dispatch(reButtonText("#FFFFFF"));
    dispatch(reCardBg("#0294FF"));
    dispatch(reCardText("#FFFFFF"));
    // dispatch(reCardSeparator("#E5E5E5"));
    dispatch(reCardIcon("#FFFFFF"));
    dispatch(reFeatureText("#000000"));
    dispatch(reFeatureSeparator("#E5E5E5"));
    dispatch(reFooterBg("#0294ff"));
    dispatch(reFooterIcon("#FFFFFF"));
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
          <div className="absolute bottom-0 left-4 translate-y-1/2 transform">
            <img
              src={cardData?.profileImg}
              alt="profile"
              className="aspect-square h-32 w-32 rounded-full object-cover"
            />
          </div>
        </div>
        <div className="w-full p-4">
          <div className="w-full">
            <h3 className="mb-1 scroll-m-20 text-2xl font-semibold tracking-tight">
              {cardData?.firstName} {cardData?.lastName}
            </h3>
            <p className="mb-1 italic">{cardData?.jobTitle}</p>
            <div className="mb-1 text-lg font-semibold">
              {cardData?.businessName}
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              {cardData?.businessDescription}
            </p>
          </div>

          {/* Primary Action */}
          <div className="mb-8 flex w-full flex-wrap justify-start gap-4">
            <PrimaryActionTemplate
              primaryActions={cardData?.primaryActions}
              propButtonBg={cardData?.colors?.buttonBg}
              propButtonText={cardData?.colors?.buttonText}
            />
          </div>

          {/* Contact Card */}
          <Card
            className="mb-8 flex w-full border-none shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
            style={{
              color: cardData?.colors?.cardText,
            }}
          >
            <CardHeader className="flex w-[35%] items-center justify-center bg-white p-1">
              <img
                src={cardData?.logoImg}
                alt="logo"
                className="h-auto max-w-[100%] object-cover"
              />
            </CardHeader>
            <CardContent
              className="w-[65%] rounded-r-lg px-2 py-6"
              style={{
                backgroundColor: cardData?.colors?.cardBg,
              }}
            >
              <div className="flex w-full items-center gap-2">
                <MdLocationOn
                  className="h-5 w-5"
                  style={{ color: cardData?.colors?.cardIcon }}
                />
                <p className="w-full">{cardData?.businessAddress}</p>
              </div>

              <div className="mt-3 flex w-full items-center gap-2">
                <IoCallSharp
                  className="h-5 w-5"
                  style={{ color: cardData?.colors?.cardIcon }}
                />
                <p className="w-full">{mobile?.value}</p>
              </div>

              <div className="mt-3 flex w-full items-center gap-2">
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
                  <div className="mt-3 flex w-full items-center gap-2">
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
          <div className="mb-8 flex w-full flex-wrap justify-start gap-4">
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

          <div className="mb-11">
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
        className="absolute bottom-4 left-0 right-0 z-50 mx-auto h-12 max-w-[92%] rounded-lg py-2"
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
                className="h-6 w-6 text-gray-500"
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

          <button
            onClick={() =>
              DownloadVcfTemplate(cardData?._id, cardData?.publicLink)
            }
            type="button"
            className="relative inline-flex flex-grow flex-col items-center px-6 py-3"
          >
            <div
              className="absolute bottom-1 rounded-full border-4 p-3"
              style={{
                backgroundColor: cardData?.colors?.buttonBg,
                borderColor: cardData?.colors?.background,
              }}
            >
              <HiMiniPlusCircle
                className="h-8 w-8"
                style={{ color: cardData?.colors?.buttonText }}
              />
            </div>
            <span className="sr-only">VCF</span>
          </button>

          {/* QR Code */}
          <button
            type="button"
            onClick={handleOpenQrDrawer}
            className="group inline-flex flex-col items-center justify-center rounded-s-full px-5"
          >
            {/* <QrCode className="h-6 w-6" /> style={{color: cardData?.colors?.footerIcon}} */}
            <QrCode
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

          {/* Share */}
          <button
            onClick={() => HandleShareTemplate(cardData?.publicLink)}
            type="button"
            className="group inline-flex flex-col items-center justify-center rounded-e-full px-5"
          >
            <IoShare
              className="h-6 w-6"
              style={{ color: cardData?.colors?.footerIcon }}
            />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default CorporateElegance;

/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

import { QrCode, Share } from "lucide-react";
import Phone from "@/assets/svgs/phone";
import Whatsapp from "@/assets/svgs/whatsapp";
import { FiPlus } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import useStyle from "@/hooks/useStyle";
import { PrimaryAction1 } from "@/buttonsTemplate/PrimaryAction1";
import { SecondaryAction1 } from "@/buttonsTemplate/SecondaryAction1";
import { FeatureTemplate1 } from "@/featureTemplate/FeatureTemplate1";
import { QrCodeDrawerTemplate } from "@/components/modules/templateComponents/QrCodeDrawerTemplate";
import { HandleShareTemplate } from "@/components/modules/templateComponents/HandleShareTemplate";
import { DownloadVcfTemplate } from "@/components/modules/templateComponents/DownloadVcfTemplate";

import Location from "@/assets/svgs/location";
import Mail from "@/assets/svgs/mail";
import Website from "@/assets/svgs/website";
import { Card, CardContent } from "@/components/ui/card";

function ProfessionalEdge({ cardData }) {
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

  return (
    <div
      className={`relative mx-auto flex h-full max-w-[500px] flex-col overflow-hidden ${style.mobileRadius} z-50 font-open`}
      style={{
        backgroundColor: cardData?.colors?.background,
        color: cardData?.colors?.text,
      }}
    >
      <ScrollArea className="mb-10 flex-grow overflow-auto">
        <div className="relative -z-50">
          <img
            src={cardData?.backCoverImg}
            alt="Image"
            className="aspect-[13/6] object-cover"
          />
        </div>
        <div
          className="relative -mt-10 h-auto w-full rounded-t-3xl p-6"
          style={{ backgroundColor: cardData?.colors?.background }}
        >
          <div className="absolute left-1/2 top-0 z-50 -translate-x-1/2 -translate-y-1/2 transform">
            <img
              src={cardData?.profileImg}
              alt="profile"
              className="aspect-square h-32 w-32 rounded-full object-cover"
            />
          </div>

          <div className="mt-14 w-full">
            <h3 className="scroll-m-20 text-center text-xl font-semibold tracking-tight">
              {cardData?.firstName} {cardData?.lastName}
            </h3>
            <p className="text-center text-base">{cardData?.jobTitle}</p>
            <div className="mb-6 text-center text-xl font-semibold">
              {cardData?.businessName}
            </div>
          </div>

          {/* Primary Action */}
          <div className="mb-8 flex w-full flex-wrap justify-center gap-3">
            <PrimaryAction1
              primaryActions={cardData?.primaryActions}
              propButtonBg={cardData?.colors?.buttonBg}
              propButtonText={cardData?.colors?.buttonText}
            />
          </div>

          <div className="flex w-full items-center justify-center">
            <img
              src={cardData?.logoImg}
              alt="logo"
              className="h-auto max-w-[60%] rounded-md bg-transparent object-cover"
            />
          </div>

          <div className="mt-6 flex w-full flex-col gap-[10px] no-underline">
            <div
              className="flex w-full items-center gap-[10px] rounded-[10px] p-4 shadow-lg"
              style={{
                backgroundColor: cardData?.colors?.cardBg,
                color: cardData?.colors?.cardText,
              }}
            >
              <Location
                className="h-6 w-6"
                color={cardData?.colors?.cardIcon}
              />
              <p className="w-full">{cardData?.businessAddress}</p>
            </div>

            <div
              className="flex w-full items-center gap-[10px] rounded-[10px] p-4 shadow-lg"
              style={{
                backgroundColor: cardData?.colors?.cardBg,
                color: cardData?.colors?.cardText,
              }}
            >
              <Phone className="h-6 w-6" color={cardData?.colors?.cardIcon} />
              <p className="w-full">{mobile?.value}</p>
            </div>

            <div
              className="flex w-full items-center gap-[10px] rounded-[10px] p-4 shadow-lg"
              style={{
                backgroundColor: cardData?.colors?.cardBg,
                color: cardData?.colors?.cardText,
              }}
            >
              <Mail className="h-6 w-6" color={cardData?.colors?.cardIcon} />
              <p className="w-full">{email?.value}</p>
            </div>

            {website?.value ? (
              <>
                <div
                  className="flex w-full items-center gap-[10px] rounded-[10px] p-4 shadow-lg"
                  style={{
                    backgroundColor: cardData?.colors?.cardBg,
                    color: cardData?.colors?.cardText,
                  }}
                >
                  <Website
                    className="h-6 w-6"
                    color={cardData?.colors?.cardIcon}
                  />
                  <p className="w-full">{website?.value}</p>
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="mb-8 flex w-full flex-wrap justify-center gap-3">
          <SecondaryAction1 secondaryActions={cardData?.secondaryActions} />
        </div>

        {cardData?.businessDescription && (
          <div className="px-6">
            <Card
              className="border-none bg-transparent shadow-none"
              style={{
                color: cardData?.colors?.text,
              }}
            >
              <CardContent className="px-0 text-justify">
                {cardData.businessDescription}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Feature Section */}
        <div className="px-6">
          <FeatureTemplate1
            sections={cardData?.sections}
            propText={cardData?.colors?.text}
            propFeatureText={cardData?.colors?.featureText}
            propFeatureSeparator={cardData?.colors?.featureSeparator}
          />
        </div>

        <div className="mb-20">
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
              <Link to={import.meta.env.VITE_FRONTEND_URL} target="_blank">
                Carderfly
              </Link>
            </Button>
          </p>
        </div>
      </ScrollArea>

      {/* Footer */}
      <footer
        className="absolute bottom-3 left-0 right-0 z-50 mx-6 rounded-full p-[22px]"
        style={{ backgroundColor: cardData?.colors?.footerBg }}
      >
        <div className="grid h-full w-full grid-cols-5 gap-[10px]">
          {mobile && mobile?.value ? (
            <Link
              target="_blank"
              to={`tel:${mobile.value}`}
              className="inline-flex flex-col items-center justify-center"
            >
              <Phone className="h-6 w-6" color={cardData?.colors?.footerIcon} />
            </Link>
          ) : (
            <button className="inline-flex flex-col items-center justify-center">
              <Phone
                className="h-6 w-6 text-gray-500"
                color={cardData?.colors?.footerIcon}
              />
            </button>
          )}

          {whatsapp && whatsapp.value ? (
            <Link
              target="_blank"
              to={`https://wa.me/${whatsapp.value}`}
              className="inline-flex flex-col items-center justify-center px-5"
            >
              <Whatsapp
                className="h-6 w-6"
                color={cardData?.colors?.footerIcon}
              />
            </Link>
          ) : (
            <button className="inline-flex flex-col items-center justify-center px-5">
              <Whatsapp
                className="h-6 w-6"
                color={cardData?.colors?.footerIcon}
              />
            </button>
          )}

          <div className="h-full w-full">
            <div
              className="absolute left-1/2 top-0 z-50 h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black"
              style={{
                backgroundColor: cardData?.colors?.background,
                border: `solid 6px ${cardData?.colors?.background}`,
              }}
            >
              <button
                type="button"
                onClick={() =>
                  DownloadVcfTemplate(cardData?._id, cardData?.publicLink)
                }
                className="flex h-full w-full items-center justify-center rounded-full bg-transparent"
                style={{ border: `solid 3px ${cardData?.colors?.footerBg}` }}
              >
                <FiPlus
                  className="h-6 w-6"
                  style={{ color: cardData?.colors?.buttonText }}
                />
              </button>
            </div>
          </div>

          {/* Qr Code Drawer */}
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
            buttonTextProp={cardData?.colors?.buttonText / 100}
            textProp={cardData?.colors?.text}
            qrCodeProp={cardData?.colors?.qrCode}
          />

          <button
            onClick={() => HandleShareTemplate(cardData?.publicLink)}
            type="button"
            className="group inline-flex flex-col items-center justify-center rounded-e-full px-5"
          >
            <Share
              className="h-6 w-6"
              style={{ color: cardData?.colors?.footerIcon }}
            />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default ProfessionalEdge;

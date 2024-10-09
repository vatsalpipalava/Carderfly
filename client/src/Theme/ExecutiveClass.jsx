/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Earth,
  LocateIcon,
  MailOpenIcon,
  PhoneIcon,
  PlusIcon,
  QrCodeIcon,
  ShareIcon,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import useStyle from "@/hooks/useStyle";
import { PrimaryActionTemplate } from "@/components/modules/templateComponents/PrimaryActionTemplate";
import { SecondaryActionTemplate } from "@/components/modules/templateComponents/SecondaryActionTemplate";
import { FeatureTemplate3 } from "@/featureTemplate/FeatureTemplate3";
import { QrCodeDrawerTemplate } from "@/components/modules/templateComponents/QrCodeDrawerTemplate";
import { HandleShareTemplate } from "@/components/modules/templateComponents/HandleShareTemplate";
import { DownloadVcfTemplate } from "@/components/modules/templateComponents/DownloadVcfTemplate";

function ExecutiveClass({ cardData }) {
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
      className={`relative mx-auto flex h-full max-w-[500px] flex-col overflow-hidden ${style.mobileRadius}`}
      style={{
        backgroundColor: cardData?.colors?.background,
        color: cardData?.colors?.text,
      }}
    >
      <ScrollArea className="mb-10 flex-grow overflow-auto">
        <div className="relative h-40 overflow-hidden">
          <img
            src={cardData?.backCoverImg}
            alt="Cover Image"
            className="aspect-[13/6] object-cover"
          />
        </div>
        <div className="relative -mt-16 flex items-center justify-center">
          <Avatar
            className="h-24 w-24 border-4"
            style={{ borderColor: cardData?.colors?.background }}
          >
            <AvatarImage src={cardData?.profileImg} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
        {/* <div className="w-full p-6"> */}
        <div className="mt-4 flex flex-col items-center gap-1 px-6 pb-6">
          <div className="text-lg font-medium">
            {cardData?.firstName} {cardData?.lastName}
          </div>
          <div>{cardData?.jobTitle}</div>
          <h2 className="text-lg font-bold">{cardData?.businessName}</h2>

          {/* Primary Action */}
          <div className="mb-4 mt-4 flex w-full flex-wrap justify-center gap-3">
            <PrimaryActionTemplate
              primaryActions={cardData?.primaryActions}
              propButtonBg={cardData?.colors?.buttonBg}
              propButtonText={cardData?.colors?.buttonText}
            />
          </div>

          <Card
            className="mb-4 w-full border-none shadow-none"
            style={{
              backgroundColor: cardData?.colors?.cardBg,
              color: cardData?.colors?.cardText,
            }}
          >
            <CardHeader className="flex items-center justify-center bg-transparent pb-0">
              <img
                src={cardData?.logoImg}
                alt="logo"
                className="h-auto max-w-[60%] rounded-md bg-transparent object-cover"
              />
            </CardHeader>
            <CardContent className="mx-auto flex max-w-80 flex-col items-center gap-2 p-6">
              <div className="flex flex-col items-start gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <LocateIcon
                    className="h-5 min-w-5"
                    style={{ color: cardData?.colors?.cardIcon }}
                  />
                  <span>{cardData?.businessAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon
                    className="h-5 w-5"
                    style={{ color: cardData?.colors?.cardIcon }}
                  />
                  <span>{mobile?.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MailOpenIcon
                    className="h-5 w-5"
                    style={{ color: cardData?.colors?.cardIcon }}
                  />
                  <span>{email?.value}</span>
                </div>
                {website?.value ? (
                  <div className="flex items-center gap-2">
                    <Earth
                      className="h-5 w-5"
                      style={{ color: cardData?.colors?.cardIcon }}
                    />
                    <span>{website?.value}</span>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>

          {/* Secondary Actions */}
          <div className="mb-4 flex w-full flex-wrap justify-center gap-3">
            <SecondaryActionTemplate
              secondaryActions={cardData?.secondaryActions}
            />
          </div>

          {cardData?.businessDescription && (
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
          )}

          <div className="w-full">
            <FeatureTemplate3
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
                <Link to={import.meta.env.VITE_FRONTEND_URL} target="_blank">
                  Carderfly
                </Link>
              </Button>
            </p>
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <footer
        className="absolute bottom-0 left-0 right-0 z-50 flex items-center justify-around rounded-t-xl px-4 py-3 shadow-lg"
        style={{ backgroundColor: cardData?.colors?.footerBg }}
      >
        {mobile && mobile?.value ? (
          <Link
            target="_blank"
            to={`tel:${mobile.value}`}
            className="flex flex-col items-center gap-1 transition"
            style={{ color: cardData?.colors?.footerIcon }}
            prefetch={false}
          >
            <PhoneIcon
              className="h-6 w-6"
              style={{ color: cardData?.colors?.footerIcon }}
            />
            <span className="text-xs">Phone</span>
          </Link>
        ) : (
          <button className="flex flex-col items-center gap-1 transition">
            <PhoneIcon
              className="h-6 w-6"
              style={{ color: cardData?.colors?.footerIcon }}
            />
            <span
              className="text-xs"
              style={{ color: cardData?.colors?.footerIcon }}
            >
              Phone
            </span>
          </button>
        )}

        {whatsapp && whatsapp.value ? (
          <Link
            target="_blank"
            to={`https://wa.me/${whatsapp.value}`}
            className="flex flex-col items-center gap-1 transition"
            style={{ color: cardData?.colors?.footerIcon }}
            prefetch={false}
          >
            <BsWhatsapp
              className="h-6 w-6"
              style={{ color: cardData?.colors?.footerIcon }}
            />
            <span
              className="text-xs"
              style={{ color: cardData?.colors?.footerIcon }}
            >
              Whatsapp
            </span>
          </Link>
        ) : (
          <button className="flex flex-col items-center gap-1 transition">
            <BsWhatsapp
              className="h-6 w-6"
              style={{ color: cardData?.colors?.footerIcon }}
            />
            <span
              className="text-xs"
              style={{ color: cardData?.colors?.footerIcon }}
            >
              Whatsapp
            </span>
          </button>
        )}

        <Button
          size="icon"
          onClick={() =>
            DownloadVcfTemplate(cardData?._id, cardData?.publicLink)
          }
          className="rounded-full"
          style={{ backgroundColor: cardData?.colors?.buttonBg }}
        >
          <PlusIcon
            className="h-6 w-6"
            style={{ color: cardData?.colors?.buttonText }}
          />
          <span
            className="sr-only"
            style={{ color: cardData?.colors?.footerIcon }}
          >
            Add
          </span>
        </Button>

        <button
          type="button"
          onClick={handleOpenQrDrawer}
          className="flex flex-col items-center gap-1 transition"
        >
          <QrCodeIcon
            className="h-6 w-6"
            style={{ color: cardData?.colors?.footerIcon }}
          />
          <span
            className="text-xs"
            style={{ color: cardData?.colors?.footerIcon }}
          >
            QR Code
          </span>
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
          className="flex flex-col items-center gap-1 transition"
        >
          <ShareIcon
            className="h-6 w-6"
            style={{ color: cardData?.colors?.footerIcon }}
          />
          <span
            className="text-xs"
            style={{ color: cardData?.colors?.footerIcon }}
          >
            Share
          </span>
        </button>
      </footer>
    </div>
  );
}

export default ExecutiveClass;

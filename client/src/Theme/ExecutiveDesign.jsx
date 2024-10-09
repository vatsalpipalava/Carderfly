/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

import { Plus, QrCode, Share } from "lucide-react";
import Phone from "@/assets/svgs/phone";
import Whatsapp from "@/assets/svgs/whatsapp";
import Location from "@/assets/svgs/location";
import Mail from "@/assets/svgs/mail";
import Website from "@/assets/svgs/website";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";

import useStyle from "@/hooks/useStyle";
import { PrimaryAction5 } from "@/buttonsTemplate/PrimaryAction5";
import { SecondaryAction4 } from "@/buttonsTemplate/SecondaryAction4";
import { FeatureTemplate4 } from "@/featureTemplate/FeatureTemplate4";
import { QrCodeDrawerTemplate } from "@/components/modules/templateComponents/QrCodeDrawerTemplate";
import { HandleShareTemplate } from "@/components/modules/templateComponents/HandleShareTemplate";
import { DownloadVcfTemplate } from "@/components/modules/templateComponents/DownloadVcfTemplate";

function ExecutiveDesign({ cardData }) {
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
      className={`relative mx-auto flex h-full max-w-[500px] flex-col overflow-hidden ${style.mobileRadius} z-50`}
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
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0 100%)",
            }}
          />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
            <img
              src={cardData?.profileImg}
              alt="profile"
              className="aspect-square h-36 w-36 rounded-3xl object-cover shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>

        <div className="w-full px-5">
          <div className="flex flex-col gap-1 py-5">
            <h3 className="scroll-m-20 text-center text-xl font-medium tracking-tight">
              {cardData?.firstName} {cardData?.lastName}
            </h3>
            <p className="text-center text-base italic">{cardData?.jobTitle}</p>
            <div className="text-center text-xl font-medium">
              {cardData?.businessName}
            </div>
          </div>

          {/* Primary Action */}
          <div className="mb-5 flex w-full flex-wrap justify-center gap-3">
            <PrimaryAction5
              primaryActions={cardData?.primaryActions}
              propButtonBg={cardData?.colors?.buttonBg}
              propButtonText={cardData?.colors?.buttonText}
            />
          </div>

          <Card
            className="mb-5 rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)]"
            style={{
              border: `solid 1px ${cardData?.colors?.cardText}30`,
              backgroundColor: cardData?.colors?.cardBg,
              color: cardData?.colors?.cardText,
            }}
          >
            <CardHeader className="flex items-center justify-center bg-transparent">
              <img
                src={cardData?.logoImg}
                alt="logo"
                className="h-auto max-w-[60%] rounded-md bg-transparent object-cover"
              />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Location
                  className="min-h-6 min-w-6"
                  color={cardData?.colors?.cardIcon}
                />
                <p className="text-base font-normal">
                  {cardData?.businessAddress}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Phone
                  className="min-h-6 min-w-6"
                  color={cardData?.colors?.cardIcon}
                />
                <p className="text-base font-normal">{mobile?.value}</p>
              </div>

              <div className="flex items-center gap-4">
                <Mail
                  className="min-h-6 min-w-6"
                  color={cardData?.colors?.cardIcon}
                />
                <p className="text-base font-normal">{email?.value}</p>
              </div>
              {website?.value ? (
                <div className="flex items-center gap-4">
                  <Website
                    className="min-h-6 min-w-6"
                    color={cardData?.colors?.cardIcon}
                  />
                  <p className="text-base font-normal">{website?.value}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Secondary Actions */}
          {cardData?.secondaryActions.length === 0 ? null : (
            <div className="flex w-full flex-wrap justify-center gap-3 pb-6">
              <SecondaryAction4 secondaryActions={cardData?.secondaryActions} />
            </div>
          )}

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

          {/* Feature Section */}
          <div>
            <FeatureTemplate4
              sections={cardData?.sections}
              propText={cardData?.colors?.text}
              propFeatureText={cardData?.colors?.featureText}
              propFeatureSeparator={cardData?.colors?.featureSeparator}
            />
          </div>

          <div className="mb-12">
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
        className="absolute bottom-0 left-0 right-0 z-50 mx-0 rounded-none px-0 py-3"
        style={{
          backgroundColor: cardData?.colors?.footerBg,
          borderTop: `solid 1px ${cardData?.colors?.footerIcon}`,
        }}
      >
        <div className="flex h-full w-full items-center justify-evenly">
          {mobile && mobile.value ? (
            <Button
              className="h-auto w-auto flex-col gap-1 rounded-full bg-transparent hover:bg-transparent"
              size="icon"
              asChild
            >
              <Link target="_blank" to={`tel:${mobile.value}`}>
                <Phone
                  className="min-h-5 min-w-5"
                  color={cardData?.colors?.footerIcon}
                />
                <span
                  className="text-[12px] font-normal"
                  style={{ color: cardData?.colors?.footerIcon }}
                >
                  Call
                </span>
              </Link>
            </Button>
          ) : (
            <Button
              className="h-auto w-auto flex-col gap-1 rounded-none bg-transparent hover:bg-transparent"
              size="icon"
            >
              <Phone
                className="min-h-5 min-w-5"
                color={cardData?.colors?.footerIcon}
              />
              <span
                className="text-[12px] font-normal"
                style={{ color: cardData?.colors?.footerIcon }}
              >
                Call
              </span>
            </Button>
          )}

          {whatsapp && whatsapp.value ? (
            <Button
              className="h-auto w-auto flex-col gap-1 rounded-full bg-transparent hover:bg-transparent"
              size="icon"
              asChild
            >
              <Link target="_blank" to={`https://wa.me/${whatsapp.value}`}>
                <Whatsapp
                  className="min-h-5 min-w-5"
                  color={cardData?.colors?.footerIcon}
                />
                <span
                  className="text-[12px] font-normal"
                  style={{ color: cardData?.colors?.footerIcon }}
                >
                  Whatsapp
                </span>
              </Link>
            </Button>
          ) : (
            <Button
              className="h-auto w-auto flex-col gap-1 rounded-none bg-transparent hover:bg-transparent"
              size="icon"
            >
              <Whatsapp
                className="min-h-5 min-w-5"
                color={cardData?.colors?.footerIcon}
              />
              <span
                className="text-[12px] font-normal"
                style={{ color: cardData?.colors?.footerIcon }}
              >
                Whatsapp
              </span>
            </Button>
          )}

          <Button
            size="icon"
            className="h-12 w-12 rounded-full"
            style={{ backgroundColor: cardData?.colors?.buttonBg }}
            onClick={() =>
              DownloadVcfTemplate(cardData?._id, cardData?.publicLink)
            }
          >
            <Plus
              className="min-h-6 min-w-6"
              color={cardData?.colors?.buttonText}
            />
          </Button>

          <Button
            className="h-auto w-auto flex-col gap-1 rounded-none bg-transparent hover:bg-transparent"
            onClick={handleOpenQrDrawer}
            size="icon"
          >
            <QrCode
              className="min-h-5 min-w-5"
              color={cardData?.colors?.footerIcon}
            />
            <span
              className="text-[12px] font-normal"
              style={{ color: cardData?.colors?.footerIcon }}
            >
              QR Code
            </span>
          </Button>
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

          <Button
            className="h-auto w-auto flex-col gap-1 rounded-none bg-transparent hover:bg-transparent"
            onClick={() => HandleShareTemplate(cardData?.publicLink)}
            size="icon"
          >
            <Share
              className="min-h-5 min-w-5"
              color={cardData?.colors?.footerIcon}
            />
            <span
              className="text-[12px] font-normal"
              style={{ color: cardData?.colors?.footerIcon }}
            >
              Share
            </span>
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default ExecutiveDesign;

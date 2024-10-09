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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";

import useStyle from "@/hooks/useStyle";
import { PrimaryAction5 } from "@/buttonsTemplate/PrimaryAction5";
import { SecondaryAction4 } from "@/buttonsTemplate/SecondaryAction4";
import { FeatureTemplate3 } from "@/featureTemplate/FeatureTemplate3";
import { QrCodeDrawerTemplate } from "@/components/modules/templateComponents/QrCodeDrawerTemplate";
import { HandleShareTemplate } from "@/components/modules/templateComponents/HandleShareTemplate";
import { DownloadVcfTemplate } from "@/components/modules/templateComponents/DownloadVcfTemplate";

function PrimeEssentials({ cardData }) {
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
      className={`relative mx-auto flex h-full max-w-[500px] flex-col overflow-hidden ${style.mobileRadius} z-50 font-inter`}
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
          <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 transform">
            <div
              className="aspect-square h-[124px] w-[124px] rounded-full bg-transparent"
              style={{ border: `solid 1px ${cardData?.colors?.text}` }}
            ></div>
          </div>
          <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 transform">
            <div
              className="aspect-square h-[118px] w-[118px] rounded-full bg-transparent"
              style={{ border: `solid 1px ${cardData?.colors?.text}` }}
            ></div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
            <img
              src={cardData?.profileImg}
              alt="profile"
              className="aspect-square h-36 w-36 rounded-full object-cover"
              style={{ border: `solid 14px ${cardData?.colors.background}` }}
            />
          </div>
        </div>

        <Card
          className="-mt-16 border-none pt-14 shadow-[-24px_4px_10px_0px_rgba(0,0,0,0.15)]"
          style={{
            backgroundColor: cardData?.colors?.background,
            color: cardData?.colors?.text,
          }}
        >
          <CardContent className="flex flex-col gap-1 px-6 pb-4 pt-6">
            <h3 className="scroll-m-20 text-center text-xl font-medium tracking-tight">
              {cardData?.firstName} {cardData?.lastName}
            </h3>
            <p className="text-center text-base italic">{cardData?.jobTitle}</p>
            <div className="text-center text-xl font-medium">
              {cardData?.businessName}
            </div>
          </CardContent>
          <CardFooter>
            {/* Primary Action */}
            <div className="flex w-full flex-wrap justify-center gap-3">
              <PrimaryAction5
                primaryActions={cardData?.primaryActions}
                propButtonBg={cardData?.colors?.buttonBg}
                propButtonText={cardData?.colors?.buttonText}
              />
            </div>
          </CardFooter>
        </Card>
        <div className="w-full px-5">
          <Card
            className="mb-7 mt-5 border-none shadow-lg"
            style={{
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
              <div
                className="h-[1px] w-full"
                style={{
                  background: `linear-gradient(to right, ${cardData?.colors?.cardText}00 0%, ${cardData?.colors?.cardText} 40%, ${cardData?.colors?.cardText} 75%, ${cardData?.colors?.cardText}00 100%)`,
                }}
              ></div>
              <div className="flex items-center gap-4">
                <Phone
                  className="min-h-6 min-w-6"
                  color={cardData?.colors?.cardIcon}
                />
                <p className="text-base font-normal">{mobile?.value}</p>
              </div>
              <div
                className="h-[1px] w-full"
                style={{
                  background: `linear-gradient(to right, ${cardData?.colors?.cardText}00 0%, ${cardData?.colors?.cardText} 40%, ${cardData?.colors?.cardText} 75%, ${cardData?.colors?.cardText}00 100%)`,
                }}
              ></div>
              <div className="flex items-center gap-4">
                <Mail
                  className="min-h-6 min-w-6"
                  color={cardData?.colors?.cardIcon}
                />
                <p className="text-base font-normal">{email?.value}</p>
              </div>
              {website?.value ? (
                <>
                  <div
                    className="h-[1px] w-full"
                    style={{
                      background: `linear-gradient(to right, ${cardData?.colors?.cardText}00 0%, ${cardData?.colors?.cardText} 40%, ${cardData?.colors?.cardText} 75%, ${cardData?.colors?.cardText}00 100%)`,
                    }}
                  ></div>
                  <div className="flex items-center gap-4">
                    <Website
                      className="min-h-6 min-w-6"
                      color={cardData?.colors?.cardIcon}
                    />
                    <p className="text-base font-normal">{website?.value}</p>
                  </div>
                </>
              ) : null}
            </CardContent>

            {/* Secondary Actions */}
            {cardData?.secondaryActions.length === 0 ? null : (
              <CardFooter>
                <div className="flex w-full flex-wrap justify-center gap-3">
                  <SecondaryAction4
                    secondaryActions={cardData?.secondaryActions}
                  />
                </div>
              </CardFooter>
            )}
          </Card>

          {cardData?.businessDescription && (
            <Card
              className="border-none bg-transparent pt-2 shadow-none"
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
            <FeatureTemplate3
              sections={cardData?.sections}
              propText={cardData?.colors?.text}
              propFeatureText={cardData?.colors?.featureText}
              propFeatureSeparator={cardData?.colors?.featureSeparator}
            />
          </div>

          <div className="mb-14">
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
        className="absolute bottom-4 left-0 right-0 z-50 mx-5 rounded-full"
        style={{ backgroundColor: cardData?.colors?.footerBg }}
      >
        <div className="flex h-full w-full items-center justify-between rounded-full p-2 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)]">
          {mobile && mobile?.value ? (
            <Button
              className="h-12 w-auto rounded-full"
              asChild
              style={{ backgroundColor: cardData?.colors?.buttonBg }}
            >
              <Link target="_blank" to={`tel:${mobile.value}`}>
                <Phone
                  className="mr-2 min-h-5 min-w-5"
                  color={cardData?.colors?.buttonText}
                />
                Call
              </Link>
            </Button>
          ) : (
            <Button
              className="h-12 w-auto rounded-full"
              style={{ backgroundColor: cardData?.colors?.buttonBg }}
            >
              <Phone
                className="mr-2 min-h-5 min-w-5"
                color={cardData?.colors?.buttonText}
              />
              Call
            </Button>
          )}

          {whatsapp && whatsapp.value ? (
            <Button
              className="rounded-full bg-transparent hover:bg-transparent"
              size="icon"
              asChild
            >
              <Link target="_blank" to={`https://wa.me/${whatsapp.value}`}>
                <Whatsapp
                  className="min-h-5 min-w-5"
                  color={cardData?.colors?.footerIcon}
                />
              </Link>
            </Button>
          ) : (
            <Button
              className="rounded-full bg-transparent hover:bg-transparent"
              size="icon"
            >
              <Whatsapp
                className="min-h-5 min-w-5"
                color={cardData?.colors?.footerIcon}
              />
            </Button>
          )}

          <Button
            size="icon"
            className="rounded-full bg-transparent hover:bg-transparent"
            onClick={() =>
              DownloadVcfTemplate(cardData?._id, cardData?.publicLink)
            }
          >
            <Plus
              className="min-h-6 min-w-6"
              color={cardData?.colors?.footerIcon}
            />
          </Button>

          <Button
            className="rounded-full bg-transparent hover:bg-transparent"
            onClick={handleOpenQrDrawer}
            size="icon"
          >
            <QrCode
              className="min-h-5 min-w-5"
              color={cardData?.colors?.footerIcon}
            />
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
            className="rounded-full bg-transparent hover:bg-transparent"
            onClick={() => HandleShareTemplate(cardData?.publicLink)}
            size="icon"
          >
            <Share
              className="min-h-5 min-w-5"
              color={cardData?.colors?.footerIcon}
            />
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default PrimeEssentials;

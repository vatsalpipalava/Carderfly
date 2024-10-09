/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

import { MapPin, Plus, QrCode, Share } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import useStyle from "@/hooks/useStyle";
import { PrimaryActionTemplate } from "@/components/modules/templateComponents/PrimaryActionTemplate";
import { FeatureContentTemplate } from "@/components/modules/templateComponents/FeatureContentTemplate";
import { SecondaryActionTemplate } from "@/components/modules/templateComponents/SecondaryActionTemplate";
import { QrCodeDrawerTemplate } from "@/components/modules/templateComponents/QrCodeDrawerTemplate";
import { HandleShareTemplate } from "@/components/modules/templateComponents/HandleShareTemplate";
import { DownloadVcfTemplate } from "@/components/modules/templateComponents/DownloadVcfTemplate";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImWhatsapp } from "react-icons/im";
import Location from "@/assets/svgs/location";
import Phone from "@/assets/svgs/phone";
import Website from "@/assets/svgs/website";
import Mail from "@/assets/svgs/mail";

function BusinessPrime({ cardData }) {
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
  const location = cardData.primaryActions.find(
    (action) => action._id === "location"
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
            // src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjU0NmJhdGNoMy1teW50LTM0LWJhZGdld2F0ZXJjb2xvcl8xLmpwZw.jpg"
            src={cardData?.backCoverImg}
            alt="Cover Image"
            className="aspect-[13/6] object-cover"
          />
        </div>
        <div className="relative -mt-16 flex items-center justify-center">
          <Avatar
            className="h-[125px] w-[125px] rounded-[18px] border-[7px]"
            style={{ borderColor: cardData?.colors?.background }}
          >
            <AvatarImage src={cardData?.profileImg} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>

        <div className="mt-1 flex flex-col items-center gap-2 px-6">
          <div>
            <div className="text-center text-2xl font-bold">
              {cardData?.firstName} {cardData?.lastName}
            </div>
            <div className="text-center text-base italic">
              {cardData?.jobTitle}
            </div>
            <div className="text-center text-lg font-semibold">
              {cardData?.businessName}
            </div>
          </div>

          {/* Primary Action */}
          <div className="mb-4 mt-2 flex w-full flex-wrap justify-center gap-3">
            <PrimaryActionTemplate
              primaryActions={cardData?.primaryActions}
              propButtonBg={cardData?.colors?.buttonBg}
              propButtonText={cardData?.colors?.buttonText}
            />
          </div>

          <Card
            className="mb-4 border-none shadow-lg"
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
              <div className="mt-3 flex w-full items-center gap-4">
                <Location
                  className="h-6 w-6"
                  color={cardData?.colors?.cardIcon}
                />
                <p className="w-full">{cardData?.businessAddress}</p>
              </div>

              <div className="mt-3 flex w-full items-center gap-4">
                <Phone className="h-6 w-6" color={cardData?.colors?.cardIcon} />
                <p className="w-full">{mobile?.value}</p>
              </div>

              <div className="mt-3 flex w-full items-center gap-4">
                <Mail className="h-6 w-6" color={cardData?.colors?.cardIcon} />
                <p className="w-full">{email?.value}</p>
              </div>

              {website?.value ? (
                <div className="mt-3 flex w-full items-center gap-4">
                  <Website
                    className="h-6 w-6"
                    color={cardData?.colors?.cardIcon}
                  />
                  <p className="w-full">{website?.value}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Secondary Actions */}
          <div className="mb-4 flex w-full flex-wrap justify-center gap-3">
            <SecondaryActionTemplate
              secondaryActions={cardData?.secondaryActions}
            />
          </div>

          {cardData?.businessDescription && (
            <div>
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
          <div>
            <FeatureContentTemplate
              sections={cardData?.sections}
              propText={cardData?.colors?.text}
              propFeatureText={cardData?.colors?.featureText}
              propFeatureSeparator={cardData?.colors?.featureSeparator}
            />
          </div>

          <div className="mb-16">
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
        className="absolute bottom-0 left-0 right-0 z-50 mx-auto w-full py-4"
        style={{ backgroundColor: cardData?.colors?.footerBg }}
      >
        <div className="w-full">
          <div
            className="mx-auto mb-4 mt-0 grid max-w-xs grid-cols-3 gap-1 rounded-lg p-1"
            role="group"
          >
            {mobile && mobile.value ? (
              <a
                href={`tel:${mobile.value}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg px-5 py-1.5 text-center text-xs font-medium"
                style={{
                  backgroundColor: cardData?.colors?.buttonBg,
                  color: cardData?.colors?.buttonText,
                }}
              >
                Mobile
              </a>
            ) : (
              <button
                className="rounded-lg px-5 py-1.5 text-center text-xs font-medium"
                style={{
                  backgroundColor: cardData?.colors?.buttonBg,
                  color: cardData?.colors?.buttonText,
                }}
              >
                Mobile
              </button>
            )}
            {email && email.value ? (
              <a
                href={`mailto:${email.value}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg px-5 py-1.5 text-center text-xs font-medium"
                style={{
                  backgroundColor: cardData?.colors?.buttonBg,
                  color: cardData?.colors?.buttonText,
                }}
              >
                Email
              </a>
            ) : (
              <button
                className="rounded-lg px-5 py-1.5 text-center text-xs font-medium"
                style={{
                  backgroundColor: cardData?.colors?.buttonBg,
                  color: cardData?.colors?.buttonText,
                }}
              >
                Email
              </button>
            )}
            {website && website.value ? (
              <a
                href={`${website.value}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg px-5 py-1.5 text-center text-xs font-medium"
                style={{
                  backgroundColor: cardData?.colors?.buttonBg,
                  color: cardData?.colors?.buttonText,
                }}
              >
                Website
              </a>
            ) : (
              <button
                type="button"
                className="rounded-lg px-5 py-1.5 text-center text-xs font-medium"
                style={{
                  backgroundColor: cardData?.colors?.buttonBg,
                  color: cardData?.colors?.buttonText,
                }}
              >
                Website
              </button>
            )}
          </div>
        </div>

        <div className="mx-auto grid h-full w-full max-w-[90%] grid-cols-5">
          {location && location?.value ? (
            <Link
              target="_blank"
              to={`${location.value}`}
              className="inline-flex flex-col items-center justify-center px-5"
            >
              <MapPin
                className="h-5 w-5"
                style={{ color: cardData?.colors?.footerIcon }}
              />
            </Link>
          ) : (
            <button className="inline-flex flex-col items-center justify-center px-5">
              <MapPin
                className="h-5 w-5 text-gray-500"
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
              <ImWhatsapp
                className="h-5 w-5"
                style={{ color: cardData?.colors?.footerIcon }}
              />
            </Link>
          ) : (
            <button className="inline-flex flex-col items-center justify-center px-5">
              <ImWhatsapp
                className="h-5 w-5"
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
              className="inline-flex flex-col items-center justify-center px-5"
            >
              <Plus
                className="h-7 w-7"
                style={{ color: cardData?.colors?.footerIcon }}
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
            <QrCode
              className="h-5 w-5"
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
            <Share
              className="h-5 w-5"
              style={{ color: cardData?.colors?.footerIcon }}
            />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default BusinessPrime;

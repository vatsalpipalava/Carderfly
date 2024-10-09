/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

import { QrCode, Share } from "lucide-react";
import { FiPlus } from "react-icons/fi";
import Phone from "@/assets/svgs/phone";
import Whatsapp from "@/assets/svgs/whatsapp";
import Location from "@/assets/svgs/location";
import Mail from "@/assets/svgs/mail";
import Website from "@/assets/svgs/website";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import useStyle from "@/hooks/useStyle";
import { QrCodeDrawerTemplate } from "@/components/modules/templateComponents/QrCodeDrawerTemplate";
import { HandleShareTemplate } from "@/components/modules/templateComponents/HandleShareTemplate";
import { DownloadVcfTemplate } from "@/components/modules/templateComponents/DownloadVcfTemplate";

import { PrimaryAction3 } from "@/buttonsTemplate/PrimaryAction3";
import { SecondaryAction3 } from "@/buttonsTemplate/SecondaryAction3";
import { FeatureTemplate3 } from "@/featureTemplate/FeatureTemplate3";

function EliteNetworker({ cardData }) {
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
      className={`relative mx-auto flex h-full max-w-[500px] flex-col overflow-hidden ${style.mobileRadius} z-50 font-laila`}
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
            className="aspect-[13/6] rounded-b-3xl object-cover"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
            <div
              className="aspect-square h-[8.5rem] w-[8.5rem] rounded-full bg-transparent"
              style={{ border: `solid 1px ${cardData?.colors?.text}` }}
            ></div>
          </div>

          <div className="absolute bottom-[2.7px] left-[49%] -translate-x-1/2 translate-y-1/2 transform">
            <div
              className="aspect-square h-[8.5rem] w-[8.5rem] rounded-full bg-transparent"
              style={{ border: `solid 1px ${cardData?.colors?.text}` }}
            ></div>
          </div>

          <div className="absolute -bottom-[2.2px] left-[49.5%] -translate-x-1/2 translate-y-1/2 transform">
            <div
              className="aspect-square h-[8.5rem] w-[8.5rem] rounded-full bg-transparent"
              style={{ border: `solid 1px ${cardData?.colors?.text}` }}
            ></div>
          </div>

          <div className="absolute bottom-[3.5px] left-[51%] -translate-x-1/2 translate-y-1/2 transform">
            <div
              className="aspect-square h-[8.5rem] w-[8.5rem] rounded-full bg-transparent"
              style={{ border: `solid 1px ${cardData?.colors?.text}` }}
            ></div>
          </div>

          <div className="absolute -bottom-[3px] left-[51.5%] -translate-x-1/2 translate-y-1/2 transform">
            <div
              className="aspect-square h-[8.5rem] w-[8.5rem] rounded-full bg-transparent"
              style={{ border: `solid 1px ${cardData?.colors?.text}` }}
            ></div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
            <img
              src={cardData?.profileImg}
              alt="profile"
              className="aspect-square h-32 w-32 rounded-full object-cover"
            />
          </div>
        </div>
        <div className="w-full py-6">
          <div className="w-full px-6">
            <h3 className="croll-m-20 text-center text-[22px] font-medium tracking-tight">
              {cardData?.firstName} {cardData?.lastName}
            </h3>
            <p className="text-center text-base italic">{cardData?.jobTitle}</p>
            <div className="mb-4 text-center text-[22px] font-medium">
              {cardData?.businessName}
            </div>
          </div>

          {/* Primary Action */}
          <div className="flex w-full flex-wrap justify-center gap-3 px-6">
            <PrimaryAction3
              primaryActions={cardData?.primaryActions}
              propButtonBg={cardData?.colors?.buttonBg}
              propButtonText={cardData?.colors?.buttonText}
            />
          </div>

          <div className="px-6">
            <div
              className="mb-4 mt-6 h-[1px] w-full"
              style={{
                background: `linear-gradient(to right, ${cardData?.colors?.text}00 0%, ${cardData?.colors?.text} 40%, ${cardData?.colors?.text} 75%, ${cardData?.colors?.text}00 100%)`,
              }}
            ></div>
          </div>

          <Card
            className="mb-4 rounded-none border-none p-6 shadow-none"
            style={{
              backgroundColor: cardData?.colors?.cardBg,
              color: cardData?.colors?.cardText,
            }}
          >
            <CardHeader className="flex items-center justify-center bg-transparent px-4 pb-2 pt-0">
              <img
                src={cardData?.logoImg}
                alt="logo"
                className="h-auto max-w-[65%] rounded-md bg-transparent object-cover"
              />
            </CardHeader>

            <CardContent className="mt-5 flex flex-col items-center justify-start gap-3 p-0">
              <div className="flex w-full items-center gap-4">
                <div
                  className="flex min-h-10 min-w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: cardData?.colors?.buttonBg }}
                >
                  <Location
                    className="h-5 w-5"
                    color={cardData?.colors?.cardIcon}
                  />
                </div>
                <p className="w-full">{cardData?.businessAddress}</p>
              </div>
              <div className="flex w-full items-center gap-4">
                <div
                  className="flex min-h-10 min-w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: cardData?.colors?.buttonBg }}
                >
                  <Phone
                    className="h-5 w-5"
                    color={cardData?.colors?.cardIcon}
                  />
                </div>
                <p className="w-full">{mobile?.value}</p>
              </div>
              <div className="flex w-full items-center gap-4">
                <div
                  className="flex min-h-10 min-w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: cardData?.colors?.buttonBg }}
                >
                  <Mail
                    className="h-5 w-5"
                    color={cardData?.colors?.cardIcon}
                  />
                </div>
                <p className="w-full">{email?.value}</p>
              </div>

              {website?.value ? (
                <div className="flex w-full items-center gap-4">
                  <div
                    className="flex min-h-10 min-w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: cardData?.colors?.buttonBg }}
                  >
                    <Website
                      className="h-5 w-5"
                      color={cardData?.colors?.cardIcon}
                    />
                  </div>
                  <p className="w-full">{website?.value}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Secondary Actions */}
          {cardData?.secondaryActions.length === 0 ? null : (
            <div className="mb-6 flex w-full flex-wrap justify-center gap-3 px-6">
              <SecondaryAction3 secondaryActions={cardData?.secondaryActions} />
            </div>
          )}

          <div className="px-6">
            <div
              className="mb-6 mt-4 h-[1px] w-full"
              style={{
                background: `linear-gradient(to right, ${cardData?.colors?.text}00 0%, ${cardData?.colors?.text} 40%, ${cardData?.colors?.text} 75%, ${cardData?.colors?.text}00 100%)`,
              }}
            ></div>
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
            <FeatureTemplate3
              sections={cardData?.sections}
              propText={cardData?.colors?.text}
              propFeatureText={cardData?.colors?.featureText}
              propFeatureSeparator={cardData?.colors?.featureSeparator}
            />
          </div>

          <div className="mb-9">
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

      <footer
        className="absolute bottom-4 left-0 right-0 z-50 mx-6 rounded-full p-2"
        style={{ backgroundColor: cardData?.colors?.footerBg }}
      >
        <div className="flex items-center justify-between">
          {mobile && mobile?.value ? (
            <Button
              asChild
              size="icon"
              className="min-h-[52px] min-w-[52px] rounded-full bg-transparent hover:bg-transparent"
              style={{ border: `solid 0.6px ${cardData?.colors?.footerIcon}` }}
            >
              <Link target="_blank" to={`tel:${mobile.value}`}>
                <Phone
                  className="h-6 w-6"
                  color={cardData?.colors?.footerIcon}
                />
              </Link>
            </Button>
          ) : (
            <Button
              size="icon"
              className="min-h-[52px] min-w-[52px] rounded-full bg-transparent hover:bg-transparent"
              style={{ border: `solid 0.6px ${cardData?.colors?.footerIcon}` }}
            >
              <Phone className="h-6 w-6" color={cardData?.colors?.footerIcon} />
            </Button>
          )}

          {whatsapp && whatsapp.value ? (
            <Button
              asChild
              size="icon"
              className="min-h-[52px] min-w-[52px] rounded-full bg-transparent hover:bg-transparent"
              style={{ border: `solid 0.6px ${cardData?.colors?.footerIcon}` }}
            >
              <Link target="_blank" to={`https://wa.me/${whatsapp.value}`}>
                <Whatsapp
                  className="h-6 w-6"
                  color={cardData?.colors?.footerIcon}
                />
              </Link>
            </Button>
          ) : (
            <Button
              size="icon"
              className="min-h-[52px] min-w-[52px] rounded-full bg-transparent hover:bg-transparent"
              style={{ border: `solid 0.6px ${cardData?.colors?.footerIcon}` }}
            >
              <Whatsapp
                className="h-6 w-6"
                color={cardData?.colors?.footerIcon}
              />
            </Button>
          )}

          <Button
            size="icon"
            onClick={() =>
              DownloadVcfTemplate(cardData?._id, cardData?.publicLink)
            }
            className="min-h-[52px] min-w-[52px] rounded-full bg-transparent hover:bg-transparent"
            style={{ border: `solid 0.6px ${cardData?.colors?.footerIcon}` }}
          >
            <FiPlus className="h-6 w-6" color={cardData?.colors?.footerIcon} />
          </Button>

          {/* Qr Code Drawer */}
          <Button
            onClick={handleOpenQrDrawer}
            size="icon"
            className="min-h-[52px] min-w-[52px] rounded-full bg-transparent hover:bg-transparent"
            style={{ border: `solid 0.6px ${cardData?.colors?.footerIcon}` }}
          >
            <QrCode className="h-6 w-6" color={cardData?.colors?.footerIcon} />
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
            onClick={() => HandleShareTemplate(cardData?.publicLink)}
            size="icon"
            className="min-h-[52px] min-w-[52px] rounded-full bg-transparent hover:bg-transparent"
            style={{ border: `solid 0.6px ${cardData?.colors?.footerIcon}` }}
          >
            <Share className="h-6 w-6" color={cardData?.colors?.footerIcon} />
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default EliteNetworker;

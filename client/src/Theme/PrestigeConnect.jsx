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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import useStyle from "@/hooks/useStyle";
import { PrimaryAction2 } from "@/buttonsTemplate/PrimaryAction2";
import { SecondaryAction2 } from "@/buttonsTemplate/SecondaryAction2";
import { FeatureTemplate2 } from "@/featureTemplate/FeatureTemplate2";
import { QrCodeDrawerTemplate } from "@/components/modules/templateComponents/QrCodeDrawerTemplate";
import { HandleShareTemplate } from "@/components/modules/templateComponents/HandleShareTemplate";
import { DownloadVcfTemplate } from "@/components/modules/templateComponents/DownloadVcfTemplate";

function PrestigeConnect({ cardData }) {
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
      className={`relative mx-auto flex h-full max-w-[500px] flex-col overflow-hidden ${style.mobileRadius} z-50 font-montserrat`}
      style={{
        backgroundColor: cardData?.colors?.background,
        color: cardData?.colors?.text,
      }}
    >
      <ScrollArea className="mb-10 flex-grow overflow-auto">
        <div className="relative -z-10">
          <img
            src={cardData?.backCoverImg}
            alt="Image"
            className="aspect-[13/6] object-cover"
          />
        </div>
        <div className="flex h-auto w-full flex-col gap-4 p-4">
          <Card
            className="relative z-50 -mt-16 h-auto w-full rounded-2xl border-none p-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.16)]"
            style={{
              backgroundColor: cardData?.colors?.cardBg,
              color: cardData?.colors?.cardText,
            }}
          >
            <div className="absolute left-1/2 top-0 z-50 -translate-x-1/2 -translate-y-1/2 transform">
              <img
                src={cardData?.profileImg}
                alt="profile"
                className="aspect-square h-32 w-32 rounded-full object-cover"
              />
            </div>

            <div className="relative mt-[68px] w-full">
              <h3 className="scroll-m-20 text-center text-xl font-medium tracking-tight">
                {cardData?.firstName} {cardData?.lastName}
              </h3>
              <p className="text-center text-base">{cardData?.jobTitle}</p>
              <div className="mb-[15px] text-center text-xl font-medium">
                {cardData?.businessName}
              </div>
            </div>

            {/* Primary Action */}
            <div className="flex w-full flex-wrap justify-center gap-3">
              <PrimaryAction2
                primaryActions={cardData?.primaryActions}
                propButtonBg={cardData?.colors?.buttonBg}
                propButtonText={cardData?.colors?.buttonText}
              />
            </div>
          </Card>

          <Card
            className="h-full w-full rounded-2xl border-none shadow-[0px_4px_20px_0px_rgba(0,0,0,0.16)]"
            style={{
              backgroundColor: cardData?.colors?.cardBg,
              color: cardData?.colors?.cardText,
            }}
          >
            <CardHeader className="flex items-center justify-center bg-transparent px-4 pb-4 pt-8">
              <img
                src={cardData?.logoImg}
                alt="logo"
                className="h-auto max-w-[65%] rounded-md bg-transparent object-cover"
              />
            </CardHeader>

            <CardContent className="flex flex-col gap-[15px] px-4 pb-4 pt-4">
              <div className="flex w-full items-center gap-4">
                <div
                  className="relative flex min-h-12 min-w-12 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: cardData?.colors?.buttonBg,
                    border: `solid 6px ${cardData?.colors?.buttonBg}`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute h-[42px] w-[42px] rounded-full bg-[#0000000d]"></div>
                  </div>
                  <span className="relative z-10">
                    <Location
                      className="h-6 w-6"
                      color={cardData?.colors?.cardIcon}
                    />
                  </span>
                </div>
                <p className="w-full">{cardData?.businessAddress}</p>
              </div>

              <div className="flex w-full items-center gap-4">
                <div
                  className="relative flex min-h-12 min-w-12 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: cardData?.colors?.buttonBg,
                    border: `solid 6px ${cardData?.colors?.buttonBg}`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute h-[42px] w-[42px] rounded-full bg-[#0000000d]"></div>
                  </div>
                  <span className="relative z-10">
                    <Phone
                      className="h-6 w-6"
                      color={cardData?.colors?.cardIcon}
                    />
                  </span>
                </div>
                <p className="w-full">{mobile?.value}</p>
              </div>

              <div className="flex w-full items-center gap-4">
                <div
                  className="relative flex min-h-12 min-w-12 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: cardData?.colors?.buttonBg,
                    border: `solid 6px ${cardData?.colors?.buttonBg}`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute h-[42px] w-[42px] rounded-full bg-[#0000000d]"></div>
                  </div>
                  <span className="relative z-10">
                    <Mail
                      className="h-6 w-6"
                      color={cardData?.colors?.cardIcon}
                    />
                  </span>
                </div>
                <p className="w-full">{email?.value}</p>
              </div>

              {website?.value ? (
                <div className="flex w-full items-center gap-4">
                  <div
                    className="relative flex min-h-12 min-w-12 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: cardData?.colors?.buttonBg,
                      border: `solid 6px ${cardData?.colors?.buttonBg}`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute h-[42px] w-[42px] rounded-full bg-[#0000000d]"></div>
                    </div>
                    <span className="relative z-10">
                      <Website
                        className="h-6 w-6"
                        color={cardData?.colors?.cardIcon}
                      />
                    </span>
                  </div>
                  <p className="w-full">{website?.value}</p>
                </div>
              ) : null}
            </CardContent>

            {/* Secondary Actions */}
            {cardData?.secondaryActions.length === 0 ? null : (
              <CardFooter className="px-4 pb-6 pt-4">
                <div className="flex w-full flex-wrap justify-center gap-3">
                  <SecondaryAction2
                    secondaryActions={cardData?.secondaryActions}
                  />
                </div>
              </CardFooter>
            )}
          </Card>
        </div>

        {cardData?.businessDescription && (
          <div className="px-4 pt-4">
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
        <div className="px-4">
          <FeatureTemplate2
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
      </ScrollArea>

      {/* Footer */}
      <footer
        className="absolute bottom-3 left-0 right-0 z-50 mx-4 rounded-full bg-transparent px-6 py-3 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)]"
        style={{ backgroundColor: cardData?.colors?.footerBg }}
      >
        <div className="flex h-full w-full items-center justify-between">
          {mobile && mobile?.value ? (
            <Link target="_blank" to={`tel:${mobile.value}`}>
              <Phone
                className="min-h-6 min-w-6"
                color={cardData?.colors?.footerIcon}
              />
            </Link>
          ) : (
            <Phone
              className="min-h-6 min-w-6"
              color={cardData?.colors?.footerIcon}
            />
          )}

          {whatsapp && whatsapp.value ? (
            <Link target="_blank" to={`https://wa.me/${whatsapp.value}`}>
              <Whatsapp
                className="min-h-6 min-w-6"
                color={cardData?.colors?.footerIcon}
              />
            </Link>
          ) : (
            <Whatsapp
              className="min-h-6 min-w-6"
              color={cardData?.colors?.footerIcon}
            />
          )}

          <Button
            size="icon"
            onClick={() =>
              DownloadVcfTemplate(cardData?._id, cardData?.publicLink)
            }
            className="relative min-h-11 min-w-11 rounded-xl"
            style={{ backgroundColor: cardData?.colors?.buttonBg }}
          >
            <div className="absolute inset-0">
              <div className="absolute left-0 top-0 h-1/2 w-full rounded-t-xl bg-[#00000014]"></div>
            </div>
            <span className="relative z-10">
              <FiPlus
                className="min-h-6 min-w-6"
                style={{ color: cardData?.colors?.buttonText }}
              />
            </span>
          </Button>

          <QrCode
            onClick={handleOpenQrDrawer}
            className="min-h-6 min-w-6 cursor-pointer"
            style={{ color: cardData?.colors?.footerIcon }}
          />
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

          <Share
            className="min-h-6 min-w-6 cursor-pointer"
            onClick={() => HandleShareTemplate(cardData?.publicLink)}
            style={{ color: cardData?.colors?.footerIcon }}
          />
        </div>
      </footer>
    </div>
  );
}

export default PrestigeConnect;

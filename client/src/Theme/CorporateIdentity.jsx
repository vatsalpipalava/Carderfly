/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Plus, QrCode, Share } from "lucide-react";
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
  // reFeatureSeparator,
  reFooterBg,
  reFooterIcon,
  reQrCode,
  // backCoverImg,
} from "@/slices/cardSlice";
import { PrimaryAction4 } from "@/buttonsTemplate/PrimaryAction4";
import { SecondaryAction1 } from "@/buttonsTemplate/SecondaryAction1";
import { FeatureTemplate3 } from "@/featureTemplate/FeatureTemplate3";

function CorporateIdentity({ cardData }) {
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
    // dispatch(backCoverImg(""));
    dispatch(reButtonBg("#3B82F6"));
    dispatch(reBackground("#F8F8F8"));
    dispatch(reText("#000000"));
    dispatch(reButtonText("#FFFFFF"));
    dispatch(reCardBg("#172554"));
    dispatch(reCardText("#FFFFFF"));
    // dispatch(reCardSeparator("#E5E5E5"));
    dispatch(reCardIcon("#76C2FF"));
    dispatch(reFeatureText("#000000"));
    // dispatch(reFeatureSeparator("#E5E5E5"));
    dispatch(reFooterBg("#3B82F6"));
    dispatch(reFooterIcon("#FFFFFF"));
    dispatch(reQrCode("#3B82F6"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`relative mx-auto flex h-full max-w-[500px] flex-col overflow-hidden ${style.mobileRadius} font-mulish z-50`}
      style={{
        backgroundColor: cardData?.colors?.background,
        color: cardData?.colors?.text,
      }}
    >
      <ScrollArea className="mb-10 flex-grow overflow-auto">
        <div className="-mb-7">
          <img
            src={cardData?.backCoverImg}
            alt="Image"
            className="aspect-[13/6] h-full w-full object-cover"
          />
        </div>
        <div className="relative z-50 w-full px-4">
          <Card
            className="flex h-full w-full items-center justify-start rounded-lg border-none p-0 shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
            style={{
              backgroundColor: cardData?.colors?.cardBg,
              color: cardData?.colors?.cardText,
            }}
          >
            <CardHeader className="h-auto w-auto rounded-l-lg p-0">
              <img
                src={cardData?.profileImg}
                alt="profile"
                className="aspect-square h-32 w-32 rounded-l-lg object-cover"
              />
            </CardHeader>
            <CardContent className="px-4 py-2">
              <h3 className="mb-1 text-left text-xl font-bold">
                {cardData?.firstName}
                <br />
                {cardData?.lastName}
              </h3>
              <p className="mb-1 text-left text-sm italic">
                {cardData?.jobTitle}
              </p>
              <p className="text-left text-sm font-semibold">
                {cardData?.businessName}
              </p>
            </CardContent>
          </Card>

          <Card
            className="mt-6 border-none bg-transparent shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)]"
            style={{
              // backgroundColor: cardData?.colors?.background,
              color: cardData?.colors?.text,
            }}
          >
            <CardHeader className="px-4 pb-2 pt-4">
              <div className="text-lg font-bold">About Us</div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <p className="text-base font-medium">
                {cardData?.businessDescription}
              </p>
            </CardContent>
          </Card>

          <div className="my-6">
            <div
              className="rounded-lg py-3 shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)]"
              style={{ backgroundColor: cardData?.colors?.buttonBg }}
            >
              <div className="flex flex-wrap justify-center gap-5">
                <PrimaryAction4
                  primaryActions={cardData?.primaryActions}
                  // propButtonBg={cardData?.colors?.buttonBg}
                  propButtonText={cardData?.colors?.buttonText}
                />
              </div>
            </div>
          </div>

          <Card
            className="mb-6 rounded-2xl border-none shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)]"
            style={{
              backgroundColor: cardData?.colors?.cardBg,
              color: cardData?.colors?.cardText,
            }}
          >
            <CardHeader className="flex flex-row justify-between p-4">
              <h4 className="text-lg font-bold">Contact Details</h4>
              <img
                src={cardData?.logoImg}
                alt="logo"
                className="h-auto max-w-[35%] rounded-md bg-transparent object-cover"
              />
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-3 p-4">
              <div className="flex items-center gap-3">
                <Location
                  className="h-6 w-6"
                  color={cardData?.colors?.cardIcon}
                />
                <p className="text-base font-semibold">
                  {cardData?.businessAddress}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6" color={cardData?.colors?.cardIcon} />
                <p className="text-base font-semibold">{mobile?.value}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6" color={cardData?.colors?.cardIcon} />
                <p className="text-base font-semibold">{email?.value}</p>
              </div>
              {website?.value ? (
                <div className="flex items-center gap-3">
                  <Website
                    className="h-6 w-6"
                    color={cardData?.colors?.cardIcon}
                  />
                  <p className="text-base font-semibold">{website?.value}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Secondary Actions */}
          {cardData?.secondaryActions.length === 0 ? null : (
            <div className="mb-8 flex w-full flex-wrap justify-center gap-5 px-4">
              <SecondaryAction1 secondaryActions={cardData?.secondaryActions} />
            </div>
          )}

          {/* Feature Section */}
          <FeatureTemplate3
            sections={cardData?.sections}
            propText={cardData?.colors?.text}
            propFeatureText={cardData?.colors?.featureText}
            propFeatureSeparator={cardData?.colors?.featureSeparator}
          />

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

      <footer className="absolute bottom-4 left-0 right-0 z-50 mx-4">
        <div
          className="flex h-12 w-full items-center justify-around rounded-[10px]"
          style={{
            backgroundColor: cardData?.colors?.footerBg,
            boxShadow: `#00000059 0px 5px 15px,
          ${cardData?.colors?.footerBg}80 5px 10px 15px`,
          }}
        >
          {mobile && mobile?.value ? (
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="button-hover h-12 w-12 rounded-full bg-transparent hover:bg-transparent"
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
              variant="ghost"
              className="button-hover h-12 w-12 rounded-full bg-transparent hover:bg-transparent"
            >
              <Phone className="h-6 w-6" color={cardData?.colors?.footerIcon} />
            </Button>
          )}

          {whatsapp && whatsapp.value ? (
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="button-hover h-12 w-12 rounded-full bg-transparent hover:bg-transparent"
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
              variant="ghost"
              className="button-hover h-12 w-12 rounded-full bg-transparent hover:bg-transparent"
            >
              <Whatsapp
                className="h-6 w-6"
                color={cardData?.colors?.footerIcon}
              />
            </Button>
          )}

          <Button
            onClick={() =>
              DownloadVcfTemplate(cardData?._id, cardData?.publicLink)
            }
            size="icon"
            variant="ghost"
            className="button-hover h-12 w-12 rounded-full bg-transparent hover:bg-transparent"
          >
            <Plus className="h-7 w-7" color={cardData?.colors?.footerIcon} />
          </Button>

          {/* Qr Code Drawer */}
          <Button
            onClick={handleOpenQrDrawer}
            size="icon"
            variant="ghost"
            className="button-hover h-12 w-12 rounded-full bg-transparent hover:bg-transparent"
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
            variant="ghost"
            className="button-hover h-12 w-12 rounded-full bg-transparent hover:bg-transparent"
          >
            <Share className="h-6 w-6" color={cardData?.colors?.footerIcon} />
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default CorporateIdentity;

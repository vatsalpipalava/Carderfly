/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

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
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import useStyle from "@/hooks/useStyle";
import { PrimaryActionTemplate } from "@/components/modules/templateComponents/PrimaryActionTemplate";
import { SecondaryActionTemplate } from "@/components/modules/templateComponents/SecondaryActionTemplate";
import { CarouselTemplate } from "@/components/modules/templateComponents/CarouselTemplate";
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

function Standard({ cardData }) {
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
    dispatch(reButtonBg("#737373"));
    dispatch(reBackground("#FFFFFF"));
    dispatch(reText("#000000"));
    dispatch(reButtonText("#FFFFFF"));
    dispatch(reCardBg("#FFFFFF"));
    dispatch(reCardText("#000000"));
    // dispatch(reCardSeparator("#E5E5E5"));
    dispatch(reCardIcon("#737373"));
    dispatch(reFeatureText("#000000"));
    dispatch(reFeatureSeparator("#E5E5E5"));
    dispatch(reFooterBg("#F5F5F5"));
    dispatch(reFooterIcon("#737373"));
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
            className="h-24 w-24 border-4"
            style={{ borderColor: cardData?.colors?.background }}
          >
            <AvatarImage src={cardData?.profileImg} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
        {/* <div className="w-full p-6"> */}
        <div className="mt-4 flex flex-col items-center gap-2 px-6 pb-6">
          <div className="flex items-center justify-center gap-2">
            <img
              src={cardData?.logoImg}
              alt="Company Logo"
              className="h-auto w-auto max-w-[20%] bg-transparent object-cover"
            />
            <h2 className="text-2xl font-bold">{cardData?.businessName}</h2>
          </div>
          <div className="text-lg font-medium">
            {cardData?.firstName} {cardData?.lastName}
          </div>
          <div>{cardData?.jobTitle}</div>
          <p className="text-center text-sm">{cardData?.businessDescription}</p>

          {/* Primary Action */}
          <div className="mb-6 mt-6 flex w-full flex-wrap justify-center gap-4">
            <PrimaryActionTemplate
              primaryActions={cardData?.primaryActions}
              propButtonBg={cardData?.colors?.buttonBg}
              propButtonText={cardData?.colors?.buttonText}
            />
          </div>

          <Card
            className="mb-6 w-full border-none shadow-none"
            style={{
              backgroundColor: cardData?.colors?.cardBg,
              color: cardData?.colors?.cardText,
            }}
          >
            <CardContent className="mx-auto flex max-w-60 flex-col items-center gap-2 p-6">
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
          <div className="mb-8 flex w-full flex-wrap justify-center gap-4">
            <SecondaryActionTemplate
              secondaryActions={cardData?.secondaryActions}
            />
          </div>

          <div className="w-full">
            <CarouselTemplate
              sections={cardData?.sections}
              propText={cardData?.colors?.text}
              propFeatureText={cardData?.colors?.featureText}
              propFeatureSeparator={cardData?.colors?.featureSeparator}
              propButtonBg={cardData?.colors?.buttonBg}
              propButtonText={cardData?.colors?.buttonText}
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
        className="absolute bottom-0 left-0 right-0 z-50 rounded-t-xl flex items-center justify-around px-4 py-3 shadow-lg"
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

    //   <div className="mt-4 flex flex-col items-start gap-2 text-sm">
    //     <div className="flex items-center gap-2">
    //       <img
    //         src="https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg"
    //         alt="Feature Image"
    //         className="h-32 w-32 rounded-md"
    //       />
    //       <div>
    //         <div className="font-medium">Advanced Analytics</div>
    //         <div className="text-muted-foreground">
    //           Powerful data insights
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex items-center gap-2">
    //       <img
    //         src="https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg"
    //         alt="Feature Image"
    //         className="h-32 w-32 rounded-md"
    //       />
    //       <div>
    //         <div className="font-medium">Scalable Infrastructure</div>
    //         <div className="text-muted-foreground">Grow with ease</div>
    //       </div>
    //     </div>
    //     <div className="flex items-center gap-2">
    //       <img
    //         src="https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg"
    //         alt="Feature Image"
    //         className="h-32 w-32 rounded-md"
    //       />
    //       <div>
    //         <div className="font-medium">Seamless Collaboration</div>
    //         <div className="text-muted-foreground">
    //           Work together effortlessly
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="mt-4 flex gap-4">
    //     <Link
    //       href="#"
    //       className="text-muted-foreground hover:text-primary"
    //       prefetch={false}
    //     >
    //       <FacebookIcon className="h-6 w-6" />
    //     </Link>
    //     <Link
    //       href="#"
    //       className="text-muted-foreground hover:text-primary"
    //       prefetch={false}
    //     >
    //       <InstagramIcon className="h-6 w-6" />
    //     </Link>
    //     <Link
    //       href="#"
    //       className="text-muted-foreground hover:text-primary"
    //       prefetch={false}
    //     >
    //       <GithubIcon className="h-6 w-6" />
    //     </Link>
    //     <Link
    //       href="#"
    //       className="text-muted-foreground hover:text-primary"
    //       prefetch={false}
    //     >
    //       <LinkedinIcon className="h-6 w-6" />
    //     </Link>
    //   </div>
    // </div>
  );
}

export default Standard;

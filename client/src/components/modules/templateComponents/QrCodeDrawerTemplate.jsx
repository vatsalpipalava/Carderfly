/* eslint-disable react/prop-types */
import { useRef } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CustomQRCode } from "custom-qr-code/react";
import { Button } from "@/components/ui/button";

export function QrCodeDrawerTemplate({
  qrDrawerOpenProp,
  setQrDrawerOpenProp,
  publicLinkProp,
  logoImgProp,
  backgroundProp,
  buttonBgProp,
  buttonTextProp,
  textProp,
  qrCodeProp,
}) {
  const qrRef = useRef(null);

  const handleQrCodeDownload = async (backgroundColor, qrFileName) => {
    const svgElement = qrRef.current.querySelector("svg");
    if (!svgElement) {
      console.error("SVG element not found");
      return;
    }

    // Convert SVG to canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();

    img.onload = () => {
      // Set canvas size to match the image size with higher resolution
      const scale = 4; // 4x resolution
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // Set white background
      ctx.fillStyle = `${backgroundColor}`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the SVG image on the canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Create a link and trigger download
      const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${qrFileName}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };
  return (
    <Drawer open={qrDrawerOpenProp} onOpenChange={setQrDrawerOpenProp}>
      <DrawerContent style={{ backgroundColor: backgroundProp }}>
        <div
          className="mx-auto mt-4 h-2 w-[100px] rounded-full"
          style={{ backgroundColor: buttonBgProp }}
        />
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center" style={{ color: textProp }}>
              QR Code
            </DrawerTitle>
          </DrawerHeader>
          <div ref={qrRef} className="mx-auto w-auto">
            <CustomQRCode
              className="mx-auto w-[300px]"
              width={300}
              height={300}
              margin={10}
              type="svg"
              data={`${import.meta.env.VITE_FRONTEND_URL}/${publicLinkProp}`}
              image={logoImgProp}
              imageOptions={{
                hideBackgroundDots: true,
                imageSize: 0.3,
                margin: 5,
              }}
              dotsOptions={{
                color: qrCodeProp,
                type: "rounded",
              }}
              backgroundOptions={{
                color: "#FFFFFF",
              }}
              cornersSquareOptions={{
                type: "extra-rounded",
                color: qrCodeProp,
              }}
              cornersDotOptions={{
                type: "",
                color: qrCodeProp,
              }}
            />
          </div>
          <DrawerFooter>
            <Button
              onClick={() =>
                handleQrCodeDownload(backgroundProp, publicLinkProp)
              }
              style={{ backgroundColor: buttonBgProp, color: buttonTextProp }}
            >
              Download
            </Button>
            <DrawerClose asChild>
              <Button
                style={{
                  backgroundColor: backgroundProp,
                  borderColor: buttonBgProp,
                  color: buttonBgProp,
                }}
                className="border-2"
                variant="outline"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

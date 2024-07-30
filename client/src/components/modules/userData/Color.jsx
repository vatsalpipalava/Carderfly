import { useState } from "react";
import { SketchPicker } from "react-color";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
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

export function Color() {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.card?.colors);

  const [displayButtonBg, setDisplayButtonBg] = useState(false);
  const [buttonBg, setButtonBg] = useState(colors.buttonBg);

  const handleButtonBg = () => {
    setDisplayButtonBg(!displayButtonBg);
  };

  const handleButtonBgColorChange = (color) => {
    setButtonBg(color.hex);
    dispatch(reButtonBg(color.hex));
  };

  const [displayBackground, setDisplayBackground] = useState(false);
  const [background, setBackground] = useState(colors.background);

  const handleBackground = () => {
    setDisplayBackground(!displayBackground);
  };

  const handleBackgroundColorChange = (color) => {
    setBackground(color.hex);
    dispatch(reBackground(color.hex));
  };

  const [displayText, setDisplayText] = useState(false);
  const [text, setText] = useState(colors.text);

  const handleText = () => {
    setDisplayText(!displayText);
  };

  const handleTextColorChange = (color) => {
    setText(color.hex);
    dispatch(reText(color.hex));
  };

  const [displayButtonText, setDisplayButtonText] = useState(false);
  const [buttonText, setButtonText] = useState(colors.buttonText);

  const handleButtonText = () => {
    setDisplayButtonText(!displayButtonText);
  };

  const handleButtonTextColorChange = (color) => {
    setButtonText(color.hex);
    dispatch(reButtonText(color.hex));
  };

  const [displayCardBg, setDisplayCardBg] = useState(false);
  const [cardBg, setCardBg] = useState(colors.cardBg);

  const handleCardBg = () => {
    setDisplayCardBg(!displayCardBg);
  };

  const handleCardBgColorChange = (color) => {
    setCardBg(color.hex);
    dispatch(reCardBg(color.hex));
  };

  const [displayCardText, setDisplayCardText] = useState(false);
  const [cardText, setCardText] = useState(colors.cardText);

  const handleCardText = () => {
    setDisplayCardText(!displayCardText);
  };

  const handleCardTextColorChange = (color) => {
    setCardText(color.hex);
    dispatch(reCardText(color.hex));
  };

  // const [displayCardSeparator, setDisplayCardSeparator] = useState(false);
  // const [cardSeparator, setCardSeparator] = useState(colors.cardSeparator);

  // const handleCardSeparator = () => {
  //   setDisplayCardSeparator(!displayCardSeparator);
  // };

  // const handleCardSeparatorColorChange = (color) => {
  //   setCardSeparator(color.hex);
  //   dispatch(reCardSeparator(color.hex));
  // };

  const [displayCardIcon, setDisplayCardIcon] = useState(false);
  const [cardIcon, setCardIcon] = useState(colors.cardIcon);

  const handleCardIcon = () => {
    setDisplayCardIcon(!displayCardIcon);
  };

  const handleCardIconColorChange = (color) => {
    setCardIcon(color.hex);
    dispatch(reCardIcon(color.hex));
  };

  const [displayFeatureText, setDisplayFeatureText] = useState(false);
  const [featureText, setFeatureText] = useState(colors.featureText);

  const handleFeatureText = () => {
    setDisplayFeatureText(!displayFeatureText);
  };

  const handleFeatureTextColorChange = (color) => {
    setFeatureText(color.hex);
    dispatch(reFeatureText(color.hex));
  };

  const [displayFeatureSeparator, setDisplayFeatureSeparator] = useState(false);
  const [featureSeparator, setFeatureSeparator] = useState(colors.featureSeparator);

  const handleFeatureSeparator = () => {
    setDisplayFeatureSeparator(!displayFeatureSeparator);
  };

  const handleFeatureSeparatorColorChange = (color) => {
    setFeatureSeparator(color.hex);
    dispatch(reFeatureSeparator(color.hex));
  };

  const [displayFooterBg, setDisplayFooterBg] = useState(false);
  const [footerBg, setFooterBg] = useState(colors.footerBg);

  const handleFooterBg = () => {
    setDisplayFooterBg(!displayFooterBg);
  };

  const handleFooterBgColorChange = (color) => {
    setFooterBg(color.hex);
    dispatch(reFooterBg(color.hex));
  };

  const [displayFooterIcon, setDisplayFooterIcon] = useState(false);
  const [footerIcon, setFooterIcon] = useState(colors.footerIcon);

  const handleFooterIcon = () => {
    setDisplayFooterIcon(!displayFooterIcon);
  };

  const handleFooterIconColorChange = (color) => {
    setFooterIcon(color.hex);
    dispatch(reFooterIcon(color.hex));
  };
  
  const [displayQrCode, setDisplayQrCode] = useState(false);
  const [qrCode, setQrCode] = useState(colors.rqCode);

  const handleQrCode = () => {
    setDisplayQrCode(!displayQrCode);
  };

  const handleQrCodeColorChange = (color) => {
    setQrCode(color.hex);
    dispatch(reQrCode(color.hex));
  };

  const handleClose = () => {
    setDisplayButtonBg(false);
    setDisplayBackground(false);
    setDisplayText(false);
    setDisplayButtonText(false);
    setDisplayCardBg(false);
    setDisplayCardText(false);
    // setDisplayCardSeparator(false);
    setDisplayCardIcon(false);
    setDisplayFeatureText(false);
    setDisplayFeatureSeparator(false);
    setDisplayFooterBg(false);
    setDisplayFooterIcon(false);
    setDisplayQrCode(false);
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle>Color</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <div className="flex w-full items-center gap-6">
              <Button
                onClick={handleButtonBg}
                size="icon"
                className="h-8 w-12 border-2 border-foreground rounded-sm shadow-[0px_0px_2px_#808080]"
                style={{ backgroundColor: colors.buttonBg }}
              ></Button>
              <p className="text-md font-semibold">Button Background</p>
            </div>
            {displayButtonBg ? (
              <div className="absolute z-20 -mt-[21rem]">
                <div
                  className="fixed bottom-0 left-0 right-0 top-0"
                  onClick={handleClose}
                />
                <SketchPicker
                  disableAlpha
                  color={buttonBg}
                  onChange={handleButtonBgColorChange}
                  className="text-black"
                />
              </div>
            ) : null}
          </div>

          <div>
            <div className="flex w-full items-center gap-6">
              <Button
                onClick={handleBackground}
                size="icon"
                className="h-8 w-12 border-2 border-foreground rounded-sm shadow-[0px_0px_2px_#808080]"
                style={{ backgroundColor: colors.background }}
              ></Button>
              <p className="text-md font-semibold">Background</p>
            </div>
            {displayBackground ? (
              <div className="absolute z-20 -mt-[21rem]">
                <div
                  className="fixed bottom-0 left-0 right-0 top-0"
                  onClick={handleClose}
                />
                <SketchPicker
                  disableAlpha
                  color={background}
                  onChange={handleBackgroundColorChange}
                  className="text-black"
                />
              </div>
            ) : null}
          </div>

          <div>
            <div className="flex w-full items-center gap-6">
              <Button
                onClick={handleText}
                size="icon"
                className="h-8 w-12 border-2 border-foreground rounded-sm shadow-[0px_0px_2px_#808080]"
                style={{ backgroundColor: colors.text }}
              ></Button>
              <p className="text-md font-semibold">Text</p>
            </div>
            {displayText ? (
              <div className="absolute z-20 -mt-[21rem]">
                <div
                  className="fixed bottom-0 left-0 right-0 top-0"
                  onClick={handleClose}
                />
                <SketchPicker
                  disableAlpha
                  color={text}
                  onChange={handleTextColorChange}
                  className="text-black"
                />
              </div>
            ) : null}
          </div>

          <div>
            <div className="flex w-full items-center gap-6">
              <Button
                onClick={handleButtonText}
                size="icon"
                className="h-8 w-12 border-2 border-foreground rounded-sm shadow-[0px_0px_2px_#808080]"
                style={{ backgroundColor: colors.buttonText }}
              ></Button>
              <p className="text-md font-semibold">Button Text</p>
            </div>
            {displayButtonText ? (
              <div className="absolute z-20 -mt-[21rem]">
                <div
                  className="fixed bottom-0 left-0 right-0 top-0"
                  onClick={handleClose}
                />
                <SketchPicker
                  disableAlpha
                  color={buttonText}
                  onChange={handleButtonTextColorChange}
                  className="text-black"
                />
              </div>
            ) : null}
          </div>

          <div>
            <div className="flex w-full items-center gap-6">
              <Button
                onClick={handleCardBg}
                size="icon"
                className="h-8 w-12 border-2 border-foreground rounded-sm shadow-[0px_0px_2px_#808080]"
                style={{ backgroundColor: colors.cardBg }}
              ></Button>
              <p className="text-md font-semibold">Card Background</p>
            </div>
            {displayCardBg ? (
              <div className="absolute z-20 -mt-[21rem]">
                <div
                  className="fixed bottom-0 left-0 right-0 top-0"
                  onClick={handleClose}
                />
                <SketchPicker
                  disableAlpha
                  color={cardBg}
                  onChange={handleCardBgColorChange}
                  className="text-black"
                />
              </div>
            ) : null}
          </div>

          <div>
            <div className="flex w-full items-center gap-6">
              <Button
                onClick={handleCardText}
                size="icon"
                className="h-8 w-12 border-2 border-foreground rounded-sm shadow-[0px_0px_2px_#808080]"
                style={{ backgroundColor: colors.cardText }}
              ></Button>
              <p className="text-md font-semibold">Card Text</p>
            </div>
            {displayCardText ? (
              <div className="absolute z-20 -mt-[21rem]">
                <div
                  className="fixed bottom-0 left-0 right-0 top-0"
                  onClick={handleClose}
                />
                <SketchPicker
                  disableAlpha
                  color={cardText}
                  onChange={handleCardTextColorChange}
                  className="text-black"
                />
              </div>
            ) : null}
          </div>

          {/* <div>
            <div className="flex w-full items-center gap-6">
              <Button
                onClick={handleCardSeparator}
                size="icon"
                className="h-8 w-12 border-2 border-foreground rounded-sm shadow-[0px_0px_2px_#808080]"
                style={{ backgroundColor: colors.cardSeparator }}
              ></Button>
              <p className="text-md font-semibold">Card Separator</p>
            </div>
            {displayCardSeparator ? (
              <div className="absolute z-20 -mt-[21rem]">
                <div
                  className="fixed bottom-0 left-0 right-0 top-0"
                  onClick={handleClose}
                />
                <SketchPicker
                  disableAlpha
                  color={cardSeparator}
                  onChange={handleCardSeparatorColorChange}
                  className="text-black"
                />
              </div>
            ) : null}
          </div> */}

          <div>
            <div className="flex w-full items-center gap-6">
              <Button
                onClick={handleCardIcon}
                size="icon"
                className="h-8 w-12 border-2 border-foreground rounded-sm shadow-[0px_0px_2px_#808080]"
                style={{ backgroundColor: colors.cardIcon }}
              ></Button>
              <p className="text-md font-semibold">Card Icon</p>
            </div>
            {displayCardIcon ? (
              <div className="absolute z-20 -mt-[21rem]">
                <div
                  className="fixed bottom-0 left-0 right-0 top-0"
                  onClick={handleClose}
                />
                <SketchPicker
                  disableAlpha
                  color={cardIcon}
                  onChange={handleCardIconColorChange}
                  className="text-black"
                />
              </div>
            ) : null}
          </div>

          <div>
            <div className="flex w-full items-center gap-6">
              <Button
                onClick={handleFeatureText}
                size="icon"
                className="h-8 w-12 border-2 border-foreground rounded-sm shadow-[0px_0px_2px_#808080]"
                style={{ backgroundColor: colors.featureText }}
              ></Button>
              <p className="text-md font-semibold">Feature Text</p>
            </div>
            {displayFeatureText ? (
              <div className="absolute z-20 -mt-[21rem]">
                <div
                  className="fixed bottom-0 left-0 right-0 top-0"
                  onClick={handleClose}
                />
                <SketchPicker
                  disableAlpha
                  color={featureText}
                  onChange={handleFeatureTextColorChange}
                  className="text-black"
                />
              </div>
            ) : null}
          </div>

          <div>
            <div className="flex w-full items-center gap-6">
              <Button
                onClick={handleFeatureSeparator}
                size="icon"
                className="h-8 w-12 border-2 border-foreground rounded-sm shadow-[0px_0px_2px_#808080]"
                style={{ backgroundColor: colors.featureSeparator }}
              ></Button>
              <p className="text-md font-semibold">Feature Separator</p>
            </div>
            {displayFeatureSeparator ? (
              <div className="absolute z-20 -mt-[21rem]">
                <div
                  className="fixed bottom-0 left-0 right-0 top-0"
                  onClick={handleClose}
                />
                <SketchPicker
                  disableAlpha
                  color={featureSeparator}
                  onChange={handleFeatureSeparatorColorChange}
                  className="text-black"
                />
              </div>
            ) : null}
          </div>

          <div>
            <div className="flex w-full items-center gap-6">
              <Button
                onClick={handleFooterBg}
                size="icon"
                className="h-8 w-12 border-2 border-foreground rounded-sm shadow-[0px_0px_2px_#808080]"
                style={{ backgroundColor: colors.footerBg }}
              ></Button>
              <p className="text-md font-semibold">Footer Background</p>
            </div>
            {displayFooterBg ? (
              <div className="absolute z-20 -mt-[21rem]">
                <div
                  className="fixed bottom-0 left-0 right-0 top-0"
                  onClick={handleClose}
                />
                <SketchPicker
                  disableAlpha
                  color={footerBg}
                  onChange={handleFooterBgColorChange}
                  className="text-black"
                />
              </div>
            ) : null}
          </div>

          <div>
            <div className="flex w-full items-center gap-6">
              <Button
                onClick={handleFooterIcon}
                size="icon"
                className="h-8 w-12 border-2 border-foreground rounded-sm shadow-[0px_0px_2px_#808080]"
                style={{ backgroundColor: colors.footerIcon }}
              ></Button>
              <p className="text-md font-semibold">Footer Icon</p>
            </div>
            {displayFooterIcon ? (
              <div className="absolute z-20 -mt-[21rem]">
                <div
                  className="fixed bottom-0 left-0 right-0 top-0"
                  onClick={handleClose}
                />
                <SketchPicker
                  disableAlpha
                  color={footerIcon}
                  onChange={handleFooterIconColorChange}
                  className="text-black"
                />
              </div>
            ) : null}
          </div>

          <div>
            <div className="flex w-full items-center gap-6">
              <Button
                onClick={handleQrCode}
                size="icon"
                className="h-8 w-12 border-2 border-foreground rounded-sm shadow-[0px_0px_2px_#808080]"
                style={{ backgroundColor: colors.qrCode }}
              ></Button>
              <p className="text-md font-semibold">Qr Code</p>
            </div>
            {displayQrCode ? (
              <div className="absolute z-20 -mt-[21rem]">
                <div
                  className="fixed bottom-0 left-0 right-0 top-0"
                  onClick={handleClose}
                />
                <SketchPicker
                  disableAlpha
                  color={qrCode}
                  onChange={handleQrCodeColorChange}
                  className="text-black"
                />
              </div>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

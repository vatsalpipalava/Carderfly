import { useDispatch } from "react-redux";
import { CustomThemes } from "../CustomThemes";
import {
  logoImg,
  reBackground,
  reButtonBg,
  reButtonText,
  reCardBg,
  reCardIcon,
  reCardText,
  reFeatureText,
  reFooterBg,
  reFooterIcon,
  reQrCode,
  reText,
} from "@/slices/cardSlice";

export function useApplyTheme() {
  const dispatch = useDispatch();

  const applyTheme = (themeKey) => {
    const theme = CustomThemes[themeKey];

    if (theme) {
      dispatch(reButtonBg(theme.colors.buttonBg));
      dispatch(reBackground(theme.colors.background));
      dispatch(reText(theme.colors.text));
      dispatch(reButtonText(theme.colors.buttonText));
      dispatch(reCardBg(theme.colors.cardBg));
      dispatch(reCardText(theme.colors.cardText));
      dispatch(reCardIcon(theme.colors.cardIcon));
      dispatch(reFeatureText(theme.colors.featureText));
      dispatch(reFooterBg(theme.colors.footerBg));
      dispatch(reFooterIcon(theme.colors.footerIcon));
      dispatch(reQrCode(theme.colors.qrCode));

      dispatch(logoImg(theme.logoImg));
    } else {
      console.error("Theme not found");
    }
  };

  return applyTheme;
}

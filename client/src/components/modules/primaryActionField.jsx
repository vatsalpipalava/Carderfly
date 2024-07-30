import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { LiaPhoneSolid } from "react-icons/lia";
import { TbBrandWhatsapp, TbBrandWechat } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import { GrMapLocation } from "react-icons/gr";
import { IoEarth, IoLogoSkype } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import { PiMessengerLogo, PiStorefront } from "react-icons/pi";
import { FaLine, FaViber } from "react-icons/fa6";

export const primaryActionField = [
  {
    _id: "mobile",
    label: "Mobile",
    placeholder: "+XX XXXXX XXXXX (Mobile)",
    icon: HiOutlineDevicePhoneMobile,
    type: "tel",
    linkPrefix: "tel:",
    linkSuffix: "",
  },
  {
    _id: "office",
    label: "Office",
    placeholder: "+XX XXXXX XXXXX (Office)",
    icon: LiaPhoneSolid,
    type: "tel",
    linkPrefix: "tel:",
    linkSuffix: "",
  },
  {
    label: "Email",
    placeholder: "you@example.com",
    icon: HiOutlineMail,
    _id: "email",
    type: "email",
    linkPrefix: "mailto:",
    linkSuffix: "",
  },
  {
    label: "Website",
    placeholder: "https://example.com",
    icon: IoEarth,
    _id: "website",
    type: "text",
    linkPrefix: "",
    linkSuffix: "",
  },
  {
    label: "Location",
    placeholder: "https://maps.app.goo.gl/xxxxxx",
    icon: GrMapLocation,
    _id: "location",
    type: "text",
    linkPrefix: "",
    linkSuffix: "",
  },
  {
    label: "WhatsApp",
    placeholder: "+XXXXXXXXXXXX (WhatsApp)",
    icon: TbBrandWhatsapp,
    _id: "whatsapp",
    type: "tel",
    linkPrefix: "https://wa.me/",
    linkSuffix: "?text=Hello",
  },
  {
    label: "Skype",
    placeholder: "username",
    icon: IoLogoSkype,
    _id: "skype",
    type: "text",
    linkPrefix: "skype:",
    linkSuffix: "?chat",
  },
  {
    label: "Telegram",
    placeholder: "username",
    icon: FaTelegramPlane,
    _id: "telegram",
    type: "text",
    linkPrefix: "https://t.me/",
    linkSuffix: "",
  },
  {
    label: "Messenger",
    placeholder: "username",
    icon: PiMessengerLogo,
    _id: "messenger",
    type: "text",
    linkPrefix: "https://m.me/",
    linkSuffix: "",
  },
  {
    label: "Line",
    placeholder: "LINE ID",
    icon: FaLine,
    _id: "line",
    type: "text",
    linkPrefix: "https://line.me/ti/p/",
    linkSuffix: "",
  },
  {
    label: "Viber",
    placeholder: "Viber URI",
    icon: FaViber,
    _id: "viber",
    type: "text",
    linkPrefix: "https://viber://pa/qr?chatURI=",
    linkSuffix: "",
  },
  {
    label: "WeChat",
    placeholder: "WeChat ID",
    icon: TbBrandWechat,
    _id: "wechat",
    type: "text",
    linkPrefix: "weixin://dl/chat?",
    linkSuffix: "",
  },
  {
    label: "Online Store",
    placeholder: "Online Store URL",
    icon: PiStorefront,
    _id: "store",
    type: "text",
    linkPrefix: "",
    linkSuffix: "",
  },
];

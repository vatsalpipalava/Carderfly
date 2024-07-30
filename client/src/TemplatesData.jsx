import SimpleThemeImg from "./assets/templates/simple.png";
import Simple from "./Theme/Simple";

import ModernThemeImg from "./assets/templates/modern.png";
import Modern from "./Theme/Modern";
import Standard from "./Theme/Standard";

// import RichBlackThemeImg from "./assets/templates/richblack.png";
// import RichblackTheme from "./themes/RichblackTheme";

// import DynamicThemeImg from "./assets/templates/dynamic.png";
// import DynamicTheme from "./themes/DynamicTheme";

const templates = [
  {
    id: "simple",
    name: "Simple Theme",
    imageUrl: SimpleThemeImg,
    templateComponents: Simple,
  },
  {
    id: "modern",
    name: "Modern Theme",
    imageUrl: ModernThemeImg,
    templateComponents: Modern,
  },
  {
    id: "standard",
    name: "Standard Theme",
    // imageUrl: ModernThemeImg,
    templateComponents: Standard,
  },
//   {
//     id: "rich-black",
//     name: "Rich Black Theme",
//     imageUrl: RichBlackThemeImg,
//     templateComponents: Richblack
//   },
//   {
//     id: "dynamic",
//     name: "Dynamic Theme",
//     imageUrl: DynamicThemeImg,
//     templateComponents: Dynamic
//   },
];

export default templates;

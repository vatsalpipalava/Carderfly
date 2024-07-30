import { useContext } from "react";
import StyleContext from "@/context/StyleProvider";

const useStyle = () => {
  return useContext(StyleContext);
};

export default useStyle;

import { createContext, useState } from "react";

const StyleContext = createContext();

// eslint-disable-next-line react/prop-types
export const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState({});

  return (
    <StyleContext.Provider value={{ style, setStyle }}>
      {children}
    </StyleContext.Provider>
  );
};

export default StyleContext;

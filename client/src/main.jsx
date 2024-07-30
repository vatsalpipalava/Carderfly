// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ThemeProvider } from "@/components/dark-mode/theme-provider.jsx";
import { StyleProvider } from "./context/StyleProvider.jsx";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import store from "./store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Provider store={store}>
        <StyleProvider>
          <AuthProvider>
            <Toaster />
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </AuthProvider>
        </StyleProvider>
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
  // </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthProvider.jsx";
// import { ThemeProvider } from "@/components/dark-mode/theme-provider.jsx";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   // <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <ThemeProvider>
//           <Routes>
//             <Route path="/*" element={<App />} />
//           </Routes>
//         </ThemeProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   // </React.StrictMode>
// );

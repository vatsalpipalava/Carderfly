// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/dark-mode/theme-provider.jsx";
import { AuthProvider } from "@/context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
  //  </StrictMode>,
);

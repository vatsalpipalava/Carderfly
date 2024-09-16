import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// <--------------- Layout ---------------->
import Layout from "./components/layouts/Layout";
import DashboardLayout from "./components/layouts/dashboardLayout";

// <--------------- More Routes --------------->
import RequireAuth from "./components/auth/RequiredAuth";
import PersistLogin from "./components/auth/PersistLogin";

// <--------------- Pages ---------------->
import { Home } from "./pages/Home";
import { RegisterForm } from "./pages/Register";
import { LoginForm } from "./pages/Login";
import { EmailVerification } from "./pages/EmailVerification";
import NotFound from "./pages/NotFound";
import { Settings } from "./pages/Settings";
import CreateCard from "./pages/CreateCard";
import MyCards from "./pages/MyCards";
import EnterDetails from "./pages/EnterDetails";
import MyCardById from "./pages/MyCardById";
import EditCard from "./pages/EditCard";
import { Checkout } from "./pages/Checkout";
import { Success } from "./pages/Success";
import { SubscribedCard } from "./pages/SubscribedCard";
import { Transactions } from "./pages/Transactions";
import Invoice from "./pages/Invoice";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import { TermsAndConditions } from "./pages/TermsAndConditions";
import { Payment } from "./pages/Payment";
import { Support } from "./pages/Support";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";

const ScrollToSection = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return null;
};

function App() {
  return (
    <>
      <ScrollToSection />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="u/verify-email/:emailVerificationToken/:userId"
            element={<EmailVerification />}
          />
          <Route path=":publicLink" element={<SubscribedCard />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route
            path="reset-password/:forgotPasswordToken"
            element={<ResetPassword />}
          />
          <Route path="terms-conditions" element={<TermsAndConditions />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />

          <Route element={<PersistLogin />}>
            <Route index element={<Home />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="login" element={<LoginForm />} />

            <Route element={<RequireAuth />}>
              <Route path="view-card/:cardId" element={<MyCardById />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="create-card" element={<CreateCard />} />
                <Route path="my-cards" element={<MyCards />} />
                <Route
                  path="create-card/:templateId/enter-details"
                  element={<EnterDetails />}
                />
                <Route path="edit-card/:cardId" element={<EditCard />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="invoice/:subscribeId" element={<Invoice />} />
                <Route path="settings" element={<Settings />} />
                <Route path="support" element={<Support />} />
              </Route>

              <Route
                path="checkout/card/subscribe/:cardId"
                element={<Checkout />}
              />
              <Route
                path="checkout/card/subscribe/:cardId/:planId"
                element={<Payment />}
              />
              <Route
                path="checkout/payment/success/subscribe/card/:cardId/:razorpayPaymentId"
                element={<Success />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

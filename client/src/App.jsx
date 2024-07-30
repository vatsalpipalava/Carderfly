import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ModeToggle } from "./components/dark-mode/mode-toggle";

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

function App() {
  return (
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
        

        <Route element={<PersistLogin />}>
          <Route index element={<Home />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="theme" element={<ModeToggle />} />

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
            </Route>

            <Route
              path="checkout/card/subscribe/:cardId"
              element={<Checkout />}
            />
            <Route
              path="checkout/payment/success/subscribe/card/:cardId/:sessionId"
              element={<Success />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

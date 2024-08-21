import { Route, Routes } from "react-router-dom";
import "@/App.css";

// <--------------- Layout ---------------->
import Layout from "./components/layouts/Layout";
import DashboardLayout from "./components/layouts/DashboardLayout";

// <--------------- More Routes --------------->
import PersistLogin from "@/components/auth/PersistLogin";
import RequireAuth from "@/components/auth/RequiredAuth";

// <--------------- Pages ---------------->
import { Dashboard } from "@/pages/Dashboard";
import { Login } from "@/pages/Login";
import { Customers } from "@/pages/Customers";
import { SubscriptionCards } from "@/pages/SubscriptionCards";
import { AllCards } from "@/pages/AllCards";
import { InactiveCards } from "@/pages/InactiveCards";
import { BlockedCard } from "@/pages/BlockedCard";
import NotFound from "@/pages/NotFound";
import { Backup } from "@/pages/Backup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route
                path="cards/subscription"
                element={<SubscriptionCards />}
              />
              <Route path="cards/all" element={<AllCards />} />
              <Route path="cards/inactive" element={<InactiveCards />} />
              <Route path="cards/blocked" element={<BlockedCard />} />
              <Route path="backup" element={<Backup />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

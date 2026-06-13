import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layout";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { SellerDashboard } from "./pages/Dashboard/SellerDashboard";
import { DashboardOverview } from "./pages/Dashboard/Overview";
import { Analytics } from "./pages/Dashboard/Analytics";
import { Expenses } from "./pages/Dashboard/Expenses";
import { Settings } from "./pages/Dashboard/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "product/:id", Component: ProductDetail },
      { 
        path: "dashboard", 
        Component: SellerDashboard,
        children: [
          { index: true, Component: DashboardOverview },
          { path: "analytics", Component: Analytics },
          { path: "expenses", Component: Expenses },
          { path: "settings", Component: Settings },
        ]
      },
    ],
  },
]);

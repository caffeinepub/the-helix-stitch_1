import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import CartDrawer from "./components/CartDrawer";
import DNABackground from "./components/DNABackground";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CustomOrdersPage from "./pages/CustomOrdersPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";

const rootRoute = createRootRoute({
  component: () => (
    <CartProvider>
      <DNABackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />
        <Outlet />
        <Footer />
      </div>
      <CartDrawer />
      <Toaster />
    </CartProvider>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: ShopPage,
});
const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/category/$category",
  component: CategoryPage,
});
const customOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/custom-orders",
  component: CustomOrdersPage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  shopRoute,
  categoryRoute,
  customOrdersRoute,
  aboutRoute,
  adminRoute,
]);

const router = createRouter({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

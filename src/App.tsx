import { HashRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/common/ErrorBoundary";
const Home = lazy(() => import("./pages/Home"));
const MainLayout = lazy(() => import("./components/layouts/MainLayout"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <>
      <HashRouter>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/order-cofirmation"
                  element={<OrderConfirmation />}
                />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </HashRouter>
    </>
  );
}

export default App;

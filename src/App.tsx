import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./components/layouts/MainLayout";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-cofirmation" element={<OrderConfirmation />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;

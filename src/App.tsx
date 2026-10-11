import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./components/layouts/MainLayout";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";


function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;

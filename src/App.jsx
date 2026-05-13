import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";

// Layout Components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer.jsx";
import Cart from "./components/cart/Cart";

export default function App() {
  return (
    <>
      {/* TOP NAVIGATION */}
      <Header />

      {/* CART DRAWER (GLOBAL) */}
      <Cart />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
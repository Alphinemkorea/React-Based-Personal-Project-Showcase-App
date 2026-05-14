import { Routes, Route } from "react-router-dom";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Cart from "./components/cart/Cart";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <>
      <Header />
      <Cart />

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}
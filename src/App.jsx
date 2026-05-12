import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navigation from "./components/common/Navigation";
import Cart from "./components/cart/Cart";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import AdminPage from "./pages/AdminPage";

import useCart from "./hooks/useCart";

export default function App() {
  const { isCartOpen, darkMode } = useCart();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <Navigation />
      <Cart />

      <div className={`page-wrapper ${isCartOpen ? "shift" : ""}`}>
        <div className="page">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
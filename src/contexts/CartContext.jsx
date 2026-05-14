import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  //  ADD PRODUCT
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setCartOpen(true);
  };

  //  REMOVE PRODUCT
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  //  TOTAL PRICE
  const getTotal = () => {
    return cart.reduce(
      (sum, item) => sum + item.price,
      0
    );
  };

  // body class for drawer animation
  useEffect(() => {
    if (cartOpen) {
      document.body.classList.add("cart-open");
    } else {
      document.body.classList.remove("cart-open");
    }
  }, [cartOpen]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        cartOpen,
        setCartOpen,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
import { useCart } from '../contexts/CartContext';

export const useCartHook = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  } = useCart();

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isEmpty: cart.length === 0,
    itemCount: getCartCount(),
    totalPrice: getCartTotal(),
  };
};
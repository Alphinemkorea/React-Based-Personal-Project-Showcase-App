import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const Navigation = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/cart" className="cart-link">
        Cart ({cartCount})
      </Link>
    </nav>
  );
};

export default Navigation;
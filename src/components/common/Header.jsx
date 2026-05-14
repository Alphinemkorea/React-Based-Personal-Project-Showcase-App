import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

export default function Header() {
  const { cart } = useCart();

  return (
    <nav>
      <h2>Gaming Tech Store 🎮</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/cart">
          Cart ({cart.length})
        </Link>
      </div>
    </nav>
  );
}
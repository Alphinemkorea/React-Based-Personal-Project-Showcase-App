import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

export default function Header() {
    const { toggleCart, cart } = useCart();

    return (
        <nav>
            <h2>Gaming Store 🎮</h2>

            <div>
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/admin">Admin</Link>

                <button onClick={toggleCart}>
                    Cart ({cart.length})
                </button>
            </div>
        </nav>
    );
}
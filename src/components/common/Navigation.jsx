import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

export default function Navigation() {
    const { cart, toggleCart, darkMode, toggleDarkMode } = useCart();

    return (
        <nav className={darkMode ? "dark-nav" : ""}>
            <div> Gaming Store</div>

            <div>
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/admin">Admin</Link>

                <button onClick={toggleCart}>
                    Cart ({cart.length})
                </button>

                <button onClick={toggleDarkMode}>
                    {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button>
            </div>
        </nav>
    );
}
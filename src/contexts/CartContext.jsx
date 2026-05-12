import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((p) => p.id === product.id);

            if (exists) {
                return prev.map((p) =>
                    p.id === product.id ? { ...p, qty: p.qty + 1 } : p
                );
            }

            return [...prev, { ...product, qty: 1 }];
        });

        setIsCartOpen(true);
    };

    const increaseQty = (id) => {
        setCart((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, qty: p.qty + 1 } : p
            )
        );
    };

    const decreaseQty = (id) => {
        setCart((prev) =>
            prev
                .map((p) =>
                    p.id === id ? { ...p, qty: p.qty - 1 } : p
                )
                .filter((p) => p.qty > 0)
        );
    };

    const clearCart = () => setCart([]);

    const toggleCart = () => setIsCartOpen((p) => !p);

    const toggleDarkMode = () => setDarkMode((p) => !p);

    const cartTotal = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQty,
                decreaseQty,
                clearCart,
                cartTotal,
                isCartOpen,
                toggleCart,
                darkMode,
                toggleDarkMode,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
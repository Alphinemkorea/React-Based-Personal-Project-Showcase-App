import useCart from "../hooks/useCart";

export default function CartPage() {
    const {
        cart,
        cartTotal,
        increaseQty,
        decreaseQty,
        clearCart,
    } = useCart();

    return (
        <div>
            <h1>Your Cart </h1>

            {cart.length === 0 && <p>Cart is empty</p>}

            {cart.map((item) => (
                <div className="card" key={item.id}>
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>

                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <button onClick={() => decreaseQty(item.id)}>
                            -
                        </button>

                        <span>{item.quantity}</span>

                        <button onClick={() => increaseQty(item.id)}>
                            +
                        </button>
                    </div>

                    <p>Total: ${item.price * item.quantity}</p>
                </div>
            ))}

            <h2>Cart Total: ${cartTotal}</h2>

            {cart.length > 0 && (
                <button onClick={clearCart}>
                    Clear Cart
                </button>
            )}
        </div>
    );
}
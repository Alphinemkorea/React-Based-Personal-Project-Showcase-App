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
        <div className="cart-page">
            <h1>Your Cart </h1>

            {cart.length === 0 && <p>Cart is empty</p>}

            {cart.map((item) => (
                <div className="card" key={item.id}>
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>

                    <div className="cart-quantity-controls">
                        <button type="button" className="icon-button" onClick={() => decreaseQty(item.id)}>
                            -
                        </button>

                        <span>{item.qty}</span>

                        <button type="button" className="icon-button" onClick={() => increaseQty(item.id)}>
                            +
                        </button>
                    </div>

                    <p>Total: ${item.price * item.qty}</p>
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
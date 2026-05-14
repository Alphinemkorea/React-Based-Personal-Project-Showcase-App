import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

export default function Cart() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    increaseQty,
    decreaseQty,
    cartTotal,
    clearCart,
  } = useCart();

  return (
    <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
      {/* HEADER */}
      <div className="cart-header">
        <h2>Cart</h2>

        <button type="button" className="icon-button" onClick={toggleCart}>
          X
        </button>
      </div>

      {/* EMPTY CART */}
      {cart.length === 0 && (
        <p>Cart is empty</p>
      )}

      {/* CART ITEMS */}
      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <div>
            <p>{item.name}</p>
            <span>${item.price}</span>
          </div>

          <div>
              <button type="button" className="icon-button" onClick={() => decreaseQty(item.id)}>
              -
            </button>

            <span className="quantity-value">
              {item.qty}
            </span>

            <button type="button" className="icon-button" onClick={() => increaseQty(item.id)}>
              +
            </button>
          </div>
        </div>
      ))}

      {/* TOTAL */}
      <h3>Total: ${cartTotal}</h3>

      {/* ACTIONS */}
      {cart.length > 0 && (
        <>
          <button onClick={clearCart}>
            Clear Cart
          </button>

          <Link to="/checkout">
            <button type="button" className="cart-action">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
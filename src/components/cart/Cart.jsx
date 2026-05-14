import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    cartOpen,
    setCartOpen,
    getTotal,
  } = useCart();

  return (
    <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Your Cart</h2>

        <button onClick={() => setCartOpen(false)}>
          X
        </button>
      </div>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} />

            <div>
              <h4>{item.name}</h4>
              <p>${item.price}</p>

              <button
                onClick={() =>
                  removeFromCart(item.id)
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {/* TOTAL PRICE */}
      {cart.length > 0 && (
        <div className="cart-total">
          <h3>Total: ${getTotal()}</h3>

          <Link to="/checkout">
            <button className="checkout-btn">
              Proceed To Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
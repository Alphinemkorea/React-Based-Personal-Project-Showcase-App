import useCart from "../hooks/useCart";

export default function CheckoutPage() {
    const { cart, getTotal } = useCart();

    return (
        <div>
            <h1>Checkout Page</h1>

            {cart.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    <h2>Order Summary</h2>

                    {cart.map((item, index) => (
                        <div key={index}>
                            <p>
                                {item.name} - ${item.price}
                            </p>
                        </div>
                    ))}

                    <h2>Total: ${getTotal()}</h2>

                    <button>
                        Confirm Order
                    </button>
                </>
            )}
        </div>
    );
}
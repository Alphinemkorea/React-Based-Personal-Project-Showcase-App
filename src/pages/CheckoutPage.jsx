import useCart from "../hooks/useCart";

export default function CheckoutPage() {
    const { cartTotal } = useCart();

    return (
        <div>
            <h1>Checkout</h1>
            <h2>Total: ${cartTotal}</h2>
        </div>
    );
}
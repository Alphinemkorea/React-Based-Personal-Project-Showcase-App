import useCart from "../hooks/useCart";

export default function CartPage() {
    const { cart } = useCart();

    return (
        <div>
            <h1>Cart Page</h1>

            {cart.map((item, index) => (
                <div key={index}>
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                </div>
            ))}
        </div>
    );
}
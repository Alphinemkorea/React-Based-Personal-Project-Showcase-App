import { useParams } from "react-router-dom";
import useCart from "../hooks/useCart";
import { products } from "../data/products";

export default function ProductPage() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const product = products.find((p) => p.id === parseInt(id));

    if (!product) return <h2>Product not found</h2>;

    return (
        <div className="card">
            <img src={product.image} alt={product.name} className="product-img" />

            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <h2>${product.price}</h2>

            <button onClick={() => addToCart(product)}>
                Add to Cart
            </button>
        </div>
    );
}
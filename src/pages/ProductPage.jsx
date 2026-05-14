import { useParams } from "react-router-dom";
import useCart from "../hooks/useCart";
import { products } from "../components/products/products";

export default function ProductPage() {
    const { id } = useParams();

    const { addToCart } = useCart();

    const product = products.find(
        (p) => p.id === Number(id)
    );

    if (!product) {
        return <h2>Product Not Found</h2>;
    }

    return (
        <div className="product-page">
            <div className="product-page-image">
                <img
                    src={product.image}
                    alt={product.name}
                />
            </div>

            <div className="product-page-details">
                <h1>{product.name}</h1>

                <p>{product.description}</p>

                <h2>${product.price}</h2>

                <button onClick={() => addToCart(product)}>
                    Add To Cart
                </button>
            </div>
        </div>
    );
}
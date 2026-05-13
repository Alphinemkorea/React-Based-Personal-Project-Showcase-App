import { useParams } from "react-router-dom";
import useCart from "../hooks/useCart";
import { products } from "../components/products/products";

export default function ProductPage() {
    const { id } = useParams();
    const { addToCart } = useCart();

    // FIND PRODUCT
    const product = products.find(
        (p) => p.id === Number(id)
    );

    // IF PRODUCT DOESN'T EXIST
    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <div className="product-page">
            {/* IMAGE */}
            <div className="product-page-image">
                <img
                    src={product.image}
                    alt={product.name}
                />
            </div>

            {/* DETAILS */}
            <div className="product-page-details">
                <h1>{product.name}</h1>

                <p className="product-description">
                    {product.description}
                </p>

                <h2>${product.price}</h2>

                <button onClick={() => addToCart(product)}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
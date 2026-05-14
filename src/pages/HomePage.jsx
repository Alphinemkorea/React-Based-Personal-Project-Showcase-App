import { Link } from "react-router-dom";
import { products } from "../components/products/products";

export default function HomePage() {
    const featuredProducts = products.slice(0, 3);

    return (
        <div>
            <section className="hero">
                <div className="hero-text">
                    <h1>
                        Build Your Ultimate Gaming Setup
                    </h1>

                    <p>
                        Shop high-performance gaming PCs,
                        GPUs, RAM, and gaming accessories.
                    </p>

                    <Link to="/shop">
                        <button>Shop Now</button>
                    </Link>
                </div>

                <div className="hero-image">
                    <img
                        src="https://cdn.wallpapersafari.com/67/10/GUDycb.jpg"
                        alt="Gaming Setup"
                    />
                </div>
            </section>

            <h2 className="section-title">
                Featured Products
            </h2>

            <div className="grid">
                {featuredProducts.map((p) => (
                    <div className="card" key={p.id}>
                        <img
                            src={p.image}
                            alt={p.name}
                            className="product-img"
                        />

                        <h3>{p.name}</h3>

                        <p>${p.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
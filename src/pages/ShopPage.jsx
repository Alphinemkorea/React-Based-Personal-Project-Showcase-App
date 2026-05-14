import { useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { products } from "../components/products/products";

export default function ShopPage() {
  const { addToCart } = useCart();

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Gaming Tech Store </h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="grid">
        {filteredProducts.map((p) => (
          <div className="card" key={p.id}>
            <Link to={`/product/${p.id}`}>
              <img
                src={p.image}
                alt={p.name}
                className="product-img"
              />
            </Link>

            <h3>{p.name}</h3>

            <p>{p.description}</p>

            <p>${p.price}</p>

            <button onClick={() => addToCart(p)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
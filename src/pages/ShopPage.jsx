import { useState } from "react";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";
import { products } from "../components/products/products";

export default function ShopPage() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Gaming Tech Store </h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search GPU, PC, RAM..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          marginTop: "10px",
        }}
      />

      {/* PRODUCTS */}
      <div className="grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div className="card" key={p.id}>
              <Link to={`/product/${p.id}`}>
                <img src={p.image} className="product-img" />
              </Link>

              <h3>{p.name}</h3>
              <p className="description">
                {p.description}
              </p>
              <p>${p.price}</p>

              <button onClick={() => addToCart(p)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found </p>
        )}
      </div>
    </div>
  );
}
import React, { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const ShopPage = () => {
  const [products, setProducts] = useState([]);

  // Add new product
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          My Shop Dashboard
        </h1>

        {/* Product Form */}
        <div className="mb-10">
          <ProductForm onAddProduct={addProduct} />
        </div>

        {/* Product List */}
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default ShopPage;

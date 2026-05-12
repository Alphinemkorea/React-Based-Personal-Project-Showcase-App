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
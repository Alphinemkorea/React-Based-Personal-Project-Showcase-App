import React from "react";

const ProductList = ({ products = [] }) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Product List</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden border"
            >
              {/* Product Image */}
              {product.image ? (
                <img
                  src={
                    typeof product.image === "string"
                      ? product.image
                      : URL.createObjectURL(product.image)
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}

              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>

                <p className="text-gray-600 mt-1">
                  Category: {product.category}
                </p>

                <p className="text-blue-600 font-bold mt-2">
                  ${product.price}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Stock: {product.stock}
                </p>

                <p className="text-gray-700 mt-3 text-sm line-clamp-3">
                  {product.description}
                </p>

                <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
import { useState } from "react";
import { products as initialProducts } from "../components/products/products";

export default function AdminPage() {
  const [products, setProducts] =
    useState(initialProducts);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // ADD PRODUCT
  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      image,
    };

    setProducts([...products, newProduct]);

    setName("");
    setPrice("");
    setImage("");
  };

  // DELETE PRODUCT
  const deleteProduct = (id) => {
    setProducts(
      products.filter((p) => p.id !== id)
    );
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* FORM */}
      <div>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <button onClick={addProduct}>
          Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>
                <button
                  onClick={() =>
                    deleteProduct(p.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
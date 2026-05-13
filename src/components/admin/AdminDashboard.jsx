import { useState } from "react";
import { products as initialProducts } from "../../components/products/products";

export default function AdminDashboard() {
    const [products, setProducts] = useState(initialProducts);

    // NEW PRODUCT STATE
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
        description: "",
    });

    // EDIT STATE
    const [editingId, setEditingId] = useState(null);

    const [editData, setEditData] = useState({
        name: "",
        price: "",
        image: "",
        description: "",
    });

    // ADD PRODUCT
    const addProduct = () => {
        if (
            !newProduct.name ||
            !newProduct.price ||
            !newProduct.image ||
            !newProduct.description
        ) {
            alert("Please fill all fields");
            return;
        }

        const product = {
            id: Date.now(),
            name: newProduct.name,
            price: Number(newProduct.price),
            image: newProduct.image,
            description: newProduct.description,
        };

        setProducts([...products, product]);

        // RESET FORM
        setNewProduct({
            name: "",
            price: "",
            image: "",
            description: "",
        });
    };

    // DELETE PRODUCT
    const deleteProduct = (id) => {
        const filteredProducts = products.filter(
            (product) => product.id !== id
        );

        setProducts(filteredProducts);
    };

    // START EDITING
    const startEdit = (product) => {
        setEditingId(product.id);

        setEditData({
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
        });
    };

    // SAVE EDIT
    const saveEdit = (id) => {
        const updatedProducts = products.map((product) => {
            if (product.id === id) {
                return {
                    ...product,
                    name: editData.name,
                    price: Number(editData.price),
                    image: editData.image,
                    description: editData.description,
                };
            }

            return product;
        });

        setProducts(updatedProducts);

        setEditingId(null);
    };

    return (
        <div className="admin-dashboard">
            {/* HEADER */}
            <div className="admin-header">
                <h1>Admin Dashboard 🛠️</h1>
                <p>Manage your gaming products</p>
            </div>

            {/* ADD PRODUCT FORM */}
            <div className="admin-form card">
                <h2>Add Product</h2>

                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) =>
                        setNewProduct({
                            ...newProduct,
                            name: e.target.value,
                        })
                    }
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) =>
                        setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) =>
                        setNewProduct({
                            ...newProduct,
                            image: e.target.value,
                        })
                    }
                />

                <textarea
                    placeholder="Product Description"
                    value={newProduct.description}
                    onChange={(e) =>
                        setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                        })
                    }
                />

                <button onClick={addProduct}>
                    Add Product
                </button>
            </div>

            {/* PRODUCTS */}
            <div className="grid">
                {products.map((product) => (
                    <div className="card admin-product-card" key={product.id}>
                        {editingId === product.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            name: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    type="number"
                                    value={editData.price}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            price: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    type="text"
                                    value={editData.image}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            image: e.target.value,
                                        })
                                    }
                                />

                                <textarea
                                    value={editData.description}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            description: e.target.value,
                                        })
                                    }
                                />

                                <button
                                    onClick={() => saveEdit(product.id)}
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-img"
                                />

                                <h3>{product.name}</h3>

                                <p className="price">
                                    ${product.price}
                                </p>

                                <p className="description">
                                    {product.description}
                                </p>

                                <div className="admin-buttons">
                                    <button
                                        onClick={() => startEdit(product)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteProduct(product.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
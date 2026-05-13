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
import React, { useState } from 'react';
import ProductTable from './ProductTable';

// This is the main admin dashboard component
const AdminDashboard = () => {
    // State to control if the sidebar is open or closed
    const [isOpen, setIsOpen] = useState(true);

    // Sample list of products for the dashboard
    const products = [
        {
            id: 1,
            name: 'Classic Leather Bag',
            category: 'Accessories',
            price: 89.99,
            stock: 14,
            status: 'active',
        },
        {
            id: 2,
            name: 'Minimalist Sneakers',
            category: 'Footwear',
            price: 69.5,
            stock: 8,
            status: 'active',
        },
        {
            id: 3,
            name: 'Cotton Summer Shirt',
            category: 'Apparel',
            price: 34.0,
            stock: 5,
            status: 'archived',
        },
        {
            id: 4,
            name: 'Travel Backpack',
            category: 'Luggage',
            price: 110.0,
            stock: 22,
            status: 'active',
        },
    ];

    // Calculate stats from the products list
    const totalProducts = products.length;
    const lowStockItems = products.filter((product) => product.stock < 10).length;
    const publishedProducts = products.filter((product) => product.status === 'active').length;

    // Stats array for display
    const stats = [
        { id: 1, title: 'Total products', value: totalProducts },
        { id: 2, title: 'Low stock items', value: lowStockItems },
        { id: 3, title: 'Published products', value: publishedProducts },
    ];

    // Function to toggle the sidebar open/close
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Function to handle actions on products (like edit or remove)
    const handleProductAction = (actionType, product) => {
        console.log(`Action: ${actionType} on ${product.name}`);
    };

    return (
        <div className={`admin-dashboard ${isOpen ? '' : 'sidebar-collapsed'}`}>
            {/* Sidebar section */}
            <aside className="admin-sidebar">
                <div className="sidebar-brand">Admin Panel</div>
                <nav className="sidebar-nav">
                    <a href="#overview">Overview</a>
                    <a href="#products">Products</a>
                    <a href="#orders">Orders</a>
                </nav>
            </aside>

            {/* Main content area */}
            <main className="admin-main">
                {/* Header with toggle button */}
                <header className="dashboard-header">
                    <button type="button" className="sidebar-toggle" onClick={toggleSidebar}>
                        {isOpen ? 'Hide menu' : 'Show menu'}
                    </button>
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p>Review inventory, monitor product health, and manage stock easily.</p>
                    </div>
                </header>

                {/* Stats cards section */}
                <section className="dashboard-stats">
                    {stats.map((item) => (
                        <article key={item.id} className="stat-card">
                            <h2>{item.value}</h2>
                            <p>{item.title}</p>
                        </article>
                    ))}
                </section>

                {/* Product table section */}
                <section className="dashboard-table" id="products">
                    <h2>Product inventory</h2>
                    <ProductTable products={products} onAction={handleProductAction} />
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;

import React, { useState } from 'react';
import ProductTable from './ProductTable';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

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

  const totalProducts = products.length;
  const lowStockItems = products.filter((product) => product.stock < 10).length;
  const publishedProducts = products.filter((product) => product.status === 'active').length;

  const stats = [
    { id: 1, title: 'Total products', value: totalProducts },
    { id: 2, title: 'Low stock items', value: lowStockItems },
    { id: 3, title: 'Published products', value: publishedProducts },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleProductAction = (actionType, product) => {
    console.log(`Action: ${actionType} on ${product.name}`);
  };

  return (
    <div className={`admin-dashboard ${isOpen ? '' : 'sidebar-collapsed'}`}>
      <aside className="admin-sidebar">
        <div className="sidebar-brand">Admin Panel</div>
        <nav className="sidebar-nav">
          <a href="#overview">Overview</a>
          <a href="#products">Products</a>
          <a href="#orders">Orders</a>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="dashboard-header">
          <button type="button" className="sidebar-toggle" onClick={toggleSidebar}>
            {isOpen ? 'Hide menu' : 'Show menu'}
          </button>
          <div>
            <h1>Admin Dashboard</h1>
            <p>Review inventory, monitor product health, and manage stock easily.</p>
          </div>
        </header>

        <section className="dashboard-stats">
          {stats.map((item) => (
            <article key={item.id} className="stat-card">
              <h2>{item.value}</h2>
              <p>{item.title}</p>
            </article>
          ))}
        </section>

        <section className="dashboard-table" id="products">
          <h2>Product inventory</h2>
          <ProductTable products={products} onAction={handleProductAction} />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;

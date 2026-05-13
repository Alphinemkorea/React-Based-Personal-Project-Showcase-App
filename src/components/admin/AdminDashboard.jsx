import React, { useMemo, useState } from 'react';
import ProductTable from './ProductTable';

const AdminDashboard = () => {
  // Sidebar open/close state for responsive admin layout
  const [isOpen, setIsOpen] = useState(true);

  // Example product inventory passed into the table component
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

  // Derive dashboard statistics from the product inventory
  const stats = useMemo(
    () => [
      { id: 1, title: 'Total products', value: products.length },
      {
        id: 2,
        title: 'Low stock items',
        value: products.filter((product) => product.stock < 10).length,
      },
      {
        id: 3,
        title: 'Published products',
        value: products.filter((product) => product.status === 'active').length,
      },
    ],
    [products]
  );

  const toggleSidebar = () => {
    setIsOpen((current) => !current);
  };

  const handleProductAction = (actionType, product) => {
    // Placeholder action handler for edit/remove buttons
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

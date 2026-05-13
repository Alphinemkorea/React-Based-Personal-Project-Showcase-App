import React, { useState } from 'react';

// This component shows a table of products with search and filter options
const ProductTable = ({ products = [], onAction = () => {} }) => {
  // State for the search text
  const [search, setSearch] = useState('');
  // State for the status filter
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter the products based on search and status
  const filteredProducts = products.filter((product) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="product-table-section">
      {/* Controls for search and filter */}
      <div className="table-controls">
        <div className="search-control">
          <label htmlFor="search" className="label">
            Search products
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or category"
            className="input"
          />
        </div>

        <div className="filter-control">
          <label htmlFor="status" className="label">
            Status
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="select"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* The product table */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>{product.status}</td>
                <td>
                  <button
                    type="button"
                    className="action-button"
                    onClick={() => onAction('edit', product)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="action-button secondary"
                    onClick={() => onAction('remove', product)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="empty-row">
                No products match this search or filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Summary of how many products are shown */}
      <div className="table-summary">
        <p>
          Showing {filteredProducts.length} of {products.length} products.
        </p>
      </div>
    </div>
  );
};

export default ProductTable;

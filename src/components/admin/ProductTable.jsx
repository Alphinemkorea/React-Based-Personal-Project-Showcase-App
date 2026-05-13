import React, { useMemo, useState } from 'react';

const ProductTable = ({ products = [], onAction = () => {} }) => {
  // Local search state for filtering product rows by name or category
  const [search, setSearch] = useState('');
  // Local status filter state to toggle between active, archived, and all products
  const [statusFilter, setStatusFilter] = useState('all');

  // Memoize the filtered product list so this filter logic only runs when inputs change
  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === 'all' || product.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [products, search, statusFilter]);

  return (
    <div className="product-table-section">
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

      <div className="table-summary">
        <p>
          Showing {filteredProducts.length} of {products.length} products.
        </p>
      </div>
    </div>
  );
};

export default ProductTable;

export function ProductCard({ product, selected, onSelect }) {
  return (
    <article className={`product-card ${selected ? 'selected' : ''}`} onClick={() => onSelect(product)}>
      <div>
        <h3>{product.name}</h3>
        <p>{product.origin}</p>
      </div>
      <span>${product.price.toFixed(2)}</span>
    </article>
  )
}
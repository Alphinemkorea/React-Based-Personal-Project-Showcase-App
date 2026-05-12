import { useEffect, useId, useState } from 'react'

export function ProductDetails({ product, onSave }) {
  const nameId = useId()
  const originId = useId()
  const descId = useId()
  const priceId = useId()

  const [formData, setFormData] = useState({
    name: product.name,
    origin: product.origin,
    description: product.description,
    price: product.price,
  })

  useEffect(() => {
    setFormData({
      name: product.name,
      origin: product.origin,
      description: product.description,
      price: product.price,
    })
  }, [product])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }))
    setMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      await onSave(product.id, {
        name: formData.name,
        origin: formData.origin,
        description: formData.description,
        price: formData.price,
      })
      setMessage('Product updated successfully')
    } catch (error) {
      setMessage(error.message || 'Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="product-details">
      <header>
        <h2>Product details</h2>
        <p>Update product fields and save changes to the backend.</p>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor={nameId}>Name</label>
        <input id={nameId} name="name" value={formData.name} onChange={handleChange} />

        <label htmlFor={originId}>Origin</label>
        <input id={originId} name="origin" value={formData.origin} onChange={handleChange} />

        <label htmlFor={descId}>Description</label>
        <textarea id={descId} name="description" value={formData.description} onChange={handleChange} rows="4" />

        <label htmlFor={priceId}>Price</label>
        <input
          id={priceId}
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
        />

        <div className="product-details-actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        </div>
        {message && <p className="status-message">{message}</p>}
      </form>
    </section>
  )
}
import { useParams, useNavigate } from 'react-router-dom'
import { products as allProducts } from '../mocks/products.json'
import { FullStarIcon, HalfStarIcon, EmptyStarIcon, AddToCartIcon, RemoveFromCartIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.js'
import { useState, useEffect } from 'react'
import './ProductDetail.css'

const StarRating = ({ rating, size = 'medium' }) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FullStarIcon key={i} />)
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<HalfStarIcon key={i} />)
    } else {
      stars.push(<EmptyStarIcon key={i} />)
    }
  }
  
  return (
    <div className={`stars ${size}`}>
      {stars}
    </div>
  )
}

export function ProductDetail () {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, removeFromCart, cart } = useCart()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const product = allProducts.find(p => p.id === parseInt(id))
  
  // Scroll al inicio cuando se carga el producto
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [id])
  
  if (!product) {
    return (
      <div className='product-detail-container'>
        <div className='content-wrapper'>
          <button onClick={() => navigate('/')} className='back-button'>
            ← Volver a la tienda
          </button>
          <div className='not-found'>
            <h2>Producto no encontrado</h2>
          </div>
        </div>
      </div>
    )
  }
  
  const isProductInCart = cart.some(item => item.id === product.id)
  
  const hasSignificantDiscount = product.discountPercentage > 5
  const discountedPrice = hasSignificantDiscount
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price
  
  return (
    <div className='product-detail-container'>
      <div className='content-wrapper'>
        <button onClick={() => navigate('/')} className='back-button'>
          ← Volver a la tienda
        </button>
        
        <div className='product-detail'>
          <div className='product-detail-left'>
            <div className='product-image-container'>
              <img 
                src={product.images && product.images.length > 0 ? product.images[currentImageIndex] : product.thumbnail} 
                alt={product.title} 
              />
              {product.images && product.images.length > 1 && (
                <>
                  <button 
                    className='detail-carousel-btn detail-carousel-btn-prev' 
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button 
                    className='detail-carousel-btn detail-carousel-btn-next' 
                    onClick={() => setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                  >
                    <ChevronRightIcon />
                  </button>
                </>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className='product-thumbnails'>
                {product.images.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt={`${product.title} ${index + 1}`}
                    className={currentImageIndex === index ? 'active' : ''}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className='product-detail-right'>
            <div className='product-header'>
              <span className='product-brand'>{product.brand}</span>
              <h1 className='product-title'>{product.title}</h1>
              
              <div className='rating-summary'>
                <StarRating rating={product.rating} size='large' />
                <span className='rating-number'>{product.rating.toFixed(1)}</span>
                <span className='review-count'>({product.reviews.length} valoraciones)</span>
              </div>
            </div>
            
            <div className='product-price-section'>
              {hasSignificantDiscount ? (
                <>
                  <span className='product-discounted-price'>${discountedPrice}</span>
                  <span className='product-original-price'>${product.price}</span>
                  <span className='product-discount-badge'>-{product.discountPercentage.toFixed(0)}%</span>
                </>
              ) : (
                <span className='product-regular-price'>${product.price}</span>
              )}
            </div>
            
            <p className='product-description'>{product.description}</p>
            
            <div className='product-info-grid'>
              <div className='info-item'>
                <span className='info-label'>Stock:</span>
                <span className='info-value'>{product.stock} unidades</span>
              </div>
              <div className='info-item'>
                <span className='info-label'>Categoría:</span>
                <span className='info-value'>{product.category}</span>
              </div>
              <div className='info-item'>
                <span className='info-label'>SKU:</span>
                <span className='info-value'>{product.sku}</span>
              </div>
              <div className='info-item'>
                <span className='info-label'>Garantía:</span>
                <span className='info-value'>{product.warrantyInformation}</span>
              </div>
              <div className='info-item'>
                <span className='info-label'>Envío:</span>
                <span className='info-value'>{product.shippingInformation}</span>
              </div>
              <div className='info-item'>
                <span className='info-label'>Política de devolución:</span>
                <span className='info-value'>{product.returnPolicy}</span>
              </div>
            </div>
            
            <div className='product-actions'>
              {isProductInCart ? (
                <button 
                  onClick={() => removeFromCart(product)} 
                  className='remove-button'
                >
                  <RemoveFromCartIcon />
                  Quitar del carrito
                </button>
              ) : (
                <button 
                  onClick={() => addToCart(product)} 
                  className='add-button'
                >
                  <AddToCartIcon />
                  Añadir al carrito
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className='reviews-section'>
          <h2>Valoraciones de clientes</h2>
          
          <div className='reviews-summary'>
            <div className='summary-left'>
              <div className='average-rating'>{product.rating.toFixed(1)}</div>
              <StarRating rating={product.rating} size='large' />
              <div className='total-reviews'>{product.reviews.length} valoraciones</div>
            </div>
          </div>
          
          <div className='reviews-list'>
            {product.reviews.map((review, index) => (
              <div key={index} className='review-card'>
                <div className='review-header'>
                  <div className='reviewer-info'>
                    <span className='reviewer-name'>{review.reviewerName}</span>
                    <span className='review-date'>
                      {new Date(review.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <StarRating rating={review.rating} size='small' />
                </div>
                <p className='review-comment'>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

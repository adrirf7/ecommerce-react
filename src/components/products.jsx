import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon, FullStarIcon, HalfStarIcon, EmptyStarIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.js'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ImageCarousel = ({ images, title, onImageClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  if (!images || images.length === 0) {
    return (
      <img
        src={`https://placehold.co/400x300/4c51bf/white?text=${encodeURIComponent(title)}&font=roboto`}
        alt={title}
        onClick={onImageClick}
      />
    )
  }
  
  const handlePrevImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }
  
  const handleNextImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }
  
  const handleImageError = (e) => {
    e.target.src = `https://placehold.co/400x300/4c51bf/white?text=${encodeURIComponent(title)}&font=roboto`
  }
  
  return (
    <div className='image-carousel'>
      <img
        src={images[currentImageIndex]}
        alt={`${title} ${currentImageIndex + 1}`}
        onError={handleImageError}
        onClick={onImageClick}
      />
      {images.length > 1 && (
        <>
          <button className='carousel-btn carousel-btn-prev' onClick={handlePrevImage}>
            <ChevronLeftIcon />
          </button>
          <button className='carousel-btn carousel-btn-next' onClick={handleNextImage}>
            <ChevronRightIcon />
          </button>
          <div className='carousel-indicators'>
            {images.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const StarRating = ({ rating, reviewCount }) => {
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
    <div className='rating-container'>
      <div className='stars'>
        {stars}
      </div>
      <span className='review-count'>({reviewCount})</span>
    </div>
  )
}

export function Products ({ products, openCart, currentPage, setCurrentPage, productsPerPage }) {
  const { addToCart, removeFromCart, cart } = useCart()
  const navigate = useNavigate()

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  const handleImageError = (e, productTitle) => {
    e.target.src = `https://placehold.co/400x300/4c51bf/white?text=${encodeURIComponent(productTitle)}&font=roboto`
  }

  // Calcular productos a mostrar
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)

  // Scroll al inicio al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <main className='products'>
      <ul>
        {currentProducts.map(product => {
          const isProductInCart = checkProductInCart(product)
          const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
          
          // Verificar si el descuento es significativo (cambia los dos primeros dígitos de los céntimos)
          const priceInCents = Math.floor(product.price * 100)
          const discountedPriceInCents = Math.floor(discountedPrice * 100)
          const hasSignificantDiscount = Math.floor(priceInCents / 10) !== Math.floor(discountedPriceInCents / 10)

          return (
            <li key={product.id}>
              <div 
                className='product-clickable' 
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <ImageCarousel 
                  images={product.images} 
                  title={product.title}
                  onImageClick={() => navigate(`/product/${product.id}`)}
                />
                <div className='brand'>
                  {product.brand || 'Sin marca'}
                </div>
                <div className='title'>
                  <strong>{product.title}</strong>
                </div>
                {hasSignificantDiscount ? (
                  <div className='price-container'>
                    <span className='discounted-price'>${discountedPrice}</span>
                    <span className='original-price'>${product.price}</span>
                    <span className='discount-badge'>-{product.discountPercentage.toFixed(0)}%</span>
                  </div>
                ) : (
                  <div className='price-container'>
                    <span className='regular-price'>${product.price}</span>
                  </div>
                )}
                <StarRating rating={product.rating} reviewCount={product.reviews.length} />
              </div>
              <div>
                <button
                  className={isProductInCart ? 'remove-button' : 'add-button'}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (isProductInCart) {
                      removeFromCart(product)
                    } else {
                      addToCart(product)
                      openCart()
                    }
                  }}
                >
                  {isProductInCart ? 'Eliminar del carrito' : 'Añadir al carrito'}
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      {totalPages > 1 && (
        <div className='pagination'>
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='pagination-btn'
          >
            Anterior
          </button>
          
          <div className='pagination-numbers'>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                >
                  {pageNumber}
                </button>
              )
            })}
          </div>

          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='pagination-btn'
          >
            Siguiente
          </button>
        </div>
      )}
    </main>
  )
}
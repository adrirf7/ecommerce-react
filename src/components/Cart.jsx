import './Cart.css'

import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.js'

function CartItem ({ thumbnail, price, title, quantity, addToCart, decreaseQuantity, removeFromCart }) {
  return (
    <li>
      <img
        src={thumbnail}
        alt={title}
      />
      <div className='cart-item-info'>
        <strong>{title}</strong>
        <span className='cart-item-price'>${price}</span>
      </div>

      <footer>
        <div className='quantity-controls'>
          <button onClick={decreaseQuantity} className='quantity-btn'>-</button>
          <span className='quantity-display'>{quantity}</span>
          <button onClick={addToCart} className='quantity-btn'>+</button>
        </div>
        <button onClick={removeFromCart} className='remove-btn' title='Eliminar producto'>
          <RemoveFromCartIcon />
        </button>
      </footer>
    </li>
  )
}

export function Cart ({ isOpen, setIsOpen }) {
  const { cart, clearCart, addToCart, removeFromCart, decreaseQuantity } = useCart()

  return (
    <>
      <aside className={`cart ${isOpen ? 'cart-open' : ''}`}>
        <div className='cart-header'>
          <h2>Carrito</h2>
          <button onClick={() => setIsOpen(false)} className='close-cart'>×</button>
        </div>
        
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              decreaseQuantity={() => decreaseQuantity(product)}
              removeFromCart={() => removeFromCart(product)}
              {...product}
            />
          ))}
        </ul>

        {cart.length > 0 && (
          <div className='cart-footer'>
            <button onClick={clearCart} className='clear-cart-btn'>
              <ClearCartIcon />
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
      
      {isOpen && <div className='cart-overlay' onClick={() => setIsOpen(false)} />}
    </>
  )
}
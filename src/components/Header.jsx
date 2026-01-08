import {Filters} from "./Filters.jsx"
import {MarketlyLogo, CartIcon} from "./Icons.jsx"
import { useCart } from '../hooks/useCart.js'

export function Header ({ onCartClick }){
    const { cart } = useCart()
    
    return (
        <header>
            <MarketlyLogo />
            <Filters/>
            <label className='cart-button' onClick={onCartClick}>
                <CartIcon />
                {cart.length > 0 && <span className='cart-count'>{cart.length}</span>}
            </label>
        </header>
    )
}
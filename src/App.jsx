import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products.jsx'
import { ProductDetail } from './components/ProductDetail.jsx'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { useFilters } from './hooks/useFilters.js'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/cart.jsx'
import { useState, useEffect } from 'react'

function Home ({ isCartOpen, setIsCartOpen, isScrolled }) {
  const { filterProducts } = useFilters()
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 20 // 5 filas x 4 columnas

  const filteredProducts = filterProducts(initialProducts)
  
  // Resetear a página 1 cuando cambien los filtros
  useEffect(() => {
    setCurrentPage(1)
  }, [filteredProducts.length])

  return (
    <>
      <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <Header onCartClick={() => setIsCartOpen(!isCartOpen)} />
      </div>
      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      <div className='content-wrapper'>
        <Products 
          products={filteredProducts} 
          openCart={() => setIsCartOpen(true)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
        />
        <Footer />
      </div>
    </>
  )
}

function App () {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route 
            path='/' 
            element={
              <Home 
                isCartOpen={isCartOpen} 
                setIsCartOpen={setIsCartOpen} 
                isScrolled={isScrolled} 
              />
            } 
          />
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
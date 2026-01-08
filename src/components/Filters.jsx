import { useId } from 'react'
import { useFilters } from '../hooks/useFilters.js'
import './Filters.css'

export function Filters () {
  const { filters, setFilters } = useFilters()

  const maxPriceFilterId = useId()
  const maxPriceInputId = useId()
  const categoryFilterId = useId()
  const brandFilterId = useId()
  const searchFilterId = useId()

  const handleChangeMaxPrice = (event) => {
    const value = event.target.value
    setFilters(prevState => ({
      ...prevState,
      maxPrice: value
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }

  const handleChangeBrand = (event) => {
    setFilters(prevState => ({
      ...prevState,
      brand: event.target.value
    }))
  }

  const handleChangeSearch = (event) => {
    setFilters(prevState => ({
      ...prevState,
      search: event.target.value
    }))
  }

  return (
    <section className='filters'>

      <div className='filter-price'>
        <label htmlFor={maxPriceFilterId}>Precio hasta:</label>
        <input
          type='range'
          id={maxPriceFilterId}
          min='0'
          max='3000'
          onChange={handleChangeMaxPrice}
          value={filters.maxPrice}
        />
        <input
          type='number'
          id={maxPriceInputId}
          min='0'
          max='3000'
          onChange={handleChangeMaxPrice}
          value={filters.maxPrice}
          className='price-input'
        />
      </div>

            <div>
        <input
          type='text'
          id={searchFilterId}
          placeholder='Buscar productos...'
          onChange={handleChangeSearch}
          value={filters.search}
          className='search-input'
        />
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='beauty'>Belleza</option>
          <option value='fragrances'>Fragancias</option>
          <option value='furniture'>Muebles</option>
          <option value='groceries'>Comestibles</option>
        </select>
      </div>

      <div>
        <label htmlFor={brandFilterId}>Marca</label>
        <select id={brandFilterId} onChange={handleChangeBrand} value={filters.brand}>
          <option value='all'>Todas</option>
          <option value='Annibale Colombo'>Annibale Colombo</option>
          <option value='Bath Trends'>Bath Trends</option>
          <option value='Calvin Klein'>Calvin Klein</option>
          <option value='Chanel'>Chanel</option>
          <option value='Chic Cosmetics'>Chic Cosmetics</option>
          <option value='Dior'>Dior</option>
          <option value='Dolce & Gabbana'>Dolce & Gabbana</option>
          <option value='Essence'>Essence</option>
          <option value='Furniture Co.'>Furniture Co.</option>
          <option value='Glamour Beauty'>Glamour Beauty</option>
          <option value='Gucci'>Gucci</option>
          <option value='Knoll'>Knoll</option>
          <option value='Nail Couture'>Nail Couture</option>
          <option value='Velvet Touch'>Velvet Touch</option>
        </select>
      </div>

    </section>

  )
}
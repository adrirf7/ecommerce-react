import { useContext } from "react";
import { FiltersContext } from "../context/filter.jsx";

export function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext);

  const filterProducts = (products) => {
    return products.filter((product) => {
      const matchesPrice = product.price <= filters.maxPrice;
      const matchesCategory = filters.category === "all" || product.category === filters.category;
      const matchesBrand = filters.brand === "all" || product.brand === filters.brand;
      const matchesSearch =
        filters.search === "" || product.title.toLowerCase().includes(filters.search.toLowerCase()) || product.description.toLowerCase().includes(filters.search.toLowerCase());

      return matchesPrice && matchesCategory && matchesBrand && matchesSearch;
    });
  };

  return { filters, filterProducts, setFilters };
}

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import ProductList from './components/ProductList';
import useProducts from './hooks/useProducts';
import './styles/App.css';

function App() {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const { products, loading, error } = useProducts(filters);

  // Сохранение фильтров в URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);

    window.history.replaceState({}, '', `?${params.toString()}`);
  }, [filters]);

  // Восстановление фильтров из URL при загрузке
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialFilters = {
      category: params.get('category') || '',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || ''
    };
    setFilters(initialFilters);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="app">
      <Header />

      <div className="main-content">
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <ProductList
          products={products}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;
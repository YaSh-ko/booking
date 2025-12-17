import { useCallback, useState } from 'react';

export const useFilters = (initialFilters) => {
  const [filters, setFilters] = useState({
    priceMin: initialFilters?.priceMin || 0,
    priceMax: initialFilters?.priceMax || 15000,
    sortBy: initialFilters?.sortBy || 'priceAsc',
  });

  const updatePriceRangs = useCallback((min, max) => {
    setFilters((prev) => ({ ...prev, priceMin: min, priceMax: max }));
  }, []);

  const updateSort = useCallback((sortBy) => {
    setFilters((prev) => ({ ...prev, sortBy: sortBy }));
  }, []);

  return { filters, updatePriceRangs, updateSort };
};

export const filterHotels = (hotels = [], filters) => {
  let filteredHotels = [...hotels];

  filteredHotels = filteredHotels.filter(
    (hotel) => hotel.price > filters.priceMin && hotel.price < filters.priceMax,
  );

  switch (filters.sortBy) {
    case 'priceAsc':
      filteredHotels.sort((a, b) => a.price - b.price);
      break;
    case 'priceDesc':
      filteredHotels.sort((a, b) => b.price - a.price);
      break;
    case 'ratingAsc':
      filteredHotels.sort((a, b) => a.rating - b.rating);
      break;
    case 'ratingDesc':
      filteredHotels.sort((a, b) => b.rating - a.rating);
      break;
    // другие варианты сортировки
  }

  return filteredHotels;
};

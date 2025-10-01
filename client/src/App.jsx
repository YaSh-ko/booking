import React, { useState } from 'react'
import { SearchForm } from './components/SearchForm';
import { searchHotels } from './services/api';

function App() {
  const [ hotels, setHotels ] = useState([]);
  const handleSearch = async ( SearchParams ) => {
    try {
      const result = await searchHotels(SearchParams);
      setHotels(result);
      console.log(result);
    }
    catch (err) {
      console.error('Ошибка поиска');
    }
  }
  return (
    <div>
      <SearchForm onSearch = {handleSearch}/>  
        
    </div>
  )
}

export default App
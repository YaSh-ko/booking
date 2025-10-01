import { HomePage } from './pages/homePage/HomePage';
import { SearchResultsPage } from './pages/searchResultsPage/searchResultsPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/search' element={<SearchResultsPage/>}/>  
      </Routes>        
  )
}

export default App
import { HomePage } from './pages/homePage/HomePage';
import { HotelsListPage } from './pages/hotelsListPage/HotelsListPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/search' element={<HotelsListPage/>}/>  
      </Routes>        
  )
}

export default App
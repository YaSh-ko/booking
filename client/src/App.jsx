import { AboutUs } from './pages/aboutUs/AboutUs';
import { HomePage } from './pages/homePage/HomePage';
import { HotelsListPage } from './pages/hotelsListPage/HotelsListPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/search' element={<HotelsListPage/>}/>  
        <Route path='/about' element={<AboutUs/>}></Route>
      </Routes>        
  )
}

export default App
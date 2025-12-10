import { AboutUs } from './pages/aboutUs/AboutUs';
import { HomePage } from './pages/homePage/HomePage';
import { Contacts } from './pages/contacts/Contacts';
import { Help } from './pages/help/Help';
import { HotelsListPage } from './pages/hotelsListPage/HotelsListPage';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import { HotelPage } from './pages/hotelPage/HotelPage';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<HotelsListPage />} />
        <Route path="/hotel/details/:id" element={<HotelPage />} />
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/contacts" element={<Contacts />}></Route>
        <Route path="/help" element={<Help />}></Route>
      </Routes>
    </UserProvider>
  );
}

export default App;

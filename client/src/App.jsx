import { AboutUs } from './pages/aboutUs/AboutUs';
import { HomePage } from './pages/homePage/HomePage';
import { Contacts } from './pages/contacts/Contacts';
import { Help } from './pages/help/Help';
import { HotelsListPage } from './pages/hotelsListPage/HotelsListPage';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import { HotelPage } from './pages/hotelPage/HotelPage';
import { HotelsFavorites } from './pages/hotelsFavorites/HotelsFavorites';
import { SearchProvider } from './context/searchContext';
import { BookingPage } from './pages/bookingPage/BookingPage';

function App() {
  return (
    <SearchProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<HotelsListPage />} />
          <Route path="/hotel/details/:id" element={<HotelPage />} />
          <Route path="/hotel/booking" element={<BookingPage />} />
          <Route path="/hotels/favorites" element={<HotelsFavorites />} />
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/contacts" element={<Contacts />}></Route>
          <Route path="/help" element={<Help />}></Route>
        </Routes>
      </UserProvider>
    </SearchProvider>
  );
}

export default App;

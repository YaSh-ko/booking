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
import { Toaster } from 'react-hot-toast';
import { BookingPage } from './pages/bookingPage/BookingPage';
import { AddedBookingsPage } from './pages/addedBookingsPage/addedBookingsPage';

function App() {
  return (
    <SearchProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<HotelsListPage />} />
          <Route path="/hotel/details/:id" element={<HotelPage />} />
          <Route path="/hotel/booking/:roomId" element={<BookingPage />} />
          <Route path="/hotels/favorites" element={<HotelsFavorites />} />
          <Route path="/bookings" element={<AddedBookingsPage />} />
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/contacts" element={<Contacts />}></Route>
          <Route path="/help" element={<Help />}></Route>
        </Routes>
        <Toaster
          position="top-center" // можно изменить на "bottom-center", "top-right" и т.д.
          reverseOrder={false}
          gutter={12}
          containerStyle={{
            top: 20,
            left: 20,
            right: 20,
            zIndex: 9999,
          }}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#F4F4F4',
              color: '#5A86D6',
              fontSize: '16px',
              borderRadius: '12px',
              padding: '16px 20px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            success: {
              duration: 3000,
              icon: '✅',
            },
            error: {
              duration: 5000,
              icon: '❌',
            },
            loading: {
              duration: Infinity,
            },
          }}
        />
      </UserProvider>
    </SearchProvider>
  );
}

export default App;

import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import OfferDetails from './pages/OfferDetails';
import { BookingProvider } from './context/BookingProvider';

function App() {
  const isOwnerPath = useLocation().pathname.includes('owner');

  return (
    <BookingProvider>
      {!isOwnerPath && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/rooms'
            element={<AllRooms />}
          />
          <Route
            path='/rooms/:id'
            element={<RoomDetails />}
          />
          <Route
            path='/my-bookings'
            element={<MyBookings />}
          />
          <Route
            path='/offer/:id'
            element={<OfferDetails />}
          />
        </Routes>
      </div>
      <Footer />
    </BookingProvider>
  );
}

export default App;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  assets,
  facilityIcons,
  roomCommonData,
  roomsDummyData,
  userDummyData,
} from '../assets/assets';
import StarRating from '../components/StarRating';
import { useBookings } from '../context/BookingContext';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const [room, setRoom] = useState(null);
  const [mainImage, setmainImage] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    room && setRoom(room);
    room && setmainImage(room.images[0]);
  }, [id]);

  const handleBookRoom = async (e) => {
    e.preventDefault();
    setIsBooking(true);

    const formData = new FormData(e.target);
    const checkInDate = formData.get('checkInDate');
    const checkOutDate = formData.get('checkOutDate');
    const guests = Number.parseInt(formData.get('guests'));

    if (!checkInDate || !checkOutDate || !guests) {
      alert('Please fill in all fields');
      setIsBooking(false);
      return;
    }

    // Calculate total price based on nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = room.pricePerNight * nights;

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const bookingData = {
      user: userDummyData,
      room: room,
      hotel: room.hotel,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      totalPrice: totalPrice,
      guests: guests,
      status: 'confirmed',
      paymentMethod: 'Credit Card',
      isPaid: true,
      bookingType: 'room',
    };

    addBooking(bookingData);
    setIsBooking(false);

    // Redirect to my bookings page
    navigate('/my-bookings');
  };

  return (
    room && (
      <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
          <h1 className='text-3xl md:text-4xl font-playfair'>
            {room.hotel.name}
            <span className='font-inter text-sm'>({room.roomType})</span>
          </h1>
          <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>
            20% OFF
          </p>
        </div>
        <div className='flex items-center gap-1 mt-2'>
          <StarRating />
          <p className='ml-2'>200+ reviews </p>
        </div>
        <div className='flex items-center gap-1 text-gray-500 mt-2'>
          <img
            src={assets.locationIcon || '/placeholder.svg'}
            alt='location icon'
          />
          <span>{room.hotel.address}</span>
        </div>
        <div className='flex flex-col lg:flex-row mt-6 gap-6'>
          <div className='lg:w-1/2 w-full'>
            <img
              src={mainImage || '/placeholder.svg'}
              alt='room image'
              className='w-full rounded-xl shadow-lg object-cover'
            />
          </div>
          <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  src={image || '/placeholder.svg'}
                  alt='image'
                  key={index}
                  onClick={() => setmainImage(image)}
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                    mainImage === image && 'outline-3 outline-orange-500'
                  }`}
                />
              ))}
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between mt-10'>
          <div className='flex flex-col'>
            <h1 className='text-3xl md:text-4xl font-playfair'>
              Experience Luxury Like Never Before
            </h1>
            <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'
                >
                  <img
                    src={facilityIcons[item] || '/placeholder.svg'}
                    alt='icon'
                    className='w-5 h-5'
                  />
                  <p className='text-xs'>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
        </div>
        {/* check-in and check out  */}
        <form
          onSubmit={handleBookRoom}
          className='flex flex-col md:flex-col lg:flex-row gap-4 bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl text-gray-500'
        >
          <div className='flex flex-col md:flex-row gap-4 md:gap-6 flex-wrap w-full'>
            {/* Check-In */}
            <div className='flex flex-col flex-1 min-w-[150px]'>
              <label
                htmlFor='checkInDate'
                className='font-medium'
              >
                Check-In
              </label>
              <input
                type='date'
                id='checkInDate'
                name='checkInDate'
                className='rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none w-full'
                required
              />
            </div>

            {/* Check-Out */}
            <div className='flex flex-col flex-1 min-w-[150px]'>
              <label
                htmlFor='checkOutDate'
                className='font-medium'
              >
                Check-Out
              </label>
              <input
                type='date'
                id='checkOutDate'
                name='checkOutDate'
                className='rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none w-full'
                required
              />
            </div>

            {/* Guests */}
            <div className='flex flex-col flex-1 min-w-[150px]'>
              <label
                htmlFor='guests'
                className='font-medium'
              >
                Guests
              </label>
              <input
                type='number'
                id='guests'
                name='guests'
                min='1'
                className='rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none w-full'
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isBooking}
            className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md py-3 px-6 w-full lg:w-auto disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isBooking ? 'Booking...' : 'Book Room'}
          </button>
        </form>

        <div className='mt-25 space-y-4'>
          {roomCommonData.map((spec, index) => (
            <div
              key={index}
              className='flex items-start gap-2'
            >
              <img
                src={spec.icon || '/placeholder.svg'}
                alt={`${spec.title}-icon`}
                className='w-6.5'
              />
              <div>
                <p className='text-base'>{spec.title}</p>
                <p className='text-gray-500'>{spec.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
          <p>
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable Two bedroom apartment that has a
            true city feeling. The price quoted is for two guest, at the guest
            slot please mark the number of guests to get the exact price for
            groups. The Guests will be allocated ground floor according to
            availability. You get the comfortable two bedroom apartment that has
            a true city feeling.
          </p>
        </div>
        <div className='flex flex-col items-start gap-4'>
          <div className='flex gap-4'>
            <img
              src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200'
              alt='host'
              className='h-14 w-14 md:h-18 md:w-18 rounded-full'
            />
            <div>
              <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
              <div className='flex items-center mt-1'>
                <StarRating />
                <p className='ml-2'>200+ Reviews</p>
              </div>
            </div>
          </div>
        </div>
        <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>
          Contact Now
        </button>
      </div>
    )
  );
};

export default RoomDetails;

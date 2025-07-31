import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useBookings } from '../context/BookingContext';

const MyBookings = () => {
  const { bookings } = useBookings();

  if (bookings.length === 0) {
    return (
      <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
        <Title
          title='My Bookings'
          subTitle='Easily manage your past, current and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks'
          align='left'
        />
        <div className='max-w-6xl mt-8 w-full text-gray-800'>
          <div className='text-center py-16'>
            <div className='w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center'>
              <svg
                className='w-12 h-12 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              No bookings yet
            </h3>
            <p className='text-gray-600 mb-6'>
              Start exploring our amazing offers and rooms to make your first
              booking!
            </p>
            <div className='flex gap-4 justify-center'>
              <a
                href='/rooms'
                className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              >
                Browse Rooms
              </a>
              <a
                href='/#offers'
                className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors'
              >
                View Offers
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
      <Title
        title='My Bookings'
        subTitle='Easily manage your past, current and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks'
        align='left'
      />
      <div className='max-w-6xl mt-8 w-full text-gray-800'>
        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
          <div className='w-1/3'>Hotels</div>
          <div className='w-1/3'>Date & Timings</div>
          <div className='w-1/3'>Status</div>
        </div>
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'
          >
            <div className='flex flex-col md:flex-row'>
              <img
                src={
                  booking.bookingType === 'offer'
                    ? booking.offerDetails?.image
                    : booking.room?.images[0]
                }
                alt='hotel img'
                className='min-md:w-44 rounded shadow object-cover'
              />
              <div className='flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4'>
                <p className='font-playfair text-2xl'>
                  {booking.hotel.name}
                  {booking.room && (
                    <span className='font-inter text-sm'>
                      ({booking.room.roomType})
                    </span>
                  )}
                </p>
                {booking.bookingType === 'offer' && booking.offerDetails && (
                  <div className='mb-2'>
                    <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                      {booking.offerDetails.priceOff}% OFF -{' '}
                      {booking.offerDetails.title}
                    </span>
                  </div>
                )}
                <div className='flex items-center gap-1 text-sm text-gray-500'>
                  <img
                    src={assets.locationIcon || '/placeholder.svg'}
                    alt='location icon'
                  />
                  <span>{booking.hotel.address}</span>
                </div>
                <div className='flex items-center gap-1 text-sm text-gray-500'>
                  <img
                    src={assets.guestsIcon || '/placeholder.svg'}
                    alt='guest icon'
                  />
                  <span>
                    {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
                <p className='text-base'>Total: ${booking.totalPrice}</p>
              </div>
            </div>
            <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
              <div>
                <p>Check-In:</p>
                <p className='text-gray-500 text-sm'>
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>
              <div>
                <p>Check-Out:</p>
                <p className='text-gray-500 text-sm'>
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>
            </div>
            <div className='flex flex-col items-start justify-center pt-3'>
              <div className='flex items-center gap-2'>
                <div
                  className={`h-3 w-3 rounded-full  ${
                    booking.isPaid ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
                <p
                  className={`text-sm ${
                    booking.isPaid ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {booking.isPaid ? 'Paid' : 'Unpaid'}
                </p>
              </div>
              {!booking.isPaid && (
                <button className='px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer'>
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;

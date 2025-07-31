import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  exclusiveOffers,
  assets,
  hotelDummyData,
  userDummyData,
} from '../assets/assets';
import { useBookings } from '../context/BookingContext';

const OfferDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const [isBooking, setIsBooking] = useState(false);

  // Find the offer by id
  const offer = exclusiveOffers.find((item) => item._id.toString() === id);

  // If offer not found, show not found message
  if (!offer) {
    return (
      <div className='min-h-screen flex items-center justify-center px-6'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>
            Offer Not Found
          </h1>
          <p className='text-gray-600 mb-8'>
            The offer you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to='/'
            className='inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'
          >
            <img
              src={assets.homeIcon || '/placeholder.svg'}
              alt='home'
              className='w-4 h-4'
            />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleBookNow = async () => {
    setIsBooking(true);

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Calculate dates (example: 2 nights from tomorrow)
    const checkInDate = new Date();
    checkInDate.setDate(checkInDate.getDate() + 1);
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + 2);

    // Calculate discounted price (example base price)
    const basePrice = 500;
    const discountedPrice = basePrice * (1 - offer.priceOff / 100);
    const totalPrice = Math.round(discountedPrice * 2); // 2 nights

    const bookingData = {
      user: userDummyData,
      hotel: hotelDummyData,
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      totalPrice: totalPrice,
      guests: 2,
      status: 'confirmed',
      paymentMethod: 'Credit Card',
      isPaid: true,
      bookingType: 'offer',
      offerDetails: {
        title: offer.title,
        description: offer.description,
        priceOff: offer.priceOff,
        expiryDate: offer.expiryDate,
        image: offer.image,
      },
    };

    addBooking(bookingData);
    setIsBooking(false);

    // Redirect to my bookings page
    navigate('/my-bookings');
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div
        className='relative h-[60vh] md:h-[70vh] bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${offer.image})` }}
      >
        {/* Discount Badge */}

        {/* Hero Content */}
        <div className='absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white'>
          <div className='max-w-4xl'>
            <h1 className='text-3xl md:text-5xl font-bold font-playfair mb-4'>
              {offer.title}
            </h1>
            <p className='text-lg md:text-xl text-white/90 mb-6 max-w-2xl'>
              {offer.description}
            </p>
            <div className='flex items-center gap-4 text-sm md:text-base'>
              <div className='flex items-center gap-2'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span>Expires {offer.expiryDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-6 md:px-12 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* Left Column - Offer Details */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Offer Overview */}
            <div className='bg-white rounded-2xl p-8 shadow-sm'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                Offer Overview
              </h2>
              <div className='space-y-4'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg
                      className='w-6 h-6 text-blue-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-800'>
                      Save {offer.priceOff}% on Your Stay
                    </h3>
                    <p className='text-gray-600 text-sm mt-1'>
                      Enjoy significant savings on your luxury accommodation
                      with this exclusive limited-time offer.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg
                      className='w-6 h-6 text-green-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-800'>
                      Premium Amenities Included
                    </h3>
                    <p className='text-gray-600 text-sm mt-1'>
                      Access to all hotel facilities including spa, pool, and
                      complimentary services.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg
                      className='w-6 h-6 text-purple-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-800'>
                      Limited Time Only
                    </h3>
                    <p className='text-gray-600 text-sm mt-1'>
                      This exclusive offer expires on {offer.expiryDate}. Book
                      now to secure your savings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className='bg-white rounded-2xl p-8 shadow-sm'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                Terms & Conditions
              </h2>
              <div className='space-y-3 text-gray-600'>
                <div className='flex items-start gap-3'>
                  <span className='w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0'></span>
                  <p>Offer valid for new bookings only</p>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0'></span>
                  <p>Cannot be combined with other offers or promotions</p>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0'></span>
                  <p>Subject to availability and blackout dates may apply</p>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0'></span>
                  <p>Minimum stay requirements may apply</p>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0'></span>
                  <p>Cancellation policies vary by rate and dates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-2xl p-8 shadow-lg sticky top-6'>
              <div className='text-center mb-6'>
                <div className='inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4'>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  Expires {offer.expiryDate}
                </div>
                <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                  {offer.title}
                </h3>
                <p className='text-gray-600'>{offer.description}</p>
              </div>

              <div className='space-y-4 mb-8'>
                <div className='flex items-center justify-between py-3 border-b border-gray-100'>
                  <span className='text-gray-600'>Discount</span>
                  <span className='font-semibold text-green-600'>
                    {offer.priceOff}% OFF
                  </span>
                </div>
                <div className='flex items-center justify-between py-3 border-b border-gray-100'>
                  <span className='text-gray-600'>Valid Until</span>
                  <span className='font-semibold'>{offer.expiryDate}</span>
                </div>
                <div className='flex items-center justify-between py-3'>
                  <span className='text-gray-600'>Booking Type</span>
                  <span className='font-semibold'>Advance Booking</span>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                disabled={isBooking}
                className='w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isBooking ? 'Booking...' : 'Book This Offer'}
              </button>

              <Link
                to='/rooms'
                className='w-full border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold text-center block hover:border-gray-300 transition-colors'
              >
                View Available Rooms
              </Link>

              <div className='mt-6 pt-6 border-t border-gray-100'>
                <div className='flex items-center gap-3 text-sm text-gray-600'>
                  <svg
                    className='w-5 h-5 text-green-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                    />
                  </svg>
                  <span>Free cancellation available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Offers */}
        <div className='mt-16'>
          <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
            Other Exclusive Offers
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {exclusiveOffers
              .filter((item) => item._id !== offer._id)
              .slice(0, 2)
              .map((item) => (
                <Link
                  key={item._id}
                  to={`/offer/${item._id}`}
                  className='group relative flex flex-col items-start justify-between gap-1 pt-12 px-6 pb-6 rounded-xl text-white bg-no-repeat bg-cover bg-center min-h-[250px] hover:scale-105 transition-transform'
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className='absolute inset-0 bg-black/20 rounded-xl group-hover:bg-black/30 transition-colors'></div>
                  <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full z-10'>
                    {item.priceOff}% OFF
                  </p>
                  <div className='relative z-10'>
                    <p className='text-xl font-medium font-playfair mb-2'>
                      {item.title}
                    </p>
                    <p className='text-sm text-white/80'>{item.description}</p>
                    <p className='text-sm mt-2'>Expires {item.expiryDate}</p>
                  </div>
                  <div className='flex items-center gap-2 font-medium cursor-pointer mt-4 relative z-10 group-hover:gap-3 transition-all'>
                    View Offer
                    <img
                      src={assets.arrowIcon || '/placeholder.svg'}
                      alt='arrow icon'
                      className='invert group-hover:translate-x-1 transition-all'
                    />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;

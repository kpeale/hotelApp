'use client';

import { useState, useMemo } from 'react';
import { assets, facilityIcons, roomsDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
      <input
        type='checkbox'
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className='font-light select-none'>{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
      <input
        type='radio'
        name='sortOption'
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className='font-light select-none'>{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const [openFilters, setOpenFilters] = useState(false);
  const navigate = useNavigate();

  // Filter states
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState('');

  // Get unique room types from the data
  const roomTypes = [...new Set(roomsDummyData.map((room) => room.roomType))];

  // Move priceRanges outside of component or use useMemo to make it stable
  const priceRanges = useMemo(
    () => [
      { label: '0 to 200', min: 0, max: 200 },
      { label: '200 to 400', min: 200, max: 400 },
      { label: '400 to 600', min: 400, max: 600 },
      { label: '600+', min: 600, max: Number.POSITIVE_INFINITY },
    ],
    []
  );

  const sortOptions = [
    'Price Low to High',
    'Price High to Low',
    'Newest First',
  ];

  // Handle filter changes
  const handleRoomTypeChange = (checked, roomType) => {
    if (checked) {
      setSelectedRoomTypes((prev) => [...prev, roomType]);
    } else {
      setSelectedRoomTypes((prev) => prev.filter((type) => type !== roomType));
    }
  };

  const handlePriceRangeChange = (checked, priceRange) => {
    if (checked) {
      setSelectedPriceRanges((prev) => [...prev, priceRange]);
    } else {
      setSelectedPriceRanges((prev) =>
        prev.filter((range) => range !== priceRange)
      );
    }
  };

  const handleSortChange = (sortOption) => {
    setSelectedSortOption(sortOption);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRanges([]);
    setSelectedSortOption('');
  };

  // Filter and sort rooms
  const filteredAndSortedRooms = useMemo(() => {
    let filtered = [...roomsDummyData];

    // Filter by room type
    if (selectedRoomTypes.length > 0) {
      filtered = filtered.filter((room) =>
        selectedRoomTypes.includes(room.roomType)
      );
    }

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((room) => {
        return selectedPriceRanges.some((rangeLabel) => {
          const range = priceRanges.find((r) => r.label === rangeLabel);
          return (
            room.pricePerNight >= range.min && room.pricePerNight <= range.max
          );
        });
      });
    }

    // Sort rooms
    if (selectedSortOption) {
      switch (selectedSortOption) {
        case 'Price Low to High':
          filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
          break;
        case 'Price High to Low':
          filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
          break;
        case 'Newest First':
          filtered.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          break;
        default:
          break;
      }
    }

    return filtered;
  }, [selectedRoomTypes, selectedPriceRanges, selectedSortOption, priceRanges]);

  // Check if any filters are active
  const hasActiveFilters =
    selectedRoomTypes.length > 0 ||
    selectedPriceRanges.length > 0 ||
    selectedSortOption;

  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24'>
      <div className='w-full lg:flex-1 lg:mr-8'>
        <div className='flex flex-col items-start text-left'>
          <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
          <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories
          </p>
          {hasActiveFilters && (
            <div className='mt-4 flex flex-wrap gap-2'>
              <span className='text-sm text-gray-600'>
                Showing {filteredAndSortedRooms.length} of{' '}
                {roomsDummyData.length} rooms
              </span>
            </div>
          )}
        </div>

        {filteredAndSortedRooms.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-center'>
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
                  d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              No rooms found
            </h3>
            <p className='text-gray-600 mb-6'>
              Try adjusting your filters to see more results.
            </p>
            <button
              onClick={clearFilters}
              className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          filteredAndSortedRooms.map((room) => (
            <div
              className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'
              key={room._id}
            >
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                src={room.images[0] || '/placeholder.svg'}
                alt='hotel-img'
                title='View Room Details'
                className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'
              />
              <div className='md:w-1/2 flex flex-col gap-2'>
                <p className='text-gray-500'>{room.hotel.city}</p>
                <p
                  className='text-gray-800 text-3xl font-playfair cursor-pointer'
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                >
                  {room.hotel.name}
                </p>
                <div className='flex items-center'>
                  <StarRating />
                  <p className='ml-2'>200+ reviews</p>
                </div>
                <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                  <img
                    src={assets.locationIcon || '/placeholder.svg'}
                    alt='location icon'
                  />
                  <span>{room.hotel.address}</span>
                </div>
                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4 '>
                  {room.amenities.map((item, index) => (
                    <div
                      className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f5f5ff]/70'
                      key={index}
                    >
                      <img
                        src={facilityIcons[item] || '/placeholder.svg'}
                        alt={item}
                        className='w-5 h-5'
                      />
                      <p className='text-xs'>{item}</p>
                    </div>
                  ))}
                </div>
                <p className='text-xl font-medium text-gray-700'>
                  ${room.pricePerNight} /night
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Updated filter box with responsive width */}
      <div className='bg-white w-full sm:w-80 lg:w-80 lg:flex-shrink-0 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16'>
        <div
          className={`flex items-center justify-between px-4 sm:px-5 py-2.5 min-lg:border-b border-gray-300 ${
            openFilters && 'border-b'
          }`}
        >
          <p className='text-base font-medium text-gray-800'>FILTERS</p>
          <div className='text-xs cursor-pointer'>
            <span
              className='lg:hidden'
              onClick={() => setOpenFilters(!openFilters)}
            >
              {openFilters ? 'HIDE' : 'SHOW'}
            </span>
            <span
              className='hidden lg:block hover:text-blue-600 transition-colors'
              onClick={clearFilters}
            >
              CLEAR
            </span>
          </div>
        </div>
        <div
          className={`${
            openFilters
              ? 'h-auto'
              : 'h-0 lg:h-auto overflow-hidden transition-all duration-700'
          }`}
        >
          <div className='px-4 sm:px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>
              Room Types
              {selectedRoomTypes.length > 0 && (
                <span className='ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>
                  {selectedRoomTypes.length}
                </span>
              )}
            </p>
            {roomTypes.map((roomType, index) => (
              <CheckBox
                key={index}
                label={roomType}
                selected={selectedRoomTypes.includes(roomType)}
                onChange={handleRoomTypeChange}
              />
            ))}
          </div>

          <div className='px-4 sm:px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>
              Price Range
              {selectedPriceRanges.length > 0 && (
                <span className='ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>
                  {selectedPriceRanges.length}
                </span>
              )}
            </p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`$${range.label}`}
                selected={selectedPriceRanges.includes(range.label)}
                onChange={(checked) =>
                  handlePriceRangeChange(checked, range.label)
                }
              />
            ))}
          </div>

          <div className='px-4 sm:px-5 pt-5 pb-7'>
            <p className='font-medium text-gray-800 pb-2'>
              Sort By
              {selectedSortOption && (
                <span className='ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full'>
                  Active
                </span>
              )}
            </p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSortOption === option}
                onChange={handleSortChange}
              />
            ))}
          </div>

          {/* Clear filters button for mobile */}
          {hasActiveFilters && (
            <div className='px-4 sm:px-5 pb-5 lg:hidden'>
              <button
                onClick={clearFilters}
                className='w-full py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors'
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllRooms;

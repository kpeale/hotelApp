"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { assets, cities } from "../assets/assets"

const Hero = () => {
  const navigate = useNavigate()
  const [isSearching, setIsSearching] = useState(false)
  const [formData, setFormData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 0,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSearching(true)

    // Validate dates
    const checkInDate = new Date(formData.checkIn)
    const checkOutDate = new Date(formData.checkOut)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (checkInDate < today) {
      alert("Check-in date cannot be in the past")
      setIsSearching(false)
      return
    }

    if (checkOutDate <= checkInDate) {
      alert("Check-out date must be after check-in date")
      setIsSearching(false)
      return
    }

    // Simulate search process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simply navigate to rooms page
    navigate("/rooms")
    setIsSearching(false)
  }

  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0]

  // Set minimum checkout date to day after checkin
  const minCheckOut = formData.checkIn
    ? new Date(new Date(formData.checkIn).getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    : today

  return (
    <div className="flex flex-col items-start justify-center px-6 lg:mb-0 md:px-16 lg:px-24 xl:px-32 text-white bg-[url('/src/assets/heroImage.png')] bg-cover bg-center bg-no-repeat min-h-screen lg:h-screen">
      <p className="bg-[#49B9ff]/50 px-3.5 py-1 rounded-full mt-22">The Ultimate Hotel Experience</p>
      <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
        Discover Your Perfect Gateway Destination
      </h1>
      <p className="max-w-130 mt-2 text-sm md:text-base">
        Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col mx-auto my-0 lg:flex-row lg:mx-0 lg:my-3 max-md:items-start gap-4 max-md:mx-auto shadow-lg"
      >
        {/* Destination */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <img src={assets.locationIcon || "/placeholder.svg"} alt="location" className="h-4" />
            <label htmlFor="destinationInput" className="text-sm font-medium">
              Destination
            </label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            name="destination"
            type="text"
            value={formData.destination}
            onChange={handleInputChange}
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-w-[150px]"
            placeholder="Where to?"
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        {/* Check In */}
        <div className="w-full">
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon || "/placeholder.svg"} alt="calendar" className="h-4" />
            <label htmlFor="checkIn" className="text-sm font-medium">
              Check In
            </label>
          </div>
          <input
            id="checkIn"
            name="checkIn"
            type="date"
            value={formData.checkIn}
            onChange={handleInputChange}
            min={today}
            className="rounded border border-gray-200 px-3 w-full py-2 lg:py-1.5 mt-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        {/* Check Out */}
        <div className="w-full">
          <div className="flex items-center gap-2 w-full">
            <img src={assets.calenderIcon || "/placeholder.svg"} alt="calendar" className="h-4" />
            <label htmlFor="checkOut" className="text-sm font-medium">
              Check Out
            </label>
          </div>
          <input
            id="checkOut"
            name="checkOut"
            type="date"
            value={formData.checkOut}
            onChange={handleInputChange}
            min={minCheckOut}
            className="rounded border border-gray-200 px-3 py-2 lg:py-1.5 mt-1.5 text-sm outline-none w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col lg:flex-col w-full max-md:gap-2 lg:items-start">
          <div className="flex items-center gap-2">
            <img src={assets.guestsIcon || "/placeholder.svg"} alt="guests" className="h-4" />
            <label htmlFor="guests" className="text-sm font-medium">
              Guests
            </label>
          </div>
          <input
            min={1}
            max={10}
            id="guests"
            name="guests"
            type="number"
            value={formData.guests}
            onChange={handleInputChange}
            className="rounded border border-gray-200 px-3 py-2 lg:py-1.5 mt-1.5 text-sm outline-none lg:max-w-16 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="1"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSearching}
          className="flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 py-3 px-6 text-white my-auto cursor-pointer lg:w-full max-md:py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isSearching ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Searching...</span>
            </>
          ) : (
            <>
             
              <span>Find  Rooms</span>
            </>
          )}
        </button>
      </form>

     
      
    </div>
  )
}

export default Hero

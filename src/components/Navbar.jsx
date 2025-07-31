"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { useClerk, useUser, UserButton } from "@clerk/clerk-react"

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
)

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Offers", path: "#offers" },
    { name: "Testimonials", path: "#testimonials" },
    { name: "Newsletter", path: "#newsletter" },
  ]

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasBackgroundImage, setHasBackgroundImage] = useState(false)
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const navigate = useNavigate()
  const location = useLocation()

  // Pages that have background images/hero sections
  const pagesWithBackgroundImages = ["/", "/offer"]

  useEffect(() => {
    // Check if current page has background image
    const hasBackground = pagesWithBackgroundImages.some(
      (path) => location.pathname === path || location.pathname.startsWith("/offer/"),
    )
    setHasBackgroundImage(hasBackground)

    // If not on home page or offer page, always show scrolled state
    if (!hasBackground) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }

    const handleScroll = () => {
      if (hasBackground) {
        setIsScrolled(window.scrollY > 10)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [location.pathname])

  // Determine navbar styling based on page and scroll state
  const getNavbarStyles = () => {
    if (!hasBackgroundImage) {
      // Pages without background images (like /rooms, /my-bookings)
      return {
        navbar: "bg-white shadow-md text-gray-700 py-3 md:py-4",
        logo: "invert opacity-80",
        text: "text-gray-700",
        underline: "bg-gray-700",
        searchIcon: "invert",
        button: "text-white bg-black",
        menuIcon: "invert",
      }
    } else if (isScrolled) {
      // Pages with background images when scrolled
      return {
        navbar: "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4",
        logo: "invert opacity-80",
        text: "text-gray-700",
        underline: "bg-gray-700",
        searchIcon: "invert",
        button: "text-white bg-black",
        menuIcon: "invert",
      }
    } else {
      // Pages with background images when not scrolled
      return {
        navbar: "py-4 md:py-6",
        logo: "",
        text: "text-white",
        underline: "bg-white",
        searchIcon: "",
        button: "bg-white text-black",
        menuIcon: "",
      }
    }
  }

  const styles = getNavbarStyles()

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${styles.navbar}`}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo || "/placeholder.svg"}
          alt="logo"
          className={`h-9 transition-all duration-500 ${styles.logo}`}
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 transition-colors duration-500 ${styles.text}`}
          >
            {link.name}
            <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${styles.underline}`} />
          </Link>
        ))}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon || "/placeholder.svg"}
          alt="search icon"
          className={`h-7 transition-all duration-500 ${styles.searchIcon}`}
        />
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 hover:opacity-90 ${styles.button}`}
            onClick={openSignIn}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        {user && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
        <img
          src={assets.menuIcon || "/placeholder.svg"}
          alt="hamburger icon"
          className={`h-4 transition-all duration-500 ${styles.menuIcon}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
          <img src={assets.closeIcon || "/placeholder.svg"} alt="icon" className="h-6.5" />
        </button>
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-blue-600 transition-colors"
          >
            {link.name}
          </a>
        ))}
        {!user && (
          <button
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500 hover:bg-gray-800"
            onClick={() => {
              openSignIn()
              setIsMenuOpen(false)
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar

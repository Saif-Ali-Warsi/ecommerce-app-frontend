import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { cartItems, wishlist } = useCart();

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const wishlistCount = wishlist.length;

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchTerm.trim();

    if (query) {
      navigate(`/?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              {/* Logo / Brand Name */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 bg-[#d7a296] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:bg-[#d9a79c] transition-colors">
                  S
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  My Store
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-sm font-medium text-gray-700 hover:text-[#d9a79c] transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-sm font-medium text-gray-700 hover:text-[#d9a79c] transition-colors"
              >
                Products
              </Link>
              <Link
                to="/categories"
                className="text-sm font-medium text-gray-700 hover:text-[#d9a79c] transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/wishlist"
                className="text-sm font-medium text-gray-700 hover:text-[#d9a79c] transition-colors"
              >
                Wishlist
              </Link>
            </nav>

            {/* Search */}
            <div className="">
              <div className="relative w-full">
                {/* Search Icon */}
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {/* Input Field */}
                <form onSubmit={handleSearch}>
                  <input
                    type="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-[#d9a79c] rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#d9a79c] focus:ring-2 focus:ring-[#d9a79c] transition-all duration-200"
                  />

                  {/* Clear Input Button (Visible only when text exists) */}
                  {searchTerm && (
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      aria-label="Clear search"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* Right Action Icons & Login */}
            <div className="hidden md:flex items-center gap-5">
              {/* Cart Button with Badge */}
              <Link
                to="/cart"
                className="relative p-2 text-[#d7a296] hover:text-[#d9a79c] transition-colors"
                aria-label="Shopping Cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {/* Badge Counter */}
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#d7a296] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartQuantity}
                </span>
              </Link>

              <Link
                to="/wishlist"
                className="relative p-2 text-[#d7a296] hover:text-[#d9a79c] transition-colors"
                aria-label="Wishlist"
              >
                {/* Heart Icon for Wishlist */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>

                {/* Wishlist Badge Counter */}
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#d7a296] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              </Link>
              
              |

              {/* Login Button */}
              {isAuthenticated ? (
                <>
                  <span>Welcome, {user?.firstName}</span>{" "}
                  <button
                    onClick={logout}
                    className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-700 hover:bg-[#d7a296] rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-[#d7a296] hover:bg-[#d7a296] rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-4 space-y-2">
            <div>
              Welcome,{" "}
              {isAuthenticated ? (
                <span> {user?.firstName}</span>
              ) : (
                <span>Guest</span>
              )}
            </div>
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#d9a79c]"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#d9a79c]"
            >
              Products
            </Link>
            <Link
              to="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#d9a79c]"
            >
              Categories
            </Link>
            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#d9a79c]"
            >
              <span>Cart</span>
              <span className="bg-[#d9a79c] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {cartQuantity} {cartQuantity === 1 ? "items" : "item"}
              </span>
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#d9a79c]"
            >
              <span>Wishlist</span>
              <span className="bg-[#d9a79c] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {wishlistCount} {wishlistCount === 1 ? "items" : "item"}
              </span>
            </Link>
            <div className="pt-2">
              {/* Login Button */}

              {isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-[#d7a296] rounded-xl"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-[#d7a296] rounded-xl"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;

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
      <header className="sticky top-0 z-50 bg-[#191C24]/90 backdrop-blur-md border-b border-[#222631] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-between gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-[#8A93A5] bg-[#191C24] shadow-[-3px_-3px_8px_#222631,3px_3px_8px_#101217] active:shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631] focus:outline-none transition-all"
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
                <div className="cursor-pointer bg-[#191C24] text-[#d9a79c] font-bold py-1.5 px-3 rounded-xl text-md shadow-[-4px_-4px_10px_#222631,4px_4px_10px_#101217] active:shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631] transition-all flex items-center justify-center">
                  S
                </div>
                <span className="text-xl font-bold text-[#CFD4DC] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  My Store
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-sm text-[#8A93A5] font-semibold hover:text-[#d9a79c] transition-colors drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-sm font-semibold text-[#8A93A5] hover:text-[#d9a79c] transition-colors drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
              >
                Products
              </Link>
              <Link
                to="/categories"
                className="text-sm font-semibold text-[#8A93A5] hover:text-[#d9a79c] transition-colors drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
              >
                Categories
              </Link>
              <Link
                to="/wishlist"
                className="text-sm font-semibold text-[#8A93A5] hover:text-[#d9a79c] transition-colors drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
              >
                Wishlist
              </Link>
            </nav>

            {/* Search */}
            <div className="hidden lg:block w-72">
              <div className="relative w-full">
                {/* Search Icon */}
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#535C6D]">
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
                    className="w-full pl-10 pr-10 py-2 bg-[#191C24] rounded-xl text-sm text-[#CFD4DC] placeholder-[#535C6D] focus:outline-none shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631] focus:shadow-[inset_1px_1px_2px_#101217,inset_-1px_-1px_2px_#222631] transition-all duration-200"
                  />

                  {/* Clear Input Button */}
                  {searchTerm && (
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#535C6D] hover:text-[#CFD4DC]"
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
                className="relative p-2.5 bg-[#191C24] text-[#d9a79c] rounded-xl shadow-[-3px_-3px_8px_#222631,3px_3px_8px_#101217] hover:shadow-[-1px_-1px_4px_#222631,1px_1px_4px_#101217] active:shadow-[inset_1px_1px_2px_#101217,inset_-1px_-1px_2px_#222631] transition-all"
                aria-label="Shopping Cart"
              >
                <svg
                  className="w-5 h-5"
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
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d9a79c] text-[#191C24] text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-md">
                  {cartQuantity}
                </span>
              </Link>

              <Link
                to="/wishlist"
                className="relative p-2.5 bg-[#191C24] text-[#d9a79c] rounded-xl shadow-[-3px_-3px_8px_#222631,3px_3px_8px_#101217] hover:shadow-[-1px_-1px_4px_#222631,1px_1px_4px_#101217] active:shadow-[inset_1px_1px_2px_#101217,inset_-1px_-1px_2px_#222631] transition-all"
                aria-label="Wishlist"
              >
                <svg
                  className="w-5 h-5"
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
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d9a79c] text-[#191C24] text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              </Link>

              <div className="h-6 w-[1px] bg-[#222631]"></div>

              {/* Login Button */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm text-[#8A93A5]">
                    Hi, {user?.firstName}
                  </span>
                  <button
                    onClick={logout}
                    className="cursor-pointer bg-[#191C24] text-[#d9a79c] font-bold py-2 px-4 rounded-xl text-sm shadow-[-4px_-4px_10px_#222631,4px_4px_10px_#101217] hover:shadow-[-2px_-2px_5px_#222631,2px_2px_5px_#101217] active:shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631] transition-all flex items-center justify-center gap-1.5"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="cursor-pointer bg-[#191C24] text-[#d9a79c] font-bold py-2 px-5 rounded-xl text-sm shadow-[-4px_-4px_10px_#222631,4px_4px_10px_#101217] hover:shadow-[-2px_-2px_5px_#222631,2px_2px_5px_#101217] active:shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631] transition-all flex items-center justify-center gap-1.5"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#222631] bg-[#191C24] px-4 pt-4 pb-6 space-y-3 shadow-[inset_0_4px_6px_-2px_rgba(0,0,0,0.3)]">
            <div className="px-3 py-2 text-sm font-medium text-[#8A93A5] bg-[#191C24] rounded-xl shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]">
              Welcome,{" "}
              {isAuthenticated ? (
                <span className="text-[#CFD4DC] font-semibold">
                  {user?.firstName}
                </span>
              ) : (
                <span className="text-[#CFD4DC] font-semibold">Guest</span>
              )}
            </div>

            {/* Mobile Search Input */}
            <div className="relative w-full pt-1">
              <form onSubmit={handleSearch}>
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full px-4 py-2 bg-[#191C24] rounded-xl text-sm text-[#CFD4DC] placeholder-[#535C6D] focus:outline-none shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]"
                />
              </form>
            </div>

            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-[#8A93A5] hover:bg-[#191C24] hover:text-[#d9a79c] shadow-[-2px_-2px_5px_#222631,2px_2px_5px_#101217]"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-[#8A93A5] hover:bg-[#191C24] hover:text-[#d9a79c] shadow-[-2px_-2px_5px_#222631,2px_2px_5px_#101217]"
            >
              Products
            </Link>
            <Link
              to="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-[#8A93A5] hover:bg-[#191C24] hover:text-[#d9a79c] shadow-[-2px_-2px_5px_#222631,2px_2px_5px_#101217]"
            >
              Categories
            </Link>
            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium text-[#8A93A5] hover:text-[#d9a79c] shadow-[-2px_-2px_5px_#222631,2px_2px_5px_#101217]"
            >
              <span>Cart</span>
              <span className="bg-[#d9a79c] text-[#191C24] text-xs font-bold px-2 py-0.5 rounded-full">
                {cartQuantity} {cartQuantity === 1 ? "item" : "items"}
              </span>
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium text-[#8A93A5] hover:text-[#d9a79c] shadow-[-2px_-2px_5px_#222631,2px_2px_5px_#101217]"
            >
              <span>Wishlist</span>
              <span className="bg-[#d9a79c] text-[#191C24] text-xs font-bold px-2 py-0.5 rounded-full">
                {wishlistCount} {wishlistCount === 1 ? "item" : "items"}
              </span>
            </Link>

            <div className="pt-2">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full cursor-pointer bg-[#191C24] text-[#d9a79c] font-bold py-3 px-4 rounded-xl text-md shadow-[-4px_-4px_10px_#222631,4px_4px_10px_#101217] active:shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631] transition-all flex items-center justify-center gap-1.5"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full cursor-pointer bg-[#191C24] text-[#d9a79c] font-bold py-3 px-4 rounded-xl text-md shadow-[-4px_-4px_10px_#222631,4px_4px_10px_#101217] active:shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631] transition-all text-center"
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

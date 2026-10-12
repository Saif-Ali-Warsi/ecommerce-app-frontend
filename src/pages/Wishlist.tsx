import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  // 1. Empty Wishlist State
  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Save items you love to your wishlist and review them anytime.
        </p>
        <Link
          to="/products"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-sm"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Title */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          My Wishlist
        </h2>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Image Container with Link */}
            <Link
              to={`/products/${product.id}`}
              className="relative w-full h-48 bg-gray-100 overflow-hidden block"
            >
              <img
                src={product.thumbnail || product.images?.[0]}
                alt={product.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            {/* Content Container */}
            <div className="p-4 flex flex-col flex-grow">
              {/* Title */}
              <Link to={`/products/${product.id}`}>
                <h3 className="font-semibold text-gray-900 text-base line-clamp-1 group-hover:text-indigo-600 transition-colors mb-1">
                  {product.title}
                </h3>
              </Link>

              {/* Price */}
              <span className="text-indigo-600 font-bold text-base mb-4">
                AED {product.price}
              </span>

              {/* Action Buttons */}
              <div className="mt-auto space-y-2">
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="w-full bg-gray-900 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-xl text-xs transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  className="w-full bg-white border border-gray-200 hover:bg-red-50 hover:border-red-100 hover:text-red-600 text-gray-600 font-medium py-2 px-4 rounded-xl text-xs transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;

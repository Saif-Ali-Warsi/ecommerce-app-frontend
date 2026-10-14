import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  // 1. Empty Wishlist State
  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        {/* Recessed Circular Icon Container */}
        <div className="w-20 h-20 bg-[#191C24] text-[#d9a79c] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[inset_3px_3px_6px_#101217,inset_-3px_-3px_6px_#222631]">
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

        <h2 className="text-2xl font-bold text-[#d9a79c] mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          Your Wishlist is Empty
        </h2>
        <p className="text-[#8A93A5] mb-8 text-sm">
          Save items you love to your wishlist and review them anytime.
        </p>

        {/* Extruded Neomorphic Action Link */}
        <Link
          to="/products"
          className="inline-flex cursor-pointer bg-[#191C24] text-[#d9a79c] font-bold py-3.5 px-6 rounded-2xl text-md shadow-[-6px_-6px_16px_#222631,6px_6px_16px_#101217] hover:shadow-[-3px_-3px_8px_#222631,3px_3px_8px_#101217] active:shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631] transition-all items-center justify-center gap-1.5 mx-auto"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Title & Badge */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#CFD4DC] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          My Wishlist
        </h2>
        <span className="text-sm font-semibold text-[#8A93A5] bg-[#191C24] px-4 py-1.5 rounded-full shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group relative bg-[#191C24] rounded-2xl shadow-[-8px_-8px_16px_#222631,8px_8px_16px_#101217] hover:shadow-[-4px_-4px_10px_#222631,4px_4px_10px_#101217] transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Image Container with Recessed Framing */}
            <Link
              to={`/products/${product.id}`}
              className="relative w-full h-48 bg-[#191C24] p-2 block"
            >
              <div className="w-full h-full rounded-xl overflow-hidden shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]">
                <img
                  src={product.thumbnail || product.images?.[0]}
                  alt={product.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
              </div>
            </Link>

            {/* Content Container */}
            <div className="p-4 flex flex-col flex-grow bg-[#191C24]">
              {/* Title */}
              <Link to={`/products/${product.id}`}>
                <h3 className="font-semibold text-[#CFD4DC] text-base line-clamp-1 group-hover:text-[#d9a79c] transition-colors mb-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  {product.title}
                </h3>
              </Link>

              {/* Price */}
              <span className="text-[#d9a79c] font-bold text-base mb-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                AED {product.price}
              </span>

              {/* Action Buttons */}
              <div className="mt-auto space-y-3">
                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="w-full bg-[#191C24] text-[#d9a79c] font-bold py-2.5 px-4 rounded-xl text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-[-4px_-4px_8px_#222631,4px_4px_8px_#101217] hover:shadow-[-2px_-2px_4px_#222631,2px_2px_4px_#101217] active:shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631] cursor-pointer"
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

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  className="w-full bg-[#191C24] text-red-400 font-medium py-2.5 px-4 rounded-xl text-xs transition-all duration-200 flex items-center justify-center gap-1.5 shadow-[-3px_-3px_6px_#222631,3px_3px_6px_#101217] hover:shadow-[-1px_-1px_3px_#222631,1px_1px_3px_#101217] active:shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631] cursor-pointer"
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

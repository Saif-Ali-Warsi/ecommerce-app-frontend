import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import type { Product } from "../../types/product.types";
import { Link } from "react-router-dom";


type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useCart();

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <>
      <Link to={`/products/${product.id}`}>
        <div className="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col max-w-[220px]">
          {/* Image Container */}
          <div className="relative w-full h-36 bg-gray-100 overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />

            {/* Optional Badge */}
            <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
              New
            </span>

            {/* Improved Wishlist Icon Button */}
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                if (isWishlisted) {
                  removeFromWishlist(product.id);
                } else {
                  addToWishlist(product);
                }
              }}
              aria-label={
                isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
              }
              className={`cursor-pointer absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-sm ${
                isWishlisted
                  ? "bg-white text-rose-500 scale-110 shadow-md"
                  : "bg-white/80 text-gray-600 hover:text-rose-500 hover:bg-white"
              }`}
            >
              <svg
                className={`w-4 h-4 ${isWishlisted ? "fill-current" : "fill-none"}`}
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
            </button>
          </div>

          {/* Content Container */}
          <div className="p-3 flex flex-col flex-grow">
            {/* Title & Price Row */}
            <div className="flex justify-between items-start gap-1 mb-1">
              <h3 className="font-semibold text-gray-900 text-xs line-clamp-1 group-hover:text-indigo-600 transition-colors">
                {product.title}
              </h3>
              <span className="text-indigo-600 font-bold text-xs whitespace-nowrap">
                AED {product.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-[11px] line-clamp-2 mb-3 flex-grow">
              {product.description}
            </p>

            {/* Action Button */}
            <button
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                addToCart(product);
                toast.success("+ ADDED")
              }}
              className="cursor-pointer w-full bg-[#d7a296] hover:bg-[#d9a79c] text-white font-bold py-1.5 px-3 rounded-lg text-xs border-2 border-[#8c5245] shadow-[4px_4px_0px_0px_#8c5245] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#8c5245] transition-all flex items-center justify-center gap-1.5"
            >
              <svg
                className="w-3.5 h-3.5"
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
              Add
            </button>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProductCard;

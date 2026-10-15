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
        <div className="group relative bg-[#191C24] rounded-2xl shadow-[-8px_-8px_16px_#222631,8px_8px_16px_#101217] hover:shadow-[-4px_-4px_10px_#222631,4px_4px_10px_#101217] transition-all duration-300 overflow-hidden flex flex-col max-w-[220px]">
          {/* Image Container with Inset Frame Effect */}
          <div className="relative w-full h-36 bg-[#191C24] overflow-hidden p-1.5">
            <div className="w-full h-full rounded-xl overflow-hidden shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631] relative">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
            </div>

            {/* "New" Badge */}
            <span className="absolute top-3 left-3 bg-[#191C24] text-[#d9a79c] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-[-2px_-2px_5px_#222631,2px_2px_5px_#101217]">
              New
            </span>

            {/* Wishlist Icon Button */}
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
              className={`cursor-pointer absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                isWishlisted
                  ? "bg-[#191C24] text-rose-500 shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]"
                  : "bg-[#191C24] text-[#8A93A5] hover:text-rose-400 shadow-[-3px_-3px_6px_#222631,3px_3px_6px_#101217] active:shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]"
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${
                  isWishlisted ? "fill-current" : "fill-none"
                }`}
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
          <div className="p-3.5 flex flex-col flex-grow bg-[#191C24]">
            {/* Title & Price Row */}
            <div className="flex justify-between items-start gap-1 mb-1">
              <h3 className="font-semibold text-[#ffffff] text-xs line-clamp-1 group-hover:text-[#d9a79c] transition-colors drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                {product.title}
              </h3>
              <span className="text-[#d9a79c] font-bold text-xs whitespace-nowrap drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                AED {product.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-[#8A93A5] text-[11px] line-clamp-2 mb-3 flex-grow leading-relaxed">
              {product.description}
            </p>

            {/* Action Button */}
            <button
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                addToCart(product);
                toast.success("+ ADDED");
              }}
              className="cursor-pointer w-full bg-[#191C24] text-[#d9a79c] font-bold py-2 px-3 rounded-xl text-xs shadow-[-4px_-4px_8px_#222631,4px_4px_8px_#101217] hover:shadow-[-2px_-2px_4px_#222631,2px_2px_4px_#101217] active:shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631] transition-all flex items-center justify-center gap-1.5 mt-auto"
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

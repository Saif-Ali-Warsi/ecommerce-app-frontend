import type { Product } from "../../types/product.types";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
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
          </div>

          {/* Content Container */}
          <div className="p-3 flex flex-col flex-grow">
            {/* Title & Price Row */}
            <div className="flex justify-between items-start gap-1 mb-1">
              <h3 className="font-semibold text-gray-900 text-xs line-clamp-1 group-hover:text-indigo-600 transition-colors">
                {product.title}
              </h3>
              <span className="text-indigo-600 font-bold text-xs whitespace-nowrap">
                {product.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-[11px] line-clamp-2 mb-3 flex-grow">
              {product.description}
            </p>

            {/* Action Button */}
            <button className="w-full bg-gray-900 hover:bg-indigo-600 text-white font-medium py-1.5 px-3 rounded-lg text-xs transition-colors duration-200 flex items-center justify-center gap-1.5 shadow-sm">
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

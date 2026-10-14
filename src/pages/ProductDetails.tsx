import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import type { Product } from "../types/product.types";
import { useCart } from "../context/CartContext";


function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  const [quantity, setQuantity] = useState(product?.minimumOrderQuantity || 1);

  const {addToCart} = useCart()

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          throw new Error("Product ID is missing");
        }

        const data = await getProductById(id);
        setProduct(data);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";

        setError(message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  // 1. Loading State
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="w-full h-96 bg-gray-200 rounded-2xl"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-24 bg-gray-200 rounded w-full"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="max-w-md mx-auto my-20 p-6 bg-red-50 border border-red-100 rounded-2xl text-center shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Error Loading Product
        </h3>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  // 3. Not Found State
  if (!product) {
    return (
      <div className="text-center py-24">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          Product not found
        </h3>
        <p className="text-sm text-gray-500">
          The product you are looking for does not exist.
        </p>
      </div>
    );
  }

  // Calculate discounted price if applicable
  const discountedPrice = (
    product.price -
    (product.price * (product.discountPercentage || 0)) / 100
  ).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Image & Gallery Thumbnail */}
        <div className="space-y-4">
          <div className="relative w-full h-[400px] sm:h-[500px] bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            <img
              src={product.thumbnail || product.images?.[0]}
              alt={product.title}
              className="w-full h-full object-cover object-center"
            />
            {product.discountPercentage && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                -{product.discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Product Details & Actions */}
        <div className="flex flex-col">
          {/* Category & Brand */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              {product.category}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm font-medium text-gray-600">
              Brand: <strong className="text-gray-900">{product.brand}</strong>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {product.title}
          </h1>

          {/* Rating & Stock Status */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-amber-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="text-sm font-bold text-gray-900">
                {product.rating}
              </span>
              <span className="text-xs text-gray-400">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>
            <span className="text-gray-300">|</span>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                product.stock > 0
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {product.availabilityStatus} ({product.stock} left)
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-3xl font-extrabold text-gray-900">
              ${discountedPrice}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-lg text-gray-400 line-through font-medium">
                ${product.price}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Quantity and Add to Cart Section */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(product.minimumOrderQuantity || 1, quantity - 1),
                    )
                  }
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-semibold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
              {product.minimumOrderQuantity > 1 && (
                <span className="text-xs text-gray-400">
                  (Min. order: {product.minimumOrderQuantity})
                </span>
              )}
            </div>

            <div className="flex gap-4">
              <button onClick={()=>{addToCart(product);}} className="cursor-pointer flex-1 bg-[#d7a296] hover:bg-[#d9a79c] text-white font-medium py-3 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>

          {/* Additional Meta Specs Grid */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 text-xs text-gray-500">
            <div>
              <strong className="text-gray-700">SKU:</strong> {product.sku}
            </div>
            <div>
              <strong className="text-gray-700">Warranty:</strong>{" "}
              {product.warrantyInformation}
            </div>
            <div>
              <strong className="text-gray-700">Shipping:</strong>{" "}
              {product.shippingInformation}
            </div>
            <div>
              <strong className="text-gray-700">Returns:</strong>{" "}
              {product.returnPolicy}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-16 pt-12 border-t border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Customer Reviews
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-100 p-5 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-800 italic mb-4">
                    "{review.comment}"
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-900 block">
                    {review.reviewerName}
                  </span>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;

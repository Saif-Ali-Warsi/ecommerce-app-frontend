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

  const { addToCart } = useCart();

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
          <div className="w-full h-96 bg-[#191C24] rounded-3xl shadow-[inset_3px_3px_8px_#101217,inset_-3px_-3px_8px_#222631]"></div>
          <div className="space-y-4">
            <div className="h-8 bg-[#191C24] rounded-xl w-3/4 shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]"></div>
            <div className="h-6 bg-[#191C24] rounded-xl w-1/4 shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]"></div>
            <div className="h-24 bg-[#191C24] rounded-xl w-full shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]"></div>
            <div className="h-12 bg-[#191C24] rounded-xl w-1/2 shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]"></div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-[#191C24] rounded-3xl text-center shadow-[-8px_-8px_20px_#222631,8px_8px_20px_#101217]">
        <h3 className="text-lg font-semibold text-[#CFD4DC] mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          Error Loading Product
        </h3>
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  // 3. Not Found State
  if (!product) {
    return (
      <div className="text-center py-24">
        <h3 className="text-xl font-semibold text-[#CFD4DC] mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          Product not found
        </h3>
        <p className="text-sm text-[#8A93A5]">
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
          <div className="relative w-full h-[400px] sm:h-[500px] bg-[#191C24] p-3 rounded-3xl shadow-[-8px_-8px_20px_#222631,8px_8px_20px_#101217]">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-[inset_3px_3px_8px_#101217,inset_-3px_-3px_8px_#222631] relative">
              <img
                src={product.thumbnail || product.images?.[0]}
                alt={product.title}
                className="w-full h-full object-cover object-center opacity-95"
              />
            </div>
            {product.discountPercentage && (
              <span className="absolute top-6 left-6 bg-[#191C24] text-rose-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-[-3px_-3px_6px_#222631,3px_3px_6px_#101217]">
                -{product.discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Product Details & Actions */}
        <div className="flex flex-col">
          {/* Category & Brand */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#d9a79c] bg-[#191C24] px-3 py-1.5 rounded-xl shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]">
              {product.category}
            </span>
            <span className="text-sm text-[#535C6D]">•</span>
            <span className="text-sm font-medium text-[#8A93A5]">
              Brand: <strong className="text-[#CFD4DC]">{product.brand}</strong>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[#CFD4DC] mb-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {product.title}
          </h1>

          {/* Rating & Stock Status */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-1 text-amber-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="text-sm font-bold text-[#CFD4DC]">
                {product.rating}
              </span>
              <span className="text-xs text-[#8A93A5]">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>
            <span className="text-[#222631]">|</span>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full shadow-[inset_1px_1px_3px_#101217,inset_-1px_-1px_3px_#222631] ${
                product.stock > 0
                  ? "bg-[#191C24] text-emerald-400"
                  : "bg-[#191C24] text-red-400"
              }`}
            >
              {product.availabilityStatus} ({product.stock} left)
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-4 mb-6 p-4 bg-[#191C24] rounded-2xl shadow-[inset_3px_3px_7px_#101217,inset_-3px_-3px_7px_#222631]">
            <span className="text-3xl font-extrabold text-[#d9a79c] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              AED {discountedPrice}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-lg text-[#535C6D] line-through font-medium">
                AED {product.price}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-[#8A93A5] text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-[#191C24] text-[#8A93A5] px-3 py-1.5 rounded-xl shadow-[-2px_-2px_5px_#222631,2px_2px_5px_#101217]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Quantity and Add to Cart Section */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-[#8A93A5]">
                Quantity:
              </span>
              <div className="flex items-center rounded-xl overflow-hidden bg-[#191C24] shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]">
                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(product.minimumOrderQuantity || 1, quantity - 1),
                    )
                  }
                  className="cursor-pointer px-3 py-2 text-[#8A93A5] hover:text-[#CFD4DC] hover:bg-[#222631] transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-bold text-[#CFD4DC]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="cursor-pointer px-3 py-2 text-[#8A93A5] hover:text-[#CFD4DC] hover:bg-[#222631] transition-colors"
                >
                  +
                </button>
              </div>
              {product.minimumOrderQuantity > 1 && (
                <span className="text-xs text-[#535C6D]">
                  (Min. order: {product.minimumOrderQuantity})
                </span>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  addToCart(product);
                }}
                className="cursor-pointer w-full bg-[#191C24] text-[#d9a79c] font-bold py-4 px-4 rounded-2xl text-md shadow-[-6px_-6px_16px_#222631,6px_6px_16px_#101217] hover:shadow-[-3px_-3px_8px_#222631,3px_3px_8px_#101217] active:shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631] transition-all flex items-center justify-center gap-2"
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>

          {/* Additional Meta Specs Grid */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#222631] text-xs text-[#8A93A5]">
            <div className="bg-[#191C24] p-3 rounded-xl shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]">
              <strong className="text-[#CFD4DC]">SKU:</strong> {product.sku}
            </div>
            <div className="bg-[#191C24] p-3 rounded-xl shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]">
              <strong className="text-[#CFD4DC]">Warranty:</strong>{" "}
              {product.warrantyInformation}
            </div>
            <div className="bg-[#191C24] p-3 rounded-xl shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]">
              <strong className="text-[#CFD4DC]">Shipping:</strong>{" "}
              {product.shippingInformation}
            </div>
            <div className="bg-[#191C24] p-3 rounded-xl shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]">
              <strong className="text-[#CFD4DC]">Returns:</strong>{" "}
              {product.returnPolicy}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-16 pt-12 border-t border-[#222631]">
          <h3 className="text-xl font-bold text-[#CFD4DC] mb-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            Customer Reviews
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-[#191C24] p-5 rounded-2xl flex flex-col justify-between shadow-[-6px_-6px_14px_#222631,6px_6px_14px_#101217]"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
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
                  <p className="text-sm text-[#CFD4DC] italic mb-4 leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
                <div className="text-xs text-[#535C6D] pt-3 border-t border-[#222631]">
                  <span className="font-semibold text-[#d9a79c] block">
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

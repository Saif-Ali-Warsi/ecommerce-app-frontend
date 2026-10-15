import { useState, useEffect } from "react";
import type { Product } from "../types/product.types";
import {
  getProducts,
  searchProducts,
  getProductById,
} from "../services/productService";
import ProductCard from "../components/products/ProductCard";
import { useSearchParams } from "react-router-dom";
import DealOfTheDay from "../components/products/DealOfTheDay";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [singleProductTwo, setSingleProductTwo] = useState<Product | null>(
    null,
  );
  const [singleProductThree, setSingleProductThree] = useState<Product | null>(
    null,
  );

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const data = query ? await searchProducts(query) : await getProducts();

        setProducts(data);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";

        setError(message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [query]);

  useEffect(() => {
    async function loadProduct(id: string) {
      const singleProductData = await getProductById(id);

      setSingleProduct(singleProductData);
    }

    loadProduct("79");
  }, []);

  useEffect(() => {
    async function loadProduct(id: string) {
      const singleProductTwoData = await getProductById(id);

      setSingleProductTwo(singleProductTwoData);
    }

    loadProduct("161");
  }, []);

  useEffect(() => {
    async function loadProduct(id: string) {
      const singleProductThreeData = await getProductById(id);

      setSingleProductThree(singleProductThreeData);
    }

    loadProduct("106");
  }, []);

  return (
    <div className="mx-auto px-4 sm:px-4 lg:px-4 py-8">
      <div className="grid mb-10 px-3 sm:px-3 lg:px-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        <div>
          <DealOfTheDay>
            {/* Left Column: Product Card */}
            <div className="flex justify-center md:justify-start">
              {singleProduct && (
                <ProductCard key={singleProduct.id} product={singleProduct} />
              )}
            </div>

            {/* Right Column: Deal Info & Countdown Timer */}
            <div className="flex flex-col justify-center text-center md:text-left space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-[#CFD4DC] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mb-1">
                  AI Laptops 1TB
                </h2>
                <p className="text-lg font-bold text-rose-400">
                  20% OFF — Limited-time offer!
                </p>
              </div>

              {/* Neomorphic Coupon Code */}
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xs text-[#8A93A5]">Use Code:</span>
                <code className="bg-[#191C24] text-[#d9a79c] font-mono font-bold text-sm px-3 py-1.5 rounded-xl shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]">
                  LIMITED20OFF
                </code>
              </div>
            </div>
          </DealOfTheDay>
        </div>

        <div>
          <DealOfTheDay>
            {/* Left Column: Product Card */}
            <div className="flex justify-center md:justify-start">
              {singleProductTwo && (
                <ProductCard
                  key={singleProductTwo.id}
                  product={singleProductTwo}
                />
              )}
            </div>

            {/* Right Column: Deal Info & Countdown Timer */}
            <div className="flex flex-col justify-center text-center md:text-left space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-[#CFD4DC] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mb-1">
                  All Apple iPad
                </h2>
                <p className="text-lg font-bold text-[#52f0fd]">
                  30% OFF — Limited-time offer!
                </p>
              </div>

              {/* Neomorphic Coupon Code */}
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xs text-[#8A93A5]">Use Code:</span>
                <code className="bg-[#191C24] text-[#d9a79c] font-mono font-bold text-sm px-3 py-1.5 rounded-xl shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]">
                  LIMITED30OFF
                </code>
              </div>
            </div>
          </DealOfTheDay>
        </div>

        <div>
          <DealOfTheDay>
            {/* Left Column: Product Card */}
            <div className="flex justify-center md:justify-start">
              {singleProductThree && (
                <ProductCard
                  key={singleProductThree.id}
                  product={singleProductThree}
                />
              )}
            </div>

            {/* Right Column: Deal Info & Countdown Timer */}
            <div className="flex flex-col justify-center text-center md:text-left space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-[#CFD4DC] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mb-1">
                  On All Smart Watches
                </h2>
                <p className="text-lg font-bold text-[#f3e987]">
                  40% OFF — Limited-time offer!
                </p>
              </div>

              {/* Neomorphic Coupon Code */}
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xs text-[#8A93A5]">Use Code:</span>
                <code className="bg-[#191C24] text-[#d9a79c] font-mono font-bold text-sm px-3 py-1.5 rounded-xl shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]">
                  LIMITED40OFF
                </code>
              </div>
            </div>
          </DealOfTheDay>
        </div>
      </div>

      {/* 1. Loading State (Neomorphic Skeleton Grid) */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 xxl:grid-cols-7 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#191C24] rounded-2xl p-4 shadow-[-6px_-6px_14px_#222631,6px_6px_14px_#101217] animate-pulse flex flex-col"
            >
              {/* Image Placeholder (Recessed) */}
              <div className="w-full h-56 bg-[#191C24] rounded-xl mb-4 shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]"></div>

              {/* Title & Price Placeholder */}
              <div className="flex justify-between items-center mb-3">
                <div className="h-4 bg-[#222631] rounded-lg w-1/2 shadow-[inset_1px_1px_2px_#101217]"></div>
                <div className="h-4 bg-[#222631] rounded-lg w-1/4 shadow-[inset_1px_1px_2px_#101217]"></div>
              </div>

              {/* Description Lines Placeholder */}
              <div className="space-y-2 mb-6">
                <div className="h-3 bg-[#222631] rounded-lg w-full shadow-[inset_1px_1px_2px_#101217]"></div>
                <div className="h-3 bg-[#222631] rounded-lg w-4/5 shadow-[inset_1px_1px_2px_#101217]"></div>
              </div>

              {/* Button Placeholder */}
              <div className="h-9 bg-[#191C24] rounded-xl w-full mt-auto shadow-[-3px_-3px_6px_#222631,3px_3px_6px_#101217]"></div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Error State */}
      {!loading && error && (
        <div className="max-w-md mx-auto my-12 p-6 bg-white border border-red-100 rounded-2xl text-center shadow-sm">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <img src="src/assets/media/alert.gif" alt="error" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Failed to load products
          </h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
          >
            Try Again
          </button>
        </div>
      )}

      {/* 3. Empty State (No Products Found) */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No products found
          </h3>
          <p className="text-sm text-gray-500">
            Check back later or try adjusting your search filters.
          </p>
        </div>
      )}

      {/* 4. Products Grid State */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

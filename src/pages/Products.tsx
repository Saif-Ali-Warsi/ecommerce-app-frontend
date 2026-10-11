import { useEffect, useState } from "react";
import type { Product } from "../types/product.types";
import { getProducts } from "../services/productService";
import ProductCard from "../components/products/ProductCard";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const data = await getProducts();

        setProducts(data);
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Loading State (Skeleton Grid) */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm animate-pulse flex flex-col"
            >
              {/* Image Placeholder */}
              <div className="w-full h-56 bg-gray-200 rounded-xl mb-4"></div>

              {/* Title & Price Placeholder */}
              <div className="flex justify-between items-center mb-3">
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              </div>

              {/* Description Lines Placeholder */}
              <div className="space-y-2 mb-6">
                <div className="h-3.5 bg-gray-200 rounded w-full"></div>
                <div className="h-3.5 bg-gray-200 rounded w-4/5"></div>
              </div>

              {/* Button Placeholder */}
              <div className="h-10 bg-gray-200 rounded-xl w-full mt-auto"></div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Error State */}
      {!loading && error && (
        <div className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-100 rounded-2xl text-center shadow-sm">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Failed to load products
          </h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;

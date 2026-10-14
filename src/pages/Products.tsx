import { memo, useMemo, useEffect, useState } from "react";
import type { Product } from "../types/product.types";
import {
  getCategories,
  getProductsPaginated,
} from "../services/productService";
import ProductCard from "../components/products/ProductCard";

const Products = memo(function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const pageSize = 20;

  const totalPages = Math.ceil(totalProducts / pageSize);

  const [sortBy, setSortBy] = useState<string>("default");

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;

        case "price-high":
          return b.price - a.price;

        case "name-asc":
          return a.title.localeCompare(b.title);

        case "name-desc":
          return b.title.localeCompare(a.title);

        default:
          return 0;
      }
    });
  }, [products, sortBy]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const skip = (currentPage - 1) * pageSize;

        const data = await getProductsPaginated(
          pageSize,
          skip,
          selectedCategory || undefined,
        );

        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();

        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    }

    loadCategories();
  }, []);

return (
    <>
      {/* Filter and Sort Controls */}
      <div className="flex items-center gap-4 px-4 py-2">
        <div className="p-2 relative">
          <select
            value={selectedCategory}
            onChange={(event) => {
              setSelectedCategory(event.target.value);
              setCurrentPage(1);
            }}
            className="w-full appearance-none bg-[#191C24] text-[#CFD4DC] text-sm rounded-xl px-4 py-2.5 pr-10 focus:outline-none shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631] transition-all cursor-pointer"
          >
            <option value="" className="bg-[#191C24] text-[#CFD4DC]">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category} className="bg-[#191C24] text-[#CFD4DC]">
                {category}
              </option>
            ))}
          </select>

          {/* Custom Dropdown Arrow Icon */}
          <div className="absolute inset-y-0 right-5 flex items-center pr-3 pointer-events-none text-[#535C6D]">
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="p-2 relative">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="w-full appearance-none bg-[#191C24] text-[#CFD4DC] text-sm rounded-xl px-4 py-2.5 pr-10 focus:outline-none shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631] transition-all cursor-pointer"
          >
            <option value="default" className="bg-[#191C24] text-[#CFD4DC]">Default</option>
            <option value="price-low" className="bg-[#191C24] text-[#CFD4DC]">Price: Low to High</option>
            <option value="price-high" className="bg-[#191C24] text-[#CFD4DC]">Price: High to Low</option>
            <option value="name-asc" className="bg-[#191C24] text-[#CFD4DC]">Name: A to Z</option>
            <option value="name-desc" className="bg-[#191C24] text-[#CFD4DC]">Name: Z to A</option>
          </select>

          {/* Custom Dropdown Arrow Icon */}
          <div className="absolute inset-y-0 right-5 flex items-center pr-3 pointer-events-none text-[#535C6D]">
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-4 lg:px-4 py-4">
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
          <div className="max-w-md mx-auto my-12 p-6 bg-[#191C24] rounded-2xl text-center shadow-[-8px_-8px_20px_#222631,8px_8px_20px_#101217]">
            <div className="w-12 h-12 bg-[#191C24] text-red-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]">
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
            <h3 className="text-lg font-semibold text-[#CFD4DC] mb-1">
              Failed to load products
            </h3>
            <p className="text-sm text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-[#191C24] hover:bg-[#222631] text-red-400 text-sm font-bold rounded-xl transition-all shadow-[-4px_-4px_10px_#222631,4px_4px_10px_#101217] active:shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* 3. Empty State (No Products Found) */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#191C24] text-[#8A93A5] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]">
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
            <h3 className="text-lg font-semibold text-[#CFD4DC] mb-1">
              No products found
            </h3>
            <p className="text-sm text-[#8A93A5]">
              Check back later or try adjusting your search filters.
            </p>
          </div>
        )}

        {/* 4. Products Grid State */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-end gap-4 my-8">
            {/* Previous Button */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="cursor-pointer bg-[#191C24] hover:bg-[#222631] disabled:opacity-40 disabled:cursor-not-allowed text-[#d9a79c] font-bold py-2.5 px-4 rounded-xl text-sm shadow-[-4px_-4px_10px_#222631,4px_4px_10px_#101217] active:shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631] transition-all flex items-center justify-center gap-1.5"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            {/* Page Indicator */}
            <span className="text-sm font-medium text-[#8A93A5] px-3 py-2 rounded-xl bg-[#191C24] shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]">
              Page <strong className="text-[#CFD4DC]">{currentPage}</strong> of{" "}
              <strong className="text-[#CFD4DC]">{totalPages}</strong>
            </span>

            {/* Next Button */}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="cursor-pointer bg-[#191C24] hover:bg-[#222631] disabled:opacity-40 disabled:cursor-not-allowed text-[#d9a79c] font-bold py-2.5 px-4 rounded-xl text-sm shadow-[-4px_-4px_10px_#222631,4px_4px_10px_#101217] active:shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631] transition-all flex items-center justify-center gap-1.5"
            >
              Next
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
});

export default Products;

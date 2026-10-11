import { useState, useEffect } from "react";
import type { Product } from "../types/product.types";
import { getProducts } from "../services/productService";
import ProductCard from "../components/products/ProductCard";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);

      async function loadProducts() {
        const data = await getProducts();
        setProducts(data);
      }

      loadProducts();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading && <p>Loading please wait..</p>}

      {error && <p>{error}</p>}

      {!loading &&
        !error &&
        products.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
    </>
  );
}

export default Home;

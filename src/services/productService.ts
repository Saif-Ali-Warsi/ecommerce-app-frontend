import axios from "axios";
import type { Product } from "../types/product.types";

const API_URL = "https://dummyjson.com/products";

// get products
export async function getProducts(): Promise<Product[]> {
  const response = await axios.get<{ products: Product[] }>(API_URL, {
    params: { limit: 0 },
  });

  return response.data.products;
}

// product search
export async function searchProducts(query: string): Promise<Product[]> {
  const response = await axios.get<{ products: Product[] }>(
    `${API_URL}/search`,
    {
      params: { q: query },
    },
  );

  return response.data.products;
}

// single product
export async function getProductById(id: string): Promise<Product> {
  const response = await axios.get<Product>(`${API_URL}/${id}`);

  return response.data;
}

// category
export async function getCategories(): Promise<string[]> {
  const response = await axios.get<string[]>(`${API_URL}/category-list`);

  return response.data;
}

// products by category
export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const response = await axios.get<{ products: Product[] }>(
    `${API_URL}/category/${category}`,
  );

  return response.data.products;
}

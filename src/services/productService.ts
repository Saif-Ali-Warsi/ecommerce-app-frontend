import axios from "axios";
import type { Product } from "../types/product.types";

const API_URL = "https://dummyjson.com/products";

export async function getProducts(): Promise<Product[]> {
  const response = await axios.get<{ products: Product[] }>(API_URL);

  return response.data.products;
}

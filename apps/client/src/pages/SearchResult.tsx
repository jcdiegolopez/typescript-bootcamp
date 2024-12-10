import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { ProductDTO } from "@repo/schemas";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/Skeletons/CardSkeleton";

function SearchResult() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchProducts = async (params = {}) => {
    // setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/products/search`, {
        params,
      });
      setProducts(response.data);
      console.log("Fetched Data:", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchText = queryParams.get("searchText");
    const collectionId = queryParams.get("collectionId");
    const sortBy = queryParams.get("sortBy");


    const params: Record<string, string | undefined> = {};
    if (searchText) params.searchText = searchText;
    if (collectionId) params.collectionId = collectionId;
    if (sortBy) params.sortBy = sortBy;


    if (Object.keys(params).length > 0) {
      fetchProducts(params);
    } else {
      fetchProducts(); 
    }
  }, [location.search]);

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 container mx-auto">
      {loading
        ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
        : products.length > 0
        ? products.map((product) => <ProductCard key={product.id} {...product} />)
        : <p className="text-gray-400 text-lg font-semibold">No products found...</p>}
    </main>
  );
}

export default SearchResult;

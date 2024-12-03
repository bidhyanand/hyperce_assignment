"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { graphqlClient } from "@/lib/graphql";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductPrice {
  min?: number;
  max?: number;
  value?: number;
}

interface SearchProduct {
  currencyCode: string;
  productAsset: {
    id: string;
    preview: string;
  };
  slug: string;
  productName: string;
  price: ProductPrice;
}

interface SearchResponse {
  search: {
    totalItems: number;
    items: SearchProduct[];
  };
}

// Separate component for search results
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function performSearch() {
      if (!query) return;
      
      setLoading(true);
      try {
        const searchQuery = `
          query Search {
            search(input: { term: "${query}" }) {
              totalItems
              items {
                currencyCode
                productAsset {
                  id
                  preview
                }
                slug
                productName
                price {
                  ... on PriceRange {
                    min
                    max
                  }
                  ... on SinglePrice {
                    value
                  }
                }
              }
            }
          }
        `;

        const data = await graphqlClient.request<SearchResponse>(searchQuery);
        setProducts(data.search.items);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [query]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-40 md:h-64 rounded-lg mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {query ? `Search results for "${query}"` : "Search Products"}
        </h1>
        <p className="text-gray-600">
          {products.length} products found
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              title={product.productName}
              image={product.productAsset?.preview}
              price={product.price.value || product.price.min || 0}
              currencyCode={product.currencyCode}
              slug={product.slug}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your search.</p>
        </div>
      )}
    </>
  );
}

// Main search page component
export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-40 md:h-64 rounded-lg mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      }>
        <SearchResults />
      </Suspense>
    </div>
  );
} 
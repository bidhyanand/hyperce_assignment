"use client"
import { CategoryCard } from "./CategoryCard";
import { useEffect, useState } from "react";
import { graphqlClient } from "@/lib/graphql";

// Define the types for our GraphQL response
interface Collection {
  id: string;
  name: string;
  slug: string;
  featuredAsset: {
    height: number;
    source: string;
    id: string;
    width: number;
  } | null;
}

interface CollectionsResponse {
  collections: {
    totalItems: number;
    items: Collection[];
  };
}

const collectionsQuery = `
  query Collections {
    collections {
      totalItems
      items {
        id
        name
        slug
        featuredAsset {
          height
          source
          id
          width
        }
      }
    }
  }
`;

export function Categories() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const data = await graphqlClient.request<CollectionsResponse>(collectionsQuery);
        setCollections(data.collections.items);
      } catch (error) {
        console.error('Error fetching collections:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-40 md:h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection) => (
            <CategoryCard
              key={collection.id}
              title={collection.name}
              slug={collection.slug}
              image={collection.featuredAsset?.source ? collection.featuredAsset.source : "/assests/frame-23__preview.png"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
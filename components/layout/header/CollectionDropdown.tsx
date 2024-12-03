"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { graphqlClient } from "@/lib/graphql";

interface Collection {
  id: string;
  name: string;
  slug: string;
}

interface CollectionsResponse {
  collections: {
    items: Collection[];
  };
}

export function CollectionsDropdown() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const query = `
          query Collections {
            collections {
              items {
                name
                slug
                id
              }
            }
          }
        `;

        const data = await graphqlClient.request<CollectionsResponse>(query);
        // Filter out root collection if needed
        const filteredCollections = data.collections.items.filter(
          (collection) => collection.slug !== "__root_collection__"
        );
        setCollections(filteredCollections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center space-x-1 text-sm text-gray-400">
        <ChevronDown className="h-4 w-4" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-sm hover:text-gray-600 py-2">
        <ChevronDown className="h-4 w-4" />
        <span>Collections</span>
      </button>
      
      {/* Dropdown menu */}
      <div className="absolute left-0 top-full z-50 hidden group-hover:block">
        <div className="mt-2 py-2 w-48 bg-white rounded-lg shadow-lg border">
          <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {collection.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
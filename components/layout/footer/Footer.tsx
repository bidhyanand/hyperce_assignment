"use client";
import { useEffect, useState } from "react";
import { graphqlClient } from "@/lib/graphql";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

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

export function Footer() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_SHOW_COUNT = 4;

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
        const filteredCollections = data.collections.items.filter(
          (collection) => collection.slug !== "__root_collection__"
        );
        setCollections(filteredCollections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    }

    fetchCollections();
  }, []);

  const displayedCollections = showAll 
    ? collections 
    : collections.slice(0, INITIAL_SHOW_COUNT);

  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-screen-xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hyperce</h3>
            <p className="text-sm text-gray-600 mb-4">
              Modern e-commerce platform for all your shopping needs.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Collections</h3>
            <div className="space-y-2">
              {displayedCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.slug}`}
                  className="block text-sm text-gray-600 hover:text-gray-900"
                >
                  {collection.name}
                </Link>
              ))}
              {collections.length > INITIAL_SHOW_COUNT && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center text-sm text-primary hover:text-primary/90 mt-2"
                >
                  {showAll ? (
                    <>
                      Show Less <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Show More <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-gray-600 hover:text-gray-900">
                About Us
              </Link>
              <Link href="/contact" className="block text-sm text-gray-600 hover:text-gray-900">
                Contact
              </Link>
              <Link href="/shipping" className="block text-sm text-gray-600 hover:text-gray-900">
                Shipping Policy
              </Link>
              <Link href="/returns" className="block text-sm text-gray-600 hover:text-gray-900">
                Returns
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Email: support@hyperce.io</p>
              <p>Phone: (123) 456-7890</p>
              <p>Address: 123 Commerce St, City, Country</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Hyperce. All rights reserved.
            </p>
           
          </div>
        </div>
      </div>
    </footer>
  );
}
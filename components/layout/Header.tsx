"use client";

import { ShoppingBag, Search, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo } from "react";
import { graphqlClient } from "@/lib/graphql";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import Image from "next/image";

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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Create memoized debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        if (term.trim()) {
          router.push(`/search?q=${encodeURIComponent(term.trim())}`);
        }
      }, 500),
    [router]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      debouncedSearch(value);
    } else {
      debouncedSearch.cancel();
    }
  };

  // Collections fetch effect
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

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="https://demo.hyperce.io/logo.svg"
                alt="Hyperce Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
                priority
              />
              <div className="  grid items-center space-x-2">
                <span className="text-xl font-bold hidden sm:inline">Hyperce</span>
              </div>
            </Link>
            
            {/* Desktop Collections Dropdown */}
            <div className="hidden md:block relative group">
              <button className="flex items-center space-x-1 text-sm hover:text-gray-600 py-2">
                <ChevronDown className="h-4 w-4" />
                <span>Collections</span>
              </button>
              
              <div className="absolute left-0 top-full z-50 hidden group-hover:block">
                <div className="mt-2 py-2 w-48 bg-white rounded-lg shadow-lg border">
                  <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 pr-2">
                    {collections.map((collection) => (
                      <Link
                        key={collection.id}
                        href={`/collections/${collection.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {collection.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Desktop Search */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="What's on your mind today?"
                className="w-full pl-4 pr-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="#">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="#">
              <Button size="sm">Sign up</Button>
            </Link>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                0
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                0
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-4 pr-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute right-3 top-2.5 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu-container md:hidden py-4 border-t mt-3">
            <div className="flex flex-col space-y-4">
              {/* Collections List */}
              <div className="pl-4 py-2 space-y-2">
                <h3 className="font-medium text-sm mb-2">Collections</h3>
                {collections.map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/collections/${collection.slug}`}
                    className="block text-sm text-gray-600 hover:text-gray-900 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {collection.name}
                  </Link>
                ))}
              </div>

              {/* Authentication Buttons */}
              <div className="px-4 space-y-2">
                <Link href="#" className="w-full">
                  <Button
                    variant="ghost"
                    className="w-full justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="#" className="w-full">
                  <Button
                    className="w-full justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
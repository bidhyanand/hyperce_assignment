"use client";
import { useEffect, useState, use } from "react";
import { graphqlClient } from "@/lib/graphql";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductVariant {
  id: string;
  featuredAsset: {
    id: string;
    source: string;
  };
  price: number;
  currencyCode: string;
  product: {
    id: string;
    name: string;
    slug: string;
  };
}

interface Breadcrumb {
  id: string;
  name: string;
  slug: string;
}

interface CollectionData {
  collection: {
    name: string;
    description: string;
    productVariants: {
      totalItems: number;
      items: ProductVariant[];
    };
    breadcrumbs: Breadcrumb[];
  };
}

export default function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductVariant[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [collectionName, setCollectionName] = useState<string>("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const query = `
          query Collection {
            collection(slug: "${resolvedParams.slug}") {
              name
              description
              productVariants {
                totalItems
                items {
                  featuredAsset {
                    id
                    source
                  }
                  price
                  currencyCode
                  product {
                    id
                    name
                    slug
                  }
                  id
                }
              }
              breadcrumbs {
                id
                name
                slug
              }
            }
          }
        `;

        const data = await graphqlClient.request<CollectionData>(query);
        const filteredBreadcrumbs = data.collection.breadcrumbs.filter(
          (crumb) => crumb.slug !== "__root_collection__"
        );
        setProducts(data.collection.productVariants.items);
        setBreadcrumbs(filteredBreadcrumbs);
        setCollectionName(data.collection.name);
        document.title = `${data.collection.name} - Hyperce Shop`;
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-64 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbs} />

      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">{collectionName}</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((variant) => (
          <ProductCard
            key={variant.id}
            title={variant.product.name}
            image={
              variant.featuredAsset?.source
                ? variant.featuredAsset.source
                : "/assests/frame-23__preview.png"
            }
            price={variant.price}
            currencyCode={variant.currencyCode}
            slug={variant.product.slug}
          />
        ))}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState, use } from "react";
import { graphqlClient } from "@/lib/graphql";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface ProductVariant {
  price: number;
  stockLevel: string;
  priceWithTax: number;
}

interface Asset {
  id: string;
  source: string;
}

interface Breadcrumb {
  id: string;
  name: string;
  slug: string;
}

interface ProductData {
  product: {
    id: string;
    name: string;
    description: string;
    featuredAsset: Asset;
    assets: Asset[];
    variants: ProductVariant[];
    collections: {
      breadcrumbs: Breadcrumb[];
    }[];
  };
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductData["product"] | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const query = `
          query Product {
            product(slug: "${resolvedParams.slug}") {
              id
              name
              description
              featuredAsset {
                id
                source
              }
              assets {
                id
                source
              }
              variants {
                price
                stockLevel
                priceWithTax
              }
              collections {
                breadcrumbs {
                  id
                  name
                  slug
                }
              }
            }
          }
        `;

        const data = await graphqlClient.request<ProductData>(query);
        setProduct(data.product);
        // Get breadcrumbs from the first collection (assuming product belongs to at least one collection)
        const filteredBreadcrumbs =
          data.product.collections[0]?.breadcrumbs.filter(
            (crumb) => crumb.slug !== "__root_collection__"
          ) || [];
        setBreadcrumbs(filteredBreadcrumbs);
        document.title = `${data.product.name} - Hyperce Shop`;
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-pulse bg-gray-200 aspect-square rounded-lg" />
          <div className="space-y-4">
            <div className="animate-pulse bg-gray-200 h-8 w-2/3 rounded" />
            <div className="animate-pulse bg-gray-200 h-4 w-1/3 rounded" />
            <div className="animate-pulse bg-gray-200 h-32 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Product not found</p>
      </div>
    );
  }

  const variant = product.variants[0];
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(variant.price / 100);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* Product Title for Mobile */}
      <h1 className="text-2xl font-bold mb-6 md:hidden">{product.name}</h1>

      {/* Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductGallery
          images={product.assets}
          featuredImage={product.featuredAsset}
          productName={product.name}
        />

        <div>
          <ProductInfo
            name={product.name}
            description={product.description}
            price={formattedPrice}
            stockLevel={variant.stockLevel}
            onAddToCart={() => {
              // Implement cart functionality
              console.log("Adding to cart:", product.name);
            }}
          />
        </div>
      </div>
    </div>
  );
}

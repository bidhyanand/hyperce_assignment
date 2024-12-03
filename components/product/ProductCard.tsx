import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  title: string;
  image: string | null | undefined;
  price: number;
  currencyCode: string;
  slug: string;
}

export function ProductCard({ title, image, price, currencyCode, slug }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price / 100);

  return (
    <Link href={`/products/${slug}`} className="group block">
      <div className="aspect-square h-40 md:h-64 overflow-hidden rounded-lg bg-gray-100">
        {image ? (
          <Image
            src={image }
            alt={title}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200">
            <span className="text-xs md:text-sm text-gray-400">No image available</span>
          </div>
        )}
      </div>
      <div className="mt-2 md:mt-4 space-y-1">
        <h3 className="text-sm md:text-base font-medium text-gray-900 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-500">{formattedPrice}</p>
      </div>
    </Link>
  );
} 
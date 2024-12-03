import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CategoryCardProps {
  title: string;
  image: string;
  slug: string;
  className?: string;
}

export function CategoryCard({ 
  title,
  image,
  slug,
  className,
}: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/collections/${slug}`}
      className={cn(
        "group relative block h-40 md:h-[300px] overflow-hidden rounded-lg",
        className
      )}
    >
      <Image
        src={imageError ? "/assets/frame-23__preview.png" : image}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        onError={() => setImageError(true)}
      />
      <div className="absolute top-2 md:top-4 left-2 md:left-4">
        <span className="inline-block rounded-full bg-white px-3 md:px-4 py-1 text-xs md:text-sm font-medium">
          {title}
        </span>
      </div>
    </Link>
  );
}
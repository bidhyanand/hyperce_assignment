import Image from "next/image";
import { useState } from "react";

interface Asset {
  id: string;
  source: string;
}

interface ProductGalleryProps {
  images: Asset[];
  featuredImage: Asset;
  productName: string;
}

export function ProductGallery({ images, featuredImage, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(featuredImage.source);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
        {images.map((asset) => (
          <button
            key={asset.id}
            onClick={() => setSelectedImage(asset.source)}
            className={`flex-shrink-0 w-20 h-20 relative rounded-lg overflow-hidden ${
              selectedImage === asset.source
                ? "ring-2 ring-primary"
                : "hover:opacity-75"
            }`}
          >
            <Image
              src={asset.source}
              alt=""
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={selectedImage}
            alt={productName}
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
} 
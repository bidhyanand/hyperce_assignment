import { ShoppingCart, Truck, Lock, Star, Percent } from "lucide-react";

interface ProductInfoProps {
  name: string;
  description: string;
  price: string;
  stockLevel: string;
  onAddToCart: () => void;
}

export function ProductInfo({ 
  name, 
  description, 
  price, 
  stockLevel,
  onAddToCart 
}: ProductInfoProps) {
  return (
    <div className="max-w-lg mx-auto md:mx-0 space-y-6 w-full">
      {/* Product Title and Price */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
        <p className="text-xl md:text-2xl font-semibold text-gray-900 mt-2">{price}</p>
      </div>
      
      {/* Description */}
      <div className="prose prose-sm max-w-none">
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Stock and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              stockLevel === "IN_STOCK"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {stockLevel === "IN_STOCK" ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Features */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Free Shipping */}
            <div className="flex items-start gap-2">
              <div className="p-1.5 bg-gray-100 rounded-lg">
                <Truck className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xs font-medium">Free Shipping</h3>
                <p className="text-xs text-gray-500">Worldwide</p>
              </div>
            </div>

            {/* Secured Payment */}
            <div className="flex items-start gap-2">
              <div className="p-1.5 bg-gray-100 rounded-lg">
                <Lock className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xs font-medium">100% Secured</h3>
                <p className="text-xs text-gray-500">Payment</p>
              </div>
            </div>

            {/* Professional Quality */}
            <div className="flex items-start gap-2">
              <div className="p-1.5 bg-gray-100 rounded-lg">
                <Star className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xs font-medium">Professional</h3>
                <p className="text-xs text-gray-500">Quality</p>
              </div>
            </div>

            {/* First Order Discount */}
            <div className="flex items-start gap-2">
              <div className="p-1.5 bg-gray-100 rounded-lg">
                <Percent className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xs font-medium">10% Off First Order</h3>
                <p className="text-xs text-gray-500">New customers</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onAddToCart}
          disabled={stockLevel !== "IN_STOCK"}
          className="w-full bg-primary text-white py-2.5 px-4 rounded-lg font-medium hover:bg-primary/90 disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
} 
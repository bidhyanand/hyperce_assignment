import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative h-[200px] md:h-[400px] rounded-lg overflow-hidden bg-[#C48B9F]  md:mb-12">
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-6xl font-bold text-white mb-6">
            Grab Upto 50% Off On Selected Clothes
          </h1>
          <Button size="lg" variant="secondary">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
}
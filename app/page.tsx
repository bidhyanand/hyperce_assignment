import { Categories } from "@/components/home/Catgegories";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/services/Services";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <Services />
    </main>
  );
}
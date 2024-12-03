"use client";

import { CreditCard, Truck, Shield, Gift } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

const services = [
  {
    title: "Secured Payments",
    description: "Secure payment options to ensure that your transactions are protected and your personal information is kept safe.",
    Icon: CreditCard,
  },
  {
    title: "Free Delivery Worldwide",
    description: "Enjoy free worldwide delivery on all orders, no matter where you are located.",
    Icon: Truck,
  },
  {
    title: "High Quality Materials",
    description: "We use only the finest materials in our products, ensuring that they are long-lasting and of the highest quality.",
    Icon: Shield,
  },
  {
    title: "Send Gifts Easily",
    description: "Want to surprise someone special? Our site makes it easy to send a gift to your loved ones with just a few clicks.",
    Icon: Gift,
  },
];

export function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              Icon={service.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
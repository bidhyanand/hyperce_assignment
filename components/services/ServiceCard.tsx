"use client";

import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export function ServiceCard({ title, description, Icon }: ServiceCardProps) {
  return (
    <div className="flex gap-6 items-start">
      <div className="shrink-0">
        <div className="p-3 rounded-lg bg-gray-100">
          <Icon className="h-6 w-6 text-gray-600" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
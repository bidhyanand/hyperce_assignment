"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FooterColumnProps {
  title: string;
  items: string[];
  className?: string;
  collapsible?: boolean;
}

export function FooterColumn({ title, items, className, collapsible = false }: FooterColumnProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayItems = isExpanded ? items : items.slice(0, 5);

  return (
    <div className={className}>
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <ul className="space-y-2">
        {displayItems.map((item) => (
          <li key={item}>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>
      {collapsible && items.length > 5 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 mt-2"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  id: string;
  name: string;
  slug: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link
              href={`/collections/${item.slug}`}
              className={`text-sm ${
                index === items.length - 1
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
} 
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";

export function SocialLinks() {
  return (
    <div className="flex space-x-4">
      <a href="#" className="text-gray-600 hover:text-gray-900">
        <Facebook className="h-5 w-5" />
      </a>
      <a href="#" className="text-gray-600 hover:text-gray-900">
        <Instagram className="h-5 w-5" />
      </a>
      <a href="#" className="text-gray-600 hover:text-gray-900">
        <Twitter className="h-5 w-5" />
      </a>
      <a href="#" className="text-gray-600 hover:text-gray-900">
        <Youtube className="h-5 w-5" />
      </a>
      <a href="#" className="text-gray-600 hover:text-gray-900">
        <Linkedin className="h-5 w-5" />
      </a>
    </div>
  );
}
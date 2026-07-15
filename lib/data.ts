export interface NavLink {
  label: string;
  href: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  badge?: "sale" | "new" | "bestseller";
  description: string;
}

export const APP_NAME = "Verdant";
export const APP_TAGLINE = "Nature, Elevated.";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#newsletter" },
];

export const NAV_CTA = {
  label: "Shop Now",
  href: "#products",
};
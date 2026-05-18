import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  hover: string;
};

export const products: Product[] = [
  { id: "1", name: "Oversized Cotton Tee", category: "Men", price: 1499, oldPrice: 2299, rating: 4.8, reviews: 214, badge: "New", image: p1, hover: p5 },
  { id: "2", name: "Satin Slip Midi Dress", category: "Women", price: 3499, oldPrice: 4999, rating: 4.9, reviews: 320, badge: "-30%", image: p2, hover: p8 },
  { id: "3", name: "Beige Heavyweight Sweatshirt", category: "Streetwear", price: 2799, rating: 4.7, reviews: 142, image: p3, hover: p7 },
  { id: "4", name: "Wide-Leg Trouser Set", category: "Women", price: 4299, oldPrice: 5499, rating: 4.9, reviews: 187, badge: "Best Seller", image: p4, hover: p2 },
  { id: "5", name: "Slim Indigo Denim", category: "Men", price: 2599, rating: 4.6, reviews: 98, image: p5, hover: p1 },
  { id: "6", name: "Camel Trench Coat", category: "Women", price: 6499, oldPrice: 7999, rating: 4.9, reviews: 76, badge: "Limited", image: p6, hover: p4 },
  { id: "7", name: "Ivory Mandarin Kurta", category: "Ethnic", price: 2899, rating: 4.8, reviews: 211, image: p7, hover: p3 },
  { id: "8", name: "Cable Knit Crop", category: "Casual", price: 1899, oldPrice: 2499, rating: 4.7, reviews: 165, badge: "-25%", image: p8, hover: p6 },
];

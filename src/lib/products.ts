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
  images: string[];
  description: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Oversized Cotton Tee",
    category: "Men",
    price: 1499,
    oldPrice: 2299,
    rating: 4.8,
    reviews: 214,
    badge: "New",
    image: p1,
    hover: p5,
    images: [p1, p5, p3, p7],
    description: "A classic heavy-weight drop-shoulder tee cut from 100% long-staple organic cotton. Structured silhouette, pre-shrunk for the perfect box-fit drape.",
  },
  {
    id: "2",
    name: "Satin Slip Midi Dress",
    category: "Women",
    price: 3499,
    oldPrice: 4999,
    rating: 4.9,
    reviews: 320,
    badge: "-30%",
    image: p2,
    hover: p8,
    images: [p2, p8, p4, p6],
    description: "Crafted from liquid-shine premium satin. Features a soft cowl neck, adjustable cross-back ties, and a bias cut that drapes like a dream.",
  },
  {
    id: "3",
    name: "Beige Heavyweight Sweatshirt",
    category: "Streetwear",
    price: 2799,
    rating: 4.7,
    reviews: 142,
    image: p3,
    hover: p7,
    images: [p3, p7, p1, p5],
    description: "Ultra-soft brushed fleece lining. Made from a heavy 400 GSM cotton-poly blend with custom flatlock stitching and ribbed side panels.",
  },
  {
    id: "4",
    name: "Wide-Leg Trouser Set",
    category: "Women",
    price: 4299,
    oldPrice: 5499,
    rating: 4.9,
    reviews: 187,
    badge: "Best Seller",
    image: p4,
    hover: p2,
    images: [p4, p2, p6, p8],
    description: "An elegant, coordinates set featuring tailored double-pleated linen trousers and a matching relaxed button-down shirt. Ultimate resort-wear comfort.",
  },
  {
    id: "5",
    name: "Slim Indigo Denim",
    category: "Men",
    price: 2599,
    rating: 4.6,
    reviews: 98,
    image: p5,
    hover: p1,
    images: [p5, p1, p7, p3],
    description: "Raw indigo denim woven with 2% comfort stretch. Features classic 5-pocket tailoring, copper rivets, and a custom leather patch back waist.",
  },
  {
    id: "6",
    name: "Camel Trench Coat",
    category: "Women",
    price: 6499,
    oldPrice: 7999,
    rating: 4.9,
    reviews: 76,
    badge: "Limited",
    image: p6,
    hover: p4,
    images: [p6, p4, p8, p2],
    description: "Double-breasted timeless silhouette crafted from a premium brushed wool-cashmere blend. Details include storm flaps, horn buttons, and a belted waist.",
  },
  {
    id: "7",
    name: "Ivory Mandarin Kurta",
    category: "Ethnic",
    price: 2899,
    rating: 4.8,
    reviews: 211,
    image: p7,
    hover: p3,
    images: [p7, p3, p5, p1],
    description: "Modern ethnic silhouette cut from high-twist slub linen. Clean mandarin collar with hidden button placket details, and curved hem styling.",
  },
  {
    id: "8",
    name: "Cable Knit Crop",
    category: "Casual",
    price: 1899,
    oldPrice: 2499,
    rating: 4.7,
    reviews: 165,
    badge: "-25%",
    image: p8,
    hover: p6,
    images: [p8, p6, p2, p4],
    description: "Hand-spun cable knit pattern made from chunky organic cotton yarn. Cropped hem design with relaxed drop shoulders, perfect for layered styling.",
  },
];

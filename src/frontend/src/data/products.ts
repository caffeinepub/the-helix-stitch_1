export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category:
    | "flower-bouquets"
    | "flowers"
    | "t-shirts"
    | "mesh-items"
    | "purses";
  emoji: string;
  featured?: boolean;
  bgColor: string;
  images?: string[];
  collection?: string;
};

export const products: Product[] = [
  // Flower Bouquets
  {
    id: "fb-01",
    name: "Blush Garden Bouquet",
    description:
      "A dreamy arrangement of blush pink and cream crochet roses with sage leaves.",
    price: 899,
    category: "flower-bouquets",
    emoji: "🌸",
    featured: true,
    bgColor: "#fce8e6",
  },
  {
    id: "fb-02",
    name: "Sunflower Sunshine Bunch",
    description:
      "Bright yellow sunflowers with green stems — perfect for gifting.",
    price: 749,
    category: "flower-bouquets",
    emoji: "🌻",
    bgColor: "#fef9e7",
  },
  {
    id: "fb-03",
    name: "Wildflower Meadow Bouquet",
    description:
      "Mixed wildflowers in lavender, dusty rose, and ivory — cottagecore perfection.",
    price: 1099,
    category: "flower-bouquets",
    emoji: "💐",
    featured: true,
    bgColor: "#f0ebf8",
  },
  {
    id: "fb-04",
    name: "Red Romance Rose Bouquet",
    description:
      "Classic deep red roses with baby's breath — timeless and elegant.",
    price: 999,
    category: "flower-bouquets",
    emoji: "🌹",
    bgColor: "#fce8e6",
  },
  // Flowers
  {
    id: "fl-01",
    name: "Daisy Single Stem",
    description:
      "Delicate white daisy with a golden center — pure and cheerful.",
    price: 299,
    category: "flowers",
    emoji: "🌼",
    bgColor: "#fefce8",
  },
  {
    id: "fl-02",
    name: "Mini Rose Bud",
    description:
      "Tiny crochet rose bud in dusty pink — great for hair pins and corsages.",
    price: 249,
    category: "flowers",
    emoji: "🌷",
    bgColor: "#fce8f0",
  },
  {
    id: "fl-03",
    name: "Marigold Bloom",
    description: "Vibrant orange marigold, auspicious and beautiful.",
    price: 279,
    category: "flowers",
    emoji: "🏵️",
    bgColor: "#fff3e0",
  },
  {
    id: "fl-04",
    name: "Lavender Sprig",
    description:
      "Tiny lavender sprigs bundled together — calming and aromatic aesthetic.",
    price: 350,
    category: "flowers",
    emoji: "💜",
    bgColor: "#f0ebf8",
  },
  // T-Shirts
  {
    id: "ts-01",
    name: "Sage Garden Crochet Top",
    description: "Breezy sage green crochet crop top with floral hem detail.",
    price: 1499,
    category: "t-shirts",
    emoji: "👕",
    featured: true,
    bgColor: "#e8f0eb",
  },
  {
    id: "ts-02",
    name: "Cream Lace Crochet Top",
    description:
      "Elegant ivory crochet top with intricate lace-style stitching.",
    price: 1399,
    category: "t-shirts",
    emoji: "🧶",
    bgColor: "#faf5ef",
  },
  {
    id: "ts-03",
    name: "Boho Stripe Crochet Tee",
    description:
      "Earth-toned stripes in cream and terracotta — effortlessly boho.",
    price: 1599,
    category: "t-shirts",
    emoji: "🌿",
    bgColor: "#faf0e6",
  },
  // Mesh Items
  {
    id: "mi-01",
    name: "Natural Mesh Market Tote",
    description:
      "Open-weave market tote in natural cream — eco-friendly and spacious.",
    price: 699,
    category: "mesh-items",
    emoji: "🧺",
    bgColor: "#f5f0e8",
  },
  {
    id: "mi-02",
    name: "Sage Mesh Beach Bag",
    description: "Sage green mesh beach bag with sturdy rope handles.",
    price: 849,
    category: "mesh-items",
    emoji: "🌊",
    bgColor: "#e8f0eb",
  },
  {
    id: "mi-03",
    name: "Mini Mesh Produce Bags (Set of 3)",
    description:
      "Set of 3 small mesh bags — perfect for fruits, veggies, or trinkets.",
    price: 499,
    category: "mesh-items",
    emoji: "🌾",
    bgColor: "#f5f5e8",
  },
  // Purses
  {
    id: "pu-crystal-01",
    name: "Azura – Royal Blue Crystal Bag",
    description:
      "A handwoven royal blue crystal clutch — where the spiral of craft meets the depth of the ocean.",
    price: 0,
    category: "purses",
    emoji: "💎",
    bgColor: "#e8eef8",
    collection: "The Sapphire Collection",
    images: [
      "/assets/uploads/72acb89e-2af0-45d9-beab-d2328a1344c7-019d28f7-3d5e-76fc-920e-7b304b696968-1.png",
      "/assets/uploads/9d52011f-3eb1-44e3-979c-4ab25454bc12-019d28f7-3e28-745b-9a2c-d8726a90d517-2.png",
    ],
  },
  {
    id: "pu-01",
    name: "Dusty Rose Flap Purse",
    description:
      "Structured mini purse in dusty rose with a pearl button closure.",
    price: 1199,
    category: "purses",
    emoji: "👜",
    featured: true,
    bgColor: "#fce8f0",
  },
  {
    id: "pu-02",
    name: "Cream Half-Moon Clutch",
    description:
      "Elegant half-moon shaped clutch in ivory — great for evenings.",
    price: 1299,
    category: "purses",
    emoji: "👛",
    bgColor: "#faf5ef",
  },
  {
    id: "pu-03",
    name: "Sage Granny Square Bag",
    description: "Patchwork granny square purse — each square tells a story.",
    price: 1099,
    category: "purses",
    emoji: "🎀",
    bgColor: "#e8f0eb",
  },
  {
    id: "pu-04",
    name: "Boho Tassel Crossbody",
    description:
      "Earthy crossbody purse with fringe tassel detail — festival ready.",
    price: 1399,
    category: "purses",
    emoji: "✨",
    bgColor: "#faf0e6",
  },
];

export const categories = [
  {
    id: "flower-bouquets",
    label: "Flower Bouquets",
    emoji: "🌸",
    image: "/assets/generated/category-flower-bouquet.dim_400x400.jpg",
  },
  {
    id: "flowers",
    label: "Flowers",
    emoji: "🌼",
    image: "/assets/generated/category-flowers.dim_400x400.jpg",
  },
  {
    id: "t-shirts",
    label: "T-Shirts",
    emoji: "👕",
    image: "/assets/generated/category-tshirts.dim_400x400.jpg",
  },
  {
    id: "mesh-items",
    label: "Mesh Items",
    emoji: "🧺",
    image: "/assets/generated/category-mesh-items.dim_400x400.jpg",
  },
  {
    id: "purses",
    label: "Purses",
    emoji: "👜",
    image: "/assets/generated/category-purses.dim_400x400.jpg",
  },
  { id: "custom", label: "Custom Orders", emoji: "✨", image: null },
];

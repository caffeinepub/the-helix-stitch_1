import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { categories, products } from "../data/products";
import type { Product } from "../data/products";

const categoryDescriptions: Record<string, string> = {
  "flower-bouquets":
    "Beautiful handcrafted crochet flower bouquets — perfect for gifting, home décor, or keeping as a forever keepsake.",
  flowers:
    "Delicate individual crochet flowers in a variety of styles, from daisies to roses and marigolds.",
  "t-shirts":
    "Breezy, handmade crochet tops and tees — each one unique and made with care just for you.",
  "mesh-items":
    "Eco-friendly mesh totes, bags, and produce bags woven with love and built to last.",
  purses:
    "Charming handcrafted crochet purses, clutches, and crossbody bags for every occasion.",
};

function ProductCard({ product }: { product: Product }) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = product.images ?? [];

  const prev = () =>
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setImgIndex((i) => (i + 1) % images.length);

  const whatsappUrl = `https://wa.me/919664757318?text=${encodeURIComponent(
    `Hello! I'd like to order ${product.name} from The Spiral Stitch. Please help me!`,
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl overflow-hidden shadow-md flex flex-col"
      style={{
        background: "oklch(0.97 0.015 80)",
        border: "1.5px solid oklch(0.89 0.02 75)",
      }}
    >
      {/* Image area */}
      <div
        className="relative w-full"
        style={{ aspectRatio: "4/3", background: product.bgColor }}
      >
        <img
          src={images[imgIndex]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center shadow transition-opacity hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.85)" }}
            >
              <ChevronLeft size={18} style={{ color: "oklch(0.35 0.04 55)" }} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center shadow transition-opacity hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.85)" }}
            >
              <ChevronRight
                size={18}
                style={{ color: "oklch(0.35 0.04 55)" }}
              />
            </button>
            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setImgIndex(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    background:
                      i === imgIndex
                        ? "oklch(0.45 0.08 55)"
                        : "rgba(255,255,255,0.7)",
                    border: "1px solid oklch(0.45 0.08 55)",
                  }}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3
            className="font-serif text-lg leading-snug"
            style={{ color: "oklch(0.22 0.02 60)" }}
          >
            {product.emoji} {product.name}
          </h3>
          <p
            className="font-sans text-sm mt-1 leading-relaxed"
            style={{ color: "oklch(0.47 0.025 55)" }}
          >
            {product.description}
          </p>
        </div>
        <Button
          data-ocid="purses.primary_button"
          asChild
          className="w-full text-xs tracking-widest font-bold mt-auto"
          style={{ background: "#25D366", color: "white" }}
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={14} className="mr-2" />
            ORDER ON WHATSAPP
          </a>
        </Button>
      </div>
    </motion.div>
  );
}

export default function CategoryPage() {
  const { category } = useParams({ strict: false }) as { category: string };

  const cat = categories.find((c) => c.id === category);
  const description =
    categoryDescriptions[category] ??
    `Explore our handcrafted ${cat?.label ?? category} collection.`;

  const categoryProducts = products.filter(
    (p) => p.category === category && p.images && p.images.length > 0,
  );
  const hasProducts = categoryProducts.length > 0;

  const whatsappUrl = `https://wa.me/919664757318?text=${encodeURIComponent(
    `Hello! I'd like to order from The Spiral Stitch — ${cat?.label ?? category} category. Please help me!`,
  )}`;

  if (!cat) {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: "oklch(0.94 0.022 80)" }}
      >
        <p
          className="font-serif text-xl"
          style={{ color: "oklch(0.47 0.025 55)" }}
        >
          Category not found.
        </p>
        <Button
          asChild
          className="mt-6"
          style={{ background: "oklch(0.45 0.08 55)", color: "white" }}
        >
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(0.94 0.022 80)" }}
    >
      {/* Header */}
      <section
        className="py-16 text-center border-b"
        style={{
          background: "oklch(0.97 0.015 80)",
          borderColor: "oklch(0.89 0.02 75)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs tracking-widest uppercase font-sans mb-3"
            style={{ color: "oklch(0.45 0.08 55)" }}
          >
            The Spiral Stitch
          </p>
          <h1
            className="font-serif text-4xl sm:text-5xl uppercase tracking-widest"
            style={{ color: "oklch(0.22 0.02 60)" }}
          >
            {cat.label}
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mt-4"
            style={{ background: "oklch(0.45 0.08 55)" }}
          />
        </motion.div>
      </section>

      {/* Products grid (only shown when items with images exist) */}
      {hasProducts && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p
              className="font-sans text-sm text-center mb-10 leading-relaxed"
              style={{ color: "oklch(0.47 0.025 55)" }}
            >
              {description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Coming soon / WhatsApp section */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col items-center gap-8"
        >
          {!hasProducts && (
            <>
              <div
                className="w-36 h-36 rounded-full flex items-center justify-center text-7xl shadow-md"
                style={{ background: "oklch(0.91 0.025 75)" }}
              >
                {cat.emoji}
              </div>

              <div className="space-y-4">
                <p
                  className="font-sans leading-relaxed text-base"
                  style={{ color: "oklch(0.47 0.025 55)" }}
                >
                  {description}
                </p>
                <p
                  className="font-serif text-lg italic"
                  style={{ color: "oklch(0.45 0.08 55)" }}
                >
                  Coming soon — check back for our handcrafted{" "}
                  {cat.label.toLowerCase()}.
                </p>
              </div>
            </>
          )}

          <div
            className="w-full rounded-2xl p-8 text-center"
            style={{
              background: "linear-gradient(135deg, #e8f9ee 0%, #d0f5dd 100%)",
              border: "1.5px solid #a8e6c0",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "#25D366" }}
            >
              <MessageCircle size={22} color="white" />
            </div>
            <p
              className="font-sans text-sm leading-relaxed mb-5"
              style={{ color: "oklch(0.30 0.025 55)" }}
            >
              Interested in {cat.label.toLowerCase()}? Message Pal directly on
              WhatsApp to place your order — she'll confirm availability and
              guide you through!
            </p>
            <Button
              data-ocid="category.primary_button"
              asChild
              className="text-sm tracking-widest px-8 py-5 font-bold"
              style={{ background: "#25D366", color: "white" }}
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} className="mr-2" />
                ORDER ON WHATSAPP
              </a>
            </Button>
          </div>

          <Link
            to="/shop"
            data-ocid="category.link"
            className="flex items-center gap-2 text-xs tracking-widest uppercase font-sans transition-opacity hover:opacity-70"
            style={{ color: "oklch(0.45 0.08 55)" }}
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { categories } from "../data/products";

const shopCategories = categories.filter((c) => c.id !== "custom");

const WHATSAPP_URL = `https://wa.me/919664757318?text=${encodeURIComponent(
  "Hello! I'd like to place an order from The Spiral Stitch. Please help me!",
)}`;

export default function ShopPage() {
  const navigate = useNavigate();

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(0.94 0.022 80)" }}
    >
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
            Handcrafted with love
          </p>
          <h1
            className="font-serif text-4xl sm:text-5xl uppercase tracking-widest"
            style={{ color: "oklch(0.22 0.02 60)" }}
          >
            Shop
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mt-4"
            style={{ background: "oklch(0.45 0.08 55)" }}
          />
          <p
            className="mt-4 font-sans text-sm"
            style={{ color: "oklch(0.47 0.025 55)" }}
          >
            Browse our handcrafted collections
          </p>

          <div className="mt-6 flex justify-center">
            <Button
              asChild
              className="px-8 py-4 text-sm tracking-widest font-bold"
              style={{ background: "#25D366", color: "white" }}
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} className="mr-2" />
                ORDER DIRECTLY ON WHATSAPP
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {shopCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <button
                type="button"
                data-ocid={`shop.item.${i + 1}`}
                onClick={() =>
                  navigate({
                    to: "/category/$category",
                    params: { category: cat.id },
                  })
                }
                className="group w-full flex flex-col items-center gap-4 p-8 rounded-2xl transition-all hover:shadow-lg cursor-pointer"
                style={{ background: "oklch(0.97 0.015 80)" }}
              >
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {cat.emoji}
                </span>
                <span
                  className="text-sm tracking-widest uppercase font-sans text-center font-bold"
                  style={{ color: "oklch(0.22 0.02 60)" }}
                >
                  {cat.label}
                </span>
              </button>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shopCategories.length * 0.08, duration: 0.5 }}
          >
            <Link
              to="/custom-orders"
              data-ocid="shop.item.6"
              className="group flex flex-col items-center gap-4 p-8 rounded-2xl transition-all hover:shadow-lg"
              style={{ background: "oklch(0.97 0.015 80)" }}
            >
              <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                ✨
              </span>
              <span
                className="text-sm tracking-widest uppercase font-sans text-center font-bold"
                style={{ color: "oklch(0.22 0.02 60)" }}
              >
                Custom Orders
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

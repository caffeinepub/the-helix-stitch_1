import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { MessageCircle, Star } from "lucide-react";
import { motion } from "motion/react";
import { categories } from "../data/products";

const WHATSAPP_URL = `https://wa.me/919664757318?text=${encodeURIComponent(
  "Hello! I'd like to place an order from The Spiral Stitch. Please help me!",
)}`;

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.94 0.022 80) 0%, oklch(0.91 0.025 58) 40%, oklch(0.87 0.04 55) 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/assets/generated/hero-crochet.dim_1400x700.jpg"
            alt="Cozy crochet workspace"
            className="w-full h-full object-cover opacity-40"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, oklch(0.94 0.022 80 / 0.9) 0%, oklch(0.94 0.022 80 / 0.3) 100%)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p
              className="text-xs tracking-widest uppercase font-sans mb-4"
              style={{ color: "oklch(0.45 0.08 55)" }}
            >
              🌿 Handcrafted in India
            </p>
            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 uppercase tracking-wide"
              style={{ color: "oklch(0.22 0.02 60)" }}
            >
              Handmade With Love For Every Moment.
            </h1>
            <p
              className="text-lg font-sans leading-relaxed mb-8"
              style={{ color: "oklch(0.47 0.025 55)" }}
            >
              Each piece is crafted with care, patience, and love — just for
              you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                data-ocid="hero.primary_button"
                asChild
                className="text-xs tracking-widest px-8 py-6"
                style={{ background: "oklch(0.45 0.08 55)", color: "white" }}
              >
                <Link to="/shop">SHOP THE COLLECTION</Link>
              </Button>
              <Button
                data-ocid="hero.secondary_button"
                asChild
                className="text-xs tracking-widest px-8 py-6 font-bold"
                style={{ background: "#25D366", color: "white" }}
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} className="mr-2" />
                  ORDER ON WHATSAPP
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section
        className="py-16 sm:py-20"
        style={{ background: "oklch(0.94 0.022 80)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="font-serif text-3xl sm:text-4xl uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.22 0.02 60)" }}
            >
              Featured Categories
            </h2>
            <div
              className="w-16 h-0.5 mx-auto"
              style={{ background: "oklch(0.45 0.08 55)" }}
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <button
                  type="button"
                  data-ocid="nav.link"
                  onClick={() => {
                    if (cat.id === "custom") {
                      navigate({ to: "/custom-orders" });
                    } else {
                      navigate({
                        to: "/category/$category",
                        params: { category: cat.id },
                      });
                    }
                  }}
                  className="group w-full flex flex-col items-center gap-3 p-6 rounded-2xl transition-all hover:shadow-card"
                  style={{ background: "oklch(0.97 0.015 80)" }}
                >
                  <span className="text-4xl">{cat.emoji}</span>
                  <span
                    className="text-xs tracking-widest uppercase font-sans text-center font-bold"
                    style={{ color: "oklch(0.22 0.02 60)" }}
                  >
                    {cat.label}
                  </span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Order Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12"
        style={{ background: "oklch(0.97 0.015 80)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="rounded-3xl px-8 py-10"
            style={{
              background: "linear-gradient(135deg, #e8f9ee 0%, #d0f5dd 100%)",
              border: "1.5px solid #a8e6c0",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "#25D366" }}
            >
              <MessageCircle size={28} color="white" />
            </div>
            <h3
              className="font-serif text-2xl sm:text-3xl mb-3"
              style={{ color: "oklch(0.22 0.02 60)" }}
            >
              Order Directly on WhatsApp
            </h3>
            <p
              className="font-sans text-sm sm:text-base mb-6 max-w-md mx-auto"
              style={{ color: "oklch(0.40 0.025 55)" }}
            >
              Chat with Pal directly, ask questions, share references, and place
              your order — all on WhatsApp!
            </p>
            <Button
              data-ocid="whatsapp.primary_button"
              className="px-10 py-5 text-sm tracking-widest font-bold"
              style={{ background: "#25D366", color: "white" }}
              asChild
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} className="mr-2" />
                CHAT & ORDER NOW
              </a>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Two-column promo + Meet Pal */}
      <section
        className="py-16 sm:py-20"
        style={{ background: "oklch(0.91 0.025 58)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl p-10 flex flex-col justify-center"
            style={{ background: "oklch(0.94 0.022 80)" }}
          >
            <span className="text-4xl mb-4">✨</span>
            <h2
              className="font-serif text-2xl sm:text-3xl uppercase tracking-wide mb-4"
              style={{ color: "oklch(0.22 0.02 60)" }}
            >
              Create Your Own Piece
            </h2>
            <p
              className="font-sans leading-relaxed mb-6"
              style={{ color: "oklch(0.47 0.025 55)" }}
            >
              Have a vision in mind? Tell Pal exactly what you want — your
              colors, your style, your story. Every custom order is made just
              for you, with love and care.
            </p>
            <ul
              className="space-y-2 text-sm font-sans mb-8"
              style={{ color: "oklch(0.47 0.025 55)" }}
            >
              {[
                "Choose your own colors",
                "Personalized sizing",
                "Perfect as a unique gift",
                "Direct communication with Pal",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Star
                    size={12}
                    style={{ color: "oklch(0.45 0.08 55)" }}
                    fill="oklch(0.45 0.08 55)"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              data-ocid="custom.primary_button"
              asChild
              className="self-start text-xs tracking-widest px-8 py-5"
              style={{ background: "oklch(0.45 0.08 55)", color: "white" }}
            >
              <Link to="/custom-orders">REQUEST CUSTOM ORDER</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-xs tracking-widest uppercase font-sans mb-2"
              style={{ color: "oklch(0.45 0.08 55)" }}
            >
              Meet the Maker
            </p>
            <h3
              className="font-serif text-2xl sm:text-3xl mb-4"
              style={{ color: "oklch(0.22 0.02 60)" }}
            >
              Hi, I'm Pal 🌿
            </h3>
            <p
              className="font-sans leading-relaxed text-sm"
              style={{ color: "oklch(0.47 0.025 55)" }}
            >
              Hi, I'm Pal! I learned crocheting from my nani when I was 15, and
              what started as quiet afternoons with yarn and a hook turned into
              a deep, lasting love. Every piece I make carries that same warmth
              — crafted slowly, with care, and always with heart. The Spiral
              Stitch is my way of sharing that with the world.
            </p>
            <Button
              data-ocid="about.secondary_button"
              asChild
              variant="outline"
              className="mt-5 text-xs tracking-widest"
              style={{
                borderColor: "oklch(0.45 0.08 55)",
                color: "oklch(0.45 0.08 55)",
              }}
            >
              <Link to="/about">READ MY STORY</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Admin link */}
      <div
        className="py-4 text-center"
        style={{ background: "oklch(0.94 0.022 80)" }}
      >
        <Link
          to="/admin"
          data-ocid="admin.link"
          className="text-xs font-sans hover:underline transition-colors"
          style={{ color: "oklch(0.62 0.03 60)" }}
        >
          Admin
        </Link>
      </div>
    </main>
  );
}

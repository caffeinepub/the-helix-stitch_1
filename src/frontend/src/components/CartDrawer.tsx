import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext";

const FREE_SHIPPING_THRESHOLD = 3999;
const WHATSAPP_NUMBER = "919664757318";

function buildWhatsAppUrl(
  items: { name: string; quantity: number; price: number }[],
  total: number,
) {
  const lines = items.map(
    (i) => `• ${i.name} x${i.quantity} — ₹${i.price * i.quantity}`,
  );
  const message = [
    "Hello! I'd like to place an order from The Spiral Stitch:",
    "",
    ...lines,
    "",
    `Total: ₹${total.toLocaleString("en-IN")}`,
    "",
    "Please confirm availability and share payment details. Thank you!",
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQty,
    totalPrice,
    totalItems,
  } = useCart();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const progress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);
  const hasFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const whatsappUrl = buildWhatsAppUrl(items, totalPrice);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            data-ocid="cart.panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col shadow-2xl"
            style={{ background: "oklch(0.97 0.015 80)" }}
          >
            <div
              className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: "oklch(0.89 0.02 75)" }}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag
                  size={20}
                  style={{ color: "oklch(0.54 0.065 145)" }}
                />
                <h2
                  className="font-serif text-lg"
                  style={{ color: "oklch(0.22 0.02 60)" }}
                >
                  Your Cart ({totalItems})
                </h2>
              </div>
              <button
                type="button"
                data-ocid="cart.close_button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {items.length > 0 && (
              <div
                className="px-6 py-3 border-b"
                style={{ borderColor: "oklch(0.89 0.02 75)" }}
              >
                {hasFreeShipping ? (
                  <p
                    className="text-xs font-sans text-center font-semibold"
                    style={{ color: "oklch(0.40 0.10 140)" }}
                  >
                    🎉 You've unlocked FREE shipping!
                  </p>
                ) : (
                  <p
                    className="text-xs font-sans text-center mb-2"
                    style={{ color: "oklch(0.47 0.025 55)" }}
                  >
                    Add ₹{remaining.toLocaleString("en-IN")} more for{" "}
                    <span
                      className="font-semibold"
                      style={{ color: "oklch(0.45 0.08 55)" }}
                    >
                      free shipping
                    </span>
                  </p>
                )}
                {!hasFreeShipping && (
                  <div
                    className="w-full h-1.5 rounded-full overflow-hidden"
                    style={{ background: "oklch(0.89 0.02 75)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "oklch(0.45 0.08 55)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div
                  data-ocid="cart.empty_state"
                  className="flex flex-col items-center justify-center h-full gap-4"
                >
                  <span className="text-6xl">🧶</span>
                  <p
                    className="font-serif text-lg"
                    style={{ color: "oklch(0.47 0.025 55)" }}
                  >
                    Your cart is empty
                  </p>
                  <p
                    className="text-sm font-sans text-center"
                    style={{ color: "oklch(0.47 0.025 55)" }}
                  >
                    Add some handmade love to your cart!
                  </p>
                  <Button
                    data-ocid="cart.primary_button"
                    onClick={() => setIsOpen(false)}
                    className="mt-2 text-xs tracking-widest"
                    style={{
                      background: "oklch(0.54 0.065 145)",
                      color: "white",
                    }}
                  >
                    CONTINUE SHOPPING
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item, idx) => (
                    <li
                      key={item.id}
                      data-ocid={`cart.item.${idx + 1}`}
                      className="flex gap-4 p-4 rounded-xl"
                      style={{ background: "oklch(0.94 0.022 80)" }}
                    >
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl flex-shrink-0"
                        style={{ background: "oklch(0.91 0.02 75)" }}
                      >
                        {item.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-sans font-bold text-sm truncate"
                          style={{ color: "oklch(0.22 0.02 60)" }}
                        >
                          {item.name}
                        </p>
                        <p
                          className="text-sm font-sans"
                          style={{ color: "oklch(0.54 0.065 145)" }}
                        >
                          ₹{item.price}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            data-ocid={`cart.toggle.${idx + 1}`}
                            onClick={() =>
                              updateQty(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-secondary transition-colors"
                            style={{ borderColor: "oklch(0.89 0.02 75)" }}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-sans w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            data-ocid={`cart.toggle.${idx + 1}`}
                            onClick={() =>
                              updateQty(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-secondary transition-colors"
                            style={{ borderColor: "oklch(0.89 0.02 75)" }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        data-ocid={`cart.delete_button.${idx + 1}`}
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 self-start rounded hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2
                          size={16}
                          style={{ color: "oklch(0.47 0.025 55)" }}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div
                className="px-6 py-5 border-t"
                style={{ borderColor: "oklch(0.89 0.02 75)" }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span
                    className="font-sans text-sm"
                    style={{ color: "oklch(0.47 0.025 55)" }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="font-serif text-xl"
                    style={{ color: "oklch(0.22 0.02 60)" }}
                  >
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span
                    className="font-sans text-sm"
                    style={{ color: "oklch(0.47 0.025 55)" }}
                  >
                    Shipping
                  </span>
                  <span
                    className="font-sans text-sm font-semibold"
                    style={{
                      color: hasFreeShipping
                        ? "oklch(0.40 0.10 140)"
                        : "oklch(0.47 0.025 55)",
                    }}
                  >
                    {hasFreeShipping ? "FREE" : "Calculated at checkout"}
                  </span>
                </div>
                <div
                  data-ocid="cart.success_state"
                  className="rounded-xl p-4 mb-4 text-sm font-sans text-center"
                  style={{
                    background: "oklch(0.91 0.02 75)",
                    color: "oklch(0.47 0.025 55)",
                  }}
                >
                  📲 Tap below to complete your order on{" "}
                  <span
                    className="font-bold"
                    style={{ color: "oklch(0.35 0.10 145)" }}
                  >
                    WhatsApp
                  </span>{" "}
                  — we'll confirm availability and share payment details!
                </div>
                <Button
                  data-ocid="cart.primary_button"
                  className="w-full text-sm tracking-widest py-3 font-bold"
                  style={{
                    background: "#25D366",
                    color: "white",
                  }}
                  asChild
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ORDER ON WHATSAPP
                  </a>
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

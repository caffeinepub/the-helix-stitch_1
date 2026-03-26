import { Star } from "lucide-react";
import { motion } from "motion/react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdUna7kEdqu-Gpb3QWh2F08o-uGFhuO037VKxEuNhVzn7XuBA/viewform?embedded=true";

const whyCustomItems = [
  { icon: "🎨", text: "Made just for you — no two pieces are alike" },
  { icon: "🧶", text: "Choose your own colors and yarn" },
  { icon: "🎁", text: "Perfect as a unique, heartfelt gift" },
  { icon: "📏", text: "Custom sizing for perfect fit" },
  { icon: "💬", text: "Direct chat with Pal throughout" },
  { icon: "❤️", text: "Made with extra love and attention" },
];

export default function CustomOrdersPage() {
  return (
    <main
      style={{ background: "oklch(0.94 0.022 80)" }}
      className="min-h-screen"
    >
      {/* Header */}
      <section
        className="py-20 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.94 0.022 80) 0%, oklch(0.87 0.04 130) 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-5xl block mb-6">✨</span>
          <h1
            className="font-serif text-4xl sm:text-5xl uppercase tracking-widest mb-4"
            style={{ color: "oklch(0.22 0.02 60)" }}
          >
            Create Your Own Piece
          </h1>
          <p
            className="font-sans text-lg max-w-xl mx-auto px-4"
            style={{ color: "oklch(0.47 0.025 55)" }}
          >
            Tell Pal what you're dreaming of — she'll crochet it with love, just
            for you.
          </p>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Google Form Embed */}
        <div className="lg:col-span-2">
          <div
            className="rounded-3xl overflow-hidden shadow-card"
            style={{ background: "oklch(0.97 0.015 80)" }}
          >
            <iframe
              src={GOOGLE_FORM_URL}
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Custom Order Form"
              className="w-full"
            >
              Loading form…
            </iframe>
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-6">
          <div
            className="rounded-3xl p-6 shadow-card"
            style={{ background: "oklch(0.97 0.015 80)" }}
          >
            <h3
              className="font-serif text-xl mb-4"
              style={{ color: "oklch(0.22 0.02 60)" }}
            >
              Why Choose Custom?
            </h3>
            <ul className="space-y-3">
              {whyCustomItems.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-3 text-sm font-sans"
                  style={{ color: "oklch(0.47 0.025 55)" }}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-3xl p-6 shadow-card"
            style={{
              background: "oklch(0.87 0.04 130)",
              border: "1px solid oklch(0.82 0.05 130)",
            }}
          >
            <Star
              size={24}
              fill="oklch(0.97 0.015 80)"
              className="mb-3"
              style={{ color: "oklch(0.97 0.015 80)" }}
            />
            <p
              className="font-sans text-sm leading-relaxed italic"
              style={{ color: "oklch(0.97 0.015 80)" }}
            >
              "Pal made me the most beautiful crochet flower bouquet for my best
              friend's birthday. She cried happy tears. Absolutely worth it!"
            </p>
            <p
              className="text-xs mt-3 font-sans font-bold"
              style={{ color: "oklch(0.97 0.015 80)" }}
            >
              — Riya M., Mumbai
            </p>
          </div>

          <div
            className="rounded-3xl p-6 shadow-card"
            style={{ background: "oklch(0.97 0.015 80)" }}
          >
            <h4
              className="font-sans text-xs tracking-widest uppercase font-bold mb-3"
              style={{ color: "oklch(0.22 0.02 60)" }}
            >
              Turnaround Time
            </h4>
            <p
              className="text-sm font-sans"
              style={{ color: "oklch(0.47 0.025 55)" }}
            >
              Most custom orders are completed in <strong>7–14 days</strong>{" "}
              depending on complexity.
            </p>
            <p
              className="text-sm font-sans mt-2"
              style={{ color: "oklch(0.47 0.025 55)" }}
            >
              Rush orders? Just mention it in your notes!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

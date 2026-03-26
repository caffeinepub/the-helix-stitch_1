import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart, Leaf, Star } from "lucide-react";
import { motion } from "motion/react";

const promiseCards = [
  {
    icon: (
      <Heart
        className="mx-auto mb-4"
        size={32}
        style={{ color: "oklch(0.45 0.08 55)" }}
      />
    ),
    title: "Made with Love",
    desc: "Every single stitch is placed with intention and care. We don't rush — we make it right.",
  },
  {
    icon: (
      <Star
        className="mx-auto mb-4"
        size={32}
        style={{ color: "oklch(0.45 0.08 55)" }}
      />
    ),
    title: "Quality First",
    desc: "Only the softest, most durable yarns go into each piece. Made to last and be treasured.",
  },
  {
    icon: (
      <Leaf
        className="mx-auto mb-4"
        size={32}
        style={{ color: "oklch(0.45 0.08 55)" }}
      />
    ),
    title: "Sustainable Craft",
    desc: "Small-batch, handmade production. No factories, no waste — just one pair of hands and a hook.",
  },
];

const stats = [
  { num: "3+", label: "Years crocheting" },
  { num: "50+", label: "Happy customers" },
  { num: "100%", label: "Made by hand" },
  { num: "∞", label: "Love per stitch" },
];

export default function AboutPage() {
  return (
    <main
      style={{ background: "oklch(0.94 0.022 80)" }}
      className="min-h-screen"
    >
      {/* Hero */}
      <section
        className="py-24 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.94 0.022 80) 0%, oklch(0.91 0.025 58) 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-5xl block mb-6">🧶</span>
          <h1
            className="font-serif text-4xl sm:text-5xl uppercase tracking-widest mb-4"
            style={{ color: "oklch(0.22 0.02 60)" }}
          >
            About The Spiral Stitch
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mb-6"
            style={{ background: "oklch(0.45 0.08 55)" }}
          />
          <p
            className="font-sans text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.47 0.025 55)" }}
          >
            A brand born from love, yarn, and a grandmother's wisdom.
          </p>
        </motion.div>
      </section>

      {/* Pal's Story — single column, no photo */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xs tracking-widest uppercase font-sans mb-3"
            style={{ color: "oklch(0.45 0.08 55)" }}
          >
            The Story
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl mb-6"
            style={{ color: "oklch(0.22 0.02 60)" }}
          >
            Hi, I'm Pal Jariwala 🌿
          </h2>

          <div
            className="space-y-4 font-sans leading-relaxed"
            style={{ color: "oklch(0.47 0.025 55)" }}
          >
            <p>
              I'm Pal — 18 years old, balancing science studies with a lifelong
              love for crochet. My journey started at 15, sitting beside my nani
              as she patiently showed me how to hold a hook and guide the yarn.
              Those quiet afternoons changed everything.
            </p>
            <p>
              What began as a cozy weekend hobby grew into something I couldn't
              put down. Through late nights, school exams, and everything in
              between — crochet was always there, calming and grounding me.
              Every stitch felt like a little act of love.
            </p>
            <p>
              After finishing my exams, I took the leap and launched
              <strong> The Spiral Stitch</strong> — a brand built on everything
              my nani taught me, and everything I've poured into this craft ever
              since. I want every piece I make to carry that same warmth.
            </p>
            <p>
              I'm a creator first. I believe beautiful things come from
              patience, curiosity, and a willingness to make something with your
              own hands — and I'm just getting started.
            </p>
          </div>

          <Button
            data-ocid="about.primary_button"
            asChild
            className="mt-8 text-xs tracking-widest px-8 py-5"
            style={{ background: "oklch(0.45 0.08 55)", color: "white" }}
          >
            <Link to="/custom-orders">ORDER FROM PAL</Link>
          </Button>
        </motion.div>
      </section>

      {/* Our Promise */}
      <section className="py-16" style={{ background: "oklch(0.97 0.015 80)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
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
              Our Promise
            </h2>
            <div
              className="w-16 h-0.5 mx-auto"
              style={{ background: "oklch(0.45 0.08 55)" }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {promiseCards.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="rounded-2xl p-8 text-center shadow-card"
                style={{ background: "oklch(0.94 0.022 80)" }}
              >
                {item.icon}
                <h3
                  className="font-serif text-xl mb-3"
                  style={{ color: "oklch(0.22 0.02 60)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm font-sans leading-relaxed"
                  style={{ color: "oklch(0.47 0.025 55)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun facts */}
      <section className="py-16" style={{ background: "oklch(0.94 0.022 80)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-10 text-center"
            style={{ background: "oklch(0.87 0.04 55)" }}
          >
            <h3
              className="font-serif text-2xl sm:text-3xl mb-8"
              style={{ color: "oklch(0.22 0.02 60)" }}
            >
              A Few Things About Pal
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-serif text-4xl font-bold mb-1"
                    style={{ color: "oklch(0.22 0.02 60)" }}
                  >
                    {stat.num}
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase font-sans"
                    style={{ color: "oklch(0.47 0.025 55)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

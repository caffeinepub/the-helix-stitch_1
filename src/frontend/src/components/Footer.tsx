import { Link } from "@tanstack/react-router";
import { Heart, Instagram } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="border-t mt-16"
      style={{
        background: "oklch(0.97 0.015 80)",
        borderColor: "oklch(0.89 0.02 75)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand block */}
        <div>
          <span
            className="font-script text-3xl block mb-1"
            style={{ color: "oklch(0.45 0.08 55)" }}
          >
            The Spiral Stitch
          </span>
          <p
            className="text-xs tracking-widest uppercase mb-3 font-sans"
            style={{ color: "oklch(0.47 0.025 55)" }}
          >
            by Pal Jariwala
          </p>
          <p
            className="text-sm font-sans leading-relaxed"
            style={{ color: "oklch(0.47 0.025 55)" }}
          >
            Handcrafted crochet pieces made with patience, love, and a whole lot
            of yarn.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4
            className="text-xs tracking-widest uppercase font-sans font-bold mb-4"
            style={{ color: "oklch(0.22 0.02 60)" }}
          >
            Explore
          </h4>
          <ul className="space-y-2">
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Shop" },
              { to: "/custom-orders", label: "Custom Orders" },
              { to: "/about", label: "About Pal" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm font-sans hover:underline"
                  style={{ color: "oklch(0.47 0.025 55)" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            className="text-xs tracking-widest uppercase font-sans font-bold mb-4"
            style={{ color: "oklch(0.22 0.02 60)" }}
          >
            Contact
          </h4>
          <ul
            className="space-y-2 text-sm font-sans"
            style={{ color: "oklch(0.47 0.025 55)" }}
          >
            <li>📧 thespiralstitch@gmail.com</li>
            <li>📍 India</li>
            <li>Orders ship in 5–7 days</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4
            className="text-xs tracking-widest uppercase font-sans font-bold mb-4"
            style={{ color: "oklch(0.22 0.02 60)" }}
          >
            Follow Along
          </h4>
          <a
            href="https://instagram.com/thespiralstitch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans transition-opacity hover:opacity-80"
            style={{ background: "oklch(0.45 0.08 55)", color: "white" }}
          >
            <Instagram size={16} />
            @thespiralstitch
          </a>
          <p
            className="text-xs mt-4 font-sans"
            style={{ color: "oklch(0.47 0.025 55)" }}
          >
            Tag us in your unboxings! 🌿
          </p>
        </div>
      </div>

      <div
        className="border-t py-4 text-center text-xs font-sans"
        style={{
          borderColor: "oklch(0.89 0.02 75)",
          color: "oklch(0.47 0.025 55)",
        }}
      >
        © {year} The Spiral Stitch. Built with{" "}
        <Heart size={12} className="inline text-red-400" /> using{" "}
        <a
          href={caffeineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          caffeine.ai
        </a>
      </div>
    </footer>
  );
}

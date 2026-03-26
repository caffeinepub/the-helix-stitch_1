import { Link, useLocation } from "@tanstack/react-router";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";

const WHATSAPP_URL = `https://wa.me/919664757318?text=${encodeURIComponent(
  "Hello! I'd like to place an order from The Spiral Stitch. Please help me!",
)}`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/shop", label: "SHOP" },
    { to: "/custom-orders", label: "CUSTOM ORDERS" },
    { to: "/about", label: "ABOUT" },
  ];

  return (
    <>
      <div
        className="w-full py-2 px-4 text-center text-sm font-sans"
        style={{
          background: "oklch(0.45 0.08 55)",
          color: "oklch(0.97 0.01 80)",
        }}
      >
        🌿 Free shipping on orders above ₹3999 &nbsp;|&nbsp; Handmade with love,
        just for you
      </div>

      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "oklch(0.97 0.015 80)",
          borderColor: "oklch(0.89 0.02 75)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex flex-col leading-tight"
            data-ocid="nav.link"
          >
            <span
              className="font-script text-3xl"
              style={{ color: "oklch(0.45 0.08 55)" }}
            >
              The Spiral Stitch
            </span>
            <span
              className="text-xs tracking-widest uppercase font-sans"
              style={{ color: "oklch(0.47 0.025 55)" }}
            >
              by Pal Jariwala
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className="text-xs tracking-widest font-sans transition-colors"
                style={{
                  color:
                    location.pathname === link.to
                      ? "oklch(0.45 0.08 55)"
                      : "oklch(0.22 0.02 60)",
                  borderBottom:
                    location.pathname === link.to
                      ? "1.5px solid oklch(0.45 0.08 55)"
                      : "none",
                  paddingBottom: "2px",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="whatsapp.button"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-widest font-bold font-sans transition-opacity hover:opacity-90"
              style={{ background: "#25D366", color: "white" }}
            >
              <MessageCircle size={15} />
              ORDER ON WHATSAPP
            </a>
            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            className="md:hidden border-t px-4 pb-4"
            style={{
              borderColor: "oklch(0.89 0.02 75)",
              background: "oklch(0.97 0.015 80)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-xs tracking-widest font-sans uppercase border-b"
                style={{
                  color: "oklch(0.22 0.02 60)",
                  borderColor: "oklch(0.89 0.02 75)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 mt-3 py-3 text-xs tracking-widest font-bold font-sans uppercase"
              style={{ color: "#25D366" }}
            >
              <MessageCircle size={15} />
              ORDER ON WHATSAPP
            </a>
          </nav>
        )}
      </header>
    </>
  );
}

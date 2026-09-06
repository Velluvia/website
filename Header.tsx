"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Header() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/collections", label: "Collections" },
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link href="/" className="brand-mark" onClick={() => setMenuOpen(false)}>
          <img src="/images/logo-badge.png" alt="Velluvia" className="brand-badge" />
          <span>VELLUVIA</span>
        </Link>

        <nav className="nav">
          {links.map((l) => (
            <Link href={l.href} key={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/cart" className="cart-link" onClick={() => setMenuOpen(false)}>
            Cart
            <span className="cart-count">({count})</span>
          </Link>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={`menu-icon ${menuOpen ? "open" : ""}`}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-nav">
          {links.map((l) => (
            <Link href={l.href} key={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

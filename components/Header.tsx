"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link href="/" className="brand-mark">
          <img src="/images/logo-badge.png" alt="Velluvia" className="brand-badge" />
          <span>VELLUVIA</span>
        </Link>

        <nav className="nav">
          <Link href="/collections">Collections</Link>
          <Link href="/about">Our Story</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <Link href="/cart" className="cart-link">
          Cart
          <span className="cart-count">({count})</span>
        </Link>
      </div>
    </header>
  );
}

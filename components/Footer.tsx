import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand-mark" style={{ color: "#F7EFE4", marginBottom: 14 }}>
              <span className="v" style={{ color: "var(--gold-light)" }}>
                V
              </span>
              <span>VELLUVIA</span>
            </div>
            <p style={{ maxWidth: 260 }}>
              Thoughtful gifts, curated with care and delivered with purpose — for corporate
              milestones and personal moments alike.
            </p>
          </div>

          <div>
            <h4>Shop</h4>
            <Link href="/collections/signature">Signature Gifting</Link>
            <Link href="/collections/luxe">Velluvia Luxe</Link>
            <Link href="/collections/sport">Velluvia Sport</Link>
            <Link href="/collections/home">Velluvia Home</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link href="/about">Our Story</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/cart">Cart</Link>
          </div>

          <div>
            <h4>Get in touch</h4>
            <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a>
            <a href="tel:+447480854250">07480 854250</a>
            <p>@Velluvia</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Velluvia. All rights reserved.</span>
          <span>Curated with love.</span>
        </div>
      </div>
    </footer>
  );
}

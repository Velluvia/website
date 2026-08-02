import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand-mark" style={{ color: "#F7EFE4", marginBottom: 14 }}>
              <img src="/images/logo-badge.png" alt="Velluvia" className="brand-badge" />
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
            <Link href="/collections/office">Velluvia Office</Link>
            <Link href="/collections/home">Velluvia Home</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link href="/about">Our Story</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/cart">Cart</Link>
            <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a>
            <p>@Velluvia</p>
          </div>

          <div>
            <h4>Legal</h4>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-conditions">Terms &amp; Conditions</Link>
            <Link href="/returns-policy">Returns &amp; Refunds</Link>
          </div>
        </div>

        <div className="footer-legal">
          <p>
            Velluvia Ltd &middot; Registered in England &amp; Wales &middot; Company No. <em>[to be added]</em> &middot;
            ICO Registration No. <em>[to be added]</em> &middot; Registered Office: Ebbsfleet, Kent, United Kingdom
          </p>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Velluvia Ltd. All rights reserved.</span>
          <span>Curated with love.</span>
        </div>
      </div>
    </footer>
  );
}

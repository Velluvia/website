import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="wrap empty-state">
        <span className="eyebrow">404</span>
        <h1 style={{ fontSize: 36, margin: "16px 0" }}>This page hasn&rsquo;t been wrapped yet</h1>
        <p>The page you&rsquo;re looking for doesn&rsquo;t exist. Let&rsquo;s get you back on track.</p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

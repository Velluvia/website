export default function TrustBadges({ compact = false }: { compact?: boolean }) {
  const items = [
    { icon: "🔒", label: "Secure checkout", detail: "Payments processed by Stripe" },
    { icon: "📦", label: "Free delivery over £200", detail: "Standard £3.99 · Express £7.99" },
    {
      icon: "↩",
      label: "Easy returns",
      detail: "14-day return window",
      href: "/returns-policy",
    },
  ];

  return (
    <div className={`trust-badges ${compact ? "compact" : ""}`}>
      {items.map((item) =>
        item.href ? (
          <a className="trust-badge trust-badge-link" key={item.label} href={item.href}>
            <span className="trust-icon" aria-hidden="true">
              {item.icon}
            </span>
            <div>
              <p className="trust-label">{item.label}</p>
              {!compact && <p className="trust-detail">{item.detail} — full policy &amp; contact info &rarr;</p>}
            </div>
          </a>
        ) : (
          <div className="trust-badge" key={item.label}>
            <span className="trust-icon" aria-hidden="true">
              {item.icon}
            </span>
            <div>
              <p className="trust-label">{item.label}</p>
              {!compact && <p className="trust-detail">{item.detail}</p>}
            </div>
          </div>
        )
      )}
    </div>
  );
}

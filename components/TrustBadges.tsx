export default function TrustBadges({ compact = false }: { compact?: boolean }) {
  const items = [
    { icon: "🔒", label: "Secure checkout", detail: "Payments processed by Stripe" },
    { icon: "📦", label: "Free delivery over £200", detail: "Standard £3.99 · Express £7.99" },
    { icon: "↩", label: "Easy returns", detail: "14-day return window" },
  ];

  return (
    <div className={`trust-badges ${compact ? "compact" : ""}`}>
      {items.map((item) => (
        <div className="trust-badge" key={item.label}>
          <span className="trust-icon" aria-hidden="true">
            {item.icon}
          </span>
          <div>
            <p className="trust-label">{item.label}</p>
            {!compact && <p className="trust-detail">{item.detail}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

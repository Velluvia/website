export default function ShippingBanner() {
  return (
    <div className="shipping-banner">
      <div className="wrap shipping-banner-inner">
        <span>🇬🇧 We deliver within the UK</span>
        <span className="divider" aria-hidden="true">
          &middot;
        </span>
        <span>Standard delivery £3.99</span>
        <span className="divider" aria-hidden="true">
          &middot;
        </span>
        <span>Express delivery £7.99</span>
        <span className="divider" aria-hidden="true">
          &middot;
        </span>
        <span>
          <strong>Free delivery on orders over £200</strong>
        </span>
      </div>
    </div>
  );
}

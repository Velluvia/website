import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Refunds Policy",
};

export default function ReturnsPolicyPage() {
  return (
    <section>
      <div className="wrap legal-page">
        <span className="eyebrow">Legal</span>
        <h1 style={{ fontSize: 34, margin: "12px 0 24px" }}>Returns &amp; Refunds Policy</h1>

        <p>Last updated: 7 September 2026</p>

        <h2>Your right to cancel</h2>
        <p>
          Under the Consumer Contracts Regulations 2013, you have the right to cancel your order
          within <strong>14 days</strong> of receiving it, without giving a reason. To cancel,
          email <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a> with your order
          number before the 14-day period ends. You then have a further 14 days to send the item(s)
          back to us.
        </p>

        <h2>Exceptions to the right to cancel</h2>
        <p>The following items cannot be returned for change of mind once received:</p>
        <ul>
          <li>
            <strong>Hygiene-sealed items</strong> (including bath salts, bath bombs, soaps, and
            similar toiletry items) once the seal has been opened or broken
          </li>
          <li>
            <strong>Personalised or bespoke items</strong> (including engraved, monogrammed, or
            custom-message products) made to your specification
          </li>
        </ul>
        <p>
          These exclusions apply only to the specific item(s) affected — the rest of a gift box
          remains returnable under the standard right above, provided it meets the condition
          requirements below.
        </p>

        <h2>Condition of returned items</h2>
        <p>
          Items must be returned unused, unopened (where applicable), and in their original
          packaging with all tags and seals intact. We may reduce the refund to reflect any
          reduction in value caused by handling beyond what's reasonably needed to inspect the
          item — the same standard you'd expect in a physical shop.
        </p>

        <h2>Return postage</h2>
        <p>
          For change-of-mind returns, <strong>the cost of returning the item is your
          responsibility</strong>. We recommend using a tracked service, as we cannot issue a
          refund for items lost in transit back to us. Send returns to:
        </p>
        <p>
          Velluvia
          <br />
          43 Sir Peter Blake Way
          <br />
          Ebbsfleet Valley
          <br />
          DA10 1HB
        </p>
        <p>
          This does not apply to items that arrive damaged, faulty, or incorrect — see below.
        </p>

        <h2>Refunds</h2>
        <p>
          Once we've received and inspected your returned item, we'll refund the item cost to
          your original payment method within 14 days. The original standard delivery charge is
          refunded in full; if you chose Express Delivery, only the equivalent standard delivery
          cost is refunded, not the upgrade fee.
        </p>

        <h2>Damaged, faulty, or incorrect items</h2>
        <p>
          If your gift arrives damaged, faulty, or different from what you ordered, this is
          covered separately under the Consumer Rights Act 2015 — email{" "}
          <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a> with your order number
          and a photo, and we'll arrange a replacement, repair, or full refund, including
          reasonable return postage costs, at no cost to you.
        </p>

        <h2>Contact</h2>
        <p>
          For anything related to returns, email{" "}
          <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a> with your order number.
        </p>
      </div>
    </section>
  );
}


import type { Metadata } from "next";
import GiftCardForm from "@/components/GiftCardForm";

export const metadata: Metadata = {
  title: "Gift Card",
  description: "Buy a Velluvia gift card — the perfect choice when you're not sure which gift set to pick.",
};

export default function GiftCardPage() {
  return (
    <section>
      <div className="wrap" style={{ maxWidth: 640 }}>
        <p className="eyebrow">Velluvia Gift Card</p>
        <h1>Can't decide? Let them choose.</h1>
        <p className="desc" style={{ marginBottom: 32 }}>
          A Velluvia gift card is delivered by email within minutes, never expires, and can be put
          toward any gift set on the site. Choose an amount, add a short message, and we'll take
          care of the rest.
        </p>
        <GiftCardForm />
      </div>
    </section>
  );
}

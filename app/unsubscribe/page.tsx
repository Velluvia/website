import type { Metadata } from "next";
import Link from "next/link";
import { getSql, ensureCampaignSignupsTable } from "@/lib/db";
import { verifyUnsubscribeToken } from "@/lib/campaign-email";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: { e?: string; c?: string; t?: string };
}) {
  const email = (searchParams.e || "").toLowerCase();
  const campaign = searchParams.c || "";
  const token = searchParams.t || "";

  let ok = false;
  if (email && campaign && verifyUnsubscribeToken(email, campaign, token)) {
    try {
      await ensureCampaignSignupsTable();
      const sql = getSql();
      await sql`
        UPDATE campaign_signups SET unsubscribed_at = now()
        WHERE email = ${email} AND campaign = ${campaign};
      `;
      ok = true;
    } catch (err) {
      console.error("Unsubscribe failed:", err);
    }
  }

  return (
    <section className="on-sand">
      <div className="wrap" style={{ maxWidth: 640, padding: "80px 20px" }}>
        <span className="eyebrow">Email preferences</span>
        {ok ? (
          <>
            <h1 style={{ fontSize: 34, margin: "12px 0 14px" }}>You&rsquo;ve been unsubscribed</h1>
            <p>
              We won&rsquo;t send you any more offer emails. Order confirmations for any purchases will still
              arrive as normal.
            </p>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 34, margin: "12px 0 14px" }}>We couldn&rsquo;t process that link</h1>
            <p>
              Please email <a href="mailto:hello@velluvia.co.uk">hello@velluvia.co.uk</a> with the word
              &ldquo;unsubscribe&rdquo; and we&rsquo;ll remove you straight away.
            </p>
          </>
        )}
        <p style={{ marginTop: 24 }}>
          <Link href="/" className="btn btn-outline">
            Back to Velluvia
          </Link>
        </p>
      </div>
    </section>
  );
}

import Link from "next/link";
import { verifyAccountToken } from "@/lib/account-token";
import { ensureOrdersTable, getSql } from "@/lib/db";
import { getProduct, formatPrice } from "@/lib/products";

export const metadata = { title: "Your Orders" };

type OrderRow = {
  id: number;
  customer_name: string | null;
  product_slugs: string[];
  amount_total: number;
  created_at: string;
};

async function getOrdersForEmail(email: string): Promise<OrderRow[]> {
  try {
    await ensureOrdersTable();
    const sql = getSql();
    const rows = await sql`
      SELECT id, customer_name, product_slugs, amount_total, created_at
      FROM orders
      WHERE customer_email = ${email}
      ORDER BY created_at DESC;
    `;
    return rows as OrderRow[];
  } catch (err) {
    console.error("Failed to load order history:", err);
    return [];
  }
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const verified = searchParams.token ? verifyAccountToken(searchParams.token) : null;

  if (!verified) {
    return (
      <section>
        <div className="wrap empty-state">
          <h1 style={{ fontSize: 32 }}>This link has expired</h1>
          <p>Login links are valid for 24 hours. Request a new one below.</p>
          <Link href="/account" className="btn btn-primary">
            Request a new link
          </Link>
        </div>
      </section>
    );
  }

  const orders = await getOrdersForEmail(verified.email);

  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">Your Orders</p>
        <h1 style={{ marginBottom: 30 }}>Order history for {verified.email}</h1>

        {orders.length === 0 ? (
          <div className="empty-state">
            <p>No orders found for this email address yet.</p>
            <Link href="/collections" className="btn btn-primary">
              Shop Collections
            </Link>
          </div>
        ) : (
          <div className="order-history-list">
            {orders.map((order) => (
              <div className="order-history-row" key={order.id}>
                <div>
                  <p className="product-name" style={{ marginBottom: 4 }}>
                    {new Date(order.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                    {order.product_slugs
                      .map((slug) => getProduct(slug)?.name || slug)
                      .join(", ")}
                  </p>
                </div>
                <p className="cart-price">{formatPrice(order.amount_total)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

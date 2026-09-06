import { NextRequest, NextResponse } from "next/server";
import { getSql, ensureReviewsTable } from "@/lib/db";
import { verifiedPurchase } from "@/lib/verify-purchase";
import { getProduct } from "@/lib/products";

export async function GET(req: NextRequest) {
  try {
    await ensureReviewsTable();
    const sql = getSql();
    const productSlug = req.nextUrl.searchParams.get("product");
    if (!productSlug) {
      return NextResponse.json({ error: "Missing product parameter." }, { status: 400 });
    }

    const rows = await sql`
      SELECT id, customer_name, rating, title, body, verified, created_at
      FROM reviews
      WHERE product_slug = ${productSlug}
      ORDER BY created_at DESC;
    `;

    const count = rows.length;
    const average = count > 0 ? rows.reduce((sum, r) => sum + Number(r.rating), 0) / count : 0;

    return NextResponse.json({
      reviews: rows.map((r) => ({
        id: r.id,
        name: r.customer_name,
        rating: Number(r.rating),
        title: r.title,
        body: r.body,
        verified: r.verified,
        createdAt: r.created_at,
      })),
      average: Math.round(average * 10) / 10,
      count,
    });
  } catch (err) {
    console.error("Fetch reviews error:", err);
    return NextResponse.json({ error: "Unable to load reviews." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureReviewsTable();
    const sql = getSql();
    const body = await req.json();
    const { productSlug, name, email, rating, title, body: reviewBody } = body || {};

    if (!productSlug || !name || !email || !rating || !title || !reviewBody) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    const ratingNum = Number(rating);
    if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
    }
    if (String(title).length > 120 || String(reviewBody).length > 2000) {
      return NextResponse.json({ error: "Review is too long." }, { status: 400 });
    }
    if (!getProduct(productSlug)) {
      return NextResponse.json({ error: "Unknown product." }, { status: 400 });
    }

    const isVerified = await verifiedPurchase(email, productSlug);
    if (!isVerified) {
      return NextResponse.json(
        {
          error:
            "We couldn't find a completed order for this email against this product, so we can't post the review yet. Please use the email address you checked out with, or contact us if you believe this is an error.",
        },
        { status: 403 }
      );
    }

    // Upsert: a customer can revise their own review rather than being blocked by
    // the unique (product, email) constraint or ending up with duplicate entries.
    const rows = await sql`
      INSERT INTO reviews (product_slug, customer_name, customer_email, rating, title, body, verified)
      VALUES (${productSlug}, ${name}, ${String(email).toLowerCase()}, ${ratingNum}, ${title}, ${reviewBody}, TRUE)
      ON CONFLICT (product_slug, customer_email)
      DO UPDATE SET customer_name = EXCLUDED.customer_name, rating = EXCLUDED.rating,
        title = EXCLUDED.title, body = EXCLUDED.body, created_at = now()
      RETURNING id, customer_name, rating, title, body, verified, created_at;
    `;

    const r = rows[0];
    return NextResponse.json({
      review: {
        id: r.id,
        name: r.customer_name,
        rating: Number(r.rating),
        title: r.title,
        body: r.body,
        verified: r.verified,
        createdAt: r.created_at,
      },
    });
  } catch (err) {
    console.error("Submit review error:", err);
    return NextResponse.json({ error: "Unable to submit review." }, { status: 500 });
  }
}

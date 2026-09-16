import { NextRequest, NextResponse } from "next/server";
import { ensureGiftCardsTable, getSql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    const normalized = String(code || "").trim().toUpperCase();
    if (!normalized) {
      return NextResponse.json({ error: "Enter a gift card code." }, { status: 400 });
    }

    await ensureGiftCardsTable();
    const sql = getSql();
    const rows = await sql`
      SELECT balance_pence FROM gift_cards WHERE code = ${normalized};
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "We couldn't find that gift card code." }, { status: 404 });
    }
    if (rows[0].balance_pence <= 0) {
      return NextResponse.json({ error: "This gift card has no remaining balance." }, { status: 400 });
    }

    return NextResponse.json({ valid: true, balancePence: rows[0].balance_pence });
  } catch (err: any) {
    console.error("Gift card redemption check failed:", err);
    return NextResponse.json(
      { error: "Something went wrong checking that code. Please try again." },
      { status: 500 }
    );
  }
}

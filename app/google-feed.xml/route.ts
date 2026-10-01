import { NextResponse } from "next/server";
import { buildGoogleFeed } from "@/lib/google-feed";

export async function GET() {
  return new NextResponse(buildGoogleFeed(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Analytics } from "@vercel/analytics/next";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Velluvia — Thoughtful Gifts. Lasting Impact.",
    template: "%s — Velluvia",
  },
  description:
    "Velluvia is a corporate and personal gifting house. Curated with care, delivered with purpose — for welcomes, farewells, milestones and every occasion in between.",
  openGraph: {
    title: "Velluvia — Thoughtful Gifts. Lasting Impact.",
    description:
      "Curated with care. Delivered with purpose. Explore Velluvia Signature, Luxe, Sport and Home.",
    siteName: "Velluvia",
    type: "website",
  },
  other: {
    // Verifies domain ownership in Meta Business Manager (Business Portfolio >
    // Domains). Rendered as a real static <meta> tag via Next.js's metadata
    // system, on every page — not injected by client-side JS, which Meta
    // explicitly won't detect. Safe to leave in place indefinitely.
    "facebook-domain-verification": "cbhnki77g252wy0ku6bwb8otx3n6zi",
    // Verifies domain ownership in Pinterest Business (Claim your website).
    // Same rendering approach as the Meta tag above — a real static <meta>
    // tag on every page. Safe to leave in place indefinitely.
    "p:domain_verify": "5911740c57dc2a1e7ce2accecb60cd0a",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>
        {pixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}

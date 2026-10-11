"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { preSale, preSaleIsActive, formatCampaignDate } from "@/lib/campaign";

/**
 * Slim offer bar shown at the very top of every page during the pre-sale.
 * Checked in the visitor's browser, so it disappears on time even though the
 * pages themselves are pre-built.
 */
export default function PreSaleBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(preSaleIsActive());
  }, []);

  if (!show) return null;

  return (
    <div className="presale-bar" role="region" aria-label="Current offer">
      <div className="wrap presale-inner">
        <span className="presale-headline presale-long">{preSale.headline}</span>
        <span className="presale-headline presale-short">{preSale.shortHeadline}</span>
        <span className="presale-auto">Applied automatically at checkout</span>
        <span className="presale-ends">Ends {formatCampaignDate(preSale.endsAt)}</span>
        <Link href={preSale.link} className="presale-link">
          Shop now &rarr;
        </Link>
      </div>
    </div>
  );
}

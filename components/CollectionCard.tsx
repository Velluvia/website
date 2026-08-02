import Link from "next/link";
import { Collection } from "@/lib/types";

export default function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link href={`/collections/${collection.slug}`} className="collection-card">
      {collection.image && <img src={collection.image} alt={collection.name} />}
      <div className="cc-body">
        <span className="eyebrow">Collection</span>
        <h3>{collection.name}</h3>
        <p>{collection.tagline}</p>
      </div>
    </Link>
  );
}

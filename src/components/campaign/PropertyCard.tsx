import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import { property } from "@/lib/campaign";

export function PropertyCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="surface-card overflow-hidden">
      <div className={compact ? "flex gap-4 p-3" : "sm:flex"}>
        <img
          src={property.images[0]}
          alt={`${property.title} in ${property.locality}, ${property.city}`}
          width={1280}
          height={960}
          className={
            compact
              ? "h-20 w-24 shrink-0 rounded-lg object-cover"
              : "h-56 w-full object-cover sm:h-auto sm:w-56"
          }
        />
        <div className={compact ? "min-w-0" : "flex-1 p-5"}>
          <h3 className={compact ? "text-base font-semibold" : "text-xl font-semibold"}>
            3 BHK Villa
          </h3>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5" />
            {property.locality}, {property.city}
          </p>
          <p
            className={
              compact
                ? "mt-1 font-semibold text-primary"
                : "mt-3 text-2xl font-semibold text-primary"
            }
          >
            {property.price}
          </p>
          {!compact && (
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <BedDouble className="size-4" /> {property.beds} BHK
              </span>
              <span className="flex items-center gap-1.5">
                <Bath className="size-4" /> {property.baths} Bath
              </span>
              <span className="flex items-center gap-1.5">
                <Ruler className="size-4" /> {property.area}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

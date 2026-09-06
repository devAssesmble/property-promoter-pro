import { Heart, MessageCircle, MoreHorizontal, Play, Send, ThumbsUp } from "lucide-react";
import { property } from "@/lib/campaign";

type Copy = { headline: string; primaryText: string; cta: string };

function Chips() {
  return (
    <p className="text-xs text-muted-foreground">
      {property.beds} BHK • {property.baths} Bath • {property.area}
    </p>
  );
}

export function FacebookPreview({ copy }: { copy: Copy }) {
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border bg-card shadow-card">
      <div className="flex items-center gap-2 p-3">
        <div className="grid size-9 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          CMN
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">CMNHousing</p>
          <p className="text-[11px] text-muted-foreground">Sponsored · 🌐</p>
        </div>
        <MoreHorizontal className="size-4 text-muted-foreground" />
      </div>
      <p className="px-3 pb-2 text-sm">{copy.primaryText}</p>
      <img
        src={property.images[0]}
        alt={copy.headline}
        loading="lazy"
        width={1280}
        height={960}
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="flex items-center gap-3 bg-muted px-3 py-2">
        <div className="flex-1">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">cmnhousing.in</p>
          <p className="text-sm font-semibold leading-tight">🏡 {copy.headline}</p>
          <p className="text-xs text-muted-foreground">
            {property.price} · {property.locality}
          </p>
          <Chips />
        </div>
        <span className="rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
          {copy.cta}
        </span>
      </div>
      <div className="flex items-center justify-around border-t px-3 py-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <ThumbsUp className="size-4" /> Like
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="size-4" /> Comment
        </span>
        <span className="flex items-center gap-1">
          <Send className="size-4" /> Share
        </span>
      </div>
    </div>
  );
}

export function InstagramPreview({ copy }: { copy: Copy }) {
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border bg-card shadow-card">
      <div className="flex items-center gap-2 p-3">
        <div className="grid size-9 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
          CMN
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">cmnhousing</p>
          <p className="text-[11px] text-muted-foreground">Sponsored</p>
        </div>
        <MoreHorizontal className="size-4 text-muted-foreground" />
      </div>
      <div className="relative">
        <img
          src={property.images[1]}
          alt={copy.headline}
          loading="lazy"
          width={1280}
          height={960}
          className="aspect-square w-full object-cover"
        />
        <span className="absolute right-3 top-3 rounded-full bg-background/85 px-2 py-1 text-[11px] font-semibold">
          1/5
        </span>
      </div>
      <div className="bg-muted px-3 py-2 text-center text-sm font-semibold">{copy.cta} ›</div>
      <div className="space-y-1.5 p-3">
        <div className="flex gap-3 text-muted-foreground">
          <Heart className="size-5" />
          <MessageCircle className="size-5" />
          <Send className="size-5" />
        </div>
        <p className="text-sm">
          <span className="font-semibold">cmnhousing</span> {copy.headline} — {property.price} in{" "}
          {property.locality}.
        </p>
        <Chips />
      </div>
    </div>
  );
}

export function YouTubePreview({ copy }: { copy: Copy }) {
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border bg-card shadow-card">
      <div className="relative">
        <img
          src={property.images[2]}
          alt={copy.headline}
          loading="lazy"
          width={1280}
          height={960}
          className="aspect-video w-full object-cover"
        />
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid size-12 place-items-center rounded-full bg-background/85">
            <Play className="size-5 fill-current" />
          </span>
        </div>
        <span className="absolute bottom-2 left-2 rounded bg-foreground/80 px-1.5 py-0.5 text-[11px] font-medium text-background">
          Ad · 0:22
        </span>
      </div>
      <div className="flex gap-3 p-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          CMN
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-snug">{copy.headline}</p>
          <p className="text-xs text-muted-foreground">CMNHousing · Sponsored</p>
          <Chips />
        </div>
      </div>
      <div className="border-t px-3 py-2 text-sm font-semibold text-primary">{copy.cta}</div>
    </div>
  );
}

export function GooglePreview({ copy }: { copy: Copy }) {
  return (
    <div className="mx-auto w-full max-w-sm rounded-xl border bg-card p-4 shadow-card">
      <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
        Ad · cmnhousing.in/kokapet-villas
      </p>
      <p className="mt-1 text-base font-semibold text-primary underline-offset-2 hover:underline">
        {copy.headline} | CMNHousing
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{copy.primaryText}</p>
      <p className="mt-2 text-sm font-medium">
        {property.price} · {property.beds} BHK · {property.area}
      </p>
      <div className="mt-2 flex gap-3 text-sm text-primary">
        <span>{copy.cta}</span>
        <span>·</span>
        <span>Book Site Visit</span>
      </div>
    </div>
  );
}

export function LinkedInPreview({ copy }: { copy: Copy }) {
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border bg-card shadow-card">
      <div className="flex items-center gap-2 p-3">
        <div className="grid size-9 place-items-center rounded bg-primary text-xs font-bold text-primary-foreground">
          CMN
        </div>
        <div>
          <p className="text-sm font-semibold">CMNHousing</p>
          <p className="text-[11px] text-muted-foreground">Promoted · Real Estate</p>
        </div>
      </div>
      <p className="px-3 pb-2 text-sm">
        Investor-ready villa in Kokapet. {copy.primaryText}
      </p>
      <img
        src={property.images[0]}
        alt={copy.headline}
        loading="lazy"
        width={1280}
        height={960}
        className="aspect-[16/9] w-full object-cover"
      />
      <div className="flex items-center justify-between bg-muted px-3 py-2">
        <div>
          <p className="text-sm font-semibold">{copy.headline}</p>
          <Chips />
        </div>
        <span className="rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary">
          {copy.cta}
        </span>
      </div>
    </div>
  );
}

export function XPreview({ copy }: { copy: Copy }) {
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border bg-card p-3 shadow-card">
      <div className="flex gap-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-foreground text-xs font-bold text-background">
          CMN
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm">
            <span className="font-semibold">CMNHousing</span>{" "}
            <span className="text-muted-foreground">@cmnhousing · Ad</span>
          </p>
          <p className="mt-1 text-sm">
            {copy.headline} — {property.price}. {property.locality}, {property.city}.
          </p>
          <img
            src={property.images[1]}
            alt={copy.headline}
            loading="lazy"
            width={1280}
            height={960}
            className="mt-2 aspect-[16/9] w-full rounded-lg object-cover"
          />
          <div className="mt-2 flex items-center justify-between">
            <Chips />
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              {copy.cta}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PlatformPreview({ id, copy }: { id: string; copy: Copy }) {
  switch (id) {
    case "instagram":
      return <InstagramPreview copy={copy} />;
    case "youtube":
      return <YouTubePreview copy={copy} />;
    case "google":
      return <GooglePreview copy={copy} />;
    case "linkedin":
      return <LinkedInPreview copy={copy} />;
    case "x":
      return <XPreview copy={copy} />;
    default:
      return <FacebookPreview copy={copy} />;
  }
}

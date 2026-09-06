import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles, Star } from "lucide-react";
import { PropertyCard } from "@/components/campaign/PropertyCard";
import { promotionOptions } from "@/lib/campaign";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Property Is Ready to Promote | CMNHousing" },
      {
        name: "description",
        content:
          "Your Kokapet villa listing is live. Promote it with CMNHousing social media, Google and premium visibility campaigns.",
      },
      { property: "og:title", content: "Your Property Is Ready to Promote | CMNHousing" },
      {
        property: "og:description",
        content:
          "Reach more buyers, tenants and investors with CMNHousing advertising campaigns built from your listing.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen">
      <header className="border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <p className="font-display text-lg font-bold tracking-tight">
            CMN<span className="text-primary">Housing</span>
          </p>
          <Link
            to="/campaigns"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            My Campaigns
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 pb-16 pt-12">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1">
            <Check className="size-3.5" /> Listing verified
          </span>
          <span className="text-muted-foreground">Step 3 of 13 · Promote Property</span>
        </div>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
          🚀 Your Property Is Ready to Promote
        </h1>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">
          Reach more buyers, tenants and investors with CMNHousing advertising. We reuse your
          listing photos, price and details automatically.
        </p>

        <div className="mt-8 max-w-2xl">
          <PropertyCard />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/promote"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lift transition hover:opacity-90"
          >
            Promote My Property <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/campaigns"
            className="inline-flex items-center rounded-xl border px-6 py-3 font-semibold transition hover:bg-muted"
          >
            Skip for Now
          </Link>
        </div>
      </section>

      <section className="border-t bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <h2 className="text-2xl font-semibold">Choose how you want to promote</h2>
          <p className="mt-1 text-muted-foreground">
            Most owners in Kokapet start with social media ads.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {promotionOptions.map((opt) => (
              <Link
                key={opt.id}
                to="/promote"
                className={`selectable-card block ${opt.primary ? "selectable-card-active" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-semibold">{opt.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{opt.blurb}</p>
                  </div>
                  {opt.recommended && (
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
                      <Star className="size-3 fill-current" /> Recommended
                    </span>
                  )}
                </div>
                {opt.primary && (
                  <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-primary">
                    <Sparkles className="size-4" /> Best for this property
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gauge } from "lucide-react";
import { inr, property } from "@/lib/campaign";

export const Route = createFileRoute("/campaigns")({
  head: () => ({
    meta: [
      { title: "Social Media Campaigns Dashboard | CMNHousing" },
      {
        name: "description",
        content:
          "Track spend, views, engagements and leads for every CMNHousing social media property campaign in one dashboard.",
      },
      { property: "og:title", content: "Social Media Campaigns Dashboard | CMNHousing" },
      {
        property: "og:description",
        content: "Live performance for your Facebook, Instagram and YouTube property campaigns.",
      },
    ],
  }),
  component: Campaigns,
});

const campaigns = [
  {
    id: "CMN-SM-2026-000123",
    title: "3 BHK Villa",
    place: "Kokapet, Hyderabad",
    platforms: ["Facebook", "Instagram", "YouTube"],
    budget: 5000,
    days: 15,
    progress: 72,
    views: 28450,
    clicks: 1240,
    leads: 96,
    image: property.images[0],
  },
  {
    id: "CMN-SM-2026-000118",
    title: "2 BHK Apartment",
    place: "Gachibowli, Hyderabad",
    platforms: ["Facebook", "Instagram"],
    budget: 2500,
    days: 15,
    progress: 40,
    views: 14210,
    clicks: 620,
    leads: 41,
    image: property.images[1],
  },
  {
    id: "CMN-SM-2026-000109",
    title: "Luxury Penthouse",
    place: "Jubilee Hills, Hyderabad",
    platforms: ["Instagram", "YouTube", "LinkedIn"],
    budget: 11250,
    days: 30,
    progress: 88,
    views: 82800,
    clicks: 3110,
    leads: 350,
    image: property.images[2],
  },
];

function Campaigns() {
  return (
    <main className="min-h-screen">
      <header className="border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to="/" className="font-display text-lg font-bold">
            CMN<span className="text-primary">Housing</span>
          </Link>
          <Link
            to="/promote"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            New campaign <ArrowRight className="size-4" />
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-10">
        <h1 className="text-3xl font-bold">Social media campaigns</h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <Kpi label="Active campaigns" value="3" />
          <Kpi label="Total spend" value={inr(18750)} />
          <Kpi label="Views" value="125,460" />
          <Kpi label="Engagements" value="2,340" />
          <Kpi label="Leads" value="487" />
        </div>

        <div className="mt-8 grid gap-5">
          {campaigns.map((c) => (
            <article key={c.id} className="surface-card overflow-hidden sm:flex">
              <img
                src={c.image}
                alt={`${c.title} in ${c.place}`}
                loading="lazy"
                width={1280}
                height={960}
                className="h-40 w-full object-cover sm:h-auto sm:w-48"
              />
              <div className="flex-1 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg font-semibold">{c.title}</h2>
                    <p className="text-sm text-muted-foreground">{c.place}</p>
                  </div>
                  <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                    Active
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {c.platforms.map((p) => (
                    <span
                      key={p}
                      className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  {inr(c.budget)} · {c.days} Days
                </p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-primary" style={{ width: `${c.progress}%` }} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{c.progress}% delivered</p>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <Metric label="Views" value={c.views.toLocaleString("en-IN")} />
                  <Metric label="Clicks" value={c.clicks.toLocaleString("en-IN")} />
                  <Metric label="Leads" value={String(c.leads)} />
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
                    View Campaign
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
                    <Gauge className="size-4" /> Optimize
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-4">
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted p-3">
      <p className="font-display text-base font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

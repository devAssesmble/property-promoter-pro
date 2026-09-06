import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  CreditCard,
  Pencil,
  Star,
  Wallet,
} from "lucide-react";
import { PlatformPreview } from "@/components/campaign/AdPreviews";
import { PropertyCard } from "@/components/campaign/PropertyCard";
import {
  adCopy,
  creatives,
  ctaOptions,
  durations,
  estimates,
  inr,
  objectives,
  packages,
  platforms,
  property,
  type PlatformId,
} from "@/lib/campaign";

export const Route = createFileRoute("/promote")({
  head: () => ({
    meta: [
      { title: "Build Your Social Media Campaign | CMNHousing" },
      {
        name: "description",
        content:
          "Pick platforms, see live Facebook, Instagram, YouTube and Google mockups of your property ad, set your audience and budget, then launch.",
      },
      { property: "og:title", content: "Build Your Social Media Campaign | CMNHousing" },
      {
        property: "og:description",
        content:
          "CMNHousing turns your listing into platform-ready ad creative with smart targeting and simple budgets.",
      },
    ],
  }),
  component: Promote,
});

const STEPS = [
  "Platforms",
  "Objective",
  "Creative",
  "Audience",
  "Budget",
  "Review",
  "Submitted",
];

function Promote() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<PlatformId[]>(["facebook", "instagram", "youtube"]);
  const [objective, setObjective] = useState<string>("leads");
  const [creative, setCreative] = useState<string[]>(["carousel", "reel"]);
  const [copy, setCopy] = useState(adCopy);
  const [editing, setEditing] = useState(false);
  const [previewTab, setPreviewTab] = useState<string>("facebook");
  const [smart, setSmart] = useState(true);
  const [radius, setRadius] = useState(25);
  const [buyerTypes, setBuyerTypes] = useState<string[]>([
    "Home Buyers",
    "Investors",
    "NRI Buyers",
  ]);
  const [interests, setInterests] = useState<string[]>(["Villas", "Luxury Properties"]);
  const [ageRange, setAgeRange] = useState<[number, number]>([25, 55]);
  const [duration, setDuration] = useState<string>("15");
  const [budget, setBudget] = useState(5000);
  const [pack, setPack] = useState<string>("pro");

  const est = useMemo(() => estimates(budget), [budget]);
  const durationDays = durations.find((d) => d.id === duration)?.days ?? 15;
  const campaignId = "CMN-SM-2026-000123";

  const toggle = <T extends string>(list: T[], value: T, set: (v: T[]) => void) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const previewPlatforms = selected.length ? selected : (["facebook"] as PlatformId[]);
  const activeTab = previewPlatforms.includes(previewTab as PlatformId)
    ? previewTab
    : previewPlatforms[0];

  return (
    <main className="min-h-screen pb-24">
      <header className="sticky top-0 z-10 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <Link to="/" className="font-display text-lg font-bold">
            CMN<span className="text-primary">Housing</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Step {Math.min(step + 1, STEPS.length)} of {STEPS.length} · {STEPS[step]}
          </p>
        </div>
        <div className="h-1 w-full bg-muted">
          <div
            className="h-1 bg-primary transition-all"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="mb-8 max-w-2xl">
          <PropertyCard compact />
        </div>

        {step === 0 && (
          <Section
            title="Select platforms"
            subtitle="Your listing is reused automatically on every platform you pick."
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {platforms.map((p) => {
                const on = selected.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggle(selected, p.id, setSelected)}
                    className={`selectable-card ${on ? "selectable-card-active" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span
                          className="inline-block size-8 rounded-lg"
                          style={{ backgroundColor: p.tone }}
                          aria-hidden
                        />
                        <p className="mt-2 font-display text-base font-semibold">{p.name}</p>
                        <p className="text-sm text-muted-foreground">{p.blurb}</p>
                      </div>
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-full border ${
                          on ? "border-primary bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        {on && <Check className="size-3.5" />}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-sm font-semibold text-primary">
              {selected.length} platform{selected.length === 1 ? "" : "s"} selected
            </p>
          </Section>
        )}

        {step === 1 && (
          <Section title="What do you want to achieve?" subtitle="Pick your campaign objective.">
            <div className="grid gap-4 sm:grid-cols-2">
              {objectives.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setObjective(o.id)}
                  className={`selectable-card ${objective === o.id ? "selectable-card-active" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-base font-semibold">
                      <span className="mr-2">{o.icon}</span>
                      {o.name}
                    </p>
                    {"recommended" in o && o.recommended && <RecommendedTag />}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{o.blurb}</p>
                </button>
              ))}
            </div>
          </Section>
        )}

        {step === 2 && (
          <Section
            title="Your ad creative"
            subtitle="We generated this from your listing — edit it only if you want to."
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {creatives.map((c) => {
                const on = creative.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggle(creative, c.id, setCreative)}
                    className={`selectable-card ${on ? "selectable-card-active" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold">{c.name}</p>
                      {"recommended" in c && c.recommended && <RecommendedTag />}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
              <div className="surface-card p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">Ad content</h3>
                  <button
                    type="button"
                    onClick={() => setEditing((e) => !e)}
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-muted"
                  >
                    <Pencil className="size-3.5" /> {editing ? "Done" : "Edit Ad Content"}
                  </button>
                </div>

                <Field label="Ad headline">
                  {editing ? (
                    <input
                      value={copy.headline}
                      onChange={(e) => setCopy({ ...copy, headline: e.target.value })}
                      className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="text-sm font-medium">{copy.headline}</p>
                  )}
                </Field>
                <Field label="Primary text">
                  {editing ? (
                    <textarea
                      value={copy.primaryText}
                      rows={3}
                      onChange={(e) => setCopy({ ...copy, primaryText: e.target.value })}
                      className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{copy.primaryText}</p>
                  )}
                </Field>
                <Field label="Call to action">
                  <div className="flex flex-wrap gap-2">
                    {ctaOptions.map((cta) => (
                      <button
                        key={cta}
                        type="button"
                        onClick={() => setCopy({ ...copy, cta })}
                        className={`rounded-full border px-3 py-1.5 text-sm ${
                          copy.cta === cta
                            ? "border-primary bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {cta}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <div>
                <div className="mb-3 flex flex-wrap gap-1 rounded-xl bg-muted p-1">
                  {previewPlatforms.map((id) => {
                    const p = platforms.find((x) => x.id === id)!;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPreviewTab(id)}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                          activeTab === id ? "bg-card shadow-card" : "text-muted-foreground"
                        }`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>
                <PlatformPreview id={activeTab} copy={copy} />
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Live mockup built from your listing photos and details.
                </p>
              </div>
            </div>
          </Section>
        )}

        {step === 3 && (
          <Section title="Target audience" subtitle="Let us do it for you, or fine-tune yourself.">
            <button
              type="button"
              onClick={() => setSmart(true)}
              className={`selectable-card w-full ${smart ? "selectable-card-active" : ""}`}
            >
              <p className="flex items-center gap-2 font-display text-base font-semibold">
                <Bot className="size-5 text-primary" /> CMNHousing Smart Targeting
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                We'll automatically select the audience most likely to enquire about your property.
              </p>
            </button>
            <button
              type="button"
              onClick={() => setSmart(false)}
              className={`selectable-card mt-4 w-full ${!smart ? "selectable-card-active" : ""}`}
            >
              <p className="font-display text-base font-semibold">Set it myself</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose location, buyer type, property interest, price and age.
              </p>
            </button>

            {!smart && (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="surface-card p-5">
                  <p className="font-semibold">Location</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {property.city} · {radius} km radius
                  </p>
                  <input
                    type="range"
                    min={5}
                    max={100}
                    step={5}
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="mt-3 w-full accent-primary"
                  />
                </div>
                <div className="surface-card p-5">
                  <p className="font-semibold">Age</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {ageRange[0]} – {ageRange[1]} years
                  </p>
                  <input
                    type="range"
                    min={25}
                    max={70}
                    value={ageRange[1]}
                    onChange={(e) => setAgeRange([ageRange[0], Number(e.target.value)])}
                    className="mt-3 w-full accent-primary"
                  />
                </div>
                <CheckGroup
                  title="Buyer type"
                  options={["Home Buyers", "Investors", "Tenants", "NRI Buyers"]}
                  value={buyerTypes}
                  onToggle={(v) => toggle(buyerTypes, v, setBuyerTypes)}
                />
                <CheckGroup
                  title="Property interest"
                  options={["Villas", "Apartments", "Plots", "Luxury Properties"]}
                  value={interests}
                  onToggle={(v) => toggle(interests, v, setInterests)}
                />
                <div className="surface-card p-5 sm:col-span-2">
                  <p className="font-semibold">Price range</p>
                  <p className="mt-1 text-sm text-muted-foreground">₹80 L – ₹1.5 Cr</p>
                </div>
              </div>
            )}
          </Section>
        )}

        {step === 4 && (
          <Section title="Budget & duration" subtitle="Pick a package or set your own budget.">
            <div className="grid gap-4 sm:grid-cols-4">
              {durations.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDuration(d.id)}
                  className={`selectable-card ${duration === d.id ? "selectable-card-active" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-base font-semibold">{d.label}</p>
                    {"recommended" in d && d.recommended && <RecommendedTag />}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{inr(d.from)}+</p>
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="surface-card p-5">
                <label className="text-sm font-semibold" htmlFor="budget">
                  Advertising budget
                </label>
                <div className="mt-2 flex items-center gap-2 rounded-xl border px-3 py-2">
                  <span className="text-lg">₹</span>
                  <input
                    id="budget"
                    type="number"
                    min={1000}
                    step={500}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value) || 0)}
                    className="w-full bg-transparent text-lg font-semibold outline-none"
                  />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <Stat label="Est. reach" value={est.reach} />
                  <Stat label="Est. clicks" value={est.clicks} />
                  <Stat label="Est. leads" value={est.leads} />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  *Estimates only — not guaranteed results
                </p>
              </div>

              <div className="grid gap-4">
                {packages.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setPack(p.id);
                      setBudget(p.amount);
                    }}
                    className={`selectable-card ${pack === p.id ? "selectable-card-active" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-base font-semibold">{p.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {p.price} / {p.period}
                        </p>
                      </div>
                      {"recommended" in p && p.recommended && <RecommendedTag />}
                    </div>
                    <ul className="mt-3 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5">
                          <Check className="size-3.5 text-primary" /> {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>
          </Section>
        )}

        {step === 5 && (
          <Section title="Your campaign" subtitle="Check everything before payment.">
            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
              <div className="surface-card divide-y p-5">
                <Row label="Property" value={`3 BHK Villa – ${property.locality}`} />
                <Row
                  label="Platforms"
                  value={selected
                    .map((id) => platforms.find((p) => p.id === id)?.name)
                    .filter(Boolean)
                    .join(" + ")}
                />
                <Row
                  label="Objective"
                  value={objectives.find((o) => o.id === objective)?.name ?? ""}
                />
                <Row
                  label="Creative"
                  value={creative
                    .map((c) => creatives.find((x) => x.id === c)?.name)
                    .filter(Boolean)
                    .join(" + ")}
                />
                <Row label="Audience" value={smart ? "CMNHousing Smart Targeting" : "Custom"} />
                <Row label="Duration" value={`${durationDays} Days`} />
                <Row label="Budget" value={inr(budget)} />
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">Estimated campaign reach</p>
                  <p className="font-display text-3xl font-bold text-primary">{est.reach} people</p>
                  <p className="mt-1 text-xs text-muted-foreground">*Estimates only</p>
                </div>
              </div>
              <div>
                <PlatformPreview id={activeTab} copy={copy} />
              </div>
            </div>
          </Section>
        )}

        {step === 6 && (
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-5xl">🟢</p>
            <h1 className="mt-4 text-3xl font-bold">Campaign Submitted</h1>
            <p className="mt-2 text-muted-foreground">
              Payment of {inr(budget)} received. Nothing else is needed from you right now.
            </p>
            <div className="surface-card mt-6 p-5 text-left">
              <Row label="Campaign ID" value={campaignId} />
              <Row label="Status" value="Under Review" />
              <div className="mt-5">
                <p className="mb-3 text-sm font-semibold">Timeline</p>
                <ol className="grid gap-3">
                  {["Created", "Creative Review", "Platform Submission", "Active", "Completed"].map(
                    (s, i) => (
                      <li key={s} className="flex items-center gap-3">
                        <span
                          className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                            i === 0
                              ? "bg-success text-success-foreground"
                              : i === 1
                                ? "bg-accent text-accent-foreground"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {i === 0 ? <Check className="size-3.5" /> : i + 1}
                        </span>
                        <span className={i <= 1 ? "font-medium" : "text-muted-foreground"}>{s}</span>
                      </li>
                    ),
                  )}
                </ol>
              </div>
            </div>
            <Link
              to="/campaigns"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
            >
              Go to campaign dashboard <ArrowRight className="size-4" />
            </Link>
          </div>
        )}
      </div>

      {step < 6 && (
        <div className="fixed inset-x-0 bottom-0 border-t bg-card/95 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3">
            <button
              type="button"
              onClick={() => (step === 0 ? history.back() : setStep(step - 1))}
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-medium hover:bg-muted"
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              {step === 5 && (
                <span className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
                  <Wallet className="size-4" /> Total {inr(budget)}
                </span>
              )}
              <button
                type="button"
                disabled={step === 0 && selected.length === 0}
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-semibold text-primary-foreground disabled:opacity-50"
              >
                {step === 5 ? (
                  <>
                    <CreditCard className="size-4" /> Proceed to Payment
                  </>
                ) : (
                  <>
                    Continue <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-1 text-muted-foreground">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function RecommendedTag() {
  return (
    <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
      <Star className="size-3 fill-current" /> Recommended
    </span>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}

function CheckGroup({
  title,
  options,
  value,
  onToggle,
}: {
  title: string;
  options: string[];
  value: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="surface-card p-5">
      <p className="font-semibold">{title}</p>
      <div className="mt-3 grid gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className="flex items-center gap-2 text-left text-sm"
          >
            <span
              className={`grid size-4 place-items-center rounded border ${
                value.includes(o) ? "border-primary bg-primary text-primary-foreground" : ""
              }`}
            >
              {value.includes(o) && <Check className="size-3" />}
            </span>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted p-3">
      <p className="font-display text-lg font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

import villa from "@/assets/property-villa.jpg";
import living from "@/assets/property-living.jpg";
import bedroom from "@/assets/property-bedroom.jpg";

export type Property = {
  title: string;
  type: string;
  locality: string;
  city: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  images: string[];
  amenities: string[];
  description: string;
};

export const property: Property = {
  title: "Premium 3 BHK Villa",
  type: "Villa",
  locality: "Kokapet",
  city: "Hyderabad",
  price: "₹1.25 Cr",
  beds: 3,
  baths: 3,
  area: "2,400 sq.ft.",
  images: [villa, living, bedroom],
  amenities: ["Gated community", "Clubhouse", "Covered parking", "Power backup"],
  description:
    "Discover a premium 3 BHK villa in Kokapet, Hyderabad with spacious interiors, modern amenities and excellent connectivity.",
};

export const platforms = [
  { id: "facebook", name: "Facebook", blurb: "Local + targeted buyers", tone: "#1877F2" },
  { id: "instagram", name: "Instagram", blurb: "Property photos & reels", tone: "#E1306C" },
  { id: "youtube", name: "YouTube", blurb: "Property video campaigns", tone: "#FF0000" },
  { id: "linkedin", name: "LinkedIn", blurb: "Investors, NRI & professionals", tone: "#0A66C2" },
  { id: "google", name: "Google Ads", blurb: "High-intent property searches", tone: "#34A853" },
  { id: "x", name: "X", blurb: "Additional reach", tone: "#111111" },
] as const;

export type PlatformId = (typeof platforms)[number]["id"];

export const objectives = [
  {
    id: "awareness",
    icon: "🏠",
    name: "Property Awareness",
    blurb: "Get maximum visibility",
  },
  {
    id: "leads",
    icon: "👥",
    name: "Lead Generation",
    blurb: "Generate buyer/tenant enquiries",
    recommended: true,
  },
  { id: "video", icon: "🎥", name: "Video Showcase", blurb: "Promote property videos/reels" },
  {
    id: "premium",
    icon: "💎",
    name: "Premium Property Promotion",
    blurb: "Maximum exposure across CMNHousing + social",
  },
] as const;

export const creatives = [
  { id: "single", name: "Single Image", blurb: "Property photo + details" },
  { id: "carousel", name: "Carousel", blurb: "5–10 property photos", recommended: true },
  { id: "reel", name: "Video / Reel", blurb: "15–30 second property promotion" },
  { id: "ai", name: "AI Property Video", blurb: "CMNHousing creates the promo video for you" },
] as const;

export const ctaOptions = [
  "View Property",
  "Enquire Now",
  "WhatsApp",
  "Call Now",
  "Schedule Visit",
  "Get Price",
  "Book Site Visit",
];

export const durations = [
  { id: "7", days: 7, label: "7 Days", from: 1000 },
  { id: "15", days: 15, label: "15 Days", from: 2500, recommended: true },
  { id: "30", days: 30, label: "30 Days", from: 5000 },
  { id: "custom", days: 45, label: "Custom", from: 7500 },
] as const;

export const packages = [
  {
    id: "boost",
    name: "CMNHousing Social Boost",
    price: "₹2,500",
    period: "15 Days",
    amount: 2500,
    features: [
      "Facebook",
      "Instagram",
      "AI ad creative",
      "Audience targeting",
      "Lead generation",
      "WhatsApp enquiries",
      "Campaign monitoring",
      "Performance dashboard",
    ],
  },
  {
    id: "pro",
    name: "CMNHousing Social Pro",
    price: "₹5,000",
    period: "30 Days",
    amount: 5000,
    recommended: true,
    features: [
      "Everything in Social Boost",
      "YouTube",
      "Video / Reel",
      "Retargeting",
      "Advanced audience",
      "Campaign optimization",
    ],
  },
  {
    id: "max",
    name: "CMNHousing Growth Max",
    price: "Custom",
    period: "Tailored",
    amount: 12000,
    features: [
      "Social Media",
      "Google Ads",
      "CMNHousing Premium",
      "Retargeting",
      "AI creative",
      "Lead management",
    ],
  },
] as const;

export const promotionOptions = [
  {
    id: "social",
    name: "Social Media Ads",
    blurb: "Facebook, Instagram, YouTube and more",
    recommended: true,
    primary: true,
  },
  {
    id: "premium",
    name: "CMNHousing Premium",
    blurb: "Homepage & search visibility",
    recommended: true,
  },
  { id: "google", name: "Google Ads", blurb: "Search-driven buyers" },
  {
    id: "growth",
    name: "Complete Growth Campaign",
    blurb: "Social + Google + CMNHousing",
    recommended: true,
  },
] as const;

export const adCopy = {
  headline: "Premium 3 BHK Villa for Sale in Kokapet",
  primaryText:
    "Discover a premium 3 BHK villa in Kokapet, Hyderabad with spacious interiors, modern amenities and excellent connectivity.",
  cta: "View Property",
};

export function estimates(budget: number) {
  const reachLow = Math.round((budget * 4) / 1000) * 1000;
  const reachHigh = Math.round((budget * 10) / 1000) * 1000;
  return {
    reach: `${fmtK(reachLow)}–${fmtK(reachHigh)}`,
    clicks: `${fmtK(Math.round(budget * 0.12))}–${fmtK(Math.round(budget * 0.35))}`,
    leads: `${Math.max(5, Math.round(budget * 0.005))}–${Math.round(budget * 0.018)}`,
  };
}

function fmtK(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : `${n}`;
}

export function inr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

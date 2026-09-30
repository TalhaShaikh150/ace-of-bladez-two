import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { SectionHeader, fadeUp, stagger } from "./ui";
import { cn } from "../utils/cn";

const single = [
  { name: "The Cut", price: 35, desc: "A precise cut with a razor edge-up and hot towel finish.", features: ["Consult + cut", "Straight-razor line-up", "Hot towel finish", "Style walkthrough"], cta: "Book The Cut" },
  { name: "The Ace", price: 60, desc: "Our signature. The full cut plus a sculpted beard and facial ritual.", features: ["Everything in The Cut", "Beard shape & sculpt", "Black-mask facial", "Scalp massage", "Complimentary drink"], cta: "Book The Ace", featured: true },
  { name: "The Royal", price: 95, desc: "Cut, hot towel shave and a full grooming reset. Two hours of you.", features: ["Everything in The Ace", "Full hot towel shave", "Grey blending", "Brow & ear detail", "Priority booking"], cta: "Book The Royal" },
];

const member = [
  { name: "Regular", price: 59, desc: "Two cuts a month, always the same barber.", features: ["2× The Cut / month", "Save $11 monthly", "Text-to-book priority", "10% off products"], cta: "Join Regular" },
  { name: "Ace Club", price: 99, desc: "Two Ace sessions monthly. Look sharp every single week.", features: ["2× The Ace / month", "Save $21 monthly", "Free beard touch-ups", "Bring-a-friend passes", "Members-only hours"], cta: "Join Ace Club", featured: true },
  { name: "Royal Circle", price: 159, desc: "Unlimited cuts. One Royal a month. VIP everything.", features: ["Unlimited The Cut", "1× The Royal / month", "Skip-the-line access", "Free product kit quarterly", "Concierge scheduling"], cta: "Join Royal Circle" },
];

export default function Pricing() {
  const [mode, setMode] = useState<"single" | "member">("single");
  const plans = mode === "single" ? single : member;

  return (
    <section id="pricing" className="relative py-24 sm:py-32" aria-labelledby="pricing-title">
      <div className="absolute inset-x-0 top-0 gold-line" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Pricing"
          title="Transparent prices."
          accent="No surprises."
          description="Pay per visit or join the club and lock in a lower rate with priority booking. Either way — you leave looking like the Ace."
        />

        <div className="mt-10 flex justify-center">
          <div className="glass relative flex rounded-full p-1" role="tablist" aria-label="Pricing mode">
            {(["single", "member"] as const).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={cn("relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors", mode === m ? "text-ink" : "text-cream/60 hover:text-cream")}
              >
                {mode === m && (
                  <motion.span layoutId="pill" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-gold-2 to-gold" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
                )}
                {m === "single" ? "Per visit" : "Membership"}
                {m === "member" && <span className="ml-2 rounded-full bg-ink/20 px-1.5 py-0.5 text-[10px]">Save 20%</span>}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={mode}
          initial="hidden"
          animate="show"
          variants={stagger}
          className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch"
        >
          {plans.map((p) => (
            <motion.article
              key={p.name}
              variants={fadeUp}
              className={cn(
                "card-hover relative flex flex-col rounded-[2rem] p-8",
                p.featured
                  ? "border border-gold/40 bg-gradient-to-b from-gold/[0.12] to-ink-2 shadow-[0_40px_80px_-40px_rgba(212,175,55,.5)] lg:-my-4 lg:py-12"
                  : "glass",
              )}
            >
              {p.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold-2 to-gold px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-ink shadow-lg">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-2xl text-cream">{p.name}</h3>
              <p className="mt-2 text-sm text-cream/55">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl text-cream">${p.price}</span>
                <span className="text-sm text-cream/50">{mode === "member" ? "/month" : "/visit"}</span>
              </div>
              <ul className="mt-7 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-cream/75">
                    <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", p.featured ? "bg-gold text-ink" : "bg-gold/15 text-gold")}>
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                className={cn(
                  "group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  p.featured ? "btn-gold" : "border border-white/15 text-cream hover:border-gold/50 hover:bg-gold/10",
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {p.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </motion.article>
          ))}
        </motion.div>

        <p className="mt-10 text-center text-sm text-cream/45">
          First visit? Use code <span className="font-semibold text-gold">FIRSTACE</span> for $10 off any service. Memberships cancel anytime.
        </p>
      </div>
    </section>
  );
}

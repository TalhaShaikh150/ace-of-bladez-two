import { Scissors } from "lucide-react";

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const Youtube = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22.5 6.4a3 3 0 0 0-2.1-2.1C18.5 4 12 4 12 4s-6.5 0-8.4.3A3 3 0 0 0 1.5 6.4 31 31 0 0 0 1.2 12a31 31 0 0 0 .3 5.6 3 3 0 0 0 2.1 2.1C5.5 20 12 20 12 20s6.5 0 8.4-.3a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .3-5.6 31 31 0 0 0-.3-5.6z" /><path d="m10 15 5-3-5-3z" fill="currentColor" stroke="none" />
  </svg>
);

const cols = [
  { h: "Shop", items: [["Services", "#services"], ["The Craft", "#craft"], ["Pricing", "#pricing"], ["Book a Chair", "#book"]] },
  { h: "Company", items: [["Our Barbers", "#craft"], ["Reviews", "#reviews"], ["Careers", "#"], ["Gift Cards", "#"]] },
  { h: "Support", items: [["FAQ", "#faq"], ["Cancellation Policy", "#"], ["Privacy", "#"], ["Terms", "#"]] },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-2 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-2 via-gold to-gold-3 text-ink">
                <Scissors className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="font-display text-xl text-cream">Ace <span className="text-gold">of</span> Bladez</span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/50">
              Precision cuts, hot towel shaves and sculpted beards from downtown's most-booked master barbers. Since 2016.
            </p>
            <div className="mt-6 flex gap-3">
              {[{ I: Instagram, l: "Instagram" }, { I: Facebook, l: "Facebook" }, { I: Youtube, l: "YouTube" }].map(({ I, l }) => (
                <a key={l} href="#" aria-label={l} className="glass grid h-10 w-10 place-items-center rounded-full text-cream/60 transition hover:border-gold/40 hover:text-gold">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <nav key={c.h} aria-label={c.h}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{c.h}</h3>
              <ul className="mt-5 space-y-3">
                {c.items.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-sm text-cream/60 transition hover:text-cream">{label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="gold-line mt-14" />
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs text-cream/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Ace of Bladez Barbershop. All rights reserved.</p>
          <p>412 King Street, Suite 2 · (555) 000-2223 · Stay sharp.</p>
        </div>
      </div>
    </footer>
  );
}

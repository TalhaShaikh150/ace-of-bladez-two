import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeader } from "./ui";
import { cn } from "../utils/cn";

const faqs = [
  { q: "Do I need an appointment, or can I walk in?", a: "Both work. Walk-ins are welcome whenever a chair is free, but 82% of our slots book out in advance — so booking online (it takes 20 seconds) guarantees you won't wait." },
  { q: "I don't know what haircut I want. Is that a problem?", a: "That's the best kind of client. Every cut starts with a quick consult where your barber looks at your head shape, hair type and how much styling you'll realistically do. We'll recommend something that looks great and grows out clean." },
  { q: "How long does a cut take?", a: "The Cut runs about 45 minutes. The Ace is 75 minutes, and The Royal is a full two hours. We never double-book, so your time is yours." },
  { q: "What if I'm not happy with my haircut?", a: "Come back within 7 days and we'll fix it for free — no questions, no awkwardness. In nine years we've had to do this a handful of times, and each time the client left a regular." },
  { q: "Can I request the same barber every time?", a: "Absolutely — and we encourage it. Your profile stores your cut notes and photos, so whether you see Ace, Tony or Miguel, the result is consistent." },
  { q: "Do you do kids' haircuts and group bookings?", a: "Kids 12 and under are $25 with a parent's booking. For groups (weddings, teams, events), book 5+ chairs and we'll open the shop just for you with a private bar." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-ink-2/50 py-24 sm:py-32" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            align="left"
            eyebrow="FAQ"
            title="Questions,"
            accent="answered."
            description="Still wondering something? Text us at (555) 000-2223 — a real barber replies, usually within minutes."
          />
        </div>

        <ul className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className={cn("glass overflow-hidden rounded-2xl transition-colors duration-300", isOpen && "border-gold/30 bg-gold/[0.04]")}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <span className="text-base font-semibold text-cream sm:text-lg">{f.q}</span>
                  <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300", isOpen ? "rotate-45 border-gold bg-gold text-ink" : "border-white/15 text-cream/60")}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-cream/60 sm:text-base">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

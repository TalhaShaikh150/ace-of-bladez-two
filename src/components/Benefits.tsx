import { motion } from "framer-motion";
import { Clock, ShieldCheck, Smartphone, Coffee, RefreshCw, Award } from "lucide-react";
import { SectionHeader, fadeUp, stagger } from "./ui";

const benefits = [
  { icon: Clock, t: "Zero wait. Ever.", d: "Your slot is your slot. Late by 10 minutes on our side? Your cut is free.", big: true },
  { icon: Smartphone, t: "Book in 20 seconds", d: "Pick your barber, pick your time, done. Reminders by text." },
  { icon: ShieldCheck, t: "Love-it guarantee", d: "Not 100% happy? Come back within 7 days and we'll fix it, free." },
  { icon: Coffee, t: "Complimentary bar", d: "Espresso, cold brew or a bourbon while you wait for the towel to cool." },
  { icon: RefreshCw, t: "Same barber, same cut", d: "Your notes and photos saved to your profile. Consistency, every visit." },
  { icon: Award, t: "Award-winning team", d: "3× city 'Best Barbershop'. Our barbers compete — and win — nationally.", big: true },
];

export default function Benefits() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="benefits-title">
      <div className="absolute inset-x-0 top-0 gold-line" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Why Ace"
          title="Built around"
          accent="your time."
          description="Great barbers are rare. Great barbers who respect your schedule, remember your cut and guarantee the result? That's just us."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((b) => (
            <motion.article
              key={b.t}
              variants={fadeUp}
              className={`card-hover glass group relative overflow-hidden rounded-3xl p-7 ${b.big ? "sm:col-span-2" : ""}`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-gold-2 to-gold-3 text-ink shadow-[0_8px_24px_-8px_var(--color-gold)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <b.icon className="h-5 w-5" />
                </span>
                <h3 className={`mt-6 font-display text-cream ${b.big ? "text-3xl" : "text-xl"}`}>{b.t}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-cream/60">{b.d}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Scissors, Sparkles, Flame, Crown, Droplets, Palette } from "lucide-react";
import { SectionHeader, fadeUp, stagger } from "./ui";

const services = [
  { icon: Scissors, title: "Signature Fades", desc: "Skin, drop, burst or taper — blended so clean you can't find the line. Finished with a straight-razor edge-up.", tag: "Most booked" },
  { icon: Crown, title: "Executive Cut", desc: "Classic scissor work for the boardroom. Structured, timeless and built to grow out gracefully.", tag: null },
  { icon: Flame, title: "Hot Towel Shave", desc: "Pre-shave oil, steamed towels, a straight razor and a cold-towel close. The 30 minutes you'll look forward to all week.", tag: "Ritual" },
  { icon: Sparkles, title: "Beard Sculpting", desc: "Shape, line and condition. We map your beard to your face structure — not the other way around.", tag: null },
  { icon: Droplets, title: "Scalp & Facial", desc: "Deep-clean treatments, black-mask facials and scalp therapy for guys who take maintenance seriously.", tag: "New" },
  { icon: Palette, title: "Color & Enhancements", desc: "Grey blending, hair fibers and precision enhancements — subtle enough that only you'll know.", tag: null },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32" aria-labelledby="services-title">
      <div className="absolute inset-x-0 top-0 gold-line" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Services"
          title="Every service,"
          accent="mastered."
          description="No menus with 40 options you don't understand. Six services, each one executed at a level you won't find anywhere else in the city."
        />

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <motion.li
              key={s.title}
              variants={fadeUp}
              className="card-hover glass group relative overflow-hidden rounded-3xl p-7"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/25 bg-gold/10 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
                  <s.icon className="h-5 w-5" />
                </span>
                {s.tag && (
                  <span className="rounded-full border border-gold/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold">{s.tag}</span>
                )}
              </div>
              <h3 className="mt-6 font-display text-2xl text-cream">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">{s.desc}</p>
              <a href="#book" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold opacity-0 -translate-x-2 transition-all duration-400 group-hover:translate-x-0 group-hover:opacity-100">
                Book this →
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

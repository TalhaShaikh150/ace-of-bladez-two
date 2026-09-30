import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { Eyebrow, GoldButton, Reveal } from "./ui";

const steps = [
  { n: "01", t: "Consult", d: "Two minutes on your head shape, hair growth and lifestyle. We tell you what will actually work." },
  { n: "02", t: "Cut", d: "Clipper-over-comb, freehand blending and scissor detail — no shortcuts, no guards-only fades." },
  { n: "03", t: "Detail", d: "Straight-razor line-up, brow and neck clean, hot towel and a styling walkthrough so it looks this good at home." },
];

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 80]);

  return (
    <section id="craft" ref={ref} className="relative overflow-hidden bg-ink-2/50 py-24 sm:py-32" aria-labelledby="craft-title">
      <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-gold/8 blur-[130px]" aria-hidden />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
        {/* Images */}
        <div className="relative order-2 lg:order-1">
          <motion.div style={{ y: y1 }} className="relative z-10 w-[78%] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
            <img src="/images/shop.jpg" alt="The Ace of Bladez shop floor with leather chairs and warm lighting" className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute -bottom-10 right-0 z-20 w-[52%] overflow-hidden rounded-[1.5rem] border border-gold/30 shadow-[0_40px_80px_-30px_rgba(212,175,55,.4)]">
            <img src="/images/detail.jpg" alt="Close-up of a straight-razor beard line-up" className="aspect-square w-full object-cover" loading="lazy" />
          </motion.div>
          <div className="glass-strong absolute left-4 top-6 z-30 rounded-2xl px-4 py-3 sm:left-8">
            <p className="font-display text-3xl text-gold">45<span className="text-base text-cream/60"> min</span></p>
            <p className="text-xs text-cream/60">Average time in chair</p>
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>The Craft</Eyebrow>
            <h2 id="craft-title" className="mt-5 font-display text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
              A haircut is 45 minutes. <em className="text-gradient not-italic">The confidence lasts weeks.</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/60">
              Most shops rush you through. We built Ace of Bladez around one belief: the details are the whole point.
              Here's exactly what happens when you sit in our chair.
            </p>
          </Reveal>

          <ol className="mt-10 space-y-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12}>
                <li className="group flex gap-5">
                  <span className="font-display text-3xl text-gold/50 transition-colors group-hover:text-gold">{s.n}</span>
                  <div className="border-l border-white/10 pl-5 transition-colors group-hover:border-gold/40">
                    <h3 className="text-lg font-semibold text-cream">{s.t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream/55">{s.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.3} className="mt-10">
            <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/70">
              {["Sterilized tools, every client", "Premium products only", "Free style consult"].map((t) => (
                <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" />{t}</li>
              ))}
            </ul>
            <GoldButton size="lg">Experience it yourself</GoldButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

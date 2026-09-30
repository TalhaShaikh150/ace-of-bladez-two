import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const press = ["GQ Grooming", "Men's Health", "Yelp Top 10", "Google 4.9★", "Barber Society", "City Weekly", "Esquire"];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

const stats = [
  { v: 38000, s: "+", l: "Cuts delivered" },
  { v: 4.9, s: "", l: "Average rating", fixed: true },
  { v: 9, s: " yrs", l: "Perfecting the fade" },
  { v: 97, s: "%", l: "Clients rebook" },
];

export default function SocialProof() {
  return (
    <section aria-label="Social proof" className="relative border-y border-white/5 bg-ink-2/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-cream/40">Featured in & trusted by</p>
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="animate-marquee flex w-max gap-14 pr-14">
            {[...press, ...press].map((p, i) => (
              <span key={i} className="whitespace-nowrap font-display text-xl text-cream/35 transition-colors hover:text-gold sm:text-2xl">
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <p className="font-display text-4xl text-cream sm:text-5xl">
                {s.fixed ? <span>4.9</span> : <Counter to={s.v} suffix={s.s} />}
              </p>
              <p className="mt-1.5 text-sm text-cream/50">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Star, Calendar, MapPin, Play } from "lucide-react";
import { Eyebrow, GoldButton, GhostButton, fadeUp, stagger } from "./ui";
import type { MouseEvent } from "react";

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["30%", "70%"]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <section className="noise relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-32" aria-labelledby="hero-title">
      {/* Ambient background */}
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" aria-hidden />
      <div className="animate-float absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-gold/10 blur-[110px]" aria-hidden />
      <div className="animate-float absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-700/10 blur-[120px] [animation-delay:-4s]" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-10">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp}>
            <Eyebrow>Downtown's most-booked barbershop</Eyebrow>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="mt-6 font-display text-[2.9rem] leading-[0.98] tracking-tight text-cream sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
          >
            Walk in a regular.
            <br />
            Walk out <em className="text-gradient not-italic">the Ace.</em>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lg leading-relaxed text-cream/65">
            Razor-sharp fades, precision beard sculpting and a chair that's yours on time, every time.
            Master barbers. Zero waiting. One cut and you'll never go anywhere else.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <GoldButton size="lg">
              Book Your Cut <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </GoldButton>
            <GhostButton href="#craft" className="py-4">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/20 text-gold">
                <Play className="ml-0.5 h-3 w-3 fill-current" />
              </span>
              See the craft
            </GhostButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {["JD", "MK", "TR", "AL"].map((n, i) => (
                  <span
                    key={n}
                    className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-gradient-to-br from-ink-3 to-ink-2 text-[10px] font-bold text-gold"
                    style={{ zIndex: 4 - i }}
                  >
                    {n}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-gold" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-cream/55"><span className="font-semibold text-cream">4.9</span> from 1,200+ reviews</p>
              </div>
            </div>
            <div className="hidden h-8 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-2 text-sm text-cream/60">
              <MapPin className="h-4 w-4 text-gold" /> 412 King St · Open till 9pm
            </div>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          style={{ perspective: 1200 }}
        >
          <motion.div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_50px_120px_-40px_rgba(212,175,55,.35)]"
          >
            <img
              src="/images/hero.jpg"
              alt="A client with a fresh skin fade seated in an Ace of Bladez barber chair"
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: useTransform(
                  [glowX, glowY],
                  ([x, y]) => `radial-gradient(400px circle at ${x} ${y}, rgba(212,175,55,.18), transparent 60%)`,
                ),
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />

            {/* Floating cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              style={{ translateZ: 60 }}
              className="glass-strong absolute top-6 right-6 flex items-center gap-3 rounded-2xl px-4 py-3"
            >
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-emerald-400/30" />
                <Calendar className="relative h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-cream/60">Next available</p>
                <p className="text-sm font-semibold text-cream">Today · 4:30 PM</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              style={{ translateZ: 80 }}
              className="glass-strong absolute bottom-6 left-6 right-6 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-lg text-cream">Signature Skin Fade</p>
                  <p className="text-xs text-cream/55">45 min · Hot towel finish included</p>
                </div>
                <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">$45</span>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ delay: 1.6, duration: 1.4, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-gold-3 via-gold to-gold-2"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-cream/50">82% of this week's slots already booked</p>
            </motion.div>
          </motion.div>

          {/* Rotating badge */}
          <div className="absolute -bottom-8 -left-6 hidden h-28 w-28 sm:block" aria-hidden>
            <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full">
              <defs>
                <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-gold text-[9.5px] font-semibold uppercase tracking-[0.3em]">
                <textPath href="#circ">Est. 2016 · Master Barbers · Ace of Bladez ·</textPath>
              </text>
            </svg>
            <span className="absolute inset-0 m-auto grid h-12 w-12 place-items-center rounded-full bg-gold font-display text-xl text-ink">A</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
